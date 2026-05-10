package com.example.backend.dto;

import java.math.BigDecimal;

public record RecomendacaoResponseDTO(
        Long id,
        String nomeFantasia,
        String fotoUrl,
        String biografia,
        String estadoSede,
        String paisOrigem,
        BigDecimal mediaGeral,
        Integer percentualMatch
) {
}
