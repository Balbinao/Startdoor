package com.example.backend.service;

import com.example.backend.model.Admin;
import com.example.backend.model.Empresa;
import com.example.backend.model.Estudante;
import com.example.backend.model.RecuperacaoSenha;
import com.example.backend.repository.AdminRepository;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteRepository;
import com.example.backend.repository.RecuperacaoSenhaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class RecuperacaoSenhaService {

    private static final int CODIGO_EXPIRACAO_MINUTOS = 15;
    private static final SecureRandom RANDOM = new SecureRandom();

    private final RecuperacaoSenhaRepository recuperacaoSenhaRepository;
    private final EstudanteRepository estudanteRepository;
    private final EmpresaRepository empresaRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public RecuperacaoSenhaService(
            RecuperacaoSenhaRepository recuperacaoSenhaRepository,
            EstudanteRepository estudanteRepository,
            EmpresaRepository empresaRepository,
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService) {
        this.recuperacaoSenhaRepository = recuperacaoSenhaRepository;
        this.estudanteRepository = estudanteRepository;
        this.empresaRepository = empresaRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Transactional
    public void solicitarRecuperacao(String email) {
        boolean existe = estudanteRepository.findByEmail(email) != null
                || empresaRepository.findByEmail(email) != null
                || adminRepository.findByEmail(email) != null;

        if (!existe) {
            return;
        }

        recuperacaoSenhaRepository.deleteByEmailAndUtilizadoTrue(email);

        String codigo = gerarCodigo();
        RecuperacaoSenha entity = new RecuperacaoSenha();
        entity.setEmail(email);
        entity.setCodigo(codigo);
        entity.setDataExpiracao(LocalDateTime.now().plusMinutes(CODIGO_EXPIRACAO_MINUTOS));
        entity.setUtilizado(false);
        recuperacaoSenhaRepository.save(entity);

        emailService.enviarCodigoRecuperacao(email, codigo);
    }

    @Transactional
    public void resetarSenha(String email, String codigo, String novaSenha) {
        RecuperacaoSenha recovery = recuperacaoSenhaRepository
                .findByEmailAndCodigoAndUtilizadoFalseAndDataExpiracaoAfter(email, codigo, LocalDateTime.now())
                .orElseThrow(() -> new IllegalArgumentException("Código inválido ou expirado"));

        recovery.setUtilizado(true);
        recuperacaoSenhaRepository.save(recovery);

        UserDetails userDetails = estudanteRepository.findByEmail(email);
        if (userDetails != null) {
            Estudante estudante = (Estudante) userDetails;
            estudante.setSenha(passwordEncoder.encode(novaSenha));
            estudanteRepository.save(estudante);
            return;
        }

        userDetails = empresaRepository.findByEmail(email);
        if (userDetails != null) {
            Empresa empresa = (Empresa) userDetails;
            empresa.setSenha(passwordEncoder.encode(novaSenha));
            empresaRepository.save(empresa);
            return;
        }

        userDetails = adminRepository.findByEmail(email);
        if (userDetails != null) {
            Admin admin = (Admin) userDetails;
            admin.setSenha(passwordEncoder.encode(novaSenha));
            adminRepository.save(admin);
            return;
        }

        throw new IllegalArgumentException("Usuário não encontrado com o email informado");
    }

    private String gerarCodigo() {
        int code = 100000 + RANDOM.nextInt(900000);
        return String.valueOf(code);
    }
}
