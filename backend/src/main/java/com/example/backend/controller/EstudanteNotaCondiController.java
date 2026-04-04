package com.example.backend.controller;

import com.example.backend.dto.AtualizarEstudanteNotaCondiDTO;
import com.example.backend.dto.EstudanteNotaCondiResponseDTO;
import com.example.backend.openapi.EstudanteNotaCondiControllerOpenApi;
import com.example.backend.service.EstudanteNotaCondiService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("estudantes/notas-condi")
public class EstudanteNotaCondiController implements EstudanteNotaCondiControllerOpenApi {

    private final EstudanteNotaCondiService notaCondiService;

    public EstudanteNotaCondiController(EstudanteNotaCondiService notaCondiService) {
        this.notaCondiService = notaCondiService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<EstudanteNotaCondiResponseDTO>> listar() {
        return ResponseEntity.ok(notaCondiService.listarTodos());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @estudanteSecurity.isOwner(#id)")
    public ResponseEntity<EstudanteNotaCondiResponseDTO> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(notaCondiService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @estudanteSecurity.isOwner(#id)")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody AtualizarEstudanteNotaCondiDTO data) {
        notaCondiService.atualizar(id, data);

        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", "Notas condicionais atualizadas com sucesso!");

        return ResponseEntity.ok(response);
    }
}
