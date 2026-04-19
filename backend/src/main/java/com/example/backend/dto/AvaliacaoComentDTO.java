package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AvaliacaoComentDTO(
        @Schema(description = "Texto do comentário", example = "Ótima avaliação!")
        @NotBlank
        String texto,

        @Schema(description = "Comentário anônimo", example = "false")
        @NotNull
        Boolean anonima
) {}