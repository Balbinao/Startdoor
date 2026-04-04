package com.example.backend.service;

import com.example.backend.dto.AtualizarEstudanteNotaCondiDTO;
import com.example.backend.dto.EstudanteNotaCondiDTO;
import com.example.backend.dto.EstudanteNotaCondiResponseDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Estudante;
import com.example.backend.model.EstudanteNotaCondi;
import com.example.backend.repository.EstudanteNotaCondiRepository;
import com.example.backend.repository.EstudanteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EstudanteNotaCondiService {

    private final EstudanteNotaCondiRepository notaCondiRepository;
    private final EstudanteRepository estudanteRepository;

    public EstudanteNotaCondiService(EstudanteNotaCondiRepository notaCondiRepository, EstudanteRepository estudanteRepository) {
        this.notaCondiRepository = notaCondiRepository;
        this.estudanteRepository = estudanteRepository;
    }

    public List<EstudanteNotaCondiResponseDTO> listarTodos() {
        return notaCondiRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public EstudanteNotaCondiResponseDTO buscarPorId(Long id) {
        EstudanteNotaCondi notaCondi = notaCondiRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notas condicionais não encontradas para o estudante com ID: " + id));
        return toResponseDTO(notaCondi);
    }

    public EstudanteNotaCondiResponseDTO buscarPorEstudanteId(Long estudanteId) {
        EstudanteNotaCondi notaCondi = notaCondiRepository.findByEstudanteId(estudanteId)
                .orElseThrow(() -> new ResourceNotFoundException("Notas condicionais não encontradas para o estudante com ID: " + estudanteId));
        return toResponseDTO(notaCondi);
    }

    @Transactional
    public void cadastrar(EstudanteNotaCondiDTO dto) {
        if (notaCondiRepository.existsByEstudanteId(dto.idEstudante())) {
            throw new RuntimeException("Notas condicionais já existem para este estudante");
        }

        Estudante estudante = estudanteRepository.findById(dto.idEstudante())
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado com o ID: " + dto.idEstudante()));

        EstudanteNotaCondi notaCondi = new EstudanteNotaCondi();
        notaCondi.setEstudante(estudante);
        notaCondi.setAmbiente(dto.ambiente());
        notaCondi.setAprendizado(dto.aprendizado());
        notaCondi.setBeneficios(dto.beneficios());
        notaCondi.setCultura(dto.cultura());
        notaCondi.setEfetivacao(dto.efetivacao());
        notaCondi.setEntrevista(dto.entrevista());
        notaCondi.setFeedback(dto.feedback());
        notaCondi.setInfraestrutura(dto.infraestrutura());
        notaCondi.setIntegracao(dto.integracao());
        notaCondi.setRemuneracao(dto.remuneracao());
        notaCondi.setRotina(dto.rotina());
        notaCondi.setLideranca(dto.lideranca());

        notaCondiRepository.save(notaCondi);
    }

    @Transactional
    public void atualizar(Long id, AtualizarEstudanteNotaCondiDTO dto) {
        EstudanteNotaCondi notaCondi = notaCondiRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notas condicionais não encontradas para o estudante com ID: " + id));

        if (dto.ambiente() != null) notaCondi.setAmbiente(dto.ambiente());
        if (dto.aprendizado() != null) notaCondi.setAprendizado(dto.aprendizado());
        if (dto.beneficios() != null) notaCondi.setBeneficios(dto.beneficios());
        if (dto.cultura() != null) notaCondi.setCultura(dto.cultura());
        if (dto.efetivacao() != null) notaCondi.setEfetivacao(dto.efetivacao());
        if (dto.entrevista() != null) notaCondi.setEntrevista(dto.entrevista());
        if (dto.feedback() != null) notaCondi.setFeedback(dto.feedback());
        if (dto.infraestrutura() != null) notaCondi.setInfraestrutura(dto.infraestrutura());
        if (dto.integracao() != null) notaCondi.setIntegracao(dto.integracao());
        if (dto.remuneracao() != null) notaCondi.setRemuneracao(dto.remuneracao());
        if (dto.rotina() != null) notaCondi.setRotina(dto.rotina());
        if (dto.lideranca() != null) notaCondi.setLideranca(dto.lideranca());

        notaCondiRepository.save(notaCondi);
    }

    private EstudanteNotaCondiResponseDTO toResponseDTO(EstudanteNotaCondi notaCondi) {
        return new EstudanteNotaCondiResponseDTO(
                notaCondi.getId(),
                notaCondi.getAmbiente(),
                notaCondi.getAprendizado(),
                notaCondi.getBeneficios(),
                notaCondi.getCultura(),
                notaCondi.getEfetivacao(),
                notaCondi.getEntrevista(),
                notaCondi.getFeedback(),
                notaCondi.getInfraestrutura(),
                notaCondi.getIntegracao(),
                notaCondi.getRemuneracao(),
                notaCondi.getRotina(),
                notaCondi.getLideranca(),
                notaCondi.getCreatedAt(),
                notaCondi.getUpdatedAt()
        );
    }
}
