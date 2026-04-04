package com.example.backend.dto;

import com.example.backend.model.enums.ModeloTrabalho;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Schema(description = "Dados para cadastro de experiência acadêmica")
public record ExperienciaAcademicaDTO (
        @Schema(
                description = "Título do curso ou nível de ensino",
                example = "Bacharelado em Ciência da Computação"
        )
        @NotBlank
        String tituloEnsino,

        @Schema(
                description = "Nome da instituição de ensino",
                example = "Fatec"
        )
        @NotBlank
        String nomeEscola,

        @Schema(
                description = "Estado onde a escola está localizada",
                example = "SP"
        )
        @NotBlank
        String estadoAtuacao,

        @Schema(
                description = "Modelo de ensino",
                example = "Presencial"
        )
        @NotNull ModeloTrabalho modeloEnsino,

        @Schema(
                description = "Data de início dos estudos",
                example = "2022-02-01"
        )
        @NotNull
        LocalDate dataInicio,

        @Schema(
                description = "Data de término (presente se estiver cursando)",
                example = "2025-12-01"
        )
        LocalDate dataFim,

        @Schema(
                description = "Descrição sobre o curso ou atividades",
                example = "Foco em desenvolvimento de sistemas."
        )
        String descricao
){
}
