package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Schema(description = "DTO de resposta para avaliação de estudante")
public record EstudanteAvaliacaoResponseDTO(
        @Schema(description = "ID da avaliação", example = "1") Long id,
        @Schema(description = "ID do estudante", example = "1") Long estudanteId,
        @Schema(description = "Nome do estudante", example = "João Silva") String nomeEstudante,
        @Schema(description = "URL da foto do estudante", example = "https://example.com/foto.jpg") String fotoUrlEstudante,
        @Schema(description = "Username do estudante", example = "joaosilva") String userEstudante,
        @Schema(description = "ID da empresa", example = "1") Long empresaId,
        @Schema(description = "Nome da empresa", example = "Tech Brasil") String nomeEmpresa,
        @Schema(description = "ID do setor", example = "1") Long setorId,
        @Schema(description = "Nome do setor", example = "Tecnologia") String nomeSetor,
        @Schema(description = "Estado de atuação", example = "SP") String estadoAtuacao,
        @Schema(description = "Modelo de trabalho", example = "Presencial") String modeloTrabalho,
        @Schema(description = "Data de início", example = "2023-01-01") LocalDate dataInicio,
        @Schema(description = "Data de término", example = "2024-01-01") LocalDate dataFim,
        @Schema(description = "Título do cargo", example = "Estagiário de Backend") String tituloCargo,
        @Schema(description = "Texto da avaliação", example = "Ótima empresa para trabalhar!") String textoAvaliacao,
        @Schema(description = "Salário mínimo", example = "1500.00") BigDecimal salarioMin,
        @Schema(description = "Salário máximo", example = "2000.00") BigDecimal salarioMax,
        @Schema(description = "Avaliação anônima", example = "false") Boolean anonima,
        @Schema(description = "Nota ambiente (1-5)", example = "4") Integer ambiente,
        @Schema(description = "Nota aprendizado (1-5)", example = "5") Integer aprendizado,
        @Schema(description = "Nota benefícios (1-5)", example = "3") Integer beneficios,
        @Schema(description = "Nota cultura (1-5)", example = "4") Integer cultura,
        @Schema(description = "Nota efetivação (1-5)", example = "4") Integer efetivacao,
        @Schema(description = "Nota entrevista (1-5)", example = "5") Integer entrevista,
        @Schema(description = "Nota feedback (1-5)", example = "4") Integer feedback,
        @Schema(description = "Nota infraestrutura (1-5)", example = "4") Integer infraestrutura,
        @Schema(description = "Nota integração (1-5)", example = "3") Integer integracao,
        @Schema(description = "Nota remuneração (1-5)", example = "3") Integer remuneracao,
        @Schema(description = "Nota rotina (1-5)", example = "4") Integer rotina,
        @Schema(description = "Nota liderança (1-5)", example = "4") Integer lideranca,
        @Schema(description = "Data de criação") LocalDateTime createdAt,
        @Schema(description = "Data de atualização") LocalDateTime updatedAt
) {}