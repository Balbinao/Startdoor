package com.example.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AvaliacaoRecenteDTO(
        String nomeEstudante,
        String fotoEstudante,
        String tituloCargo,
        String nomeEmpresa,
        BigDecimal mediaAvaliacao,
        String textoAvaliacao,
        LocalDateTime dataPublicacao,
        int quantidadeComentarios
) {
}
