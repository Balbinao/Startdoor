package com.example.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.Components;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Startdoor API - Documentação Oficial")
                        .description("""
                                API da plataforma Startdoor para avaliação de experiências de estágio.
                                
                                ## 🔐 Autenticação
                                Esta API utiliza JWT (JSON Web Token) para autenticação.
                                
                                **Como autenticar:**
                                1. Faça login no endpoint `/auth/login` com email e senha
                                2. A resposta conterá:
                                    - **token**: JWT para autenticação
                                    - **id**: ID do usuário no banco
                                    - **tipo**: "ADMIN", "ESTUDANTE" ou "EMPRESA"
                                3. Copie o token
                                4. Clique no botão **Authorize** abaixo
                                5. Insira: `Bearer {seu-token}`
                                6. Agora você pode testar os endpoints protegidos
                                
                                ## 👥 Tipos de Usuário
                                * **👨‍🎓 Estudante**: Pode avaliar empresas, comentar e favoritar
                                * **🏢 Empresa**: Pode visualizar seu perfil e avaliações
                                * **👑 Administrador**: Acesso total ao sistema (gerenciar usuários, empresas, etc)
                                
                                ## 📋 Permissões por Endpoint
                                * **GET /empresas/** → Público (todos podem ver)
                                * **PUT /empresas/{id}** → Apenas a própria empresa ou ADMIN
                                * **DELETE /empresas/{id}** → Apenas ADMIN
                                * **GET /estudantes** → Apenas ADMIN
                                * **GET /estudantes/{id}** → Próprio estudante ou ADMIN
                                * **PUT /estudantes/{id}** → Próprio estudante ou ADMIN
                                * **DELETE /estudantes/{id}** → Apenas ADMIN
                                * **/admin/** → Apenas ADMIN
                                
                                ## Funcionalidades
                                * 🔐 Autenticação com JWT (retorna ID e tipo do usuário)
                                * 👨‍🎓 Cadastro e gerenciamento de estudantes
                                * 🏢 Cadastro e gerenciamento de empresas
                                * 👑 Gerenciamento de administradores
                                * ⭐ Futuro: Avaliações e notas
                                """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Repositório Github Startdoor")
                                .url("https://github.com/Balbinao/Startdoor"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Servidor de Desenvolvimento Local")
                ))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Insira o token JWT no formato: Bearer {token}")
                        ))
                .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"));
    }
}