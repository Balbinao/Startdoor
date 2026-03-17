package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Dados para alteração de senha do usuário")
public record AlterarSenhaDTO(
//        @Schema(
//                description = "Senha atual do usuário para validação de segurança",
//                example = "SenhaAtusl123"
//        )
//        @NotBlank(message = "A senha atual é obrigatória para prosseguir")
//        String senhaAtual,

        @Schema(
                description = "Nova senha de acesso (mínimo de 6 caracteres)",
                example = "NovaSenha#2026",
                minLength = 6
        )
        @NotBlank(message = "A nova senha não pode estar em branco")
        @Size(min = 6, message = "A nova senha deve ter no mínimo 6 caracteres")
        String novaSenha
) {
}