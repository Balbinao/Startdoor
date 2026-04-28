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
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Tag(name = "⭐ Favoritos", description = "Gerenciamento de empresas favoritas (exclusivo para ESTUDANTE)")
public interface FavoritoControllerOpenApi {

    @Operation(summary = "Alternar favorito (Favoritar/Desfavoritar)")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Operação realizada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Boolean.class),
                            examples = @ExampleObject(value = "true")
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Empresa não encontrada",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Não autorizado - requer login de estudante",
                    content = @Content
            )
    })
    ResponseEntity<Boolean> alternarFavorito(
            @AuthenticationPrincipal Estudante estudanteLogado,
            @Parameter(description = "ID da empresa a ser favoritada/removida", example = "10")
            @PathVariable Long empresaId
    );

    @Operation(summary = "Listar minhas empresas favoritas")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de favoritos retornada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = EmpresaResumoDTO.class))
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Não autorizado",
                    content = @Content
            )
    })
    ResponseEntity<List<EmpresaResumoDTO>> listarMeusFavoritos(
            @AuthenticationPrincipal Estudante estudanteLogado
    );
}