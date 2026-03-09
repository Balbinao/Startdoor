package com.example.backend.controller;

import com.example.backend.dto.CadastroEmpresaDTO;
import com.example.backend.dto.CadastroEstudanteDTO;
import com.example.backend.dto.LoginDTO;
import com.example.backend.dto.LoginResponseDTO;
import com.example.backend.model.Empresa;
import com.example.backend.model.Estudante;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteRepository;
import com.example.backend.security.TokenService;
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

@RestController
@RequestMapping("auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final EstudanteRepository estudanteRepository;
    private final EmpresaRepository empresaRepository;
    private final TokenService tokenService;

    public AuthController(AuthenticationManager authenticationManager, EstudanteRepository estudanteRepository, EmpresaRepository empresaRepository, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.estudanteRepository = estudanteRepository;
        this.empresaRepository = empresaRepository;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.gerarToken((UserDetails) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/cadastrar/estudante")
    public ResponseEntity registerEstudante(@RequestBody @Valid CadastroEstudanteDTO data) {
        if (this.estudanteRepository.findByEmail(data.email()) != null) return ResponseEntity.badRequest().body("E-mail já cadastrado");
        if (this.estudanteRepository.existsByCpf(data.cpf())) return ResponseEntity.badRequest().body("CPF já cadastrado");
        if (this.estudanteRepository.existsByUser(data.user())) return ResponseEntity.badRequest().body("Username já em uso");
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());

        Estudante newEstudante = new Estudante();
        newEstudante.setNome(data.nome());
        newEstudante.setCpf(data.cpf());
        newEstudante.setUser(data.user());
        newEstudante.setEmail(data.email());
        newEstudante.setSenha(encryptedPassword);

        this.estudanteRepository.save(newEstudante);

        return ResponseEntity.ok("Estudante cadastrado com sucesso!");
    }

    @PostMapping("/cadastrar/empresa")
    public ResponseEntity registerEmpresa(@RequestBody @Valid CadastroEmpresaDTO data) {
        if (this.empresaRepository.findByEmail(data.email()) != null) {
            return ResponseEntity.badRequest().body("E-mail corporativo já cadastrado");
        }
        if (this.empresaRepository.existsByCnpj(data.cnpj())) return ResponseEntity.badRequest().body("CNPJ já cadastrado");

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());

        Empresa newEmpresa = new Empresa();
        newEmpresa.setNomeFantasia(data.nome_fantasia());
        newEmpresa.setCnpj(data.cnpj());
        newEmpresa.setEmail(data.email());
        newEmpresa.setUser(data.email());
        newEmpresa.setSenha(encryptedPassword);

        this.empresaRepository.save(newEmpresa);

        return ResponseEntity.ok("Empresa cadastrada com sucesso!");
    }
}
