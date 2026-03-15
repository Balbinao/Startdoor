package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Dados para cadastro de uma nova empresa")
public record CadastroEmpresaDTO(
    @Schema(
        description = "Nome fantasia da empresa", 
        example = "Tech Solutions Ltda"
    )
    @NotBlank
    String nome_fantasia,

    @Schema(
        description = "CNPJ da empresa (14 dígitos, apenas números)", 
        example = "12345678000199",
        minLength = 14,
        maxLength = 14
    )
    @NotBlank
    @Size(min = 14, max = 14)
    String cnpj,

    @Schema(
        description = "Email corporativo da empresa (único no sistema)", 
        example = "contato@techsolutions.com"
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