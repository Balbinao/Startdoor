package com.example.backend.service;

import com.example.backend.dto.AlterarSenhaDTO;
import com.example.backend.dto.AtualizarEstudanteDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Estudante;
import com.example.backend.repository.EstudanteRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstudanteService {

    private final EstudanteRepository estudanteRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public EstudanteService(EstudanteRepository estudanteRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.estudanteRepository = estudanteRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
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
