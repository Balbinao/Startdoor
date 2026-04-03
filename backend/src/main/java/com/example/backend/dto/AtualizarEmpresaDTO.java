package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;

import java.math.BigDecimal;
import java.time.LocalDate;

@Schema(description = "Dados para atualização de uma empresa (todos os campos são opcionais)")
public record AtualizarEmpresaDTO(
    @Schema(
        description = "Novo nome fantasia da empresa", 
        example = "Tech Solutions Atualizada"
    )
    String nomeFantasia,

    @Schema(
        description = "Novo email corporativo", 
        example = "novo@techsolutions.com"
    )
    @Email
    String email,

    @Schema(
            description = "Biografia ou descrição da empresa",
            example = "Líder em soluções de software."
    )
    String biografia,

    @Schema(
            description = "País de origem da sede",
            example = "Brasil"
    )
    String paisOrigem,

    @Schema(
            description = "Faixa de receita anual",
            example = "R$50 milhões"
    )
    String receitaAnual,

    @Schema(
            description = "Data de fundação",
            example = "2010-08-20"
    )
    LocalDate dataFundacao,

    @Schema(
            description = "Porte/Tamanho da empresa",
            example = "Pequena (11-50 funcionários)"
    )
    String tamanhoEmpresa,

    @Schema(
            description = "Estado da sede",
            example = "SP"
    )
    String estadoSede,

    @Schema(
            description = "Média salarial oferecida (estimada)",
            example = "5500.00"
    )
    BigDecimal mediaSalarial,

    @Schema(
            description = "Área principal de atuação",
            example = "Desenvolvimento de Software"
    )
    String areaAtuacao,

    @Schema(
            description = "Link para o site oficial",
            example = "https://techsolutions.com"
    )
    String linkSite,

    @Schema(
            description = "Link para o LinkedIn da empresa",
            example = "https://linkedin.com/company/tech"
    )
    String linkLinkedin,

    @Schema(
            description = "Link para página de vagas (Gupy, etc)",
            example = "https://tech.gupy.io"
    )
    String linkGupy
) {
}