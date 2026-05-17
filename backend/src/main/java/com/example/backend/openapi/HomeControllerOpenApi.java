package com.example.backend.openapi;

import com.example.backend.dto.AvaliacaoRecenteDTO;
import com.example.backend.dto.EmpresaTopDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Tag(name = "🏠 Home", description = "Endpoints públicos para alimentar a home")
public interface HomeControllerOpenApi {

    @Operation(summary = "Busca as 4 avaliações mais recentes do sistema")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de avaliações recentes retornada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = AvaliacaoRecenteDTO.class))
                    )
            )
    })
    ResponseEntity<List<AvaliacaoRecenteDTO>> getAvaliacoesRecentes();

    @Operation(summary = "Busca as 4 empresas mais bem avaliadas do sistema")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de empresas de destaque retornada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = EmpresaTopDTO.class))
                    )
            )
    })
    ResponseEntity<List<EmpresaTopDTO>> getEmpresasTop();
}