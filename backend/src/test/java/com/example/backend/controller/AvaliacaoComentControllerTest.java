package com.example.backend.controller;

import com.example.backend.model.Empresa;
import com.example.backend.model.EmpresaAvaliacaoComent;
import com.example.backend.model.Estudante;
import com.example.backend.model.EstudanteAvaliacaoComent;
import com.example.backend.model.Setor;
import com.example.backend.repository.EmpresaAvaliacaoComentRepository;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteAvaliacaoComentRepository;
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
import java.util.List;
import java.util.Map;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class AvaliacaoComentControllerTest {

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
    private EstudanteAvaliacaoComentRepository comentarioRepository;

    @Autowired
    private EmpresaAvaliacaoComentRepository empresaComentarioRepository;

    @Autowired
    private TokenService tokenService;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());

    private Estudante estudante;
    private Empresa empresa;
    private Setor setor;
    private Long avaliacaoId;
    private String tokenEstudante;
    private String tokenEmpresa;

    @BeforeEach
    void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        criarDados_basicos();
    }

    private void criarDados_basicos() {
        java.util.UUID uuid = java.util.UUID.randomUUID();
        
        setor = new Setor();
        setor.setNome("Tecnologia");
        setor = setorRepository.save(setor);

        empresa = new Empresa();
        empresa.setUuid(uuid.toString());
        empresa.setNomeFantasia("Tech Brasil");
        empresa.setEmail("tech@empresa.com");
        empresa.setCnpj("12345678901234");
        empresa.setSenha(passwordEncoder.encode("senha123"));
        empresa.setUser("techbrasil");
        empresa = empresaRepository.save(empresa);

        estudante = new Estudante();
        estudante.setUuid(java.util.UUID.randomUUID().toString());
        estudante.setNome("João Silva");
        estudante.setEmail("joao@email.com");
        estudante.setUser("joaosilva");
        estudante.setSenha(passwordEncoder.encode("senha123"));
        estudante.setCpf("12345678901");
        estudante = estudanteRepository.save(estudante);

        tokenEstudante = tokenService.gerarToken(estudante);
        tokenEmpresa = tokenService.gerarToken(empresa);

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                estudante, null, estudante.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);

        avaliacaoId = criarAvaliacaoTeste();
    }

    @Test
    @DisplayName("CT-CMT-001: Criar comentário de estudante")
    void deveCriarComentarioDeEstudante() throws Exception {
        Map<String, String> comentario = new HashMap<>();
        comentario.put("texto", "Ótima avaliação, parabéns!");

        mockMvc.perform(post("/avaliacoes/" + avaliacaoId + "/comentarios-estudante")
                        .header("Authorization", "Bearer " + tokenEstudante)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(comentario)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Comentário criado com sucesso!"));
    }

    @Test
    @DisplayName("CT-CMT-002: Listar comentários de estudantes")
    void deveListarComentariosDeEstudantes() throws Exception {
        criarComentarioTeste();

        mockMvc.perform(get("/avaliacoes/" + avaliacaoId + "/comentarios-estudante"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].texto").value("Comentário de teste"))
                .andExpect(jsonPath("$[0].avaliacaoId").value(avaliacaoId));
    }

    @Test
    @DisplayName("CT-CMT-003: Criar comentário sem autenticação (rota pública)")
    void devePermitirCriacaoSemAutenticacao() throws Exception {
        Map<String, String> comentario = new HashMap<>();
        comentario.put("texto", "Comentário público");

        mockMvc.perform(post("/avaliacoes/" + avaliacaoId + "/comentarios-estudante")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(comentario)))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("CT-CMT-004: Deletar próprio comentário")
    void deveDeletarProprioComentario() throws Exception {
        Long comentarioId = criarComentarioTeste();

        mockMvc.perform(delete("/avaliacoes/comentarios-estudante/" + comentarioId)
                        .header("Authorization", "Bearer " + tokenEstudante))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("CT-CMT-005: Criar comentário de empresa")
    void deveCriarComentarioDeEmpresa() throws Exception {
        Map<String, String> comentario = new HashMap<>();
        comentario.put("texto", "Obrigado pelo feedback!");

        UsernamePasswordAuthenticationToken authEmpresa = new UsernamePasswordAuthenticationToken(
                empresa, null, List.of(new SimpleGrantedAuthority("ROLE_EMPRESA")));
        SecurityContextHolder.getContext().setAuthentication(authEmpresa);

        mockMvc.perform(post("/avaliacoes/" + avaliacaoId + "/comentarios-empresa")
                        .header("Authorization", "Bearer " + tokenEmpresa)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(comentario)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Comentário criado com sucesso!"));
    }

    @Test
    @DisplayName("CT-CMT-006: Listar comentários da empresa")
    void deveListarComentariosDaEmpresa() throws Exception {
        criarComentarioEmpresaTeste();

        mockMvc.perform(get("/avaliacoes/" + avaliacaoId + "/comentarios-empresa"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].texto").value("Resposta da empresa"))
                .andExpect(jsonPath("$[0].avaliacaoId").value(avaliacaoId));
    }

    @Test
    @DisplayName("CT-CMT-007: Deletar comentário da empresa")
    void deveDeletarComentarioDaEmpresa() throws Exception {
        Long comentarioId = criarComentarioEmpresaTeste();

        UsernamePasswordAuthenticationToken authEmpresa = new UsernamePasswordAuthenticationToken(
                empresa, null, List.of(new SimpleGrantedAuthority("ROLE_EMPRESA")));
        SecurityContextHolder.getContext().setAuthentication(authEmpresa);

        mockMvc.perform(delete("/avaliacoes/comentarios-empresa/" + comentarioId)
                        .header("Authorization", "Bearer " + tokenEmpresa))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("CT-CMT-008: Retornar username da empresa no comentário")
    void deveRetornarUsernameEmpresaNoComentario() throws Exception {
        criarComentarioEmpresaTeste();

        mockMvc.perform(get("/avaliacoes/" + avaliacaoId + "/comentarios-empresa"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].usernameEmpresa").value("techbrasil"))
                .andExpect(jsonPath("$[0].nomeEmpresa").value("Tech Brasil"));
    }

    @Test
    @DisplayName("CT-CMT-009: Verificar que numRespostas não existe no comentário de estudante")
    void deveVerificarQueNumRespostasNaoExiste() throws Exception {
        criarComentarioTeste();

        mockMvc.perform(get("/avaliacoes/" + avaliacaoId + "/comentarios-estudante"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0]").doesNotHaveJsonPath());
    }

    @Test
    @DisplayName("CT-CMT-010: Verificar que numRespostas não existe no comentário de empresa")
    void deveVerificarQueNumRespostasNaoExisteEmpresa() throws Exception {
        criarComentarioEmpresaTeste();

        mockMvc.perform(get("/avaliacoes/" + avaliacaoId + "/comentarios-empresa"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0]").doesNotHaveJsonPath());
    }

    private Map<String, Object> criarMapaAvaliacaoValida() {
        Map<String, Object> map = new HashMap<>();
        map.put("idEmpresa", empresa.getId());
        map.put("idSetor", setor.getId());
        map.put("estadoAtuacao", "SP");
        map.put("modeloTrabalho", "Presencial");
        map.put("dataInicio", "2023-01-01");
        map.put("tituloCargo", "Estagiário");
        map.put("textoAvaliacao", "Teste");
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

    private Long criarComentarioTeste() {
        var avaliacao = avaliacaoRepository.findByEmpresaId(empresa.getId()).get(0);
        var comentario = new EstudanteAvaliacaoComent();
        comentario.setEstudante(estudante);
        comentario.setAvaliacao(avaliacao);
        comentario.setTexto("Comentário de teste");
        return comentarioRepository.save(comentario).getId();
    }

    private Long criarComentarioEmpresaTeste() {
        var avaliacao = avaliacaoRepository.findByEmpresaId(empresa.getId()).get(0);
        var comentario = new EmpresaAvaliacaoComent();
        comentario.setEmpresa(empresa);
        comentario.setAvaliacao(avaliacao);
        comentario.setTexto("Resposta da empresa");
        return empresaComentarioRepository.save(comentario).getId();
    }
}