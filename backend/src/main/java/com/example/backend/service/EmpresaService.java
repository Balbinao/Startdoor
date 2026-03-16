package com.example.backend.service;

import com.example.backend.dto.AlterarSenhaDTO;
import com.example.backend.dto.AtualizarEmpresaDTO;
import com.example.backend.dto.CadastroEmpresaDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Empresa;
import com.example.backend.model.Estudante;
import com.example.backend.repository.AdminRepository;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpresaService {

    private final EmpresaRepository empresaRepository;
    private final EstudanteRepository estudanteRepository;
    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public EmpresaService(EmpresaRepository repository, EstudanteRepository estudanteRepository, AdminRepository adminRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.empresaRepository = repository;
        this.estudanteRepository = estudanteRepository;
        this.adminRepository = adminRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public void cadastrar(CadastroEmpresaDTO data) {

        if (emailJaExiste(data.email())) {
            throw new RuntimeException("E-mail corporativo já cadastrado no sistema");
        }

        if (empresaRepository.existsByCnpj(data.cnpj())) {
            throw new RuntimeException("CNPJ já cadastrado");
        }

        Empresa novaEmpresa = new Empresa();
        novaEmpresa.setNomeFantasia(data.nomeFantasia());
        novaEmpresa.setCnpj(data.cnpj());
        novaEmpresa.setEmail(data.email());
        novaEmpresa.setUser(data.email());
        novaEmpresa.setSenha(bCryptPasswordEncoder.encode(data.senha()));

        empresaRepository.save(novaEmpresa);
    }

    private boolean emailJaExiste(String email) {
        return estudanteRepository.existsByEmail(email) ||
                empresaRepository.existsByEmail(email) ||
                adminRepository.existsByEmail(email);
    }
    public List<Empresa> listarTodas() {
        return empresaRepository.findAll();
    }

    public Empresa buscarPorId(Long id) {
        return empresaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada com o ID: " + id));
    }

    public void atualizar(Long id, AtualizarEmpresaDTO dto) {
        Empresa empresa = buscarPorId(id);

        if (dto.nomeFantasia() != null) empresa.setNomeFantasia(dto.nomeFantasia());
        if (dto.email() != null && !dto.email().equals(empresa.getEmail())) {
            if (emailJaExiste(dto.email())) {
                throw new RuntimeException("Este e-mail já está em uso por outro no sistema.");
            }
            empresa.setEmail(dto.email());
        }
        empresaRepository.save(empresa);
    }

    public void deletar(Long id) {
        Empresa empresa = buscarPorId(id);
        empresaRepository.delete(empresa);
    }

    public void alterarSenha(Long id, AlterarSenhaDTO dto) {
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));

        if (!bCryptPasswordEncoder.matches(dto.senhaAtual(), empresa.getSenha())) {
            throw new RuntimeException("Senha atual incorreta!");
        }

        empresa.setSenha(bCryptPasswordEncoder.encode(dto.novaSenha()));
        empresaRepository.save(empresa);
    }
}
