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

    private final EstudanteAvaliacaoRepository estudanteAvaliacaoRepository;

    public AvaliacaoRecenteService(EstudanteAvaliacaoRepository repository) {
        this.estudanteAvaliacaoRepository = repository;
    }

    public List<AvaliacaoRecenteDTO> buscarRecentes(Long usuarioLogadoId) {
        return estudanteAvaliacaoRepository.findTop4ByOrderByCreatedAtDesc()
                .stream()
                .map(a -> mapToDTO(a, usuarioLogadoId)) // Passamos o ID logado para o mapeador
                .toList();
    }

    private AvaliacaoRecenteDTO mapToDTO(EstudanteAvaliacao a, Long usuarioLogadoId) {
        boolean isDono = usuarioLogadoId != null && usuarioLogadoId.equals(a.getEstudante().getId());
        Long idEstudante = (a.getAnonima() && !isDono) ? null : a.getEstudante().getId();

        String nome = a.getAnonima() ? "Anônimo" : a.getEstudante().getNome();
        String urlCompleta = (!a.getAnonima() && a.getEstudante().getFotoUrl() != null)
                ? "http://localhost:8080/fotos/" + a.getEstudante().getFotoUrl()
                : null;

        double soma = a.getAmbiente() + a.getAprendizado() + a.getBeneficios() +
                a.getCultura() + a.getEfetivacao() + a.getEntrevista() +
                a.getFeedback() + a.getInfraestrutura() + a.getIntegracao() +
                a.getRemuneracao() + a.getRotina() + a.getLideranca();

        BigDecimal mediaCalculada = BigDecimal.valueOf(soma / 12.0).setScale(1, RoundingMode.HALF_UP);

        int totalComentarios = 0;
        if (a.getComentariosEstudante() != null) totalComentarios += a.getComentariosEstudante().size();
        if (a.getComentariosEmpresa() != null) totalComentarios += a.getComentariosEmpresa().size();

        return new AvaliacaoRecenteDTO(
                a.getId(),
                a.getCreatedAt(),
                idEstudante,
                nome,
                urlCompleta,
                a.getEmpresa().getId(),
                a.getEmpresa().getNomeFantasia(),
                a.getTituloCargo(),
                a.getModeloTrabalho(),
                a.getEstadoAtuacao(),
                a.getTextoAvaliacao(),
                a.getSalarioMin(),
                a.getSalarioMax(),
                a.getAnonima(),
                a.getAmbiente(),
                a.getAprendizado(),
                a.getBeneficios(),
                a.getCultura(),
                a.getEfetivacao(),
                a.getEntrevista(),
                a.getFeedback(),
                a.getInfraestrutura(),
                a.getIntegracao(),
                a.getRemuneracao(),
                a.getRotina(),
                a.getLideranca(),
                mediaCalculada,
                totalComentarios
        );
    }
}