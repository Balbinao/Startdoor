package com.example.backend.openapi;

import com.example.backend.dto.ForgotPasswordRequestDTO;
import com.example.backend.dto.LoginDTO;
import com.example.backend.dto.LoginResponseDTO;
import com.example.backend.dto.ResetPasswordDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "🔐 Autenticação", description = "Endpoints para login, cadastro e recuperação de senha")
public interface AuthControllerOpenApi {
    @Operation(summary = "Realizar login na plataforma")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Login realizado com sucesso",
                    content = @Content(
                            schema = @Schema(implementation = LoginResponseDTO.class),
                            examples = @ExampleObject(
                                    value = """
                    {
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        "id": 1,
                        "tipo": "ESTUDANTE"
                    }
                    """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Credenciais inválidas",
                    content = @Content(
                            examples = @ExampleObject(
                                    value = "{\"timestamp\":\"2024-01-01T00:00:00\",\"status\":401,\"message\":\"Credenciais inválidas\"}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Dados de entrada inválidos",
                    content = @Content
            )
    })
    ResponseEntity<?> login(LoginDTO data);

    @Operation(summary = "Solicitar código de recuperação de senha")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Se o email existir no sistema, um código será enviado",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-12T12:00:00\",\"status\":200,\"message\":\"Se o email existir no sistema, um código de recuperação será enviado.\"}"))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Email inválido",
                    content = @Content
            )
    })
    ResponseEntity<?> forgotPassword(@RequestBody @Valid ForgotPasswordRequestDTO data);

    @Operation(summary = "Redefinir senha com código de recuperação")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Senha redefinida com sucesso",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-12T12:00:00\",\"status\":200,\"message\":\"Senha redefinida com sucesso.\"}"))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Código inválido, expirado ou dados inválidos",
                    content = @Content(examples = @ExampleObject(
                            value = "{\"timestamp\":\"2026-05-12T12:00:00\",\"status\":400,\"message\":\"Código inválido ou expirado\"}"))
            )
    })
    ResponseEntity<?> resetPassword(@RequestBody @Valid ResetPasswordDTO data);
}
