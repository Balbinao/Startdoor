package com.example.backend.controller;

import com.example.backend.dto.AtualizarEstudanteDTO;
import com.example.backend.model.Estudante;
import com.example.backend.service.EstudanteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("estudantes")
@Tag(name = "👨‍🎓 Estudantes", description = "Operações de CRUD para gerenciamento de estudantes")
@SecurityRequirement(name = "Bearer Authentication")
public class EstudanteController {

    private final EstudanteService estudanteService;

    public EstudanteController(EstudanteService service) {
        this.estudanteService = service;
    }

    @GetMapping
    @Operation(summary = "Listar todos os estudantes")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Lista retornada com sucesso",
            content = @Content(schema = @Schema(implementation = Estudante.class))
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
    public ResponseEntity<List<Estudante>> listar() {
        return ResponseEntity.ok(estudanteService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar estudante por ID")
    @PreAuthorize("hasRole('ADMIN') or @estudanteSecurity.isOwner(#id)")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Estudante encontrado com sucesso",
            content = @Content(schema = @Schema(implementation = Estudante.class))
        ),
        @ApiResponse(
            responseCode = "404", 
            description = "Estudante não encontrado",
            content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":404,\"message\":\"Estudante não encontrado com o ID: 1\"}"))
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
    public ResponseEntity<Estudante> buscar(@PathVariable Long id) {
       return ResponseEntity.ok(estudanteService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar dados de um estudante")
    @PreAuthorize("hasRole('ADMIN') or @estudanteSecurity.isOwner(#id)")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Dados atualizados com sucesso",
            content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":200,\"message\":\"Dados atualizados com sucesso\"}"))
        ),
        @ApiResponse(
            responseCode = "404", 
            description = "Estudante não encontrado",
            content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":404,\"message\":\"Estudante não encontrado com o ID: 1\"}"))
        ),
        @ApiResponse(
            responseCode = "400", 
            description = "Dados inválidos",
            content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":400,\"message\":\"Erro de validação\"}"))
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
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody AtualizarEstudanteDTO data) {
        estudanteService.atualizar(id, data);
        
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", "Dados atualizados com sucesso");
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar estudante")
    @PreAuthorize("hasRole('ADMIN') or @estudanteSecurity.isOwner(#id)")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "204", 
            description = "Estudante deletado com sucesso (sem conteúdo)",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "404", 
            description = "Estudante não encontrado",
            content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":404,\"message\":\"Estudante não encontrado com o ID: 1\"}"))
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
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        estudanteService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}