package com.example.backend.openapi;

import com.example.backend.dto.ExperienciaAcademicaDTO;
import com.example.backend.model.ExperienciaAcademica;
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

@Tag(name = "🎓 Exp. Acadêmica", description = "Gerenciamento do histórico educacional e cursos do estudante")
@SecurityRequirement(name = "Bearer Authentication")
public interface ExperienciaAcademicaControllerOpenApi  {

    @Operation(summary = "Adicionar experiência acadêmica")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Experiência adicionada com sucesso",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T10:00:00\",\"status\":200,\"message\":\"Experiência acadêmica adicionada com sucesso!\"}"))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Dados inválidos ou erro de lógica",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T10:00:00\",\"status\":400,\"message\":\"A data de término não pode ser anterior à data de início.\"}"))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Estudante não encontrado",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T10:00:00\",\"status\":404,\"message\":\"Estudante não encontrado com o ID: 1\"}"))
            )
    })
    ResponseEntity<?> adicionar(Long estudanteId, ExperienciaAcademicaDTO data);

    @Operation(summary = "Listar experiências acadêmicas do estudante")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista retornada com sucesso",
                    content = @Content(schema = @Schema(implementation = ExperienciaAcademica.class))
            ),
            @ApiResponse(responseCode = "404", description = "Estudante não encontrado")
    })
    ResponseEntity<List<ExperienciaAcademica>> listarPorEstudante(Long estudanteId);

    @Operation(summary = "Buscar experiência acadêmica por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Encontrada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Experiência não encontrada")
    })
    ResponseEntity<ExperienciaAcademica> buscar(Long id);

    @Operation(summary = "Atualizar experiência acadêmica")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Atualizada com sucesso",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-04-03T10:00:00\",\"status\":200,\"message\":\"Experiência acadêmica atualizada com sucesso!\"}"))
            ),
            @ApiResponse(responseCode = "403", description = "Acesso negado - apenas dono ou ADMIN"),
            @ApiResponse(responseCode = "404", description = "Experiência não encontrada")
    })
    ResponseEntity<?> atualizar(Long id, ExperienciaAcademicaDTO data);

    @Operation(summary = "Remover experiência acadêmica")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Removida com sucesso"),
            @ApiResponse(responseCode = "403", description = "Acesso negado"),
            @ApiResponse(responseCode = "404", description = "Experiência não encontrada")
    })
    ResponseEntity<?> remover(Long id);
}
