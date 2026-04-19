package com.example.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record EstudanteResponseDTO (
        Long id,
        String nome,
        String cpf,
        String user,
        String email,
        String fotoUrl,
        String biografia,
        String paisOrigem,
        LocalDate dataNascimento,
        String modeloTrabalho,
        String estadoAtuacao,
        String setorInteresse,
        String habilidadesPrincipais,
        String linkSite,
        String linkLinkedin,
        LocalDateTime createdAt
){
}
