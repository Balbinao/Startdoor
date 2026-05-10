package com.example.backend.dto;

import jakarta.validation.constraints.NotNull;

public record RecomendacaoIARequestDTO(
        @NotNull Long estudanteId,
        @NotNull Long empresaId
) {
}
