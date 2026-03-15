package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;

@Schema(description = "Dados para atualização de um estudante (todos os campos são opcionais)")
public record AtualizarEstudanteDTO(
    @Schema(
        description = "Novo nome do estudante", 
        example = "João Silva Atualizado"
    )
    String nome,

    @Schema(
        description = "Novo nome de usuário", 
        example = "joaosilva_novo"
    )
    String user,

    @Schema(
        description = "Novo email", 
        example = "joao.novo@email.com"
    )
    @Email
    String email
) {
}