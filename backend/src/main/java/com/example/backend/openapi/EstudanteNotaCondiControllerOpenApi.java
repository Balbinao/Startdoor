package com.example.backend.openapi;

import com.example.backend.dto.AtualizarEstudanteNotaCondiDTO;
import com.example.backend.dto.EstudanteNotaCondiDTO;
import com.example.backend.dto.EstudanteNotaCondiResponseDTO;
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

@Tag(name = "📋 Notas Condicionais", description = "Operações de CRUD para notas condicionais de estudantes")
@SecurityRequirement(name = "Bearer Authentication")
public interface EstudanteNotaCondiControllerOpenApi {

    @Operation(summary = "Listar todas as notas condicionais")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista retornada com sucesso",
                    content = @Content(schema = @Schema(implementation = EstudanteNotaCondiResponseDTO.class))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT ausente ou inválido",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas ADMIN",
                    content = @Content
            )
    })
    ResponseEntity<List<EstudanteNotaCondiResponseDTO>> listar();

    @Operation(summary = "Buscar notas condicionais por ID do estudante")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Notas condicionais encontradas com sucesso",
                    content = @Content(schema = @Schema(implementation = EstudanteNotaCondiResponseDTO.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Notas condicionais não encontradas",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T12:00:00\",\"status\":404,\"message\":\"Notas condicionais não encontradas para o estudante com ID: 1\"}"))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT ausente ou inválido",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas próprio estudante ou ADMIN",
                    content = @Content
            )
    })
    ResponseEntity<EstudanteNotaCondiResponseDTO> buscar(Long id);

    @Operation(summary = "Cadastrar notas condicionais para um estudante")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Notas condicionais cadastradas com sucesso",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T12:00:00\",\"status\":200,\"message\":\"Notas condicionais cadastradas com sucesso!\"}"))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Notas condicionais já existem ou dados inválidos",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T12:00:00\",\"status\":400,\"message\":\"Notas condicionais já existem para este estudante\"}"))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Estudante não encontrado",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T12:00:00\",\"status\":404,\"message\":\"Estudante não encontrado com o ID: 1\"}"))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT ausente ou inválido",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas próprio estudante ou ADMIN",
                    content = @Content
            )
    })
    ResponseEntity<?> cadastrar(EstudanteNotaCondiDTO data);

    @Operation(summary = "Atualizar notas condicionais de um estudante")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Notas condicionais atualizadas com sucesso",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T12:00:00\",\"status\":200,\"message\":\"Notas condicionais atualizadas com sucesso!\"}"))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Notas condicionais não encontradas",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T12:00:00\",\"status\":404,\"message\":\"Notas condicionais não encontradas para o estudante com ID: 1\"}"))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT ausente ou inválido",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas próprio estudante ou ADMIN",
                    content = @Content
            )
    })
    ResponseEntity<?> atualizar(Long id, AtualizarEstudanteNotaCondiDTO data);
}
