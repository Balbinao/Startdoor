package com.example.backend.service;

import com.example.backend.dto.AtualizarSetorDTO;
import com.example.backend.dto.SetorDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Setor;
import com.example.backend.repository.SetorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SetorService {

    private final SetorRepository setorRepository;

    public SetorService(SetorRepository setorRepository) {
        this.setorRepository = setorRepository;
    }

    public List<Setor> listarTodos() {
        return setorRepository.findAll();
    }

    public Setor buscarPorId(Long id) {
        return setorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Setor não encontrado com o ID: " + id));
    }

    public void cadastrar(SetorDTO dto) {
        if (setorRepository.existsByNome(dto.nome())) {
            throw new RuntimeException("Setor com este nome já existe");
        }

        Setor setor = new Setor();
        setor.setNome(dto.nome());
        setorRepository.save(setor);
    }

    public void atualizar(Long id, AtualizarSetorDTO dto) {
        Setor setor = buscarPorId(id);

        if (dto.nome() != null && !dto.nome().equals(setor.getNome())) {
            if (setorRepository.existsByNome(dto.nome())) {
                throw new RuntimeException("Setor com este nome já existe");
            }
            setor.setNome(dto.nome());
        }

        setorRepository.save(setor);
    }

    public void deletar(Long id) {
        Setor setor = buscarPorId(id);
        setorRepository.delete(setor);
    }
}
