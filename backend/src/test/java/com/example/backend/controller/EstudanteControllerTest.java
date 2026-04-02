package com.example.backend.controller;

import com.example.backend.model.Estudante;
import com.example.backend.repository.EstudanteRepository;
import com.example.backend.security.TokenService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class EstudanteControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EstudanteRepository estudanteRepository;

    @Autowired
    private TokenService tokenService;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());

    @BeforeEach
    void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    @DisplayName("CT-CAD-001: Cadastro válido de estudante")
    void deveCadastrarEstudanteComSucesso() throws Exception {
        Map<String, Object> estudanteValido = Map.of(
                "nome", "Lucas Silva",
                "user", "lucasuser",
                "email", "lucas@email.com",
                "senha", "senha123",
                "cpf", "12345678900"
        );
        mockMvc.perform(post("/estudantes/cadastrar/estudante")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(estudanteValido)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Estudante cadastrado com sucesso!"));
    }

    @Test
    @DisplayName("CT-CAD-002: Campos vazios no cadastro de estudante")
    void deveRetornarErroQuandoCamposEstiveremVazios() throws Exception {
        Map<String, Object> dadosVazios = Map.of(
                "nome", "",
                "user", "",
                "email", "",
                "senha", "",
                "cpf", ""
        );
        mockMvc.perform(post("/estudantes/cadastrar/estudante")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dadosVazios)))

                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    @DisplayName("CT-CAD-003: Nome inválido (menos de 5 caracteres)")
    void deveRetornarErroQuandoNomeForMuitoCurto() throws Exception {
        Map<String, Object> dadosNomeCurto = Map.of(
                "nome", "Ana",
                "user", "anauser123",
                "email", "ana@email.com",
                "senha", "senha123",
                "cpf", "12345678902"
        );
        mockMvc.perform(post("/estudantes/cadastrar/estudante")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dadosNomeCurto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Nome precisa ter pelo menos 5 caracteres"));
    }

    @Test
    @DisplayName("CT-CAD-004: Username inválido (menos de 8 caracteres)")
    void deveRetornarErroQuandoUsernameForMuitoCurto() throws Exception {
        Map<String, Object> dadosUserCurto = Map.of(
                "nome", "Lucas Silva",
                "user", "lucas",
                "email", "lucas.teste@email.com",
                "senha", "senha123",
                "cpf", "12345678903"
        );
        mockMvc.perform(post("/estudantes/cadastrar/estudante")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dadosUserCurto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Username precisa ter pelo menos 8 caracteres"));
    }

    @Test
    @DisplayName("CT-CAD-005: CPF inválido (formato incorreto)")
    void deveRetornarErroQuandoCpfTiverLetrasOuTamanhoErrado() throws Exception {
        Map<String, Object> dadosCpfInvalido = Map.of(
                "nome", "Lucas Silva",
                "user", "lucassilva123",
                "email", "lucas.cpf@email.com",
                "senha", "senha123",
                "cpf", "12345abc"
        );
        mockMvc.perform(post("/estudantes/cadastrar/estudante")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dadosCpfInvalido)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("CPF deve ter exatamente 11 dígitos numéricos"));
    }

    @Test
    @DisplayName("CT-CAD-006: Email inválido (formato incorreto)")
    void deveRetornarErroQuandoEmailNaoTiverFormatoValido() throws Exception {
        Map<String, Object> dadosEmailInvalido = Map.of(
                "nome", "André Silva",
                "user", "andresilva123",
                "email", "andreemail.com",
                "senha", "senha123",
                "cpf", "12345678904"
        );
        mockMvc.perform(post("/estudantes/cadastrar/estudante")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dadosEmailInvalido)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Email inválido"));
    }

    @Test
    @DisplayName("CT-CAD-007: Email já cadastrado")
    void deveRetornarErroQuandoEmailJaExistirNoBanco() throws Exception {
        String emailDuplicado = "estudante.existente@email.com";
        Map<String, Object> estudante1 = Map.of(
                "nome", "Estudante Um",
                "user", "estudante123",
                "email", emailDuplicado,
                "senha", "senha123",
                "cpf", "12345678905"
        );
        mockMvc.perform(post("/estudantes/cadastrar/estudante")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(estudante1)))
                .andExpect(status().isOk());

        Map<String, Object> estudante2 = Map.of(
                "nome", "Estudante Dois",
                "user", "outroestudante99",
                "email", emailDuplicado,
                "senha", "outrasenha",
                "cpf", "98765432100"
        );
        mockMvc.perform(post("/estudantes/cadastrar/estudante")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(estudante2)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("E-mail já cadastrado no sistema"));
    }

    @Test
    @DisplayName("CT-ALT-001: Alteração com email já cadastrado")
    void deveRetornarErroAoTentarUsarEmailDeOutroUsuario() throws Exception {
        Estudante estudanteA = new Estudante();
        estudanteA.setNome("Lucas");
        estudanteA.setEmail("lucas@email.com");
        estudanteA.setUser("lucas123");
        estudanteA.setSenha(passwordEncoder.encode("senha123"));
        estudanteA = estudanteRepository.save(estudanteA);
        Estudante estudanteB = new Estudante();
        estudanteB.setNome("Jorge");
        estudanteB.setEmail("jorge@email.com");
        estudanteB.setUser("jorge123");
        estudanteRepository.save(estudanteB);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                estudanteA, null, estudanteA.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = gerarTokenParaTeste(estudanteA);

        Map<String, String> dadosConflitantes = Map.of(
                "nome", "Lucas Silva",
                "user", "lucas_novo",
                "email", "jorge@email.com",
                "cpf", "11122233344"
        );

        mockMvc.perform(put("/estudantes/" + estudanteA.getId())
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dadosConflitantes)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Este e-mail já está em uso por outro usuário."));
        SecurityContextHolder.clearContext();
    }

    @Test
    @DisplayName("CT-ALT-002: Atualização válida sem alteração de senha")
    void deveAtualizarDadosMantendoSenhaInalterada() throws Exception {
        Estudante estudante = new Estudante();
        estudante.setNome("Lucas Silva");
        estudante.setEmail("lucas@email.com");
        estudante.setUser("lucas123");
        String senhaOriginalHash = passwordEncoder.encode("senhaForte123");
        estudante.setSenha(senhaOriginalHash);

        estudante = estudanteRepository.save(estudante);
        Long idGerado = estudante.getId();
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                estudante, null, estudante.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = gerarTokenParaTeste(estudante);

        Map<String, Object> dadosParaAtualizar = new HashMap<>();
        dadosParaAtualizar.put("nome", "Lucas Silva Souza");
        dadosParaAtualizar.put("user", "lucasuser123");
        dadosParaAtualizar.put("email", "lucas@email.com");
        dadosParaAtualizar.put("senha", "");
        dadosParaAtualizar.put("cpf", "11122233344");
        mockMvc.perform(put("/estudantes/" + idGerado)
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dadosParaAtualizar)))
                .andDo(print())
                .andExpect(status().isOk());
        Estudante atualizado = (Estudante) estudanteRepository.findById(idGerado).get();
        assertEquals("Lucas Silva Souza", atualizado.getNome());
        assertEquals("lucasuser123", atualizado.getUser());
        assertEquals(senhaOriginalHash, atualizado.getSenha(), "A senha não deveria ter mudado!");

        SecurityContextHolder.clearContext();
    }
    private String gerarTokenParaTeste(Estudante estudante) {
        return tokenService.gerarToken(estudante);
    }
}
