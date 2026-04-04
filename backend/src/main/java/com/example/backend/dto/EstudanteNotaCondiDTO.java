package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Schema(description = "Dados para criar as notas condicionais de um estudante")
public record EstudanteNotaCondiDTO(
    @Schema(description = "ID do estudante", example = "1")
    Long idEstudante,

    @Schema(description = "Nota mínima desejada para ambiente", example = "3", minimum = "1", maximum = "5")
    @Min(1) @Max(5)
    Integer ambiente,

    @Schema(description = "Nota mínima desejada para aprendizado", example = "4", minimum = "1", maximum = "5")
    @Min(1) @Max(5)
    Integer aprendizado,

    @Schema(description = "Nota mínima desejada para benefícios", example = "3", minimum = "1", maximum = "5")
    @Min(1) @Max(5)
    Integer beneficios,

    @Schema(description = "Nota mínima desejada para cultura", example = "4", minimum = "1", maximum = "5")
    @Min(1) @Max(5)
    Integer cultura,

    @Schema(description = "Nota mínima desejada para efetivação", example = "3", minimum = "1", maximum = "5")
    @Min(1) @Max(5)
    Integer efetivacao,

    @Schema(description = "Nota mínima desejada para entrevista", example = "3", minimum = "1", maximum = "5")
    @Min(1) @Max(5)
    Integer entrevista,

    @Schema(description = "Nota mínima desejada para feedback", example = "4", minimum = "1", maximum = "5")
    @Min(1) @Max(5)
    Integer feedback,

    @Schema(description = "Nota mínima desejada para infraestrutura", example = "3", minimum = "1", maximum = "5")
    @Min(1) @Max(5)
    Integer infraestrutura,

    @Schema(description = "Nota mínima desejada para integração", example = "3", minimum = "1", maximum = "5")
    @Min(1) @Max(5)
    Integer integracao,

    @Schema(description = "Nota mínima desejada para remuneração", example = "4", minimum = "1", maximum = "5")
    @Min(1) @Max(5)
    Integer remuneracao,

    @Schema(description = "Nota mínima desejada para rotina", example = "3", minimum = "1", maximum = "5")
    @Min(1) @Max(5)
    Integer rotina,

    @Schema(description = "Nota mínima desejada para liderança", example = "4", minimum = "1", maximum = "5")
    @Min(1) @Max(5)
    Integer lideranca
) {}
