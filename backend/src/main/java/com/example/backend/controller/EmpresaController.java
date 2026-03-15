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
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("empresas")
@Tag(name = "🏢 Empresas", description = "Operações de CRUD para gerenciamento de empresas")
@SecurityRequirement(name = "Bearer Authentication") // Indica que precisa de token
public class EmpresaController {

    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    @GetMapping
    @Operation(
        summary = "Listar todas as empresas",
        description = "Retorna uma lista com todas as empresas cadastradas no sistema. Requer token JWT."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso"),
        @ApiResponse(responseCode = "401", description = "Token JWT ausente ou inválido")
    })
    public ResponseEntity<List<Empresa>> listar() {
        return ResponseEntity.ok(empresaService.listarTodas());
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Buscar empresa por ID",
        description = "Retorna os dados de uma empresa específica baseado no ID fornecido"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Empresa encontrada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Empresa não encontrada para o ID informado"),
        @ApiResponse(responseCode = "401", description = "Token JWT ausente ou inválido")
    })
    public ResponseEntity<Empresa> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(empresaService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    @Operation(
        summary = "Atualizar dados de uma empresa",
        description = """
            Atualiza as informações de uma empresa existente.
            
            **Campos que podem ser atualizados:**
            * `nome_fantasia` - Novo nome fantasia (opcional)
            * `email` - Novo email corporativo (opcional)
            
            Envie apenas os campos que deseja alterar.
            """
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Empresa atualizada com sucesso",
            content = @Content(examples = @ExampleObject(value = "Dados da empresa atualizados com sucesso!"))
        ),
        @ApiResponse(responseCode = "404", description = "Empresa não encontrada"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos"),
        @ApiResponse(responseCode = "401", description = "Token JWT ausente ou inválido")
    })
    public ResponseEntity atualizar(@PathVariable Long id, @RequestBody @Valid AtualizarEmpresaDTO data) {
        empresaService.atualizar(id, data);
        return ResponseEntity.ok("Dados da empresa atualizados com sucesso!");
    }

    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar uma empresa",
        description = "Remove permanentemente uma empresa do sistema"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Empresa deletada com sucesso (sem conteúdo)"),
        @ApiResponse(responseCode = "404", description = "Empresa não encontrada"),
        @ApiResponse(responseCode = "401", description = "Token JWT ausente ou inválido")
    })
    public ResponseEntity deletar(@PathVariable Long id) {
        empresaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}