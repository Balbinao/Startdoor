package com.example.backend.service;

import com.example.backend.dto.AvaliacaoRecenteDTO;
import com.example.backend.model.EstudanteAvaliacao;
import com.example.backend.repository.EstudanteAvaliacaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class AvaliacaoRecenteService {

    private final EstudanteAvaliacaoRepository estudanteAvaliacaoRepositoryrepository;

    public AvaliacaoRecenteService(EstudanteAvaliacaoRepository repository) {
        this.estudanteAvaliacaoRepositoryrepository = repository;
    }

    @Transactional(readOnly = true)
    public List<AvaliacaoRecenteDTO> buscarRecentes() {
        return estudanteAvaliacaoRepositoryrepository.findTop4ByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    private AvaliacaoRecenteDTO mapToDTO(EstudanteAvaliacao a) {
        String nome = a.getAnonima() ? "Anônimo" : a.getEstudante().getNome();

        String urlCompleta = (!a.getAnonima() && a.getEstudante().getFotoUrl() != null)
                ? "http://localhost:8080/fotos/" + a.getEstudante().getFotoUrl()
                : null;

        double soma = a.getAmbiente() + a.getAprendizado() + a.getBeneficios() +
                a.getCultura() + a.getEfetivacao() + a.getEntrevista() +
                a.getFeedback() + a.getInfraestrutura() + a.getIntegracao() +
                a.getRemuneracao() + a.getRotina() + a.getLideranca();

        BigDecimal media = BigDecimal.valueOf(soma / 12.0).setScale(1, RoundingMode.HALF_UP);

        int totalComentarios = 0;
        if (a.getComentariosEstudante() != null) totalComentarios += a.getComentariosEstudante().size();
        if (a.getComentariosEmpresa() != null) totalComentarios += a.getComentariosEmpresa().size();

        return new AvaliacaoRecenteDTO(
                nome,
                urlCompleta,
                a.getTituloCargo(),
                a.getEmpresa().getNomeFantasia(),
                media,
                a.getTextoAvaliacao(),
                a.getCreatedAt(),
                totalComentarios
        );
    }
}