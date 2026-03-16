package com.example.backend.controller;

import com.example.backend.dto.CadastroEmpresaDTO;
import com.example.backend.dto.CadastroEstudanteDTO;
import com.example.backend.dto.LoginDTO;
import com.example.backend.dto.LoginResponseDTO;
import com.example.backend.model.Admin;
import com.example.backend.model.Empresa;
import com.example.backend.model.Estudante;
import com.example.backend.model.enums.UserRole;
import com.example.backend.repository.AdminRepository;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteRepository;
import com.example.backend.security.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("auth")
@Tag(name = "🔐 Autenticação", description = "Endpoints para login e cadastro de usuários na plataforma")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final EstudanteRepository estudanteRepository;
    private final EmpresaRepository empresaRepository;
    private final AdminRepository adminRepository;
    private final TokenService tokenService;

    public AuthController(
            AuthenticationManager authenticationManager,
            EstudanteRepository estudanteRepository,
            EmpresaRepository empresaRepository,
            AdminRepository adminRepository,
            TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.estudanteRepository = estudanteRepository;
        this.empresaRepository = empresaRepository;
        this.adminRepository = adminRepository;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    @Operation(summary = "Realizar login na plataforma")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Login realizado com sucesso",
            content = @Content(
                schema = @Schema(implementation = LoginResponseDTO.class),
                examples = @ExampleObject(
                    value = """
                    {
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        "id": 1,
                        "tipo": "ESTUDANTE"
                    }
                    """
                )
            )
        ),
        @ApiResponse(
            responseCode = "401", 
            description = "Credenciais inválidas",
            content = @Content(
                examples = @ExampleObject(
                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":401,\"message\":\"Credenciais inválidas\"}"
                )
            )
        ),
        @ApiResponse(
            responseCode = "400", 
            description = "Dados de entrada inválidos",
            content = @Content
        )
    })
    public ResponseEntity<?> login(@RequestBody @Valid LoginDTO data) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
            var auth = this.authenticationManager.authenticate(usernamePassword);

            var userDetails = (UserDetails) auth.getPrincipal();
            var token = tokenService.gerarToken(userDetails);

            Long userId = null;
            UserRole userRole = null;

            var estudante = estudanteRepository.findByEmail(data.email());
            if (estudante != null) {
                userId = ((Estudante) estudante).getId();
                userRole = UserRole.ESTUDANTE;
            } else {
                var empresa = empresaRepository.findByEmail(data.email());
                if (empresa != null) {
                    userId = ((Empresa) empresa).getId();
                    userRole = UserRole.EMPRESA;
                } else {
                    var admin = adminRepository.findByEmail(data.email());
                    if (admin != null) {
                        userId = ((Admin) admin).getId();
                        userRole = UserRole.ADMIN;
                    }
                }
            }

            return ResponseEntity.ok(new LoginResponseDTO(token, userId, userRole));

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("timestamp", LocalDateTime.now().toString());
            error.put("status", 401);
            error.put("message", "Credenciais inválidas");
            return ResponseEntity.status(401).body(error);
        }
    }

    @PostMapping("/cadastrar/estudante")
    @Operation(summary = "Cadastrar novo estudante")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Estudante cadastrado com sucesso",
            content = @Content(
                examples = @ExampleObject(
                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":200,\"message\":\"Estudante cadastrado com sucesso!\"}"
                )
            )
        ),
        @ApiResponse(
            responseCode = "400", 
            description = "Erro de validação",
            content = @Content(
                examples = @ExampleObject(
                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":400,\"message\":\"E-mail já cadastrado\"}"
                )
            )
        )
    })
    public ResponseEntity<?> registerEstudante(@RequestBody @Valid CadastroEstudanteDTO data) {
        if (this.estudanteRepository.findByEmail(data.email()) != null) {
            Map<String, Object> error = new HashMap<>();
            error.put("timestamp", LocalDateTime.now().toString());
            error.put("status", 400);
            error.put("message", "E-mail já cadastrado");
            return ResponseEntity.badRequest().body(error);
        }
        
        if (this.estudanteRepository.existsByCpf(data.cpf())) {
            Map<String, Object> error = new HashMap<>();
            error.put("timestamp", LocalDateTime.now().toString());
            error.put("status", 400);
            error.put("message", "CPF já cadastrado");
            return ResponseEntity.badRequest().body(error);
        }
        
        if (this.estudanteRepository.existsByUser(data.user())) {
            Map<String, Object> error = new HashMap<>();
            error.put("timestamp", LocalDateTime.now().toString());
            error.put("status", 400);
            error.put("message", "Username já em uso");
            return ResponseEntity.badRequest().body(error);
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
        Estudante newEstudante = new Estudante();
        newEstudante.setNome(data.nome());
        newEstudante.setCpf(data.cpf());
        newEstudante.setUser(data.user());
        newEstudante.setEmail(data.email());
        newEstudante.setSenha(encryptedPassword);
        this.estudanteRepository.save(newEstudante);
        
        Map<String, Object> success = new HashMap<>();
        success.put("timestamp", LocalDateTime.now().toString());
        success.put("status", 200);
        success.put("message", "Estudante cadastrado com sucesso!");
        return ResponseEntity.ok(success);
    }

    @PostMapping("/cadastrar/empresa")
    @Operation(summary = "Cadastrar nova empresa")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Empresa cadastrada com sucesso",
            content = @Content(
                examples = @ExampleObject(
                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":200,\"message\":\"Empresa cadastrada com sucesso!\"}"
                )
            )
        ),
        @ApiResponse(
            responseCode = "400", 
            description = "Erro de validação",
            content = @Content(
                examples = {
                    @ExampleObject(name = "Email duplicado", value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":400,\"message\":\"E-mail corporativo já cadastrado\"}"),
                    @ExampleObject(name = "CNPJ duplicado", value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":400,\"message\":\"CNPJ já cadastrado\"}")
                }
            )
        )
    })
    public ResponseEntity<?> registerEmpresa(@RequestBody @Valid CadastroEmpresaDTO data) {
        if (this.empresaRepository.findByEmail(data.email()) != null) {
            Map<String, Object> error = new HashMap<>();
            error.put("timestamp", LocalDateTime.now().toString());
            error.put("status", 400);
            error.put("message", "E-mail corporativo já cadastrado");
            return ResponseEntity.badRequest().body(error);
        }
        
        if (this.empresaRepository.existsByCnpj(data.cnpj())) {
            Map<String, Object> error = new HashMap<>();
            error.put("timestamp", LocalDateTime.now().toString());
            error.put("status", 400);
            error.put("message", "CNPJ já cadastrado");
            return ResponseEntity.badRequest().body(error);
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
        Empresa newEmpresa = new Empresa();
        newEmpresa.setNomeFantasia(data.nomeFantasia());
        newEmpresa.setCnpj(data.cnpj());
        newEmpresa.setEmail(data.email());
        newEmpresa.setUser(data.email());
        newEmpresa.setSenha(encryptedPassword);
        this.empresaRepository.save(newEmpresa);
        
        Map<String, Object> success = new HashMap<>();
        success.put("timestamp", LocalDateTime.now().toString());
        success.put("status", 200);
        success.put("message", "Empresa cadastrada com sucesso!");
        return ResponseEntity.ok(success);
    }
}