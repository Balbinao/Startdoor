package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.model.Empresa;
import com.example.backend.openapi.EmpresaControllerOpenApi;
import com.example.backend.service.EmpresaService;
import com.example.backend.service.EmpresaSetorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("empresas")

public class EmpresaController implements EmpresaControllerOpenApi {

    private final EmpresaService empresaService;
    private final EmpresaSetorService empresaSetorService;

    public EmpresaController(EmpresaService empresaService, EmpresaSetorService empresaSetorService) {
        this.empresaService = empresaService;
        this.empresaSetorService = empresaSetorService;
    }
    @PostMapping("/cadastrar/empresa")
    public ResponseEntity<?> cadastrar(@RequestBody @Valid CadastroEmpresaDTO data) {
        empresaService.cadastrar(data);

        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", "Empresa cadastrada com sucesso!");

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<EmpresaResponseDTO>> listar() {
        return ResponseEntity.ok(empresaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpresaResponseDTO> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(empresaService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or @empresaSecurity.isOwner(#id)")
        public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody @Valid AtualizarEmpresaDTO data) {
            empresaService.atualizar(id, data);

            Map<String, Object> response = new HashMap<>();
            response.put("timestamp", LocalDateTime.now().toString());
            response.put("status", 200);
            response.put("message", "Dados da empresa atualizados com sucesso!");

            return ResponseEntity.ok(response);
        }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @empresaSecurity.isOwner(#id)")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        empresaService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/senha")
    @PreAuthorize("hasRole('ADMIN') or @empresaSecurity.isOwner(#id)")
    public ResponseEntity<?> alterarSenha(@PathVariable Long id, @RequestBody @Valid AlterarSenhaDTO data) {
        empresaService.alterarSenha(id, data);

        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", "Senha da empresa alterada com sucesso");

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN') or @empresaSecurity.isOwner(#id)")
    @PutMapping(value = "/{id}/foto", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EmpresaResponseDTO> uploadFoto(
            @PathVariable Long id,
            @ModelAttribute FotoUploadDTO fotoDto) {

        var arquivo = fotoDto.arquivo();
        if (arquivo == null || arquivo.getContentType() == null || !arquivo.getContentType().startsWith("image/")) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(empresaService.atualizarFoto(id, arquivo));
    }

    @PreAuthorize("hasRole('ADMIN') or @empresaSecurity.isOwner(#id)")
    @DeleteMapping("/{id}/foto")
    public ResponseEntity<Void> removerFoto(@PathVariable Long id) {
        empresaService.removerFoto(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pesquisa")
    public ResponseEntity<Page<EmpresaResumoDTO>> pesquisar(
            @RequestParam(required = false) BigDecimal nota,
            @RequestParam(required = false) String receita,
            @RequestParam(required = false) String tamanho,
            @RequestParam(required = false) Integer ambiente,
            @RequestParam(required = false) Integer aprendizado,
            @RequestParam(required = false) Integer beneficios,
            @RequestParam(required = false) Integer cultura,
            @RequestParam(required = false) Integer efetivacao,
            @RequestParam(required = false) Integer entrevista,
            @RequestParam(required = false) Integer feedback,
            @RequestParam(required = false) Integer infra,
            @RequestParam(required = false) Integer integracao,
            @RequestParam(required = false) Integer remuneracao,
            @RequestParam(required = false) Integer rotina,
            @RequestParam(required = false) Integer lideranca,
            @ParameterObject Pageable pageable) {

        Page<EmpresaResumoDTO> empresas = empresaService.pesquisar(
                nota, receita, tamanho,
                ambiente, aprendizado, beneficios,
                cultura, efetivacao, entrevista,
                feedback, infra, integracao,
                remuneracao, rotina, lideranca,
                pageable
        );

        return ResponseEntity.ok(empresas);
    }

    @GetMapping("/{id}/setores")
    public ResponseEntity<List<EmpresaSetorResponseDTO>> listarSetoresDaEmpresa(@PathVariable Long id) {
        return ResponseEntity.ok(empresaSetorService.listarPorEmpresa(id));
    }

    @PostMapping("/{id}/setores")
    @PreAuthorize("hasRole('ADMIN') or @empresaSecurity.isOwner(#id)")
    public ResponseEntity<EmpresaSetorResponseDTO> adicionarSetor(
            @PathVariable Long id,
            @RequestBody AdicionarSetorEmpresaDTO data) {
        return ResponseEntity.ok(empresaSetorService.adicionar(id, data.setorId()));
    }

    @DeleteMapping("/{id}/setores/{setorId}")
    @PreAuthorize("hasRole('ADMIN') or @empresaSecurity.isOwner(#id)")
    public ResponseEntity<Void> removerSetor(@PathVariable Long id, @PathVariable Long setorId) {
        empresaSetorService.remover(id, setorId);
        return ResponseEntity.noContent().build();
    }
}