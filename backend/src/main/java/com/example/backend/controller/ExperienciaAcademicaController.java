package com.example.backend.controller;

import com.example.backend.dto.ExperienciaAcademicaDTO;
import com.example.backend.model.ExperienciaAcademica;
import com.example.backend.openapi.ExperienciaAcademicaControllerOpenApi;
import com.example.backend.service.ExperienciaAcademicaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("experiencias-academicas")
public class ExperienciaAcademicaController implements ExperienciaAcademicaControllerOpenApi {
    private final ExperienciaAcademicaService service;

    public ExperienciaAcademicaController(ExperienciaAcademicaService service) {
        this.service = service;
    }

    @PostMapping("/estudante/{estudanteId}")
    @PreAuthorize("hasAuthority('ADMIN') or @estudanteSecurity.isOwner(#estudanteId)")
    public ResponseEntity<?> adicionar(@PathVariable Long estudanteId, @RequestBody @Valid ExperienciaAcademicaDTO data) {
        service.adicionar(estudanteId, data);
        return criarRespostaSucesso("Experiência acadêmica adicionada com sucesso!");
    }

    @GetMapping("/estudante/{estudanteId}")
    public ResponseEntity<List<ExperienciaAcademica>> listarPorEstudante(@PathVariable Long estudanteId) {
        return ResponseEntity.ok(service.listarPorEstudante(estudanteId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExperienciaAcademica> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or @estudanteSecurity.isOwnerOfAcademica(#id)")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody @Valid ExperienciaAcademicaDTO data) {
        service.atualizar(id, data);
        return criarRespostaSucesso("Experiência acadêmica atualizada com sucesso!");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or @estudanteSecurity.isOwnerOfAcademica(#id)")
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
