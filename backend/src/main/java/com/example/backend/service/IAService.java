package com.example.backend.service;

import com.example.backend.dto.RecomendacaoIAResponseDTO;
import com.example.backend.exception.BadGatewayException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.ServiceUnavailableException;
import com.example.backend.model.Empresa;
import com.example.backend.model.EmpresaMedia;
import com.example.backend.model.EmpresaSetor;
import com.example.backend.model.Estudante;
import com.example.backend.model.EstudanteNotaCondi;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EmpresaSetorRepository;
import com.example.backend.repository.EstudanteRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IAService {

    private final EstudanteRepository estudanteRepository;
    private final EmpresaRepository empresaRepository;
    private final EmpresaSetorRepository empresaSetorRepository;
    private final HttpClient httpClient;
    private final String apiKey;
    private final String apiUrl;
    private final ObjectMapper objectMapper;

    public IAService(
            EstudanteRepository estudanteRepository,
            EmpresaRepository empresaRepository,
            EmpresaSetorRepository empresaSetorRepository,
            @Value("${gemini.api.key}") String apiKey,
            @Value("${gemini.api.url}") String apiUrl) {
        this.estudanteRepository = estudanteRepository;
        this.empresaRepository = empresaRepository;
        this.empresaSetorRepository = empresaSetorRepository;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
        this.objectMapper = new ObjectMapper();
    }

    @Transactional(readOnly = true)
    public RecomendacaoIAResponseDTO gerarRecomendacao(Long estudanteId, Long empresaId) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new ServiceUnavailableException("API key do Google Gemini não configurada. Defina a variável GEMINI_API_KEY.");
        }

        Estudante estudante = estudanteRepository.findById(estudanteId)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado com o ID: " + estudanteId));

        Empresa empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada com o ID: " + empresaId));

        List<EmpresaSetor> empresaSetores = empresaSetorRepository.findByEmpresaId(empresaId);
        String setoresStr = empresaSetores.stream()
                .map(es -> es.getSetor().getNome())
                .collect(Collectors.joining(", "));

        String prompt = montarPrompt(estudante, empresa, setoresStr);
        String texto = chamarGemini(prompt);
        return new RecomendacaoIAResponseDTO(texto);
    }

    private String montarPrompt(Estudante estudante, Empresa empresa, String setoresStr) {
        EstudanteNotaCondi nc = estudante.getNotaCondicional();
        EmpresaMedia m = empresa.getEmpresaMedia();

        return """
Você é um assistente de recomendação de empresas para estudantes.
Este match já foi validado pelo sistema — NÃO contradiga, questione ou desminta este match.

DADOS DO ESTUDANTE:
Nome: %s
Biografia: %s
Modelo de Trabalho Preferido: %s
Setor de Interesse: %s
Notas Condicionais (0-5): Ambiente=%d, Aprendizado=%d, Benefícios=%d, Cultura=%d, Efetivação=%d, Entrevista=%d, Feedback=%d, Infraestrutura=%d, Integração=%d, Remuneração=%d, Rotina=%d, Liderança=%d

DADOS DA EMPRESA:
Nome Fantasia: %s
Biografia: %s
Área de Atuação: %s
Setores: %s
Porte: %s
Estado Sede: %s
Médias Reais das Avaliações (0-5): Ambiente=%s, Aprendizado=%s, Benefícios=%s, Cultura=%s, Efetivação=%s, Entrevista=%s, Feedback=%s, Infraestrutura=%s, Integração=%s, Remuneração=%s, Rotina=%s, Liderança=%s
Média Geral: %s

Com base nessas informações, gere um texto EM PORTUGUÊS BRASILEIRO, em tom pessoal e acolhedor, justificando por que esta empresa é uma boa recomendação para este estudante.

REGRAS:
- Comece mencionando algo da biografia ou preferências do estudante, sem citar o nome dele
- Destaque 2-3 competências onde a média da empresa SUPERA a nota condicional do estudante, comparando os valores
- Mencione a compatibilidade com os setores/área de atuação da empresa quando relevante
- Termine com uma frase positiva sobre o match
- Máximo de 4 a 5 frases
- Apenas texto simples — NÃO use markdown, negrito, itálico ou qualquer formatação especial
- NÃO inclua saudações como "Olá" ou "Prezado"
""".formatted(
                valor(estudante.getNome()),
                valor(estudante.getBiografia()),
                valor(estudante.getModeloTrabalho()),
                valor(estudante.getSetorInteresse()),
                nc != null ? nc.getAmbiente() : 0,
                nc != null ? nc.getAprendizado() : 0,
                nc != null ? nc.getBeneficios() : 0,
                nc != null ? nc.getCultura() : 0,
                nc != null ? nc.getEfetivacao() : 0,
                nc != null ? nc.getEntrevista() : 0,
                nc != null ? nc.getFeedback() : 0,
                nc != null ? nc.getInfraestrutura() : 0,
                nc != null ? nc.getIntegracao() : 0,
                nc != null ? nc.getRemuneracao() : 0,
                nc != null ? nc.getRotina() : 0,
                nc != null ? nc.getLideranca() : 0,
                valor(empresa.getNomeFantasia()),
                valor(empresa.getBiografia()),
                valor(empresa.getAreaAtuacao()),
                setoresStr.isEmpty() ? "Não informado" : setoresStr,
                valor(empresa.getTamanhoEmpresa()),
                valor(empresa.getEstadoSede()),
                mediaStr(m != null ? m.getMediaAmbiente() : null),
                mediaStr(m != null ? m.getMediaAprendizado() : null),
                mediaStr(m != null ? m.getMediaBeneficios() : null),
                mediaStr(m != null ? m.getMediaCultura() : null),
                mediaStr(m != null ? m.getMediaEfetivacao() : null),
                mediaStr(m != null ? m.getMediaEntrevista() : null),
                mediaStr(m != null ? m.getMediaFeedback() : null),
                mediaStr(m != null ? m.getMediaInfraestrutura() : null),
                mediaStr(m != null ? m.getMediaIntegracao() : null),
                mediaStr(m != null ? m.getMediaRemuneracao() : null),
                mediaStr(m != null ? m.getMediaRotina() : null),
                mediaStr(m != null ? m.getMediaLideranca() : null),
                mediaStr(m != null ? m.getMediaGeral() : null)
        );
    }

    private String chamarGemini(String prompt) {
        try {
            ObjectNode requestBody = objectMapper.createObjectNode();
            ObjectNode content = objectMapper.createObjectNode();
            var parts = objectMapper.createArrayNode();
            ObjectNode part = objectMapper.createObjectNode();

            part.put("text", prompt);
            parts.add(part);
            content.set("parts", parts);

            var contents = objectMapper.createArrayNode();
            contents.add(content);
            requestBody.set("contents", contents);

            String requestJson = objectMapper.writeValueAsString(requestBody);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl + "?key=" + apiKey))
                    .header("Content-Type", "application/json")
                    .timeout(Duration.ofSeconds(30))
                    .POST(HttpRequest.BodyPublishers.ofString(requestJson))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                throw new BadGatewayException("API Gemini retornou erro " + response.statusCode() + ": " + response.body());
            }

            JsonNode responseNode = objectMapper.readTree(response.body());

            if (!responseNode.has("candidates") || responseNode.get("candidates").isEmpty()) {
                throw new RuntimeException("Resposta inválida ou vazia da API Gemini.");
            }

            JsonNode candidate = responseNode.get("candidates").get(0);

            if (candidate.has("finishReason")) {
                String finishReason = candidate.get("finishReason").asText();
                if ("SAFETY".equals(finishReason) || "PROHIBITED".equals(finishReason)) {
                    throw new RuntimeException("Conteúdo bloqueado pelas políticas de segurança da IA.");
                }
            }

            return candidate
                    .get("content")
                    .get("parts")
                    .get(0)
                    .get("text")
                    .asText();

        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new BadGatewayException("Erro ao comunicar com a API Gemini: " + e.getMessage());
        }
    }

    private String valor(String s) {
        return s != null && !s.isBlank() ? s : "Não informado";
    }

    private String mediaStr(BigDecimal v) {
        return v != null ? v.toPlainString() : "0";
    }
}
