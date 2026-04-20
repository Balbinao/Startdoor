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
                                
                                ## ⚠️ Credenciais de Teste (Desenvolvimento)

                                **👑 Administrador Padrão**
                                - Email: admin@startdoor.com
                                - Senha: 123456

                                ---

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

                                | Método | Endpoint | Permissão |
                                |--------|----------|-----------|
                                | GET | /setores/ | Público |
                                | POST | /setores/ | ADMIN |
                                | PUT | /setores/{id} | ADMIN |
                                | DELETE | /setores/{id} | ADMIN |
                                | GET | /empresas/{id}/setores | Público |
                                | POST | /empresas/{id}/setores | ADMIN ou Dono |
                                | DELETE | /empresas/{id}/setores/{setorId} | ADMIN ou Dono |
                                | GET | /empresas/ | Público |
                                | GET | /empresas/{id} | Público |
                                | GET |	/empresas/pesquisa | Público |
                                | PUT | /empresas/{id} | Própria empresa ou ADMIN |
                                | PUT | /empresas/{id}/foto	| ADMIN ou empresa |
                                | DELETE | /empresas/{id}/foto | ADMIN ou empresa |
                                | DELETE | /empresas/{id} | Própria empresa ou ADMIN |
                                | GET | /estudantes | ADMIN |
                                | GET | /estudantes/{id} | Próprio estudante ou ADMIN |
                                | PUT | /estudantes/{id} | Próprio estudante ou ADMIN |
                                | PUT | /estudantes/{id}/foto |	Próprio estudante ou ADMIN
                                | DELETE | /estudantes/{id}/foto |Próprio estudante ou ADMIN
                                | DELETE | /estudantes/{id} | Próprio estudante ou ADMIN |
                                | GET | /estudantes/notas-condi | ADMIN |
                                | GET | /estudantes/notas-condi/{id} | Próprio estudante ou ADMIN |
                                | PUT | /estudantes/notas-condi/{id} | Próprio estudante ou ADMIN |
                                | POST | /experiencias-academicas/estudante/{estudanteId} |	Próprio estudante ou ADMIN
                                | GET |	/experiencias-academicas/estudante/{estudanteId} | Público
                                | GET |	/experiencias-academicas/{id} |	Público
                                | PUT | /experiencias-academicas/{id} | Próprio estudante ou ADMIN
                                | DELETE | /experiencias-academicas/{id} | Próprio estudante ou ADMIN
                                | POST| /experiencias-profissionais/estudante/{estudanteId}	| Próprio estudante ou ADMIN
                                | GET | /experiencias-profissionais/estudante/{estudanteId}	| Público
                                | GET | /avaliacoes/estudante/ | Público |
                                | GET | /avaliacoes/estudante/{id} | Público |
                                | POST | /avaliacoes/estudante/{id} | ESTUDANTE, ADMIN |
                                | PUT | /avaliacoes/{id} | ADMIN ou ESTUDANTE (dono) |
                                | DELETE | /avaliacoes/{id} | ADMIN ou ESTUDANTE (dono) |
                                | GET | /avaliacoes/{id}/comentarios-estudante | Público |
                                | POST | /avaliacoes/{id}/comentarios-estudante | ESTUDANTE, ADMIN |
                                | PUT | /avaliacoes/comentarios-estudante/{id} | ADMIN ou ESTUDANTE (dono) |
                                | DELETE | /avaliacoes/comentarios-estudante/{id} | ADMIN ou ESTUDANTE (dono) |
                                | GET | /avaliacoes/{id}/comentarios-empresa | Público |
                                | POST | /avaliacoes/{id}/comentarios-empresa | EMPRESA, ADMIN |
                                | PUT | /avaliacoes/comentarios-empresa/{id} | ADMIN ou EMPRESA (dona) |
                                | DELETE | /avaliacoes/comentarios-empresa/{id} | ADMIN ou EMPRESA (dona) |
                                | GET | /admin/ | ADMIN |


                                ## 🔒 Anonimato

                                ### Avaliações
                                - Campo: `anonima` (boolean, obrigatório)
                                - Quando `true`: Na resposta da API, os dados do estudante (nome, foto, username, ID) retornam como `null`
                                - Quando `false`: Todos os dados do estudante são retornados normalmente

                                ### Comentários de Estudante
                                - Campo: `anonima` (boolean, obrigatório)
                                - Quando `true`: Na resposta da API, os dados do estudante (nome, foto, username, ID) retornam como `null`
                                - Quando `false`: Todos os dados do estudante são retornados normalmente

                                ### Observações
                                - O campo `anonima` sempre é retornado na resposta para que o frontend identifique se é anônimo
                                - Mesmo em avaliações/comentários anônimos, o ID do estudante é armazenado no banco para integridade referencial
                                - Apenas os dados visíveis são ocultados nas respostas da API

                                ## Funcionalidades
                                * 🔐 Autenticação com JWT (retorna ID e tipo do usuário)
                                * 👨‍🎓 Cadastro e gerenciamento de estudantes
                                * 🏢 Cadastro e gerenciamento de empresas
                                * 👑 Gerenciamento de administradores
                                * ⭐ Sistema de avaliações de empresas por estudantes
                                * 💬 Sistema de comentários (estudantes e empresas)
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
