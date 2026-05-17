package com.example.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record EmpresaTopDTO(
        Long id,
        String nomeFantasia,
        String fotoUrl,
        String estadoSede,
        String paisOrigem,
        LocalDate dataFundacao,
        String biografia,
        BigDecimal mediaGeral
) {
}
