package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;

@Schema(description = "Dados para atualização de uma empresa (todos os campos são opcionais)")
public record AtualizarEmpresaDTO(
    @Schema(
        description = "Novo nome fantasia da empresa", 
        example = "Tech Solutions Atualizada"
    )
    String nome_fantasia,

    @Schema(
        description = "Novo email corporativo", 
        example = "novo@techsolutions.com"
    )
    @Email
    String email
) {
}