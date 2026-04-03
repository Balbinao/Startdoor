package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados para atualização de um setor existente")
public record AtualizarSetorDTO(
    @Schema(
        description = "Nome do setor",
        example = "Tecnologia da Informação",
        maxLength = 40
    )
    String nome
) {}
