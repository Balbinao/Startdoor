package com.example.backend.controller;

import com.example.backend.dto.AtualizarEstudanteDTO;
import com.example.backend.model.Estudante;
import com.example.backend.service.EstudanteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("estudantes")
public class EstudanteController {

    private final EstudanteService estudanteService;

    public EstudanteController(EstudanteService service) {
        this.estudanteService = service;
    }

    @GetMapping
    public ResponseEntity<List<Estudante>> listar() {
        return ResponseEntity.ok(estudanteService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudante> buscar(@PathVariable Long id) {
       return ResponseEntity.ok(estudanteService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity atualizar(@PathVariable Long id, @RequestBody AtualizarEstudanteDTO data) {
        estudanteService.atualizar(id, data);
        return ResponseEntity.ok("Dados atualizados com sucesso");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletar(@PathVariable Long id) {
        estudanteService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
