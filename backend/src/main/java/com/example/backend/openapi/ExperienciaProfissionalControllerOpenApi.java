package com.example.backend.openapi;

import com.example.backend.dto.ExpProfissionalResponseDTO;
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
                    description = "Empresa não informada",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":400,\"message\":\"É necessário selecionar uma empresa cadastrada no sistema.\"}"))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Empresa selecionada não existe no sistema",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":404,\"message\":\"Empresa selecionada não existe no sistema.\"}"))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Token JWT ausente, inválido ou expirado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}"
                    ))
            )
    })
    ResponseEntity<?> adicionar(Long estudanteId, ExperienciaProfissionalDTO data);

    @Operation(summary = "Listar experiências profissionais do estudante")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista retornada com sucesso",
                    content = @Content(schema = @Schema(implementation = ExperienciaProfissional.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Token JWT ausente, inválido ou expirado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}"
                    ))
            )
    })
    ResponseEntity<List<ExpProfissionalResponseDTO>> listarPorEstudante(Long estudanteId);

    @Operation(summary = "Buscar experiência profissional por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Experiência encontrada",
                    content = @Content(schema = @Schema(implementation = ExpProfissionalResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Experiência não encontrada",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":404,\"message\":\"Experiência profissional não encontrada.\"}"))),
            @ApiResponse(responseCode = "403", description = "Token JWT ausente, inválido ou expirado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"))),
            @ApiResponse(responseCode = "500", description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}")))
    })
    ResponseEntity<ExpProfissionalResponseDTO> buscar(Long id);

    @Operation(summary = "Atualizar experiência profissional")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Experiência atualizada com sucesso",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":200,\"message\":\"Experiência profissional atualizada com sucesso!\"}"))
            ),
            @ApiResponse(responseCode = "403", description = "Token JWT ausente, inválido ou expirado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"))),
            @ApiResponse(responseCode = "403", description = "Acesso negado — sem permissão",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":403,\"message\":\"Acesso negado: você não tem permissão para acessar este recurso\"}"))),
            @ApiResponse(responseCode = "404", description = "Experiência não encontrada",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":404,\"message\":\"Experiência profissional não encontrada.\"}"))),
            @ApiResponse(responseCode = "500", description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}")))
    })
    ResponseEntity<?> atualizar(Long id, ExperienciaProfissionalDTO data);

    @Operation(summary = "Remover experiência profissional")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Deletado com sucesso"),
            @ApiResponse(responseCode = "403", description = "Token JWT ausente, inválido ou expirado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"))),
            @ApiResponse(responseCode = "403", description = "Acesso negado — sem permissão",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":403,\"message\":\"Acesso negado: você não tem permissão para acessar este recurso\"}"))),
            @ApiResponse(responseCode = "500", description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-04-03T11:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}")))
    })
    ResponseEntity<?> remover(Long id);
}
