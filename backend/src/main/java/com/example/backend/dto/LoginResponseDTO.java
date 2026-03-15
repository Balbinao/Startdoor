package com.example.backend.dto;

import com.example.backend.model.enums.UserRole;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Resposta do login contendo token JWT, ID do usuário e tipo de usuário")
public record LoginResponseDTO(
    
    @Schema(
        description = "Token JWT para autenticação nas requisições protegidas",
        example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        required = true
    )
    String token,
    
    @Schema(
        description = "ID do usuário no banco de dados (estudante ou empresa)",
        example = "1",
        required = true
    )
    Long id,
    
    @Schema(
        description = "Tipo de usuário autenticado",
        example = "ESTUDANTE",
        allowableValues = {"ADMIN", "ESTUDANTE", "EMPRESA"},
        required = true
    )
    UserRole tipo 
) {}