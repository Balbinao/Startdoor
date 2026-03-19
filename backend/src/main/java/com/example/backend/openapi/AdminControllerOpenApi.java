package com.example.backend.openapi;

import com.example.backend.dto.CadastroAdminDTO;
import com.example.backend.model.Admin;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Tag(name = "👑 Administradores", description = "Operações exclusivas para administradores (requer role ADMIN)")
public interface AdminControllerOpenApi {

    @Operation(summary = "Criar novo administrador")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Administrador criado com sucesso",
                    content = @Content(
                            examples = @ExampleObject(
                                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":200,\"message\":\"Administrador criado com sucesso!\"}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "E-mail já cadastrado",
                    content = @Content(
                            examples = @ExampleObject(
                                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":400,\"message\":\"E-mail já cadastrado\"}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Não autorizado",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas ADMIN",
                    content = @Content
            )
    })
    ResponseEntity<?> criarAdmin(CadastroAdminDTO data);

    @Operation(summary = "Listar todos os administradores")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista retornada com sucesso",
                    content = @Content(schema = @Schema(implementation = Admin.class))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Não autorizado",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas ADMIN",
                    content = @Content
            )
    })
    ResponseEntity<List<Admin>> listarAdmins();

    @Operation(summary = "Buscar administrador por ID")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Administrador encontrado",
                    content = @Content(schema = @Schema(implementation = Admin.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Administrador não encontrado",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Não autorizado",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas ADMIN",
                    content = @Content
            )
    })
    ResponseEntity<?> buscarAdmin(Long id);

    @Operation(summary = "Atualizar administrador")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Administrador atualizado com sucesso",
                    content = @Content(
                            examples = @ExampleObject(
                                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":200,\"message\":\"Administrador atualizado com sucesso!\"}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "E-mail já cadastrado",
                    content = @Content(
                            examples = @ExampleObject(
                                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":400,\"message\":\"E-mail já cadastrado\"}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Administrador não encontrado",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Não autorizado",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas ADMIN",
                    content = @Content
            )
    })
    ResponseEntity<?> atualizarAdmin(Long id, CadastroAdminDTO data);

    @Operation(summary = "Deletar administrador")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Administrador deletado com sucesso",
                    content = @Content(
                            examples = @ExampleObject(
                                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":200,\"message\":\"Administrador deletado com sucesso!\"}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Não é possível deletar o último administrador",
                    content = @Content(
                            examples = @ExampleObject(
                                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":400,\"message\":\"Não é possível deletar o último administrador\"}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Não autorizado",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas ADMIN",
                    content = @Content
            )
    })
    ResponseEntity<?> deletarAdmin(Long id);
}
