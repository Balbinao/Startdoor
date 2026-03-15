package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Dados para cadastro de um novo estudante")
public record CadastroEstudanteDTO(
    @Schema(
        description = "Nome completo do estudante", 
        example = "João da Silva"
    )
    @NotBlank
    String nome,

    @Schema(
        description = "CPF do estudante (11 dígitos, apenas números)", 
        example = "12345678901",
        minLength = 11,
        maxLength = 11
    )
    @NotBlank
    @Size(min = 11, max = 11)
    String cpf,

    @Schema(
        description = "Nome de usuário para login (único no sistema)", 
        example = "joaosilva"
    )
    @NotBlank
    String user,

    @Schema(
        description = "Email do estudante (único no sistema)", 
        example = "joao@email.com"
    )
    @NotBlank
    @Email
    String email,

    @Schema(
        description = "Senha de acesso", 
        example = "123456",
        minLength = 6
    )
    @NotBlank
    String senha
) {
}