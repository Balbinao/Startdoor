package com.example.backend.dto;

import java.math.BigDecimal;

public record EmpresaResumoDTO (
        Long id,
        String uuid,
        String nomeFantasia,
        String paisOrigem,
        String estadoSede,
        String fotoUrl,
        String biografia,
        String areaAtuacao,
        String tamanhoEmpresa,
        BigDecimal mediaGeral
) {
}
