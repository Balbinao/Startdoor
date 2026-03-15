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

@RestController
@RequestMapping("auth")
@Tag(name = "🔐 Autenticação", description = "Endpoints para login e cadastro de usuários na plataforma")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final EstudanteRepository estudanteRepository;
    private final EmpresaRepository empresaRepository;
    private final AdminRepository adminRepository;  // 👈 ADICIONADO
    private final TokenService tokenService;

    // 👈 CONSTRUTOR ATUALIZADO COM ADMIN
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
    @Operation(
        summary = "Realizar login na plataforma",
        description = """
            Autentica um usuário (estudante, empresa ou admin) e retorna:
            * **token** - JWT para autenticação
            * **id** - ID do usuário no banco de dados
            * **tipo** - Tipo de usuário (ADMIN, ESTUDANTE ou EMPRESA)
            
            **Regras:**
            * Email e senha são obrigatórios
            * O token expira em 2 horas
            * Use o token no header: `Authorization: Bearer {token}`
            """
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Login realizado com sucesso",
            content = @Content(
                mediaType = "application/json",
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
            description = "Credenciais inválidas (email ou senha incorretos)",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "400", 
            description = "Dados de entrada inválidos",
            content = @Content
        )
    })
    public ResponseEntity<?> login(@RequestBody @Valid LoginDTO data) {
        try {
            // 1. Autenticar o usuário
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
            var auth = this.authenticationManager.authenticate(usernamePassword);

            // 2. Gerar o token JWT
            var userDetails = (UserDetails) auth.getPrincipal();
            var token = tokenService.gerarToken(userDetails);

            // 3. Buscar o usuário no banco para pegar ID e tipo
            Long userId = null;
            UserRole userRole = null;

            // 3.1 Tenta como estudante
            var estudante = estudanteRepository.findByEmail(data.email());
            if (estudante != null) {
                userId = ((Estudante) estudante).getId();
                userRole = UserRole.ESTUDANTE;
            }
            // 3.2 Tenta como empresa
            else {
                var empresa = empresaRepository.findByEmail(data.email());
                if (empresa != null) {
                    userId = ((Empresa) empresa).getId();
                    userRole = UserRole.EMPRESA;
                }
                // 3.3 Tenta como admin
                else {
                    var admin = adminRepository.findByEmail(data.email());
                    if (admin != null) {
                        userId = ((Admin) admin).getId();
                        userRole = UserRole.ADMIN;
                    }
                }
            }

            // 4. Retornar o DTO completo
            return ResponseEntity.ok(new LoginResponseDTO(token, userId, userRole));

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }
    }

    @PostMapping("/cadastrar/estudante")
    @Operation(
        summary = "Cadastrar novo estudante",
        description = """
            Registra um novo estudante na plataforma.
            
            **Campos obrigatórios:**
            * `nome` - Nome completo
            * `cpf` - 11 dígitos (apenas números)
            * `user` - Nome de usuário único
            * `email` - Email válido e único
            * `senha` - Senha de acesso
            
            **Regras de validação:**
            * CPF deve ter 11 dígitos
            * Email deve ser único no sistema
            * Username deve ser único
            """
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Estudante cadastrado com sucesso",
            content = @Content(examples = @ExampleObject(value = "Estudante cadastrado com sucesso!"))
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Erro de validação - retorna a mensagem específica",
            content = @Content(examples = {
                @ExampleObject(name = "Email duplicado", value = "E-mail já cadastrado"),
                @ExampleObject(name = "CPF duplicado", value = "CPF já cadastrado"),
                @ExampleObject(name = "Username duplicado", value = "Username já em uso")
            })
        )
    })
    public ResponseEntity registerEstudante(@RequestBody @Valid CadastroEstudanteDTO data) {
        if (this.estudanteRepository.findByEmail(data.email()) != null)
            return ResponseEntity.badRequest().body("E-mail já cadastrado");
        if (this.estudanteRepository.existsByCpf(data.cpf()))
            return ResponseEntity.badRequest().body("CPF já cadastrado");
        if (this.estudanteRepository.existsByUser(data.user()))
            return ResponseEntity.badRequest().body("Username já em uso");

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
    @Operation(
        summary = "Cadastrar nova empresa",
        description = """
            Registra uma nova empresa na plataforma.
            
            **Campos obrigatórios:**
            * `nome_fantasia` - Nome fantasia da empresa
            * `cnpj` - 14 dígitos (apenas números)
            * `email` - Email corporativo válido e único
            * `senha` - Senha de acesso
            
            **Regras de validação:**
            * CNPJ deve ter 14 dígitos
            * Email deve ser único no sistema
            * O campo 'user' é automaticamente definido como o email
            """
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Empresa cadastrada com sucesso",
            content = @Content(examples = @ExampleObject(value = "Empresa cadastrada com sucesso!"))
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Erro de validação - retorna a mensagem específica",
            content = @Content(examples = {
                @ExampleObject(name = "Email duplicado", value = "E-mail corporativo já cadastrado"),
                @ExampleObject(name = "CNPJ duplicado", value = "CNPJ já cadastrado")
            })
        )
    })
    public ResponseEntity registerEmpresa(@RequestBody @Valid CadastroEmpresaDTO data) {
        if (this.empresaRepository.findByEmail(data.email()) != null) {
            return ResponseEntity.badRequest().body("E-mail corporativo já cadastrado");
        }
        if (this.empresaRepository.existsByCnpj(data.cnpj()))
            return ResponseEntity.badRequest().body("CNPJ já cadastrado");

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