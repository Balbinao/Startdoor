package com.example.backend.dto;

import java.math.BigDecimal;

public record CompetenciaPontuacaoDTO (
        String competencia,
        int percentual,
        BigDecimal notaEmpresa,
        Integer notaEstudante
){
}
