package com.example.backend.service;

import com.example.backend.exception.ServiceUnavailableException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Base64;

@Service
public class EmailService {

    private final String apiKey;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    private final SpringTemplateEngine templateEngine;
    private final String bannerBase64;

    public EmailService(
            @Value("${resend.api.key}") String apiKey,
            SpringTemplateEngine templateEngine) throws IOException {
        this.apiKey = apiKey;
        this.templateEngine = templateEngine;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
        this.objectMapper = new ObjectMapper();

        var resource = new ClassPathResource("templates/email/images/banner-email.svg");
        byte[] bytes = resource.getInputStream().readAllBytes();
        this.bannerBase64 = "data:image/svg+xml;base64," + Base64.getEncoder().encodeToString(bytes);
    }

    public void enviarCodigoRecuperacao(String destinatario, String codigo) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new ServiceUnavailableException("API key do Resend não configurada. Defina a variável RESEND_API_KEY.");
        }

        Context context = new Context();
        context.setVariable("codigo", codigo);
        context.setVariable("bannerBase64", bannerBase64);

        String html = templateEngine.process("email/recuperacao-senha", context);

        try {
            ObjectNode payload = objectMapper.createObjectNode();
            payload.put("from", "Startdoor <onboarding@resend.dev>");
            payload.put("to", destinatario);
            payload.put("subject", "Código de Recuperação - Startdoor");
            payload.put("html", html);

            String json = objectMapper.writeValueAsString(payload);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.resend.com/emails"))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .timeout(Duration.ofSeconds(15))
                    .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                JsonNode err = objectMapper.readTree(response.body());
                String msg = err.has("message") ? err.get("message").asText() : response.body();
                throw new RuntimeException("Resend retornou erro " + response.statusCode() + ": " + msg);
            }

        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar email via Resend: " + e.getMessage(), e);
        }
    }
}
