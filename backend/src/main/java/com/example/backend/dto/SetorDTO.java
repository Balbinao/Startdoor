package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados para criação de um novo setor")
public record SetorDTO(
    @Schema(
        description = "Nome do setor",
        example = "Tecnologia da Informação",
        maxLength = 40
    )
    String nome
) {}
