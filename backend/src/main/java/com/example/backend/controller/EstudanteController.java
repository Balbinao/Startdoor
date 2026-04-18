package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.model.Estudante;
import com.example.backend.openapi.EstudanteControllerOpenApi;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("estudantes")

public class EstudanteController implements EstudanteControllerOpenApi {

    private final EstudanteService estudanteService;

    public EstudanteController(EstudanteService service) {
        this.estudanteService = service;
    }

    @PostMapping("/cadastrar/estudante")
    public ResponseEntity<?> cadastrar(@RequestBody @Valid CadastroEstudanteDTO data) {
        estudanteService.cadastrar(data);

        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", "Estudante cadastrado com sucesso!");

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<EstudanteResponseDTO>> listar() {
        return ResponseEntity.ok(estudanteService.listarTodos());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @estudanteSecurity.isOwner(#id)")
    public ResponseEntity<EstudanteResponseDTO> buscar(@PathVariable Long id) {
       return ResponseEntity.ok(estudanteService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @estudanteSecurity.isOwner(#id)")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody AtualizarEstudanteDTO data) {
        estudanteService.atualizar(id, data);
        
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", "Dados atualizados com sucesso");
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @estudanteSecurity.isOwner(#id)")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        estudanteService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/senha")
    @PreAuthorize("hasRole('ADMIN') or @estudanteSecurity.isOwner(#id)")
    public ResponseEntity<?> alterarSenha(@PathVariable Long id, @RequestBody @Valid AlterarSenhaDTO data) {
        estudanteService.alterarSenha(id, data);

        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", "Senha alterada com sucesso");

        return ResponseEntity.ok(response);
    }


    @PreAuthorize("hasRole('ADMIN') or @estudanteSecurity.isOwner(#id)")
    @PutMapping(value = "/{id}/foto", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EstudanteResponseDTO> uploadFoto(
            @PathVariable Long id,
            @ModelAttribute FotoUploadDTO fotoDto) {

        var arquivo = fotoDto.arquivo();
        if (arquivo == null || arquivo.getContentType() == null || !arquivo.getContentType().startsWith("image/")) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(estudanteService.atualizarFoto(id, fotoDto.arquivo()));
    }

    @DeleteMapping("/{id}/foto")
    @PreAuthorize("hasRole('ADMIN') or @estudanteSecurity.isOwner(#id)")
    public ResponseEntity<Void> removerFoto(@PathVariable Long id) {
        estudanteService.removerFoto(id);
        return ResponseEntity.noContent().build();
    }
}