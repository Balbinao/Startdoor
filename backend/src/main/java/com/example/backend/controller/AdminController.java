package com.example.backend.controller;

import com.example.backend.dto.CadastroAdminDTO;
import com.example.backend.model.Admin;
import com.example.backend.repository.AdminRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@Tag(name = "👑 Administradores", description = "Operações exclusivas para administradores (requer role ADMIN)")
public class AdminController {

    private final AdminRepository adminRepository;

    public AdminController(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @PostMapping
    @Operation(summary = "Criar novo administrador")
    public ResponseEntity<?> criarAdmin(@RequestBody @Valid CadastroAdminDTO data) {
        // Verificar se email já existe
        if (adminRepository.findByEmail(data.email()) != null) {
            return ResponseEntity.badRequest().body("E-mail já cadastrado");
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());

        Admin newAdmin = new Admin();
        newAdmin.setEmail(data.email());
        newAdmin.setSenha(encryptedPassword);
        newAdmin.setUser(data.user() != null ? data.user() : data.email());

        adminRepository.save(newAdmin);
        return ResponseEntity.ok("Administrador criado com sucesso!");
    }

    @GetMapping
    @Operation(summary = "Listar todos os administradores")
    public ResponseEntity<List<Admin>> listarAdmins() {
        return ResponseEntity.ok(adminRepository.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar administrador por ID")
    public ResponseEntity<?> buscarAdmin(@PathVariable Long id) {
        return adminRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar administrador")
    public ResponseEntity<?> atualizarAdmin(@PathVariable Long id, @RequestBody @Valid CadastroAdminDTO data) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin não encontrado"));

        // Verificar se novo email já existe (se foi alterado)
        if (!admin.getEmail().equals(data.email()) && adminRepository.findByEmail(data.email()) != null) {
            return ResponseEntity.badRequest().body("E-mail já cadastrado");
        }

        admin.setEmail(data.email());
        if (data.senha() != null && !data.senha().isEmpty()) {
            admin.setSenha(new BCryptPasswordEncoder().encode(data.senha()));
        }
        admin.setUser(data.user() != null ? data.user() : data.email());

        adminRepository.save(admin);
        return ResponseEntity.ok("Administrador atualizado com sucesso!");
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar administrador")
    public ResponseEntity<?> deletarAdmin(@PathVariable Long id) {
        // Evitar deletar o último admin
        if (adminRepository.count() <= 1) {
            return ResponseEntity.badRequest().body("Não é possível deletar o último administrador");
        }

        adminRepository.deleteById(id);
        return ResponseEntity.ok("Administrador deletado com sucesso!");
    }
}