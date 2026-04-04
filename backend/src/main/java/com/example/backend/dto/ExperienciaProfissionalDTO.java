package com.example.backend.dto;

import com.example.backend.model.enums.ModeloTrabalho;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ExperienciaProfissionalDTO (
        @Schema(
                description = "Título do cargo ocupado",
                example = "Estagiário de Backend"
        )
        @NotBlank
        String tituloCargo,

        @Schema(
                description = "ID da empresa cadastrada no sistema (opcional)",
                example = "1"
        )
        Long idEmpresa,

        @Schema(
                description = "Nome da empresa externa (caso não esteja no sistema)",
                example = "Oficina do Zé"
        )
        String nomeEmpresa,

        @Schema(
                description = "Estado da atuação profissional",
                example = "SP"
        )
        @NotBlank String estadoAtuacao,

        @Schema(
                description = "Modelo de trabalho",
                example = "Híbrido"
        )
        @NotNull ModeloTrabalho modeloTrabalho,

        @Schema(
                description = "Data de início",
                example = "2023-01-10"
        )
        @NotNull LocalDate dataInicio,

        @Schema(
                description = "Data de término (nulo se for o emprego atual)",
                example = "2024-01-10"
        )
        LocalDate dataFim,

        @Schema(
                description = "Descrição das responsabilidades",
                example = "Desenvolvimento de APIs com Java."
        )
        String descricao
){
}
