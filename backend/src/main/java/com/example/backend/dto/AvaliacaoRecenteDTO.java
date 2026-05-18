package com.example.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AvaliacaoRecenteDTO(
        Long idAvaliacao,
        LocalDateTime createdAt,
        Long idEstudante,
        String nomeEstudante,
        String fotoEstudante,
        Long idEmpresa,
        String nomeFantasiaEmpresa,
        String tituloCargo,
        String modeloTrabalho,
        String estadoAtuacao,
        String textoAvaliacao,
        BigDecimal salarioMin,
        BigDecimal salarioMax,
        boolean anonima,
        int ambiente,
        int aprendizado,
        int beneficios,
        int cultura,
        int efetivacao,
        int entrevista,
        int feedback,
        int infraestrutura,
        int integracao,
        int remuneracao,
        int rotina,
        int lideranca,
        BigDecimal media,
        int totalComentarios
) {}