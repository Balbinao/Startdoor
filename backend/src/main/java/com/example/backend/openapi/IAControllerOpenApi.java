package com.example.backend.openapi;

import com.example.backend.dto.RecomendacaoIARequestDTO;
import com.example.backend.dto.RecomendacaoIAResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "IA", description = "Recomendações geradas por Inteligência Artificial")
@SecurityRequirement(name = "Bearer Authentication")
public interface IAControllerOpenApi {

    @Operation(summary = "Gerar justificativa de match com IA",
            description = "Recebe o ID do estudante e da empresa (match já calculado) e retorna um texto personalizado gerado pelo Google Gemini justificando a recomendação.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Justificativa gerada com sucesso",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"textoJustificativa\": \"Como você mencionou em seu perfil que valoriza aprendizado e busca o setor de Tecnologia, a Empresa X é recomendada pois sua nota em Aprendizado (4.5) supera sua nota condicional (3.0), além de ter uma cultura (4.2) bem avaliada que combina com suas expectativas.\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Dados inválidos na requisição ou erro ao processar a IA",
                    content = @Content(examples = {
                            @ExampleObject(
                                    name = "Erro de validação",
                                    summary = "Campos obrigatórios não informados",
                                    value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":400,\"message\":\"must not be null\"}"
                            ),
                            @ExampleObject(
                                    name = "Conteúdo bloqueado pela IA",
                                    summary = "Gemini bloqueou o conteúdo por segurança",
                                    value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":400,\"message\":\"Conteúdo bloqueado pelas políticas de segurança da IA.\"}"
                            ),
                            @ExampleObject(
                                    name = "Resposta inválida da IA",
                                    summary = "Gemini retornou formato inesperado",
                                    value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":400,\"message\":\"Resposta inválida ou vazia da API Gemini.\"}"
                            )
                    })
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Token JWT ausente, inválido ou expirado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado — apenas o próprio estudante ou ADMIN",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":403,\"message\":\"Acesso negado: você não tem permissão para acessar este recurso\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Estudante ou empresa não encontrado",
                    content = @Content(examples = {
                            @ExampleObject(
                                    name = "Estudante não encontrado",
                                    summary = "ID do estudante não existe no banco",
                                    value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":404,\"message\":\"Estudante não encontrado com o ID: 1\"}"
                            ),
                            @ExampleObject(
                                    name = "Empresa não encontrada",
                                    summary = "ID da empresa não existe no banco",
                                    value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":404,\"message\":\"Empresa não encontrada com o ID: 1\"}"
                            )
                    })
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "502",
                    description = "Erro na comunicação com o Google Gemini (serviço externo)",
                    content = @Content(examples = {
                            @ExampleObject(
                                    name = "Gemini indisponível",
                                    summary = "API Gemini retornou erro HTTP",
                                    value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":502,\"message\":\"API Gemini retornou erro 503: Service Unavailable\"}"
                            ),
                            @ExampleObject(
                                    name = "Falha de conexão",
                                    summary = "Não foi possível conectar ao Gemini",
                                    value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":502,\"message\":\"Erro ao comunicar com a API Gemini: Connection refused\"}"
                            )
                    })
            ),
            @ApiResponse(
                    responseCode = "503",
                    description = "API key do Google Gemini não configurada no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":503,\"message\":\"API key do Google Gemini não configurada. Defina a variável GEMINI_API_KEY.\"}"
                    ))
            )
    })
    ResponseEntity<RecomendacaoIAResponseDTO> gerarRecomendacao(@RequestBody @Valid RecomendacaoIARequestDTO request);
}
