package com.example.backend.service;

import com.example.backend.dto.AlterarSenhaDTO;
import com.example.backend.dto.AtualizarEstudanteDTO;
import com.example.backend.dto.CadastroEstudanteDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Estudante;
import com.example.backend.repository.AdminRepository;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstudanteService {

    private final EstudanteRepository estudanteRepository;
    private final EmpresaRepository empresaRepository;
    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public EstudanteService(EstudanteRepository estudanteRepository, BCryptPasswordEncoder bCryptPasswordEncoder, EmpresaRepository empresaRepository, AdminRepository adminRepository) {
        this.estudanteRepository = estudanteRepository;
        this.empresaRepository = empresaRepository;
        this.adminRepository = adminRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public void cadastrar(CadastroEstudanteDTO data) {
        if (emailJaExiste(data.email())) throw new RuntimeException("E-mail já cadastrado no sistema");
        if (estudanteRepository.existsByCpf(data.cpf())) throw new RuntimeException("CPF já cadastrado");
        if (estudanteRepository.existsByUser(data.user())) throw new RuntimeException("Username já em uso");

        Estudante estudante = new Estudante();
        estudante.setNome(data.nome());
        estudante.setCpf(data.cpf());
        estudante.setUser(data.user());
        estudante.setEmail(data.email());
        estudante.setSenha(bCryptPasswordEncoder.encode(data.senha()));

        estudanteRepository.save(estudante);
    }

    private boolean emailJaExiste(String email) {
        return estudanteRepository.existsByEmail(email) ||
                empresaRepository.existsByEmail(email) ||
                adminRepository.existsByEmail(email);
    }

    public List<Estudante> listarTodos(){
        return estudanteRepository.findAll();
    }

    public Estudante buscarPorId(Long id){
        return estudanteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado com o ID: " + id));
    }

    public void atualizar(Long id, AtualizarEstudanteDTO dto) {
        Estudante estudante = buscarPorId(id);

        if (dto.nome() != null) estudante.setNome(dto.nome());
        if (dto.user() != null) estudante.setUser(dto.user());
        if (dto.email() != null) estudante.setEmail(dto.email());

        estudanteRepository.save(estudante);
    }

    public void deletar(Long id) {
        Estudante estudante = buscarPorId(id);
        estudanteRepository.delete(estudante);
    }

    public void alterarSenha(Long id, AlterarSenhaDTO dto) {
        Estudante estudante = estudanteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado"));

        if (!bCryptPasswordEncoder.matches(dto.senhaAtual(), estudante.getSenha())) {
            throw new RuntimeException("Senha atual incorreta!");
        }

        estudante.setSenha(bCryptPasswordEncoder.encode(dto.novaSenha()));
        estudanteRepository.save(estudante);
    }
}
