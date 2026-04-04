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
        boolean temEmpresaSistema = dto.idEmpresa() != null;
        boolean temNomeEmpresaExterna = dto.nomeEmpresa() != null && !dto.nomeEmpresa().isBlank();

        if (temEmpresaSistema && temNomeEmpresaExterna) {
            throw new IllegalArgumentException("Informe apenas a empresa do sistema OU o nome de uma empresa externa.");
        }
        if (!temEmpresaSistema && !temNomeEmpresaExterna) {
            throw new IllegalArgumentException("É necessário informar uma empresa para registrar a experiência.");
        }
        if (dto.dataFim() != null && dto.dataFim().isBefore(dto.dataInicio())) {
            throw new IllegalArgumentException("A data de término não pode ser anterior à data de início.");
        }

        Estudante estudante = estudanteRepository.findById(estudanteId)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado"));

        ExperienciaProfissional exp = new ExperienciaProfissional();
        exp.setEstudante(estudante);
        exp.setTituloCargo(dto.tituloCargo());
        exp.setEstadoAtuacao(dto.estadoAtuacao());
        exp.setModeloTrabalho(dto.modeloTrabalho());
        exp.setDataInicio(dto.dataInicio());
        exp.setDataFim(dto.dataFim());
        exp.setDescricao(dto.descricao());

        if (temEmpresaSistema) {
            Empresa empresa = empresaRepository.findById(dto.idEmpresa())
                    .orElseThrow(() -> new ResourceNotFoundException("Empresa selecionada não existe no sistema."));
            exp.setEmpresa(empresa);
            exp.setNomeEmpresa(null);
        } else {
            exp.setNomeEmpresa(dto.nomeEmpresa());
            exp.setEmpresa(null);
        }
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

        if (dto.idEmpresa() != null && dto.nomeEmpresa() != null && !dto.nomeEmpresa().isBlank()) {
            throw new IllegalArgumentException("Informe apenas a empresa do sistema OU o nome de uma empresa externa.");
        }

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
            exp.setNomeEmpresa(null);

        } else if (dto.nomeEmpresa() != null && !dto.nomeEmpresa().isBlank()) {
            exp.setNomeEmpresa(dto.nomeEmpresa());
            exp.setEmpresa(null);
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
