package com.example.backend.controller;

import com.example.backend.dto.PontosFortesFracosResponseDTO;
import com.example.backend.model.Estudante;
import com.example.backend.openapi.MatchControllerOpenApi;
import com.example.backend.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/matches")
public class MatchController implements MatchControllerOpenApi {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @Override
    @GetMapping("/empresa/{empresaId}")
    public ResponseEntity<PontosFortesFracosResponseDTO> getMatch(
            @AuthenticationPrincipal Estudante estudanteLogado,
            @PathVariable Long empresaId) {

        PontosFortesFracosResponseDTO match = matchService.calcularPontosFortesFracos(estudanteLogado.getId(), empresaId);
        return ResponseEntity.ok(match);
    }
}