package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Resposta do login contendo token JWT, ID do usuário e tipo de usuário")
public record LoginResponseDTO(
    
    @Schema(
        description = "Token JWT para autenticação nas requisições protegidas",
        example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
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
        example = "estudante",
        allowableValues = {"estudante", "empresa"},
        required = true
    )
    String tipo
) {}