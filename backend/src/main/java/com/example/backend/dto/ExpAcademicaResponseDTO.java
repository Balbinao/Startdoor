package com.example.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ExpAcademicaResponseDTO(
        Long id,
        String tituloEnsino,
        String nomeEscola,
        String estadoAtuacao,
        String modeloEnsino,
        LocalDate dataInicio,
        LocalDate dataFim,
        String descricao,
        LocalDateTime createdAt,
        Long estudanteId,
        String nomeEstudante
) {
}
