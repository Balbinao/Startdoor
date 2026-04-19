package com.example.backend.openapi;

import com.example.backend.dto.AvaliacaoComentDTO;
import com.example.backend.dto.AvaliacaoComentResponseDTO;
import com.example.backend.dto.EmpresaAvaliacaoComentResponseDTO;
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

@Tag(name = "💬 Comentários de Avaliações", description = "Endpoints para gerenciamento de comentários em avaliações de estudantes")
public interface AvaliacaoComentControllerOpenApi {

    @Operation(summary = "Listar comentários de estudantes", description = "Retorna todos os comentários de estudantes em uma avaliação")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Comentários retornados com sucesso"),
        @ApiResponse(responseCode = "404", description = "Avaliação não encontrada", content = @Content)
    })
    @GetMapping("/{avaliacaoId}/comentarios-estudante")
    ResponseEntity<List<AvaliacaoComentResponseDTO>> listarComentarios(
            @Parameter(description = "ID da avaliação", example = "1") @PathVariable Long avaliacaoId);

    @Operation(summary = "Criar comentário de estudante", description = "Adiciona um comentário de estudante a uma avaliação")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Comentário criado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content),
        @ApiResponse(responseCode = "401", description = "Não autenticado", content = @Content),
        @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content),
        @ApiResponse(responseCode = "404", description = "Avaliação ou estudante não encontrado", content = @Content)
    })
    @PostMapping("/{avaliacaoId}/comentarios-estudante")
    ResponseEntity<?> criarComentario(
            @Parameter(description = "ID da avaliação", example = "1") @PathVariable Long avaliacaoId,
            @Schema(implementation = AvaliacaoComentDTO.class) @RequestBody AvaliacaoComentDTO dto);

    @Operation(summary = "Deletar comentário de estudante", description = "Remove um comentário de estudante (apenas o autor ou admin)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Comentário removido com sucesso"),
        @ApiResponse(responseCode = "401", description = "Não autenticado", content = @Content),
        @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content),
        @ApiResponse(responseCode = "404", description = "Comentário não encontrado", content = @Content)
    })
    @DeleteMapping("/comentarios-estudante/{id}")
    ResponseEntity<?> deletarComentario(
            @Parameter(description = "ID do comentário", example = "1") @PathVariable Long id);

    @Operation(summary = "Atualizar comentário de estudante", description = "Atualiza um comentário de estudante (apenas o autor ou admin)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Comentário atualizado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content),
        @ApiResponse(responseCode = "401", description = "Não autenticado", content = @Content),
        @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content),
        @ApiResponse(responseCode = "404", description = "Comentário não encontrado", content = @Content)
    })
    @PutMapping("/comentarios-estudante/{id}")
    ResponseEntity<?> atualizarComentario(
            @Parameter(description = "ID do comentário", example = "1") @PathVariable Long id,
            @Schema(implementation = AvaliacaoComentDTO.class) @RequestBody AvaliacaoComentDTO dto);

    @Operation(summary = "Listar comentários da empresa", description = "Retorna todos os comentários da empresa em uma avaliação")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Comentários retornados com sucesso"),
        @ApiResponse(responseCode = "404", description = "Avaliação não encontrada", content = @Content)
    })
    @GetMapping("/{avaliacaoId}/comentarios-empresa")
    ResponseEntity<List<EmpresaAvaliacaoComentResponseDTO>> listarComentariosEmpresa(
            @Parameter(description = "ID da avaliação", example = "1") @PathVariable Long avaliacaoId);

    @Operation(summary = "Criar comentário da empresa", description = "Adiciona um comentário da empresa a uma avaliação (apenas a empresa avaliada)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Comentário criado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content),
        @ApiResponse(responseCode = "401", description = "Não autenticado", content = @Content),
        @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content),
        @ApiResponse(responseCode = "404", description = "Avaliação ou empresa não encontrada", content = @Content)
    })
    @PostMapping("/{avaliacaoId}/comentarios-empresa")
    ResponseEntity<?> criarComentarioEmpresa(
            @Parameter(description = "ID da avaliação", example = "1") @PathVariable Long avaliacaoId,
            @Schema(implementation = AvaliacaoComentDTO.class) @RequestBody AvaliacaoComentDTO dto);

    @Operation(summary = "Deletar comentário da empresa", description = "Remove um comentário da empresa (apenas a empresa ou admin)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Comentário removido com sucesso"),
        @ApiResponse(responseCode = "401", description = "Não autenticado", content = @Content),
        @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content),
        @ApiResponse(responseCode = "404", description = "Comentário não encontrado", content = @Content)
    })
    @DeleteMapping("/comentarios-empresa/{id}")
    ResponseEntity<?> deletarComentarioEmpresa(
            @Parameter(description = "ID do comentário", example = "1") @PathVariable Long id);

    @Operation(summary = "Atualizar comentário da empresa", description = "Atualiza um comentário da empresa (apenas a empresa ou admin)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Comentário atualizado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content),
        @ApiResponse(responseCode = "401", description = "Não autenticado", content = @Content),
        @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content),
        @ApiResponse(responseCode = "404", description = "Comentário não encontrado", content = @Content)
    })
    @PutMapping("/comentarios-empresa/{id}")
    ResponseEntity<?> atualizarComentarioEmpresa(
            @Parameter(description = "ID do comentário", example = "1") @PathVariable Long id,
            @Schema(implementation = AvaliacaoComentDTO.class) @RequestBody AvaliacaoComentDTO dto);
}