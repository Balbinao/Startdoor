package com.example.backend.openapi;

import com.example.backend.dto.*;
import com.example.backend.model.Empresa;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;
import java.util.List;

@Tag(name = "🏢 Empresas", description = "Operações de CRUD para gerenciamento de empresas")
@SecurityRequirement(name = "Bearer Authentication")
public interface EmpresaControllerOpenApi {

    @Operation(summary = "Cadastrar nova empresa")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Empresa cadastrada com sucesso",
                    content = @Content(
                            examples = @ExampleObject(
                                    value = "{\"timestamp\":\"2026-03-16T12:00:00\",\"status\":200,\"message\":\"Empresa cadastrada com sucesso!\"}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Erro de validação",
                    content = @Content(
                            examples = {
                                    @ExampleObject(name = "Email duplicado", value = "{\"timestamp\":\"2026-03-16T12:00:00\",\"status\":400,\"message\":\"E-mail corporativo já cadastrado\"}"),
                                    @ExampleObject(name = "CNPJ duplicado", value = "{\"timestamp\":\"2026-03-16T12:00:00\",\"status\":400,\"message\":\"CNPJ já cadastrado\"}")
                            }
                    )
            )
    })
    ResponseEntity<?> cadastrar(CadastroEmpresaDTO data);

    @Operation(summary = "Listar todas as empresas")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista retornada com sucesso",
                    content = @Content(schema = @Schema(implementation = Empresa.class))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT ausente ou inválido",
                    content = @Content
            )
    })
    ResponseEntity<List<EmpresaResponseDTO>> listar();

    @Operation(summary = "Buscar empresa por ID")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Empresa encontrada com sucesso",
                    content = @Content(schema = @Schema(implementation = Empresa.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Empresa não encontrada",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":404,\"message\":\"Empresa não encontrada com o ID: 1\"}"))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT ausente ou inválido",
                    content = @Content
            )
    })
    ResponseEntity<EmpresaResponseDTO> buscar(Long id);


    @Operation(summary = "Atualizar dados de uma empresa")
    @PreAuthorize("hasAuthority('ADMIN') or @empresaSecurity.isOwner(#id)")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Empresa atualizada com sucesso",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":200,\"message\":\"Dados da empresa atualizados com sucesso!\"}"))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Empresa não encontrada",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":404,\"message\":\"Empresa não encontrada com o ID: 1\"}"))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Dados inválidos",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":400,\"message\":\"Erro de validação\"}"))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT ausente ou inválido",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas própria empresa ou ADMIN",
                    content = @Content
            )
    })
    ResponseEntity<?> atualizar(Long id, AtualizarEmpresaDTO data);


    @Operation(summary = "Deletar empresa")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "Empresa deletada com sucesso (sem conteúdo)",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Empresa não encontrada",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":404,\"message\":\"Empresa não encontrada com o ID: 1\"}"))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT ausente ou inválido",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas própria empresa ou ADMIN",
                    content = @Content
            )
    })
    ResponseEntity<?> deletar(Long id);

    @Operation(summary = "Alterar senha da empresa")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Senha da empresa alterada com sucesso",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-03-16T10:00:00\",\"status\":200,\"message\":\"Senha da empresa alterada com sucesso\"}"))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Dados inválidos ou senha atual incorreta",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-03-16T10:00:00\",\"status\":400,\"message\":\"Senha atual incorreta ou nova senha inválida\"}"))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Empresa não encontrada",
                    content = @Content(examples = @ExampleObject(value = "{\"timestamp\":\"2026-03-16T10:00:00\",\"status\":404,\"message\":\"Empresa não encontrada com o ID: 1\"}"))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT ausente ou inválido",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acesso negado - apenas a própria empresa ou ADMIN pode alterar a senha",
                    content = @Content
            )
    })
    ResponseEntity<?> alterarSenha(Long id, AlterarSenhaDTO data);

    @Operation(summary = "Adicionar/Atualizar foto da empresa")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Logo atualizado com sucesso",
                    content = @Content(schema = @Schema(implementation = EmpresaResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Arquivo inválido (deve ser imagem)"),
            @ApiResponse(responseCode = "404", description = "Empresa não encontrada")
    })
    ResponseEntity<EmpresaResponseDTO> uploadFoto(
            @PathVariable Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Arquivo de imagem para o logo",
                    required = true
            ) FotoUploadDTO fotoDto
    );

    @Operation(summary = "Remover logo da empresa")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Foto removida com sucesso"),
            @ApiResponse(responseCode = "404", description = "Empresa não encontrada")
    })
    ResponseEntity<Void> removerFoto(@PathVariable Long id);

    @Operation(summary = "Pesquisar empresas com filtros dinâmicos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pesquisa realizada com sucesso",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = EmpresaResumoDTO.class)))),
            @ApiResponse(responseCode = "401", description = "Token JWT ausente ou inválido", content = @Content)
    })
    ResponseEntity<Page<EmpresaResumoDTO>> pesquisar(

            @Parameter(description = "Nota média geral mínima", required = false) BigDecimal nota,
            @Parameter(description = "Faixa de receita anual", required = false) String receita,
            @Parameter(description = "Tamanho da empresa", required = false) String tamanho,
            @Parameter(description = "Nota mínima de Ambiente", required = false) Integer ambiente,
            @Parameter(description = "Nota mínima de Aprendizado", required = false) Integer aprendizado,
            @Parameter(description = "Nota mínima de Benefícios", required = false) Integer beneficios,
            @Parameter(description = "Nota mínima de Cultura", required = false) Integer cultura,
            @Parameter(description = "Nota mínima de Efetivação", required = false) Integer efetivacao,
            @Parameter(description = "Nota mínima de Entrevista", required = false) Integer entrevista,
            @Parameter(description = "Nota mínima de Feedback", required = false) Integer feedback,
            @Parameter(description = "Nota mínima de Infraestrutura", required = false) Integer infra,
            @Parameter(description = "Nota mínima de Integração", required = false) Integer integracao,
            @Parameter(description = "Nota mínima de Remuneração", required = false) Integer remuneracao,
            @Parameter(description = "Nota mínima de Rotina", required = false) Integer rotina,
            @Parameter(description = "Nota mínima de Liderança", required = false) Integer lideranca,
            @Parameter(description = "Configurações de paginação (page, size, sort)") Pageable pageable
    );

    @Operation(summary = "Listar setores de uma empresa")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de setores retornada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Empresa não encontrada")
    })
    ResponseEntity<List<EmpresaSetorResponseDTO>> listarSetoresDaEmpresa(Long id);

    @Operation(summary = "Adicionar setor à empresa")
    @PreAuthorize("hasRole('ADMIN') or @empresaSecurity.isOwner(#id)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Setor adicionado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Empresa ou Setor não encontrado"),
        @ApiResponse(responseCode = "409", description = "Setor já associado à empresa")
    })
    ResponseEntity<EmpresaSetorResponseDTO> adicionarSetor(Long id, AdicionarSetorEmpresaDTO data);

    @Operation(summary = "Remover setor da empresa")
    @PreAuthorize("hasRole('ADMIN') or @empresaSecurity.isOwner(#id)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Setor removido com sucesso"),
        @ApiResponse(responseCode = "404", description = "Vínculo não encontrado")
    })
    ResponseEntity<Void> removerSetor(Long id, Long setorId);
}
