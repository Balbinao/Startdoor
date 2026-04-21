package com.example.backend.dto;

import java.math.BigDecimal;

public record SalarioResumoDTO(
        BigDecimal minimo,
        BigDecimal maximo,
        BigDecimal media
) {
}
