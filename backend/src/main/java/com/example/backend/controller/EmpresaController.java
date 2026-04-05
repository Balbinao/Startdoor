package com.example.backend.controller;

import com.example.backend.dto.AlterarSenhaDTO;
import com.example.backend.dto.AtualizarEmpresaDTO;
import com.example.backend.dto.CadastroEmpresaDTO;
import com.example.backend.dto.EmpresaResponseDTO;
import com.example.backend.model.Empresa;
import com.example.backend.openapi.EmpresaControllerOpenApi;
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

public class EmpresaController implements EmpresaControllerOpenApi {

    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }
    @PostMapping("/cadastrar/empresa")
    public ResponseEntity<?> cadastrar(@RequestBody @Valid CadastroEmpresaDTO data) {
        empresaService.cadastrar(data);

        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", "Empresa cadastrada com sucesso!");

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<EmpresaResponseDTO>> listar() {
        return ResponseEntity.ok(empresaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpresaResponseDTO> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(empresaService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or @empresaSecurity.isOwner(#id)")
        public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody @Valid AtualizarEmpresaDTO data) {
            empresaService.atualizar(id, data);

            Map<String, Object> response = new HashMap<>();
            response.put("timestamp", LocalDateTime.now().toString());
            response.put("status", 200);
            response.put("message", "Dados da empresa atualizados com sucesso!");

            return ResponseEntity.ok(response);
        }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @empresaSecurity.isOwner(#id)")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        empresaService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/senha")
    @PreAuthorize("hasRole('ADMIN') or @empresaSecurity.isOwner(#id)")
    public ResponseEntity<?> alterarSenha(@PathVariable Long id, @RequestBody @Valid AlterarSenhaDTO data) {
        empresaService.alterarSenha(id, data);

        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", "Senha da empresa alterada com sucesso");

        return ResponseEntity.ok(response);
    }
}