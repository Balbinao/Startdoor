package com.example.backend.controller;

import com.example.backend.dto.ExperienciaProfissionalDTO;
import com.example.backend.model.ExperienciaProfissional;
import com.example.backend.openapi.ExperienciaProfissionalControllerOpenApi;
import com.example.backend.service.ExperienciaProfissionalService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("experiencias-profissionais")
public class ExperienciaProfissionalController implements ExperienciaProfissionalControllerOpenApi{
    private final ExperienciaProfissionalService service;

    public ExperienciaProfissionalController(ExperienciaProfissionalService service) {
        this.service = service;
    }

    @PostMapping("/estudante/{estudanteId}")
    @PreAuthorize("hasAuthority('ADMIN') or @estudanteSecurity.isOwner(#estudanteId)")
    public ResponseEntity<?> adicionar(@PathVariable Long estudanteId, @RequestBody @Valid ExperienciaProfissionalDTO data) {
        service.adicionar(estudanteId, data);
        return criarRespostaSucesso("Experiência profissional adicionada com sucesso!");
    }

    @GetMapping("/estudante/{estudanteId}")
    public ResponseEntity<List<ExperienciaProfissional>> listarPorEstudante(@PathVariable Long estudanteId) {
        return ResponseEntity.ok(service.listarPorEstudante(estudanteId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExperienciaProfissional> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or @estudanteSecurity.isOwnerOfProfissional(#id)")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody @Valid ExperienciaProfissionalDTO data) {
        service.atualizar(id, data);
        return criarRespostaSucesso("Experiência profissional atualizada com sucesso!");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or @estudanteSecurity.isOwnerOfProfissional(#id)")
    public ResponseEntity<?> remover(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }

    private ResponseEntity<?> criarRespostaSucesso(String mensagem) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", mensagem);
        return ResponseEntity.ok(response);
    }
}
