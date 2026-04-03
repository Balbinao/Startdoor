package com.example.backend.controller;

import com.example.backend.dto.AtualizarSetorDTO;
import com.example.backend.dto.SetorDTO;
import com.example.backend.model.Setor;
import com.example.backend.openapi.SetorControllerOpenApi;
import com.example.backend.service.SetorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("setores")
public class SetorController implements SetorControllerOpenApi {

    private final SetorService setorService;

    public SetorController(SetorService setorService) {
        this.setorService = setorService;
    }

    @GetMapping
    public ResponseEntity<List<Setor>> listar() {
        return ResponseEntity.ok(setorService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Setor> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(setorService.buscarPorId(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> cadastrar(@RequestBody SetorDTO data) {
        setorService.cadastrar(data);

        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", "Setor cadastrado com sucesso!");

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody AtualizarSetorDTO data) {
        setorService.atualizar(id, data);

        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", "Setor atualizado com sucesso!");

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        setorService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
