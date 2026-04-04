package com.example.backend.openapi;

import com.example.backend.dto.ExperienciaProfissionalDTO;
import com.example.backend.model.ExperienciaProfissional;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Tag(name = "💼 Exp. Profissional", description = "Gerenciamento da carreira e experiências profissionais do estudante")
@SecurityRequirement(name = "Bearer Authentication")
public interface ExperienciaProfissionalControllerOpenApi {
    @Operation(summary = "Adicionar experiência profissional")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Experiência profissional adicionada com sucesso",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":200,\"message\":\"Experiência profissional adicionada com sucesso!\"}"))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Erro de lógica (Conflito de Empresa)",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":400,\"message\":\"Informe apenas a empresa do sistema OU o nome de uma empresa externa.\"}"))
            ),
            @ApiResponse(responseCode = "404", description = "Estudante ou Empresa não encontrados")
    })
    ResponseEntity<?> adicionar(Long estudanteId, ExperienciaProfissionalDTO data);

    @Operation(summary = "Listar experiências profissionais do estudante")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista retornada com sucesso",
                    content = @Content(schema = @Schema(implementation = ExperienciaProfissional.class))
            )
    })
    ResponseEntity<List<ExperienciaProfissional>> listarPorEstudante(Long estudanteId);

    @Operation(summary = "Buscar experiência profissional por ID")
    ResponseEntity<ExperienciaProfissional> buscar(Long id);

    @Operation(summary = "Atualizar experiência profissional")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Experiência atualizada com sucesso",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":200,\"message\":\"Experiência profissional atualizada com sucesso!\"}"))
            ),
            @ApiResponse(responseCode = "403", description = "Acesso negado"),
            @ApiResponse(responseCode = "404", description = "Experiência não encontrada")
    })
    ResponseEntity<?> atualizar(Long id, ExperienciaProfissionalDTO data);

    @Operation(summary = "Remover experiência profissional")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Deletado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Experiência não encontrada")
    })
    ResponseEntity<?> remover(Long id);
}
