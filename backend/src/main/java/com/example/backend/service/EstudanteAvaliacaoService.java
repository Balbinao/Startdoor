package com.example.backend.service;

import com.example.backend.dto.EstudanteAvaliacaoDTO;
import com.example.backend.dto.EstudanteAvaliacaoResponseDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Empresa;
import com.example.backend.model.Estudante;
import com.example.backend.model.EstudanteAvaliacao;
import com.example.backend.model.Setor;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteAvaliacaoRepository;
import com.example.backend.repository.EstudanteRepository;
import com.example.backend.repository.SetorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EstudanteAvaliacaoService {
    private final EstudanteAvaliacaoRepository avaliacaoRepository;
    private final EstudanteRepository estudanteRepository;
    private final EmpresaRepository empresaRepository;
    private final SetorRepository setorRepository;
    private final MediaService mediaService;

    public EstudanteAvaliacaoService(EstudanteAvaliacaoRepository avaliacaoRepository,
                                     EstudanteRepository estudanteRepository,
                                     EmpresaRepository empresaRepository,
                                     SetorRepository setorRepository, MediaService mediaService) {
        this.avaliacaoRepository = avaliacaoRepository;
        this.estudanteRepository = estudanteRepository;
        this.empresaRepository = empresaRepository;
        this.setorRepository = setorRepository;
        this.mediaService = mediaService;
    }

    @Transactional
    public EstudanteAvaliacaoResponseDTO criar(Long estudanteId, EstudanteAvaliacaoDTO dto, String uuidLogado) {
        validarDTO(dto);

        Estudante estudante = estudanteRepository.findById(estudanteId)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado"));

        if (!estudante.getUuid().equals(uuidLogado)) {
            throw new org.springframework.security.access.AccessDeniedException("Você só pode criar avaliações para você mesmo");
        }

        Empresa empresa = empresaRepository.findById(dto.idEmpresa())
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));

        Setor setor = setorRepository.findById(dto.idSetor())
                .orElseThrow(() -> new ResourceNotFoundException("Setor não encontrado"));

        EstudanteAvaliacao avaliacao = new EstudanteAvaliacao();
        avaliacao.setEstudante(estudante);
        avaliacao.setEmpresa(empresa);
        avaliacao.setSetor(setor);
        avaliacao.setEstadoAtuacao(dto.estadoAtuacao());
        avaliacao.setModeloTrabalho(dto.modeloTrabalho());
        avaliacao.setDataInicio(dto.dataInicio());
        avaliacao.setDataFim(dto.dataFim());
        avaliacao.setTituloCargo(dto.tituloCargo());
        avaliacao.setTextoAvaliacao(dto.textoAvaliacao());
        avaliacao.setSalarioMin(dto.salarioMin());
        avaliacao.setSalarioMax(dto.salarioMax());
        avaliacao.setAnonima(dto.anonima());
        avaliacao.setAmbiente(dto.ambiente());
        avaliacao.setAprendizado(dto.aprendizado());
        avaliacao.setBeneficios(dto.beneficios());
        avaliacao.setCultura(dto.cultura());
        avaliacao.setEfetivacao(dto.efetivacao());
        avaliacao.setEntrevista(dto.entrevista());
        avaliacao.setFeedback(dto.feedback());
        avaliacao.setInfraestrutura(dto.infraestrutura());
        avaliacao.setIntegracao(dto.integracao());
        avaliacao.setRemuneracao(dto.remuneracao());
        avaliacao.setRotina(dto.rotina());
        avaliacao.setLideranca(dto.lideranca());

        EstudanteAvaliacao avaliacaoSalva = avaliacaoRepository.save(avaliacao);
        mediaService.atualizarMediaEmpresa(empresa.getId());

        return toResponseDTO(avaliacaoSalva);
    }

    @Transactional(readOnly = true)
    public List<EstudanteAvaliacaoResponseDTO> listarPorEmpresa(Long empresaId) {
        return avaliacaoRepository.findByEmpresaId(empresaId)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public EstudanteAvaliacaoResponseDTO buscarPorId(Long id) {
        EstudanteAvaliacao avaliacao = avaliacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Avaliação não encontrada"));
        return toResponseDTO(avaliacao);
    }

    @Transactional(readOnly = true)
    public List<EstudanteAvaliacaoResponseDTO> listarPorEstudante(Long estudanteId) {
        return avaliacaoRepository.findByEstudanteId(estudanteId)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional
    public EstudanteAvaliacaoResponseDTO atualizar(Long id, EstudanteAvaliacaoDTO dto, String uuidLogado, boolean isAdmin) {
        EstudanteAvaliacao avaliacao = avaliacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Avaliação não encontrada"));


        if (!isAdmin && !avaliacao.getEstudante().getUuid().equals(uuidLogado)) {
            throw new org.springframework.security.access.AccessDeniedException("Você não tem permissão para atualizar esta avaliação");
        }

        if (dto.idEmpresa() != null) {
            Empresa empresa = empresaRepository.findById(dto.idEmpresa())
                    .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));
            avaliacao.setEmpresa(empresa);
        }
        if (dto.idSetor() != null) {
            Setor setor = setorRepository.findById(dto.idSetor())
                    .orElseThrow(() -> new ResourceNotFoundException("Setor não encontrado"));
            avaliacao.setSetor(setor);
        }
        if (dto.estadoAtuacao() != null) avaliacao.setEstadoAtuacao(dto.estadoAtuacao());
        if (dto.modeloTrabalho() != null) avaliacao.setModeloTrabalho(dto.modeloTrabalho());
        if (dto.dataInicio() != null) avaliacao.setDataInicio(dto.dataInicio());
        if (dto.dataFim() != null) avaliacao.setDataFim(dto.dataFim());
        if (dto.tituloCargo() != null) avaliacao.setTituloCargo(dto.tituloCargo());
        if (dto.textoAvaliacao() != null) avaliacao.setTextoAvaliacao(dto.textoAvaliacao());
        if (dto.salarioMin() != null) avaliacao.setSalarioMin(dto.salarioMin());
        if (dto.salarioMax() != null) avaliacao.setSalarioMax(dto.salarioMax());
        if (dto.anonima() != null) avaliacao.setAnonima(dto.anonima());
        if (dto.ambiente() != null) avaliacao.setAmbiente(dto.ambiente());
        if (dto.aprendizado() != null) avaliacao.setAprendizado(dto.aprendizado());
        if (dto.beneficios() != null) avaliacao.setBeneficios(dto.beneficios());
        if (dto.cultura() != null) avaliacao.setCultura(dto.cultura());
        if (dto.efetivacao() != null) avaliacao.setEfetivacao(dto.efetivacao());
        if (dto.entrevista() != null) avaliacao.setEntrevista(dto.entrevista());
        if (dto.feedback() != null) avaliacao.setFeedback(dto.feedback());
        if (dto.infraestrutura() != null) avaliacao.setInfraestrutura(dto.infraestrutura());
        if (dto.integracao() != null) avaliacao.setIntegracao(dto.integracao());
        if (dto.remuneracao() != null) avaliacao.setRemuneracao(dto.remuneracao());
        if (dto.rotina() != null) avaliacao.setRotina(dto.rotina());
        if (dto.lideranca() != null) avaliacao.setLideranca(dto.lideranca());

        EstudanteAvaliacao atualizada = avaliacaoRepository.save(avaliacao);
        mediaService.atualizarMediaEmpresa(atualizada.getEmpresa().getId());

        return toResponseDTO(atualizada);
    }

    @Transactional
    public void deletar(Long id, String uuidLogado, boolean isAdmin) {
        EstudanteAvaliacao avaliacao = avaliacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Avaliação não encontrada"));

        if (!isAdmin && !avaliacao.getEstudante().getUuid().equals(uuidLogado)) {
            throw new org.springframework.security.access.AccessDeniedException("Você não tem permissão para deletar esta avaliação");
        }

        Long empresaId = avaliacao.getEmpresa().getId();
        avaliacaoRepository.deleteById(id);
        mediaService.atualizarMediaEmpresa(empresaId);
    }

    private void validarDTO(EstudanteAvaliacaoDTO dto) {
        if (dto.dataFim() != null && dto.dataFim().isBefore(dto.dataInicio())) {
            throw new IllegalArgumentException("Data de término não pode ser anterior à data de início");
        }
        if (dto.salarioMax().compareTo(dto.salarioMin()) < 0) {
            throw new IllegalArgumentException("Salário máximo não pode ser menor que salário mínimo");
        }
    }

    private EstudanteAvaliacaoResponseDTO toResponseDTO(EstudanteAvaliacao avaliacao) {
        Boolean anonima = avaliacao.getAnonima();

        String nomeEstudante = anonima ? null : avaliacao.getEstudante().getNome();
        String fotoUrlEstudante = anonima ? null : buildFotoUrl(avaliacao.getEstudante().getFotoUrl());
        String userEstudante = anonima ? null : avaliacao.getEstudante().getUser();

        String fotoUrlEmpresa = buildFotoUrl(avaliacao.getEmpresa().getFotoUrl());

        return new EstudanteAvaliacaoResponseDTO(
                avaliacao.getId(),
                avaliacao.getEstudante().getId(),
                nomeEstudante,
                fotoUrlEstudante,
                userEstudante,
                avaliacao.getEmpresa().getId(),
                avaliacao.getEmpresa().getNomeFantasia(),
                fotoUrlEmpresa,
                avaliacao.getSetor().getId(),
                avaliacao.getSetor().getNome(),
                avaliacao.getEstadoAtuacao(),
                avaliacao.getModeloTrabalho(),
                avaliacao.getDataInicio(),
                avaliacao.getDataFim(),
                avaliacao.getTituloCargo(),
                avaliacao.getTextoAvaliacao(),
                avaliacao.getSalarioMin(),
                avaliacao.getSalarioMax(),
                avaliacao.getAnonima(),
                avaliacao.getAmbiente(),
                avaliacao.getAprendizado(),
                avaliacao.getBeneficios(),
                avaliacao.getCultura(),
                avaliacao.getEfetivacao(),
                avaliacao.getEntrevista(),
                avaliacao.getFeedback(),
                avaliacao.getInfraestrutura(),
                avaliacao.getIntegracao(),
                avaliacao.getRemuneracao(),
                avaliacao.getRotina(),
                avaliacao.getLideranca(),
                avaliacao.getCreatedAt(),
                avaliacao.getUpdatedAt()
        );
    }

    private String buildFotoUrl(String fotoUrl) {
        return (fotoUrl != null) ? "http://localhost:8080/fotos/" + fotoUrl : null;
    }
}