package com.example.backend.openapi;

import com.example.backend.dto.*;
import com.example.backend.model.Estudante;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "👨‍🎓 Estudantes", description = "Operações de CRUD para gerenciamento de estudantes")
@SecurityRequirement(name = "Bearer Authentication")
public interface EstudanteControllerOpenApi {

    @Operation(summary = "Cadastrar novo estudante")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Estudante cadastrado com sucesso",
                    content = @Content(
                            examples = @ExampleObject(
                                    value = "{\"timestamp\":\"2026-03-16T12:00:00\",\"status\":200,\"message\":\"Estudante cadastrado com sucesso!\"}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Erro de validação ou dados já cadastrados",
                    content = @Content(
                            examples = {
                                    @ExampleObject(name = "Email duplicado", value = "{\"timestamp\":\"2026-03-16T12:00:00\",\"status\":400,\"message\":\"E-mail já cadastrado no sistema\"}"),
                                    @ExampleObject(name = "CPF duplicado", value = "{\"timestamp\":\"2026-03-16T12:00:00\",\"status\":400,\"message\":\"CPF já cadastrado\"}"),
                                    @ExampleObject(name = "Username duplicado", value = "{\"timestamp\":\"2026-03-16T12:00:00\",\"status\":400,\"message\":\"Username já em uso\"}")
                            }
                    )
            )
    })
    ResponseEntity<?> cadastrar(CadastroEstudanteDTO data);

    @Operation(summary = "Listar todos os estudantes")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista retornada com sucesso",
                    content = @Content(schema = @Schema(implementation = Estudante.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Token JWT ausente, inválido ou expirado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado — apenas ADMIN",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":403,\"message\":\"Acesso negado: você não tem permissão para acessar este recurso\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}"
                    ))
            )
    })
    ResponseEntity<List<EstudanteResponseDTO>> listar();

    @Operation(summary = "Buscar estudante por ID")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Estudante encontrado com sucesso",
                    content = @Content(schema = @Schema(implementation = Estudante.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Estudante não encontrado",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":404,\"message\":\"Estudante não encontrado com o ID: 1\"}"))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Token JWT ausente, inválido ou expirado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado — apenas próprio estudante ou ADMIN",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":403,\"message\":\"Acesso negado: você não tem permissão para acessar este recurso\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}"
                    ))
            )
    })
    ResponseEntity<EstudanteResponseDTO> buscar(Long id);

    @Operation(summary = "Atualizar dados de um estudante")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Dados atualizados com sucesso",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":200,\"message\":\"Dados atualizados com sucesso\"}"))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Estudante não encontrado",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":404,\"message\":\"Estudante não encontrado com o ID: 1\"}"))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Dados inválidos",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":400,\"message\":\"Erro de validação\"}"))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Token JWT ausente, inválido ou expirado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado — apenas próprio estudante ou ADMIN",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":403,\"message\":\"Acesso negado: você não tem permissão para acessar este recurso\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}"
                    ))
            )
    })
    ResponseEntity<?> atualizar(Long id, AtualizarEstudanteDTO data);

    @Operation(summary = "Deletar estudante")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "Estudante deletado com sucesso (sem conteúdo)",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Estudante não encontrado",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":404,\"message\":\"Estudante não encontrado com o ID: 1\"}"))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Token JWT ausente, inválido ou expirado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado — apenas próprio estudante ou ADMIN",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":403,\"message\":\"Acesso negado: você não tem permissão para acessar este recurso\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}"
                    ))
            )
    })
    ResponseEntity<?> deletar(Long id);

    @Operation(summary = "Alterar senha do estudante")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Senha alterada com sucesso",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-03-16T10:00:00\",\"status\":200,\"message\":\"Senha alterada com sucesso\"}"))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Dados inválidos ou senha atual incorreta",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-03-16T10:00:00\",\"status\":400,\"message\":\"Senha atual incorreta ou nova senha inválida\"}"))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Estudante não encontrado",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-03-16T10:00:00\",\"status\":404,\"message\":\"Estudante não encontrado com o ID: 1\"}"))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Token JWT ausente, inválido ou expirado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-03-16T10:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado — apenas o próprio estudante ou ADMIN",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-03-16T10:00:00\",\"status\":403,\"message\":\"Acesso negado: você não tem permissão para acessar este recurso\"}"
                    ))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-03-16T10:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}"
                    ))
            )
    })
    ResponseEntity<?> alterarSenha(Long id, AlterarSenhaDTO data);


    @Operation(summary = "Adicionar/Atualizar foto de perfil")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Foto atualizada com sucesso",
                    content = @Content(schema = @Schema(implementation = EstudanteResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Arquivo inválido (deve ser imagem)"),
            @ApiResponse(responseCode = "404", description = "Estudante não encontrado"),
            @ApiResponse(responseCode = "403", description = "Token JWT ausente, inválido ou expirado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"))),
            @ApiResponse(responseCode = "403", description = "Acesso negado — apenas próprio estudante ou ADMIN",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":403,\"message\":\"Acesso negado: você não tem permissão para acessar este recurso\"}"))),
            @ApiResponse(responseCode = "500", description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}")))
    })
    ResponseEntity<EstudanteResponseDTO> uploadFoto(
            @PathVariable Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Arquivo de imagem para upload",
                    required = true
            ) FotoUploadDTO fotoDto
    );

    @Operation(summary = "Remover foto de perfil")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Foto removida com sucesso"),
            @ApiResponse(responseCode = "404", description = "Estudante não encontrado"),
            @ApiResponse(responseCode = "403", description = "Token JWT ausente, inválido ou expirado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":403,\"message\":\"Acesso negado: token ausente ou inválido\"}"))),
            @ApiResponse(responseCode = "403", description = "Acesso negado — apenas próprio estudante ou ADMIN",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":403,\"message\":\"Acesso negado: você não tem permissão para acessar este recurso\"}"))),
            @ApiResponse(responseCode = "500", description = "Erro interno inesperado no servidor",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-09T12:00:00\",\"status\":500,\"message\":\"Ocorreu um erro interno no servidor.\"}")))
    })
    ResponseEntity<Void> removerFoto(Long id);
}


