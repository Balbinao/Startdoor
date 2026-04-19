package com.example.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record EmpresaResponseDTO(
        Long id,
        String fotoUrl,
        String nomeFantasia,
        String cnpj,
        String email,
        String biografia,
        String paisOrigem,
        String receitaAnual,
        LocalDate dataFundacao,
        String tamanhoEmpresa,
        String estadoSede,
        BigDecimal mediaSalarial,
        String areaAtuacao,
        String linkSite,
        String linkLinkedin,
        String linkGupy,
        LocalDateTime createdAt
) {
}
