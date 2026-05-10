package com.example.backend.openapi;

import com.example.backend.dto.PontosFortesFracosResponseDTO;
import com.example.backend.dto.RecomendacaoResponseDTO;
import com.example.backend.model.Estudante;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Tag(name = "🎯 Match de Compatibilidade", description = "Cálculo de pontos fortes e fracos entre Estudante e Empresa E Recomendações")
public interface MatchControllerOpenApi {

    @Operation(summary = "Calcular match da Empresa com o Estudante")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Cálculo realizado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = PontosFortesFracosResponseDTO.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Estudante ainda não preencheu as notas condicionais",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Empresa ou Estudante não encontrados",
                    content = @Content
            )
    })
    ResponseEntity<PontosFortesFracosResponseDTO> getMatch(
            @AuthenticationPrincipal Estudante estudanteLogado,
            @Parameter(description = "ID da empresa a ser avaliada") @PathVariable Long empresaId
    );

    @Operation(summary = "Listar Top 5 Recomendações por Afinidade",
            description = "Calcula a similaridade entre o perfil do estudante e todas as empresas da base, retornando um ranking por porcentagem.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Ranking de recomendações gerado com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = RecomendacaoResponseDTO.class))
                    )
            ),
            @ApiResponse(
                    responseCode = "422",
                    description = "Estudante ainda não configurou seu perfil de preferências",
                    content = @Content
            )
    })
    ResponseEntity<List<RecomendacaoResponseDTO>> getRecomendacoes(
            @AuthenticationPrincipal Estudante estudanteLogado
    );
}
