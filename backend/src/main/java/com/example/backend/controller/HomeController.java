package com.example.backend.controller;

import com.example.backend.dto.AvaliacaoRecenteDTO;
import com.example.backend.dto.EmpresaTopDTO;
import com.example.backend.openapi.HomeControllerOpenApi;
import com.example.backend.service.AvaliacaoRecenteService;
import com.example.backend.service.EmpresaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/home")
public class HomeController implements HomeControllerOpenApi {

    private final AvaliacaoRecenteService avaliacaoRecenteService;
    private final EmpresaService empresaService;

    public HomeController(AvaliacaoRecenteService avaliacaoRecenteService, EmpresaService empresaService) {
        this.avaliacaoRecenteService = avaliacaoRecenteService;
        this.empresaService = empresaService;
    }

    @Override
    @GetMapping("/avaliacoes-recentes")
    public ResponseEntity<List<AvaliacaoRecenteDTO>> getAvaliacoesRecentes() {
        List<AvaliacaoRecenteDTO> recentes = avaliacaoRecenteService.buscarRecentes();
        return ResponseEntity.ok(recentes);
    }

    @Override
    @GetMapping("/empresas-top")
    public ResponseEntity<List<EmpresaTopDTO>> getEmpresasTop() {
        List<EmpresaTopDTO> topEmpresas = empresaService.buscarTopEmpresas();
        return ResponseEntity.ok(topEmpresas);
    }
}