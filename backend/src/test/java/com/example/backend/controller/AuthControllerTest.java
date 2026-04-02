package com.example.backend.controller;

import com.example.backend.model.Estudante;
import com.example.backend.repository.EstudanteRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class AuthControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private EstudanteRepository estudanteRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());

    @BeforeEach
    void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    @DisplayName("CT-LOGIN-001: Login válido")
    void deveAutenticarUsuarioComSucesso() throws Exception {
        Estudante estudante = new Estudante();
        estudante.setNome("Lucas Silva");
        estudante.setEmail("lucas@email.com");
        estudante.setUser("lucassilva123");
        estudante.setCpf("12345678901");
        estudante.setSenha(passwordEncoder.encode("senha123"));
        estudanteRepository.save(estudante);

        Map<String, String> loginData = Map.of(
                "email", "lucas@email.com",
                "senha", "senha123"
        );


        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginData)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists());
    }

    @Test
    @DisplayName("CT-LOGIN-002: Senha incorreta")
    void deveNegarLoginQuandoSenhaForIncorreta() throws Exception {
        Estudante estudante = new Estudante();
        estudante.setNome("Lucas Silva");
        estudante.setEmail("lucas@email.com");
        estudante.setUser("lucassilva123");
        estudante.setCpf("12345678901");
        estudante.setSenha(passwordEncoder.encode("senha123"));
        estudanteRepository.save(estudante);
        Map<String, String> loginData = Map.of(
                "email", "lucas@email.com",
                "senha", "senhaErrada"
        );
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginData)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("CT-LOGIN-003: Usuário não cadastrado")
    void deveNegarLoginQuandoUsuarioNaoExistir() throws Exception {
        Map<String, String> loginData = Map.of(
                "email", "naoExiste@email.com",
                "senha", "senhaQualquer123"
        );
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginData)))

                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Credenciais inválidas"));
    }

    @Test
    @DisplayName("CT-LOGIN-004: Campos vazios")
    void deveRetornarErroQuandoCamposDeLoginEstiveremVazios() throws Exception {
        Map<String, String> loginVazio = Map.of(
                "email", "",
                "senha", ""
        );
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginVazio)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    @DisplayName("CT-LOGIN-005: Email inválido (formato incorreto no login)")
    void deveRetornarErroQuandoEmailDeLoginForInvalido() throws Exception {
        Map<String, String> loginEmailInvalido = Map.of(
                "email", "lucasemail.com",
                "senha", "senha123"
        );
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginEmailInvalido)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Formato de email inválido"));
    }

    @Test
    @DisplayName("CT-LOGIN-006: Sensibilidade a maiúsculas/minúsculas na senha")
    void deveNegarLoginQuandoSenhaTiverCaseIncorreto() throws Exception {
        Estudante estudante = new Estudante();
        estudante.setNome("Lucas Case");
        estudante.setEmail("lucas@email.com");
        estudante.setUser("lucascase123");
        estudante.setCpf("12345678907");
        estudante.setSenha(passwordEncoder.encode("Senha123"));
        estudanteRepository.save(estudante);
        Map<String, String> loginData = Map.of(
                "email", "lucas@email.com",
                "senha", "senha123"
        );
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginData)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Credenciais inválidas"));
    }
}
