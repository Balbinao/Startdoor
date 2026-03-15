package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Resposta do login contendo o token JWT")
public record LoginResponseDTO(
    @Schema(
        description = "Token JWT para autenticação", 
        example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        // required foi removido - por padrão, campos em records são obrigatórios
    )
    String token
) {
}