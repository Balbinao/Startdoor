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

}