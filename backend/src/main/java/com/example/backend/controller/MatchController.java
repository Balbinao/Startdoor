package com.example.backend.controller;

import com.example.backend.dto.PontosFortesFracosResponseDTO;
import com.example.backend.dto.RecomendacaoResponseDTO;
import com.example.backend.model.Estudante;
import com.example.backend.openapi.MatchControllerOpenApi;
import com.example.backend.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController implements MatchControllerOpenApi {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @Override
    @GetMapping("/empresa/{empresaId}")
    @PreAuthorize("hasAuthority('ADMIN') or @estudanteSecurity.isOwner(#estudanteLogado.id)")
    public ResponseEntity<PontosFortesFracosResponseDTO> getMatch(
            @AuthenticationPrincipal Estudante estudanteLogado,
            @PathVariable Long empresaId) {

        PontosFortesFracosResponseDTO match = matchService.calcularPontosFortesFracos(estudanteLogado.getId(), empresaId);
        return ResponseEntity.ok(match);
    }

    @Override
    @GetMapping("/recomendacoes")
    @PreAuthorize("hasAuthority('ADMIN') or @estudanteSecurity.isOwner(#estudanteLogado.id)")
    public ResponseEntity<List<RecomendacaoResponseDTO>> getRecomendacoes(
            @AuthenticationPrincipal Estudante estudanteLogado) {

        List<RecomendacaoResponseDTO> recomendacoes = matchService.listarRecomendacoes(estudanteLogado.getId());
        return ResponseEntity.ok(recomendacoes);
    }
}