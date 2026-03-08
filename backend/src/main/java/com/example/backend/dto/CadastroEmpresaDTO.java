package com.example.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CadastroEmpresaDTO(
      @NotBlank
      String nome_fantasia,

      @NotBlank
      @Size(min = 14, max = 14)
      String cnpj,

      @NotBlank
      @Email
      String email,

      @NotBlank
      String senha
){
}
