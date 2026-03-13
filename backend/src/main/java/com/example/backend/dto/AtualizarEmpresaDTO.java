package com.example.backend.dto;

import jakarta.validation.constraints.Email;

public record AtualizarEmpresa (
      String nome_fantasia,
      @Email
      String email
){
}
