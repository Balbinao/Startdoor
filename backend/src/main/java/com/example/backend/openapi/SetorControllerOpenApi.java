package com.example.backend.openapi;

import com.example.backend.dto.AtualizarSetorDTO;
import com.example.backend.dto.SetorDTO;
import com.example.backend.model.Setor;
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

@Tag(name = "🏢 Setores", description = "Operações de CRUD para gerenciamento de setores")
@SecurityRequirement(name = "Bearer Authentication")
public interface SetorControllerOpenApi {

    @Operation(summary = "Listar todos os setores")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista retornada com sucesso",
                    content = @Content(schema = @Schema(implementation = Setor.class))
            )
    })
    ResponseEntity<List<Setor>> listar();

    @Operation(summary = "Buscar setor por ID")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Setor encontrado com sucesso",
                    content = @Content(schema = @Schema(implementation = Setor.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Setor não encontrado",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T12:00:00\",\"status\":404,\"message\":\"Setor não encontrado com o ID: 1\"}"))
            )
    })
    ResponseEntity<Setor> buscar(Long id);

    @Operation(summary = "Cadastrar novo setor")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Setor cadastrado com sucesso",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T12:00:00\",\"status\":200,\"message\":\"Setor cadastrado com sucesso!\"}"))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Setor já existe ou dados inválidos",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T12:00:00\",\"status\":400,\"message\":\"Setor com este nome já existe\"}"))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas ADMIN",
                    content = @Content
            )
    })
    ResponseEntity<?> cadastrar(SetorDTO data);

    @Operation(summary = "Atualizar setor existente")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Setor atualizado com sucesso",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T12:00:00\",\"status\":200,\"message\":\"Setor atualizado com sucesso!\"}"))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Setor não encontrado",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T12:00:00\",\"status\":404,\"message\":\"Setor não encontrado com o ID: 1\"}"))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Nome já existe ou dados inválidos",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T12:00:00\",\"status\":400,\"message\":\"Setor com este nome já existe\"}"))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas ADMIN",
                    content = @Content
            )
    })
    ResponseEntity<?> atualizar(Long id, AtualizarSetorDTO data);

    @Operation(summary = "Deletar setor")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "Setor deletado com sucesso",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Setor não encontrado",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T12:00:00\",\"status\":404,\"message\":\"Setor não encontrado com o ID: 1\"}"))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas ADMIN",
                    content = @Content
            )
    })
    ResponseEntity<?> deletar(Long id);
}
