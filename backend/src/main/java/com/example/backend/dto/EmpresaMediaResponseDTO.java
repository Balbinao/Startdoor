package com.example.backend.dto;

import java.math.BigDecimal;

public record EmpresaMediaResponseDTO (
        BigDecimal mediaGeral,
        BigDecimal mediaAmbiente,
        BigDecimal mediaAprendizado,
        BigDecimal mediaBeneficios,
        BigDecimal mediaCultura,
        BigDecimal mediaEfetivacao,
        BigDecimal mediaEntrevista,
        BigDecimal mediaFeedback,
        BigDecimal mediaInfraestrutura,
        BigDecimal mediaIntegracao,
        BigDecimal mediaRemuneracao,
        BigDecimal mediaRotina,
        BigDecimal mediaLideranca
){
}
