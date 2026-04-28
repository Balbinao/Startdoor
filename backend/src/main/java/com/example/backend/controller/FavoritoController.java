package com.example.backend.controller;

import com.example.backend.dto.EmpresaResumoDTO;
import com.example.backend.model.Estudante;
import com.example.backend.openapi.FavoritoControllerOpenApi;
import com.example.backend.service.FavoritoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("favoritos")
public class FavoritoController implements FavoritoControllerOpenApi {

    private final FavoritoService favoritoService;

    public FavoritoController(FavoritoService favoritoService) {
        this.favoritoService = favoritoService;
    }

    @Override
    @PostMapping("/{empresaId}")
    public ResponseEntity<Boolean> alternarFavorito(
            @AuthenticationPrincipal Estudante estudanteLogado,
            @PathVariable Long empresaId) {
        return ResponseEntity.ok(favoritoService.alternarFavorito(estudanteLogado.getId(), empresaId));
    }

    @Override
    @GetMapping
    public ResponseEntity<List<EmpresaResumoDTO>> listarMeusFavoritos(
            @AuthenticationPrincipal Estudante estudanteLogado) {
        return ResponseEntity.ok(favoritoService.listarFavoritos(estudanteLogado.getId()));
    }
}
