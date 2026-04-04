package com.example.backend.service;

import com.example.backend.dto.ExperienciaProfissionalDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Empresa;
import com.example.backend.model.Estudante;
import com.example.backend.model.ExperienciaProfissional;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteRepository;
import com.example.backend.repository.ExperienciaProfissionalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ExperienciaProfissionalService {
    private final ExperienciaProfissionalRepository profissionalRepository;
    private final EstudanteRepository estudanteRepository;
    private final EmpresaRepository empresaRepository;

    public ExperienciaProfissionalService(ExperienciaProfissionalRepository profissionalRepository,
                                          EstudanteRepository estudanteRepository,
                                          EmpresaRepository empresaRepository) {
        this.profissionalRepository = profissionalRepository;
        this.estudanteRepository = estudanteRepository;
        this.empresaRepository = empresaRepository;
    }

    @Transactional
    public ExperienciaProfissional adicionar(Long estudanteId, ExperienciaProfissionalDTO dto) {
        if (dto.idEmpresa() == null) {
            throw new IllegalArgumentException("É necessário selecionar uma empresa cadastrada no sistema.");
        }
        if (dto.dataFim() != null && dto.dataFim().isBefore(dto.dataInicio())) {
            throw new IllegalArgumentException("A data de término não pode ser anterior à data de início.");
        }

        Estudante estudante = estudanteRepository.findById(estudanteId)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado"));

        Empresa empresa = empresaRepository.findById(dto.idEmpresa())
                .orElseThrow(() -> new ResourceNotFoundException("Empresa selecionada não existe no sistema."));

        ExperienciaProfissional exp = new ExperienciaProfissional();
        exp.setEstudante(estudante);
        exp.setEmpresa(empresa);
        exp.setTituloCargo(dto.tituloCargo());
        exp.setEstadoAtuacao(dto.estadoAtuacao());
        exp.setModeloTrabalho(dto.modeloTrabalho());
        exp.setDataInicio(dto.dataInicio());
        exp.setDataFim(dto.dataFim());
        exp.setDescricao(dto.descricao());

        return profissionalRepository.save(exp);
    }

    @Transactional(readOnly = true)
    public ExperienciaProfissional buscarPorId(Long id) {
        return profissionalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experiência profissional não encontrada."));
    }

    @Transactional
    public ExperienciaProfissional atualizar(Long id, ExperienciaProfissionalDTO dto) {
        ExperienciaProfissional exp = buscarPorId(id);

        if (dto.dataFim() != null && dto.dataFim().isBefore(dto.dataInicio())) {
            throw new IllegalArgumentException("A data de término não pode ser anterior à data de início.");
        }

        if (dto.tituloCargo() != null)    exp.setTituloCargo(dto.tituloCargo());
        if (dto.estadoAtuacao() != null)  exp.setEstadoAtuacao(dto.estadoAtuacao());
        if (dto.modeloTrabalho() != null) exp.setModeloTrabalho(dto.modeloTrabalho());
        if (dto.dataInicio() != null)     exp.setDataInicio(dto.dataInicio());
        if (dto.descricao() != null)      exp.setDescricao(dto.descricao());
        exp.setDataFim(dto.dataFim());

        if (dto.idEmpresa() != null) {
            Empresa empresa = empresaRepository.findById(dto.idEmpresa())
                    .orElseThrow(() -> new ResourceNotFoundException("Empresa selecionada não existe no sistema."));
            exp.setEmpresa(empresa);
        }

        if (dto.dataFim() != null && dto.dataInicio() != null && dto.dataFim().isBefore(dto.dataInicio())) {
            throw new IllegalArgumentException("A data de término não pode ser anterior à data de início.");
        }

        return profissionalRepository.save(exp);
    }

    public List<ExperienciaProfissional> listarPorEstudante(Long estudanteId) {
            return profissionalRepository.findByEstudanteId(estudanteId);
    }

    @Transactional
    public void remover(Long id) {
        profissionalRepository.deleteById(id);
    }
}
