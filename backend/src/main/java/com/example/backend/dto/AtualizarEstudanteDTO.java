package com.example.backend.dto;

import com.example.backend.model.enums.ModeloTrabalho;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;

import java.math.BigDecimal;
import java.time.LocalDate;

@Schema(description = "Dados para atualização de um estudante (todos os campos são opcionais)")
public record AtualizarEstudanteDTO(
    @Schema(
        description = "Novo nome do estudante", 
        example = "João Silva Atualizado"
    )
    String nome,

    @Schema(
        description = "Novo nome de usuário", 
        example = "joaosilva_novo"
    )
    String user,

    @Schema(
        description = "Novo email", 
        example = "joao.novo@email.com"
    )
    @Email
    String email,

    @Schema(
            description = "Texto de biografia/resumo profissional",
            example = "Estudante de Engenharia apaixonado por Backend."
    )
    String biografia,

    @Schema(
            description = "País de origem",
            example = "Brasil"
    )
    String paisOrigem,

    @Schema(
            description = "Média de notas geral",
            example = "8.5"
    )
    BigDecimal mediaNotaGeral,

    @Schema(
            description = "Data de nascimento",
            example = "2000-05-15"
    )
    String dataNascimento,

    @Schema(
            description = "Preferência de modelo de trabalho",
            example = "Remoto"
    )
    String modeloTrabalho,

    @Schema(
            description = "Estado onde reside/atua",
            example = "São Paulo"
    )
    String estadoAtuacao,

    @Schema(
            description = "Setor de interesse profissional",
            example = "Tecnologia"
    )
    String setorInteresse,

    @Schema(
            description = "Principais habilidades (separadas por vírgula ou texto)",
            example = "Java, Spring Boot, SQL"
    )
    String habilidadesPrincipais,

    @Schema(
            description = "Link para site pessoal ou portfólio",
            example = "https://meusite.com"
    )
    String linkSite,

    @Schema(
            description = "Link para o perfil do LinkedIn",
            example = "https://linkedin.com/in/gustavo"
    )
    String linkLinkedin
) {
}