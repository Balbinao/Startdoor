package com.example.backend.service;

import com.example.backend.dto.EmpresaSetorResponseDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Empresa;
import com.example.backend.model.EmpresaSetor;
import com.example.backend.model.Setor;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EmpresaSetorRepository;
import com.example.backend.repository.SetorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmpresaSetorService {
    private final EmpresaSetorRepository empresaSetorRepository;
    private final EmpresaRepository empresaRepository;
    private final SetorRepository setorRepository;

    public EmpresaSetorService(EmpresaSetorRepository empresaSetorRepository,
                               EmpresaRepository empresaRepository,
                               SetorRepository setorRepository) {
        this.empresaSetorRepository = empresaSetorRepository;
        this.empresaRepository = empresaRepository;
        this.setorRepository = setorRepository;
    }

    @Transactional(readOnly = true)
    public List<EmpresaSetorResponseDTO> listarPorEmpresa(Long empresaId) {
        return empresaSetorRepository.findByEmpresaId(empresaId)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional
    public EmpresaSetorResponseDTO adicionar(Long empresaId, Long setorId) {
        Empresa empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));

        Setor setor = setorRepository.findById(setorId)
                .orElseThrow(() -> new ResourceNotFoundException("Setor não encontrado"));

        if (empresaSetorRepository.existsByEmpresaIdAndSetorId(empresaId, setorId)) {
            throw new IllegalArgumentException("Setor já associado à empresa");
        }

        EmpresaSetor empresaSetor = new EmpresaSetor();
        empresaSetor.setEmpresa(empresa);
        empresaSetor.setSetor(setor);

        return toResponseDTO(empresaSetorRepository.save(empresaSetor));
    }

    @Transactional
    public void remover(Long empresaId, Long setorId) {
        if (!empresaSetorRepository.existsByEmpresaIdAndSetorId(empresaId, setorId)) {
            throw new ResourceNotFoundException("Associação não encontrada");
        }
        empresaSetorRepository.deleteByEmpresaIdAndSetorId(empresaId, setorId);
    }

    private EmpresaSetorResponseDTO toResponseDTO(EmpresaSetor empresaSetor) {
        return new EmpresaSetorResponseDTO(
                empresaSetor.getEmpresa().getId(),
                empresaSetor.getSetor().getId(),
                empresaSetor.getSetor().getNome(),
                empresaSetor.getCreatedAt(),
                empresaSetor.getUpdatedAt()
        );
    }
}