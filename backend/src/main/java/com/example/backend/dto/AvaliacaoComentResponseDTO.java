package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

@Schema(description = "DTO de resposta para comentário de estudante em avaliação")
public record AvaliacaoComentResponseDTO(
        @Schema(description = "ID do comentário", example = "1") Long id,
        @Schema(description = "ID do estudante", example = "1") Long estudanteId,
        @Schema(description = "Nome do estudante", example = "João Silva") String nomeEstudante,
        @Schema(description = "URL da foto do estudante", example = "https://example.com/foto.jpg") String fotoUrlEstudante,
        @Schema(description = "Username do estudante", example = "joaosilva") String userEstudante,
        @Schema(description = "ID da avaliação", example = "1") Long avaliacaoId,
        @Schema(description = "Texto do comentário", example = "Ótima empresa!") String texto,
        @Schema(description = "Comentário anônimo", example = "false") Boolean anonima,
        @Schema(description = "Data de criação") LocalDateTime createdAt,
        @Schema(description = "Data de atualização") LocalDateTime updatedAt
) {}