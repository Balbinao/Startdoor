package com.example.backend.dto;

import java.math.BigDecimal;

public record EmpresaResumoDTO (
        Long id,
        String uuid,
        String nomeFantasia,
        String fotoUrl,
        String areaAtuacao,
        String tamanhoEmpresa,
        BigDecimal mediaGeral
) {
}
