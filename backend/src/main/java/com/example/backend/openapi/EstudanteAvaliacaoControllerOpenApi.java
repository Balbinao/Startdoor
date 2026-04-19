package com.example.backend.openapi;

import com.example.backend.dto.EstudanteAvaliacaoDTO;
import com.example.backend.dto.EstudanteAvaliacaoResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "⭐ Avaliações", description = "Endpoints para gerenciamento de avaliações de estudantes sobre empresas")
public interface EstudanteAvaliacaoControllerOpenApi {

    @Operation(summary = "Criar avaliação", description = "Cria uma nova avaliação de um estudante sobre uma empresa")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Avaliação criada com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content),
        @ApiResponse(responseCode = "401", description = "Não autenticado", content = @Content),
        @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content)
    })
    @PostMapping("/estudante/{estudanteId}")
    ResponseEntity<?> criar(
            @Parameter(description = "ID do estudante", example = "1") @PathVariable Long estudanteId,
            @Schema(implementation = EstudanteAvaliacaoDTO.class) @RequestBody EstudanteAvaliacaoDTO data);

    @Operation(summary = "Listar avaliações por empresa", description = "Retorna todas as avaliações de uma empresa")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Avaliações retornadas com sucesso")
    })
    @GetMapping("/empresa/{empresaId}")
    ResponseEntity<List<EstudanteAvaliacaoResponseDTO>> listarPorEmpresa(
            @Parameter(description = "ID da empresa", example = "1") @PathVariable Long empresaId);

    @Operation(summary = "Buscar avaliação por ID", description = "Retorna uma avaliação específica")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Avaliação retornada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Avaliação não encontrada", content = @Content)
    })
    @GetMapping("/{id}")
    ResponseEntity<EstudanteAvaliacaoResponseDTO> buscar(
            @Parameter(description = "ID da avaliação", example = "1") @PathVariable Long id);

    @Operation(summary = "Listar avaliações por estudante", description = "Retorna todas as avaliações de um estudante")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Avaliações retornadas com sucesso")
    })
    @GetMapping("/estudante/{estudanteId}")
    ResponseEntity<List<EstudanteAvaliacaoResponseDTO>> listarPorEstudante(
            @Parameter(description = "ID do estudante", example = "1") @PathVariable Long estudanteId);

    @Operation(summary = "Atualizar avaliação", description = "Atualiza uma avaliação existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Avaliação atualizada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Avaliação não encontrada", content = @Content)
    })
    @PutMapping("/{id}")
    ResponseEntity<?> atualizar(
            @Parameter(description = "ID da avaliação", example = "1") @PathVariable Long id,
            @Schema(implementation = EstudanteAvaliacaoDTO.class) @RequestBody EstudanteAvaliacaoDTO data);

    @Operation(summary = "Deletar avaliação", description = "Remove uma avaliação")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Avaliação removida com sucesso"),
        @ApiResponse(responseCode = "404", description = "Avaliação não encontrada", content = @Content)
    })
    @DeleteMapping("/{id}")
    ResponseEntity<?> deletar(
            @Parameter(description = "ID da avaliação", example = "1") @PathVariable Long id);
}