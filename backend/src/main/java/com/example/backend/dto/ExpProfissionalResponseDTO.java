package com.example.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ExpProfissionalResponseDTO(
        Long id,
        String tituloCargo,
        String estadoAtuacao,
        String modeloTrabalho,
        LocalDate dataInicio,
        LocalDate dataFim,
        String descricao,
        LocalDateTime createdAt,
        Long estudanteId,
        String nomeEstudante,
        Long empresaId,
        String nomeEmpresaFantasia
) {
}
