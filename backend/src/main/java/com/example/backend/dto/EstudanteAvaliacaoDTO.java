package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public record EstudanteAvaliacaoDTO(
        @Schema(description = "ID da empresa avaliada", example = "1")
        @NotNull
        Long idEmpresa,

        @Schema(description = "ID do setor", example = "1")
        @NotNull
        Long idSetor,

        @Schema(description = "Estado de atuação", example = "SP")
        @NotBlank
        String estadoAtuacao,

        @Schema(description = "Modelo de trabalho", example = "Presencial")
        @NotBlank
        String modeloTrabalho,

        @Schema(description = "Data de início", example = "2023-01-01")
        @NotNull
        LocalDate dataInicio,

        @Schema(description = "Data de término", example = "2024-01-01")
        LocalDate dataFim,

        @Schema(description = "Título do cargo", example = "Estagiário de Backend")
        @NotBlank
        String tituloCargo,

        @Schema(description = "Texto da avaliação", example = "Ótima empresa para...")
        @NotBlank
        String textoAvaliacao,

        @Schema(description = "Salário mínimo", example = "1500.00")
        @NotNull
        @DecimalMin("0")
        BigDecimal salarioMin,

        @Schema(description = "Salário máximo", example = "2000.00")
        @NotNull
        @DecimalMin("0")
        BigDecimal salarioMax,

        @Schema(description = "Avaliação anônima", example = "false")
        @NotNull
        Boolean anonima,

        @Schema(description = "Nota ambiente (1-5)", example = "4")
        @NotNull @Min(1) @Max(5)
        Integer ambiente,

        @Schema(description = "Nota aprendizado (1-5)", example = "5")
        @NotNull @Min(1) @Max(5)
        Integer aprendizado,

        @Schema(description = "Nota benefícios (1-5)", example = "3")
        @NotNull @Min(1) @Max(5)
        Integer beneficios,

        @Schema(description = "Nota cultura (1-5)", example = "4")
        @NotNull @Min(1) @Max(5)
        Integer cultura,

        @Schema(description = "Nota efetivação (1-5)", example = "4")
        @NotNull @Min(1) @Max(5)
        Integer efetivacao,

        @Schema(description = "Nota entrevista (1-5)", example = "5")
        @NotNull @Min(1) @Max(5)
        Integer entrevista,

        @Schema(description = "Nota feedback (1-5)", example = "4")
        @NotNull @Min(1) @Max(5)
        Integer feedback,

        @Schema(description = "Nota infraestrutura (1-5)", example = "4")
        @NotNull @Min(1) @Max(5)
        Integer infraestrutura,

        @Schema(description = "Nota integração (1-5)", example = "3")
        @NotNull @Min(1) @Max(5)
        Integer integracao,

        @Schema(description = "Nota remuneração (1-5)", example = "3")
        @NotNull @Min(1) @Max(5)
        Integer remuneracao,

        @Schema(description = "Nota rotina (1-5)", example = "4")
        @NotNull @Min(1) @Max(5)
        Integer rotina,

        @Schema(description = "Nota liderança (1-5)", example = "4")
        @NotNull @Min(1) @Max(5)
        Integer lideranca
) {}