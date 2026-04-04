package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

@Schema(description = "Resposta com as notas condicionais de um estudante")
public record EstudanteNotaCondiResponseDTO(
    @Schema(description = "ID do estudante", example = "1")
    Long idEstudante,

    @Schema(description = "Nota mínima desejada para ambiente", example = "3")
    Integer ambiente,

    @Schema(description = "Nota mínima desejada para aprendizado", example = "4")
    Integer aprendizado,

    @Schema(description = "Nota mínima desejada para benefícios", example = "3")
    Integer beneficios,

    @Schema(description = "Nota mínima desejada para cultura", example = "4")
    Integer cultura,

    @Schema(description = "Nota mínima desejada para efetivação", example = "3")
    Integer efetivacao,

    @Schema(description = "Nota mínima desejada para entrevista", example = "3")
    Integer entrevista,

    @Schema(description = "Nota mínima desejada para feedback", example = "4")
    Integer feedback,

    @Schema(description = "Nota mínima desejada para infraestrutura", example = "3")
    Integer infraestrutura,

    @Schema(description = "Nota mínima desejada para integração", example = "3")
    Integer integracao,

    @Schema(description = "Nota mínima desejada para remuneração", example = "4")
    Integer remuneracao,

    @Schema(description = "Nota mínima desejada para rotina", example = "3")
    Integer rotina,

    @Schema(description = "Nota mínima desejada para liderança", example = "4")
    Integer lideranca,

    @Schema(description = "Data de criação do registro")
    LocalDateTime createdAt,

    @Schema(description = "Data da última alteração")
    LocalDateTime updatedAt
) {}
