package com.example.backend.service;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Properties;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assumptions.assumeFalse;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
@Tag("integration")
class IAServiceIT {

    @DynamicPropertySource
    static void carregarKey(DynamicPropertyRegistry registry) throws IOException {
        var resource = new ClassPathResource("application-local.properties");
        if (resource.exists()) {
            var props = new Properties();
            try (var is = resource.getInputStream()) {
                props.load(is);
            }
            String key = props.getProperty("gemini.api.key");
            if (key != null && !key.isBlank()) {
                registry.add("gemini.api.key", () -> key);
            }
        }
    }

    @Autowired
    private IAService iaService;

    @Autowired
    private EstudanteRepository estudanteRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private EmpresaSetorRepository empresaSetorRepository;

    @Autowired
    private SetorRepository setorRepository;

    private Long estudanteId;
    private Long empresaId;

    @BeforeEach
    void setup() throws IOException {
        var resource = new ClassPathResource("application-local.properties");
        String key = resource.exists() ? lerKey(resource) : "";
        assumeFalse(key.isBlank() || key.equals("test-key"),
                "GEMINI_API_KEY não encontrada no application-local.properties");

        var setor = new Setor();
        setor.setNome("Desenvolvimento de Software");
        setor = setorRepository.save(setor);

        var empresa = new Empresa();
        empresa.setNomeFantasia("TechSolutions Brasil");
        empresa.setBiografia("Empresa de tecnologia especializada em soluções cloud, com mais de 10 anos de mercado e forte cultura de aprendizado contínuo.");
        empresa.setAreaAtuacao("Tecnologia");
        empresa.setPaisOrigem("Brasil");
        empresa.setEstadoSede("SP");
        empresa.setTamanhoEmpresa("Grande");
        empresa.setCnpj("11222333000181");
        empresa.setEmail("contato@techsolutions.com.br");
        empresa.setSenha("senha123");

        var media = new EmpresaMedia();
        media.setMediaAmbiente(new BigDecimal("4.5"));
        media.setMediaAprendizado(new BigDecimal("4.8"));
        media.setMediaBeneficios(new BigDecimal("3.5"));
        media.setMediaCultura(new BigDecimal("4.2"));
        media.setMediaEfetivacao(new BigDecimal("3.0"));
        media.setMediaEntrevista(new BigDecimal("3.5"));
        media.setMediaFeedback(new BigDecimal("4.0"));
        media.setMediaInfraestrutura(new BigDecimal("4.3"));
        media.setMediaIntegracao(new BigDecimal("3.8"));
        media.setMediaRemuneracao(new BigDecimal("3.5"));
        media.setMediaRotina(new BigDecimal("3.5"));
        media.setMediaLideranca(new BigDecimal("4.0"));
        media.setMediaGeral(new BigDecimal("3.88"));
        empresa.setEmpresaMedia(media);
        empresa = empresaRepository.save(empresa);
        empresaId = empresa.getId();

        var empresaSetor = new EmpresaSetor();
        empresaSetor.setEmpresaId(empresaId);
        empresaSetor.setSetorId(setor.getId());
        empresaSetor.setEmpresa(empresa);
        empresaSetor.setSetor(setor);
        empresaSetorRepository.save(empresaSetor);

        var estudante = new Estudante();
        estudante.setNome("João Silva");
        estudante.setBiografia("Sou estudante de Ciência da Computação, apaixonado por tecnologia e inovação. Busco uma empresa que valorize aprendizado e crescimento profissional.");
        estudante.setModeloTrabalho("Híbrido");
        estudante.setSetorInteresse("Desenvolvimento de Software");
        estudante.setCpf("52998224725");
        estudante.setEmail("joao.silva@email.com");
        estudante.setUser("joaosilva");
        estudante.setSenha("senha123");
        estudante.setPaisOrigem("Brasil");
        estudante.setEstadoAtuacao("SP");
        estudante = estudanteRepository.save(estudante);

        var nc = new EstudanteNotaCondi();
        nc.setEstudante(estudante);
        nc.setAmbiente(4);
        nc.setAprendizado(5);
        nc.setBeneficios(3);
        nc.setCultura(4);
        nc.setEfetivacao(3);
        nc.setEntrevista(2);
        nc.setFeedback(4);
        nc.setInfraestrutura(3);
        nc.setIntegracao(3);
        nc.setRemuneracao(3);
        nc.setRotina(3);
        nc.setLideranca(4);
        estudanteRepository.save(estudante);

        estudanteId = estudante.getId();
    }

    @Test
    void deveGerarJustificativaCompleta() {
        var resposta = iaService.gerarRecomendacao(estudanteId, empresaId);
        assertNotNull(resposta);
        String texto = resposta.textoJustificativa();
        assertNotNull(texto);
        assertFalse(texto.isBlank());


        assertTrue(texto.toLowerCase().contains("techsolutions"));
        assertTrue(
                texto.toLowerCase().contains("aprendizado")
                        || texto.toLowerCase().contains("ambiente")
                        || texto.toLowerCase().contains("cultura")
                        || texto.toLowerCase().contains("feedback")
        );
        assertTrue(
                texto.contains("é") || texto.contains("você")
                        || texto.contains("está") || texto.contains("uma")
        );
        assertFalse(texto.contains("**"));
        assertFalse(texto.contains("##"));
        assertFalse(texto.contains("  - "));
    }

    private String lerKey(ClassPathResource resource) throws IOException {
        var props = new Properties();
        try (var is = resource.getInputStream()) {
            props.load(is);
        }
        return props.getProperty("gemini.api.key", "");
    }
}
