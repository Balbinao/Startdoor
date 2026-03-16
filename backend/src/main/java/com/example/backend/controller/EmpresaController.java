package com.example.backend.controller;

import com.example.backend.dto.AtualizarEmpresaDTO;
import com.example.backend.model.Empresa;
import com.example.backend.service.EmpresaService;
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
@RequestMapping("empresas")
@Tag(name = "🏢 Empresas", description = "Operações de CRUD para gerenciamento de empresas")
@SecurityRequirement(name = "Bearer Authentication")
public class EmpresaController {

    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    @GetMapping
    @Operation(summary = "Listar todas as empresas")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Lista retornada com sucesso",
            content = @Content(schema = @Schema(implementation = Empresa.class))
        ),
        @ApiResponse(
            responseCode = "401", 
            description = "Token JWT ausente ou inválido",
            content = @Content
        )
    })
    public ResponseEntity<List<Empresa>> listar() {
        return ResponseEntity.ok(empresaService.listarTodas());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar empresa por ID")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Empresa encontrada com sucesso",
            content = @Content(schema = @Schema(implementation = Empresa.class))
        ),
        @ApiResponse(
            responseCode = "404", 
            description = "Empresa não encontrada",
            content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":404,\"message\":\"Empresa não encontrada com o ID: 1\"}"))
        ),
        @ApiResponse(
            responseCode = "401", 
            description = "Token JWT ausente ou inválido",
            content = @Content
        )
    })
    public ResponseEntity<Empresa> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(empresaService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar dados de uma empresa")
    @PreAuthorize("hasRole('ADMIN') or @empresaSecurity.isOwner(#id)")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Empresa atualizada com sucesso",
            content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":200,\"message\":\"Dados da empresa atualizados com sucesso!\"}"))
        ),
        @ApiResponse(
            responseCode = "404", 
            description = "Empresa não encontrada",
            content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":404,\"message\":\"Empresa não encontrada com o ID: 1\"}"))
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
            description = "Acesso negado - apenas própria empresa ou ADMIN",
            content = @Content
        )
    })
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody @Valid AtualizarEmpresaDTO data) {
        empresaService.atualizar(id, data);
        
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", "Dados da empresa atualizados com sucesso!");
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar empresa")
    @PreAuthorize("hasRole('ADMIN') or @empresaSecurity.isOwner(#id)")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "204", 
            description = "Empresa deletada com sucesso (sem conteúdo)",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "404", 
            description = "Empresa não encontrada",
            content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":404,\"message\":\"Empresa não encontrada com o ID: 1\"}"))
        ),
        @ApiResponse(
            responseCode = "401", 
            description = "Token JWT ausente ou inválido",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "403", 
            description = "Acesso negado - apenas própria empresa ou ADMIN",
            content = @Content
        )
    })
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        empresaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}