package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;

public record CadastroEstudanteDTO(
        @NotBlank
        String name,

        @NotBlank
        @Size(min = 11, max = 11)
        String cpf,

        @NotBlank
        String user,

        @NotBlank
        @Email
        String email,

        @NotBlank
        String senha



) {
}
