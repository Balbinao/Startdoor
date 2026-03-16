package com.example.backend.controller;

import com.example.backend.dto.CadastroAdminDTO;
import com.example.backend.model.Admin;
import com.example.backend.repository.AdminRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Administrador criado com sucesso",
            content = @Content(
                examples = @ExampleObject(
                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":200,\"message\":\"Administrador criado com sucesso!\"}"
                )
            )
        ),
        @ApiResponse(
            responseCode = "400", 
            description = "E-mail já cadastrado",
            content = @Content(
                examples = @ExampleObject(
                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":400,\"message\":\"E-mail já cadastrado\"}"
                )
            )
        ),
        @ApiResponse(
            responseCode = "401", 
            description = "Não autorizado",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "403", 
            description = "Acesso negado - apenas ADMIN",
            content = @Content
        )
    })
    public ResponseEntity<?> criarAdmin(@RequestBody @Valid CadastroAdminDTO data) {
        if (adminRepository.findByEmail(data.email()) != null) {
            Map<String, Object> error = new HashMap<>();
            error.put("timestamp", LocalDateTime.now().toString());
            error.put("status", 400);
            error.put("message", "E-mail já cadastrado");
            return ResponseEntity.badRequest().body(error);
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());

        Admin newAdmin = new Admin();
        newAdmin.setEmail(data.email());
        newAdmin.setSenha(encryptedPassword);
        newAdmin.setUser(data.user() != null ? data.user() : data.email());

        adminRepository.save(newAdmin);
        
        Map<String, Object> success = new HashMap<>();
        success.put("timestamp", LocalDateTime.now().toString());
        success.put("status", 200);
        success.put("message", "Administrador criado com sucesso!");
        return ResponseEntity.ok(success);
    }

    @GetMapping
    @Operation(summary = "Listar todos os administradores")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Lista retornada com sucesso",
            content = @Content(schema = @Schema(implementation = Admin.class))
        ),
        @ApiResponse(
            responseCode = "401", 
            description = "Não autorizado",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "403", 
            description = "Acesso negado - apenas ADMIN",
            content = @Content
        )
    })
    public ResponseEntity<List<Admin>> listarAdmins() {
        return ResponseEntity.ok(adminRepository.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar administrador por ID")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Administrador encontrado",
            content = @Content(schema = @Schema(implementation = Admin.class))
        ),
        @ApiResponse(
            responseCode = "404", 
            description = "Administrador não encontrado",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "401", 
            description = "Não autorizado",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "403", 
            description = "Acesso negado - apenas ADMIN",
            content = @Content
        )
    })
    public ResponseEntity<?> buscarAdmin(@PathVariable Long id) {
        return adminRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar administrador")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Administrador atualizado com sucesso",
            content = @Content(
                examples = @ExampleObject(
                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":200,\"message\":\"Administrador atualizado com sucesso!\"}"
                )
            )
        ),
        @ApiResponse(
            responseCode = "400", 
            description = "E-mail já cadastrado",
            content = @Content(
                examples = @ExampleObject(
                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":400,\"message\":\"E-mail já cadastrado\"}"
                )
            )
        ),
        @ApiResponse(
            responseCode = "404", 
            description = "Administrador não encontrado",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "401", 
            description = "Não autorizado",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "403", 
            description = "Acesso negado - apenas ADMIN",
            content = @Content
        )
    })
    public ResponseEntity<?> atualizarAdmin(@PathVariable Long id, @RequestBody @Valid CadastroAdminDTO data) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin não encontrado"));

        if (!admin.getEmail().equals(data.email()) && adminRepository.findByEmail(data.email()) != null) {
            Map<String, Object> error = new HashMap<>();
            error.put("timestamp", LocalDateTime.now().toString());
            error.put("status", 400);
            error.put("message", "E-mail já cadastrado");
            return ResponseEntity.badRequest().body(error);
        }

        admin.setEmail(data.email());
        if (data.senha() != null && !data.senha().isEmpty()) {
            admin.setSenha(new BCryptPasswordEncoder().encode(data.senha()));
        }
        admin.setUser(data.user() != null ? data.user() : data.email());

        adminRepository.save(admin);
        
        Map<String, Object> success = new HashMap<>();
        success.put("timestamp", LocalDateTime.now().toString());
        success.put("status", 200);
        success.put("message", "Administrador atualizado com sucesso!");
        return ResponseEntity.ok(success);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar administrador")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Administrador deletado com sucesso",
            content = @Content(
                examples = @ExampleObject(
                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":200,\"message\":\"Administrador deletado com sucesso!\"}"
                )
            )
        ),
        @ApiResponse(
            responseCode = "400", 
            description = "Não é possível deletar o último administrador",
            content = @Content(
                examples = @ExampleObject(
                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":400,\"message\":\"Não é possível deletar o último administrador\"}"
                )
            )
        ),
        @ApiResponse(
            responseCode = "401", 
            description = "Não autorizado",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "403", 
            description = "Acesso negado - apenas ADMIN",
            content = @Content
        )
    })
    public ResponseEntity<?> deletarAdmin(@PathVariable Long id) {
        if (adminRepository.count() <= 1) {
            Map<String, Object> error = new HashMap<>();
            error.put("timestamp", LocalDateTime.now().toString());
            error.put("status", 400);
            error.put("message", "Não é possível deletar o último administrador");
            return ResponseEntity.badRequest().body(error);
        }

        adminRepository.deleteById(id);
        
        Map<String, Object> success = new HashMap<>();
        success.put("timestamp", LocalDateTime.now().toString());
        success.put("status", 200);
        success.put("message", "Administrador deletado com sucesso!");
        return ResponseEntity.ok(success);
    }
}