package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

@Schema(description = "DTO de resposta para comentário de empresa em avaliação")
public record EmpresaAvaliacaoComentResponseDTO(
        @Schema(description = "ID do comentário", example = "1") Long id,
        @Schema(description = "ID da empresa", example = "1") Long empresaId,
        @Schema(description = "Nome fantasia da empresa", example = "Tech Brasil") String nomeEmpresa,
        @Schema(description = "URL da foto da empresa", example = "https://example.com/logo.png") String fotoUrlEmpresa,
        @Schema(description = "ID da avaliação", example = "1") Long avaliacaoId,
        @Schema(description = "Texto do comentário", example = "Obrigado pelo feedback!") String texto,
        @Schema(description = "Número de respostas", example = "0") Integer numRespostas,
        @Schema(description = "Data de criação") LocalDateTime createdAt,
        @Schema(description = "Data de atualização") LocalDateTime updatedAt
) {}