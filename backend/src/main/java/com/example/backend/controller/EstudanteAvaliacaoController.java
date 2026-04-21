package com.example.backend.controller;

import com.example.backend.dto.EstudanteAvaliacaoDTO;
import com.example.backend.dto.EstudanteAvaliacaoResponseDTO;
import com.example.backend.openapi.EstudanteAvaliacaoControllerOpenApi;
import com.example.backend.service.EstudanteAvaliacaoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("avaliacoes")
public class EstudanteAvaliacaoController implements EstudanteAvaliacaoControllerOpenApi {
    private final EstudanteAvaliacaoService service;

    public EstudanteAvaliacaoController(EstudanteAvaliacaoService service) {
        this.service = service;
    }

    @PostMapping("/estudante/{estudanteId}")
    @PreAuthorize("hasRole('ESTUDANTE') or hasRole('ADMIN')")
    public ResponseEntity<?> criar(@PathVariable Long estudanteId, @RequestBody @Valid EstudanteAvaliacaoDTO data) {
        String uuidLogado = getUuidLogado();
        service.criar(estudanteId, data, uuidLogado);
        return criarRespostaSucesso("Avaliação criada com sucesso!");
    }

    @GetMapping("/empresa/{empresaId}")
    public ResponseEntity<List<EstudanteAvaliacaoResponseDTO>> listarPorEmpresa(@PathVariable Long empresaId) {
        return ResponseEntity.ok(service.listarPorEmpresa(empresaId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstudanteAvaliacaoResponseDTO> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/estudante/{estudanteId}")
    public ResponseEntity<List<EstudanteAvaliacaoResponseDTO>> listarPorEstudante(@PathVariable Long estudanteId) {
        return ResponseEntity.ok(service.listarPorEstudante(estudanteId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ESTUDANTE')")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody EstudanteAvaliacaoDTO data) {
        String uuidLogado = getUuidLogado();
        boolean isAdmin = SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        
        service.atualizar(id, data, uuidLogado, isAdmin);
        return criarRespostaSucesso("Avaliação atualizada com sucesso!");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ESTUDANTE')")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        String uuidLogado = getUuidLogado();
        boolean isAdmin = SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        
        service.deletar(id, uuidLogado, isAdmin);
        return ResponseEntity.noContent().build();
    }

    private String getUuidLogado() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof UserDetails userDetails) {
            return userDetails.getUsername();
        }
        throw new IllegalStateException("Usuário não autenticado");
    }

    private ResponseEntity<?> criarRespostaSucesso(String mensagem) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", mensagem);
        return ResponseEntity.ok(response);
    }
}