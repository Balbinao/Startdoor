package com.example.backend.service;

import com.example.backend.dto.ExpAcademicaResponseDTO;
import com.example.backend.dto.ExperienciaAcademicaDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Estudante;
import com.example.backend.model.ExperienciaAcademica;
import com.example.backend.repository.EstudanteRepository;
import com.example.backend.repository.ExperienciaAcademicaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ExperienciaAcademicaService {

    private final ExperienciaAcademicaRepository academicaRepository;
    private final EstudanteRepository estudanteRepository;

    public ExperienciaAcademicaService(ExperienciaAcademicaRepository academicaRepository,
                                       EstudanteRepository estudanteRepository) {
        this.academicaRepository = academicaRepository;
        this.estudanteRepository = estudanteRepository;
    }

    @Transactional
    public ExperienciaAcademica adicionar(Long estudanteId, ExperienciaAcademicaDTO dto) {
        Estudante estudante = estudanteRepository.findById(estudanteId)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado com ID: " + estudanteId));

        if (dto.dataFim() != null && dto.dataFim().isBefore(dto.dataInicio())) {
            throw new IllegalArgumentException("A data de término não pode ser anterior à data de início.");
        }

        ExperienciaAcademica exp = new ExperienciaAcademica();
        exp.setEstudante(estudante);
        exp.setTituloEnsino(dto.tituloEnsino());
        exp.setNomeEscola(dto.nomeEscola());
        exp.setEstadoAtuacao(dto.estadoAtuacao());
        exp.setModeloEnsino(dto.modeloEnsino());
        exp.setDataInicio(dto.dataInicio());
        exp.setDataFim(dto.dataFim());
        exp.setDescricao(dto.descricao());

        return academicaRepository.save(exp);
    }

    @Transactional(readOnly = true)
    public List<ExpAcademicaResponseDTO> listarPorEstudante(Long estudanteId) {
        if (!estudanteRepository.existsById(estudanteId)) {
            throw new ResourceNotFoundException("Estudante não encontrado.");
        }
        return academicaRepository.findByEstudanteId(estudanteId)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public ExpAcademicaResponseDTO buscarPorId(Long id) {
        ExperienciaAcademica exp = academicaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experiência acadêmica não encontrada."));

        return toResponseDTO(exp);
    }

    @Transactional
    public ExpAcademicaResponseDTO atualizar(Long id, ExperienciaAcademicaDTO dto) {
        ExperienciaAcademica exp = academicaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experiência acadêmica não encontrada."));

        if (dto.tituloEnsino() != null)  exp.setTituloEnsino(dto.tituloEnsino());
        if (dto.nomeEscola() != null)    exp.setNomeEscola(dto.nomeEscola());
        if (dto.estadoAtuacao() != null) exp.setEstadoAtuacao(dto.estadoAtuacao());
        if (dto.modeloEnsino() != null)  exp.setModeloEnsino(dto.modeloEnsino());
        if (dto.dataInicio() != null)    exp.setDataInicio(dto.dataInicio());
        if (dto.descricao() != null)     exp.setDescricao(dto.descricao());

        exp.setDataFim(dto.dataFim());

        if (exp.getDataFim() != null && exp.getDataFim().isBefore(exp.getDataInicio())) {
            throw new IllegalArgumentException("A data de término não pode ser anterior à data de início.");
        }
        ExperienciaAcademica expSalva = academicaRepository.save(exp);
        return toResponseDTO(expSalva);
    }

    @Transactional
    public void remover(Long id) {
        if (!academicaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Experiência acadêmica não encontrada.");
        }
        academicaRepository.deleteById(id);
    }

    private ExpAcademicaResponseDTO toResponseDTO(ExperienciaAcademica exp) {
        return new ExpAcademicaResponseDTO(
                exp.getId(),
                exp.getTituloEnsino(),
                exp.getNomeEscola(),
                exp.getEstadoAtuacao(),
                exp.getModeloEnsino(),
                exp.getDataInicio(),
                exp.getDataFim(),
                exp.getDescricao(),
                exp.getCreatedAt(),
                exp.getEstudante().getId(),
                exp.getEstudante().getNome()
        );
    }
}
