package com.example.backend.service;

import com.example.backend.dto.AlterarSenhaDTO;
import com.example.backend.dto.AtualizarEmpresaDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Empresa;
import com.example.backend.model.Estudante;
import com.example.backend.repository.EmpresaRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpresaService {

    private final EmpresaRepository empresaRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public EmpresaService(EmpresaRepository repository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.empresaRepository = repository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
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
        if (dto.email() != null) empresa.setEmail(dto.email());

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
