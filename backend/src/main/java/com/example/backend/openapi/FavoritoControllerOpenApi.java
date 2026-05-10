package com.example.backend.openapi;

import com.example.backend.dto.EmpresaResumoDTO;
import com.example.backend.model.Estudante;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Tag(name = "⭐ Favoritos", description = "Gerenciamento de empresas favoritas (exclusivo para ESTUDANTE)")
@SecurityRequirement(name = "Bearer Authentication")
public interface FavoritoControllerOpenApi {

    @Operation(
            summary = "Alternar favorito (Favoritar/Desfavoritar)",
            description = "Se a empresa já estiver favoritada, remove dos favoritos. Caso contrário, adiciona. Retorna true se favoritou, false se desfavoritou."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Operação realizada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Boolean.class),
                            examples = {
                                    @ExampleObject(name = "Favoritou", summary = "Empresa foi adicionada aos favoritos", value = "true"),
                                    @ExampleObject(name = "Desfavoritou", summary = "Empresa foi removida dos favoritos", value = "false")
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Token JWT ausente ou inválido",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado — apenas estudante autenticado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":403,\"message\":\"Acesso negado: você não tem permissão para acessar este recurso\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Empresa não encontrada",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":404,\"message\":\"Empresa não encontrada\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}"
                    ))
            )
    })
    ResponseEntity<Boolean> alternarFavorito(
            @AuthenticationPrincipal Estudante estudanteLogado,
            @Parameter(description = "ID da empresa a ser favoritada ou removida dos favoritos", example = "10")
            @PathVariable Long empresaId
    );

    @Operation(
            summary = "Listar minhas empresas favoritas",
            description = "Retorna a lista de todas as empresas que o estudante autenticado favoritou. Pode retornar uma lista vazia se nenhuma empresa tiver sido favoritada ainda."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de favoritos retornada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = EmpresaResumoDTO.class)),
                            examples = {
                                    @ExampleObject(
                                            name = "Com favoritos",
                                            summary = "Estudante possui empresas favoritas",
                                            value = "[{\"id\":1,\"uuid\":\"uuid-1\",\"nomeFantasia\":\"GFT Technologies\",\"paisOrigem\":\"Alemanha\",\"estadoSede\":\"SP\",\"fotoUrl\":\"https://logo.clearbit.com/gft.com\",\"biografia\":\"Líder em tecnologia.\",\"areaAtuacao\":\"Tecnologia\",\"tamanhoEmpresa\":\"5001-10000\",\"mediaGeral\":4.47},{\"id\":16,\"uuid\":\"uuid-16\",\"nomeFantasia\":\"Itaú Unibanco\",\"paisOrigem\":\"Brasil\",\"estadoSede\":\"SP\",\"fotoUrl\":\"https://logo.clearbit.com/itau.com.br\",\"biografia\":\"O maior banco privado do Brasil.\",\"areaAtuacao\":\"Finanças\",\"tamanhoEmpresa\":\"50001-100000\",\"mediaGeral\":4.33}]"
                                    ),
                                    @ExampleObject(
                                            name = "Sem favoritos",
                                            summary = "Estudante não possui nenhuma empresa favoritada",
                                            value = "[]"
                                    )
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Token JWT ausente ou inválido",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado — apenas estudante autenticado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":403,\"message\":\"Acesso negado: você não tem permissão para acessar este recurso\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}"
                    ))
            )
    })
    ResponseEntity<List<EmpresaResumoDTO>> listarMeusFavoritos(
            @AuthenticationPrincipal Estudante estudanteLogado
    );
}