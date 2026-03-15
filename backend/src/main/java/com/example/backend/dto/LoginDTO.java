package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Dados para realizar login na plataforma")
public record LoginDTO(
    @Schema(
        description = "Email do usuário (estudante ou empresa)", 
        example = "joao@email.com"
    )
    @NotBlank(message = "O email é obrigatório")
    @Email(message = "Formato de email inválido")
    String email,

    @Schema(
        description = "Senha do usuário", 
        example = "123456",
        minLength = 6
    )
    @NotBlank(message = "A senha é obrigatória")
    String senha
) {
}