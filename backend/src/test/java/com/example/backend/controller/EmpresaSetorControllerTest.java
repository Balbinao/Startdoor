package com.example.backend.controller;

import com.example.backend.model.Empresa;
import com.example.backend.model.Setor;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EmpresaSetorRepository;
import com.example.backend.repository.SetorRepository;
import com.example.backend.security.TokenService;
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

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class EmpresaSetorControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private SetorRepository setorRepository;

    @Autowired
    private EmpresaSetorRepository empresaSetorRepository;

    @Autowired
    private TokenService tokenService;

    private Empresa empresa;
    private Setor setor;
    private String tokenEmpresa;

    @BeforeEach
    void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        criarDados_basicos();
    }

    private void criarDados_basicos() {
        UUID uuid = UUID.randomUUID();

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

        tokenEmpresa = tokenService.gerarToken(empresa);

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                empresa, null, empresa.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    @Test
    @DisplayName("CT-SETOR-001: Remover setor da empresa sem erro de FK")
    void deveRemoverSetorDaEmpresaSemErro() throws Exception {
        mockMvc.perform(post("/empresas/" + empresa.getId() + "/setores")
                        .header("Authorization", "Bearer " + tokenEmpresa)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"setorId\": " + setor.getId() + "}"))
                .andExpect(status().isOk());

        mockMvc.perform(delete("/empresas/" + empresa.getId() + "/setores/" + setor.getId())
                        .header("Authorization", "Bearer " + tokenEmpresa))
                .andExpect(status().isNoContent());
    }
}
