package com.example.backend.controller;

import com.example.backend.model.Empresa;
import com.example.backend.model.Estudante;
import com.example.backend.model.Setor;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteAvaliacaoRepository;
import com.example.backend.repository.EstudanteRepository;
import com.example.backend.repository.SetorRepository;
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

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.startsWith;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class EstudanteAvaliacaoControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EstudanteRepository estudanteRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private SetorRepository setorRepository;

    @Autowired
    private EstudanteAvaliacaoRepository avaliacaoRepository;

    @Autowired
    private TokenService tokenService;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());

    private Estudante estudante;
    private Empresa empresa;
    private Setor setor;
    private String tokenEstudante;

    @BeforeEach
    void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        criarDados_basicos();
    }

    private void criarDados_basicos() {
        setor = new Setor();
        setor.setNome("Tecnologia");
        setor = setorRepository.save(setor);

        empresa = new Empresa();
        empresa.setNomeFantasia("Tech Brasil");
        empresa.setEmail("tech@empresa.com");
        empresa.setCnpj("12345678901234");
        empresa.setSenha(passwordEncoder.encode("senha123"));
        empresa.setUser("techbrasil");
        empresa = empresaRepository.save(empresa);

        estudante = new Estudante();
        estudante.setNome("João Silva");
        estudante.setEmail("joao@email.com");
        estudante.setUser("joaosilva");
        estudante.setSenha(passwordEncoder.encode("senha123"));
        estudante.setCpf("12345678901");
        estudante = estudanteRepository.save(estudante);

        tokenEstudante = tokenService.gerarToken(estudante);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                estudante, null, estudante.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    @Test
    @DisplayName("CT-AVAL-001: Criar avaliação válida")
    void deveCriarAvaliacaoComSucesso() throws Exception {
        Map<String, Object> avaliacaoValida = criarMapaAvaliacaoValida();

        mockMvc.perform(post("/avaliacoes/estudante/" + estudante.getId())
                        .header("Authorization", "Bearer " + tokenEstudante)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(avaliacaoValida)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Avaliação criada com sucesso!"));
    }

    @Test
    @DisplayName("CT-AVAL-002: Criar avaliação com empresa inexistente")
    void deveRetornarErroQuandoEmpresaNaoExistir() throws Exception {
        Map<String, Object> avaliacaoInvalida = criarMapaAvaliacaoValida();
        avaliacaoInvalida.put("idEmpresa", 99999L);

        mockMvc.perform(post("/avaliacoes/estudante/" + estudante.getId())
                        .header("Authorization", "Bearer " + tokenEstudante)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(avaliacaoInvalida)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Empresa não encontrada"));
    }

    @Test
    @DisplayName("CT-AVAL-003: Criar avaliação com data fim anterior à início")
    void deveRetornarErroQuandoDataFimForAnterior() throws Exception {
        Map<String, Object> avaliacaoInvalida = criarMapaAvaliacaoValida();
        avaliacaoInvalida.put("dataInicio", "2024-01-01");
        avaliacaoInvalida.put("dataFim", "2023-01-01");

        mockMvc.perform(post("/avaliacoes/estudante/" + estudante.getId())
                        .header("Authorization", "Bearer " + tokenEstudante)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(avaliacaoInvalida)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Data de término não pode ser anterior à data de início"));
    }

    @Test
    @DisplayName("CT-AVAL-004: Criar avaliação anônima")
    void deveCriarAvaliacaoAnonima() throws Exception {
        Map<String, Object> avaliacaoAnonima = criarMapaAvaliacaoValida();
        avaliacaoAnonima.put("anonima", true);

        mockMvc.perform(post("/avaliacoes/estudante/" + estudante.getId())
                        .header("Authorization", "Bearer " + tokenEstudante)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(avaliacaoAnonima)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Avaliação criada com sucesso!"));
    }

    @Test
    @DisplayName("CT-AVAL-005: Listar avaliações por empresa")
    void deveListarAvaliacoesPorEmpresa() throws Exception {
        criarAvaliacaoTeste();

        mockMvc.perform(get("/avaliacoes/empresa/" + empresa.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].empresaId").value(empresa.getId()))
                .andExpect(jsonPath("$[0].nomeEmpresa").value("Tech Brasil"));
    }

    @Test
    @DisplayName("CT-AVAL-006: Listar avaliações por estudante")
    void deveListarAvaliacoesPorEstudante() throws Exception {
        criarAvaliacaoTeste();

        mockMvc.perform(get("/avaliacoes/estudante/" + estudante.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].estudanteId").value(estudante.getId()));
    }

    @Test
    @DisplayName("CT-AVAL-007: Buscar avaliação por ID")
    void deveBuscarAvaliacaoPorId() throws Exception {
        Long avaliacaoId = criarAvaliacaoTeste();

        mockMvc.perform(get("/avaliacoes/" + avaliacaoId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(avaliacaoId))
                .andExpect(jsonPath("$.empresaId").value(empresa.getId()));
    }

    @Test
    @DisplayName("CT-AVAL-008: Buscar avaliação inexistente")
    void deveRetornarErroQuandoAvaliacaoNaoExistir() throws Exception {
        mockMvc.perform(get("/avaliacoes/99999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Avaliação não encontrada"));
    }

    @Test
    @DisplayName("CT-AVAL-009: Atualizar avaliação como admin")
    void deveAtualizarAvaliacao() throws Exception {
        Long avaliacaoId = criarAvaliacaoTeste();

        Map<String, Object> atualizacao = new HashMap<>();
        atualizacao.put("textoAvaliacao", "Avaliação atualizada");

        mockMvc.perform(put("/avaliacoes/" + avaliacaoId)
                        .header("Authorization", "Bearer " + tokenEstudante)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(atualizacao)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Avaliação atualizada com sucesso!"));
    }

    @Test
    @DisplayName("CT-AVAL-010: Deletar avaliação como admin")
    void deveDeletarAvaliacao() throws Exception {
        Long avaliacaoId = criarAvaliacaoTeste();

        mockMvc.perform(delete("/avaliacoes/" + avaliacaoId)
                        .header("Authorization", "Bearer " + tokenEstudante))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/avaliacoes/" + avaliacaoId))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("CT-AVAL-011: Negar criação de avaliação para outro estudante")
    void deveNegarCriacaoDeAvaliacaoParaOutroEstudante() throws Exception {
        Estudante estudante2 = new Estudante();
        estudante2.setNome("Maria Santos");
        estudante2.setEmail("maria@email.com");
        estudante2.setUser("mariasantos");
        estudante2.setSenha(passwordEncoder.encode("senha123"));
        estudante2.setCpf("98765432109");
        estudante2 = estudanteRepository.save(estudante2);

        mockMvc.perform(post("/avaliacoes/estudante/" + estudante2.getId())
                        .header("Authorization", "Bearer " + tokenEstudante)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(criarMapaAvaliacaoValida())))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("CT-AVAL-012: Retornar URL de foto completa com localhost")
    void deveRetornarUrlFotoCompleta() throws Exception {
        criarAvaliacaoTeste();

        mockMvc.perform(get("/avaliacoes/empresa/" + empresa.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].fotoUrlEmpresa").value(org.hamcrest.Matchers.startsWith("http://localhost:8080/fotos/")))
                .andExpect(jsonPath("$[0].fotoUrlEstudante").value(org.hamcrest.Matchers.startsWith("http://localhost:8080/fotos/")));
    }

    private Map<String, Object> criarMapaAvaliacaoValida() {
        Map<String, Object> map = new HashMap<>();
        map.put("idEmpresa", empresa.getId());
        map.put("idSetor", setor.getId());
        map.put("estadoAtuacao", "SP");
        map.put("modeloTrabalho", "Presencial");
        map.put("dataInicio", "2023-01-01");
        map.put("dataFim", "2024-01-01");
        map.put("tituloCargo", "Estagiário de Backend");
        map.put("textoAvaliacao", "Ótima empresa para trabalhar!");
        map.put("salarioMin", new BigDecimal("1500.00"));
        map.put("salarioMax", new BigDecimal("2000.00"));
        map.put("anonima", false);
        map.put("ambiente", 4);
        map.put("aprendizado", 5);
        map.put("beneficios", 3);
        map.put("cultura", 4);
        map.put("efetivacao", 4);
        map.put("entrevista", 5);
        map.put("feedback", 4);
        map.put("infraestrutura", 4);
        map.put("integracao", 3);
        map.put("remuneracao", 3);
        map.put("rotina", 4);
        map.put("lideranca", 4);
        return map;
    }

    private Long criarAvaliacaoTeste() {
        Map<String, Object> avaliacaoValida = criarMapaAvaliacaoValida();

        try {
            mockMvc.perform(post("/avaliacoes/estudante/" + estudante.getId())
                            .header("Authorization", "Bearer " + tokenEstudante)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(avaliacaoValida)))
                    .andExpect(status().isOk());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return avaliacaoRepository.findByEmpresaId(empresa.getId()).get(0).getId();
    }
}