package com.example.backend.controller;

import com.example.backend.dto.RecomendacaoIARequestDTO;
import com.example.backend.dto.RecomendacaoIAResponseDTO;
import com.example.backend.openapi.IAControllerOpenApi;
import com.example.backend.service.IAService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("recomendacoes")
public class IAController implements IAControllerOpenApi {

    private final IAService iaService;

    public IAController(IAService iaService) {
        this.iaService = iaService;
    }

    @PostMapping("/ia/gerar")
    @PreAuthorize("hasRole('ADMIN') or @estudanteSecurity.isOwner(#request.estudanteId())")
    public ResponseEntity<RecomendacaoIAResponseDTO> gerarRecomendacao(
            @RequestBody @Valid RecomendacaoIARequestDTO request) {
        var resposta = iaService.gerarRecomendacao(request.estudanteId(), request.empresaId());
        return ResponseEntity.ok(resposta);
    }
}
