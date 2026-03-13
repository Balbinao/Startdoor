package com.example.backend.dto;

import jakarta.validation.constraints.Email;

public record AtualizarEstudanteDTO (
      String nome,
      String user,
      @Email
      String email
) {
}
