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
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @Operation(
        summary = "Listar todos os estudantes",
        description = "Retorna uma lista com todos os estudantes cadastrados no sistema"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso"),
        @ApiResponse(responseCode = "401", description = "Token JWT ausente ou inválido")
    })
    public ResponseEntity<List<Estudante>> listar() {
        return ResponseEntity.ok(estudanteService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Buscar estudante por ID",
        description = "Retorna os dados de um estudante específico baseado no ID fornecido"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Estudante encontrado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Estudante não encontrado"),
        @ApiResponse(responseCode = "401", description = "Token JWT ausente ou inválido")
    })
    public ResponseEntity<Estudante> buscar(@PathVariable Long id) {
       return ResponseEntity.ok(estudanteService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    @Operation(
        summary = "Atualizar dados de um estudante",
        description = """
            Atualiza as informações de um estudante existente.
            
            **Campos que podem ser atualizados:**
            * `nome` - Novo nome (opcional)
            * `user` - Novo nome de usuário (opcional)
            * `email` - Novo email (opcional)
            
            Envie apenas os campos que deseja alterar.
            """
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Estudante atualizado com sucesso",
            content = @Content(examples = @ExampleObject(value = "Dados atualizados com sucesso"))
        ),
        @ApiResponse(responseCode = "404", description = "Estudante não encontrado"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos"),
        @ApiResponse(responseCode = "401", description = "Token JWT ausente ou inválido")
    })
    public ResponseEntity atualizar(@PathVariable Long id, @RequestBody AtualizarEstudanteDTO data) {
        estudanteService.atualizar(id, data);
        return ResponseEntity.ok("Dados atualizados com sucesso");
    }

    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar um estudante",
        description = "Remove permanentemente um estudante do sistema"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Estudante deletado com sucesso (sem conteúdo)"),
        @ApiResponse(responseCode = "404", description = "Estudante não encontrado"),
        @ApiResponse(responseCode = "401", description = "Token JWT ausente ou inválido")
    })
    public ResponseEntity deletar(@PathVariable Long id) {
        estudanteService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}