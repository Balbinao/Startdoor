package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record AdicionarSetorEmpresaDTO(
    @Schema(description = "ID do setor a ser associado", example = "1")
    Long setorId
) {}