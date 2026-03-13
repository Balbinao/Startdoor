package com.example.backend.service;

import com.example.backend.dto.AtualizarEmpresaDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Empresa;
import com.example.backend.repository.EmpresaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpresaService {

    private final EmpresaRepository empresaRepository;

    public EmpresaService(EmpresaRepository repository) {
        this.empresaRepository = repository;
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

        if (dto.nome_fantasia() != null) empresa.setNomeFantasia(dto.nome_fantasia());
        if (dto.email() != null) empresa.setEmail(dto.email());

        empresaRepository.save(empresa);
    }

    public void deletar(Long id) {
        Empresa empresa = buscarPorId(id);
        empresaRepository.delete(empresa);
    }
}
