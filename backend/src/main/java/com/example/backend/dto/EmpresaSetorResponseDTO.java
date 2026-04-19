package com.example.backend.dto;

import java.time.LocalDateTime;

public record EmpresaSetorResponseDTO(
        Long empresaId,
        Long setorId,
        String nomeSetor,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}