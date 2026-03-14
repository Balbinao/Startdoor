## 📚 **README.md - Backend Startdoor** (atualizado)

```markdown
# 🚪 Startdoor Backend

Backend da plataforma Startdoor, desenvolvido com **Spring Boot** e **JWT** para autenticação.

## 📋 **VISÃO GERAL**

O backend atualmente possui **sistema de autenticação e CRUDs básicos** implementados:

### ✅ Funcionalidades Implementadas

- [x] Cadastro de Estudante
- [x] Cadastro de Empresa
- [x] Login com geração de token JWT
- [x] Listagem de Estudantes
- [x] Listagem de Empresas
- [x] Busca por ID (Estudante/Empresa)
- [x] Atualização de dados (Estudante/Empresa)
- [x] Exclusão (Estudante/Empresa)
- [x] Configuração CORS para frontend

## 🏗️ **ARQUITETURA**

```
src/main/java/com/example/backend/
├── controller/           # Endpoints da API
│   ├── AuthController.java
│   ├── EmpresaController.java
│   └── EstudanteController.java
├── service/              # Regras de negócio
│   ├── AuthService.java
│   ├── EmpresaService.java
│   └── EstudanteService.java
├── repository/           # Camada de dados
│   ├── EmpresaRepository.java
│   └── EstudanteRepository.java
├── model/                # Entidades JPA
│   ├── Empresa.java
│   └── Estudante.java
├── model/enums/          # ENUMS das entidades
│   ├── ModeloTrabalho.java
│   ├── ReceitaAnual.java
│   ├── TamanhoEmpresa.java
│   └── UserRole.java
├── dto/                  # Objetos de transferência
│   ├── LoginDTO.java
│   ├── LoginResponseDTO.java
│   ├── CadastroEmpresaDTO.java
│   ├── CadastroEstudanteDTO.java
│   ├── AtualizarEmpresaDTO.java
│   └── AtualizarEstudanteDTO.java
├── security/             # Configurações de segurança
│   ├── SecurityConfig.java
│   ├── SecurityFilter.java
│   └── TokenService.java
└── exception/            # Tratamento de erros
    ├── GlobalExceptionHandler.java
    └── ResourceNotFoundException.java
```

## 🚀 **TECNOLOGIAS**

- Java 17
- Spring Boot 3.x
- Spring Security
- JWT (Auth0)
- JPA / Hibernate
- PostgreSQL
- Maven
- Docker

## 📦 **COMANDOS DOCKER**

### Subir aplicação com Docker
```bash
# Build e start
docker-compose up --build

# Apenas start
docker-compose up

# Parar containers
docker-compose down
```

### Sem Docker (local)
```bash
# Linux/Mac
./mvnw spring-boot:run

# Windows
mvnw spring-boot:run
```

## 🔐 **ENDPOINTS**

> Base URL: `http://localhost:8080`

---

### 🔑 **Autenticação**

#### 1. Cadastrar Estudante
`POST /auth/cadastrar/estudante`

```json
{
  "nome": "João Silva",
  "cpf": "12345678901",
  "user": "joaosilva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

**Regras:**
- CPF: 11 dígitos, único
- Email: único
- User: único

**Respostas:**
- `200`: "Estudante cadastrado com sucesso!"
- `400`: "E-mail já cadastrado" / "CPF já cadastrado" / "Username já em uso"

---

#### 2. Cadastrar Empresa
`POST /auth/cadastrar/empresa`

```json
{
  "nome_fantasia": "Tech Solutions",
  "cnpj": "12345678000199",
  "email": "contato@tech.com",
  "senha": "123456"
}
```

**Regras:**
- CNPJ: 14 dígitos, único
- Email: único
- User: definido automaticamente como o email

**Respostas:**
- `200`: "Empresa cadastrada com sucesso!"
- `400`: "E-mail corporativo já cadastrado" / "CNPJ já cadastrado"

---

#### 3. Login
`POST /auth/login`

```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

**Resposta:**
```json
{
  "toker": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> ⚠️ **Nota:** O campo retornado é `toker` (typo). Utilize este valor como token JWT.

---

### 🏢 **Empresas**

#### 4. Listar todas empresas
`GET /empresas`

**Resposta:**
```json
[
  {
    "id": 1,
    "nomeFantasia": "Tech Solutions",
    "cnpj": "12345678000199",
    "email": "contato@tech.com",
    "user": "contato@tech.com",
    "createdAt": "2024-01-01T00:00:00"
  }
]
```

---

#### 5. Buscar empresa por ID
`GET /empresas/{id}`

**Resposta:** (200) ou erro 404 com mensagem "Empresa não encontrada"

---

#### 6. Atualizar empresa
`PUT /empresas/{id}`

```json
{
  "nome_fantasia": "Tech Solutions Updated",
  "email": "novo@tech.com"
}
```

**Campos atualizáveis:** `nome_fantasia`, `email`

**Resposta:** `200` - "Dados da empresa atualizados com sucesso!"

---

#### 7. Deletar empresa
`DELETE /empresas/{id}`

**Resposta:** `204 No Content`

---

### 👨‍🎓 **Estudantes**

#### 8. Listar todos estudantes
`GET /estudantes`

---

#### 9. Buscar estudante por ID
`GET /estudantes/{id}`

---

#### 10. Atualizar estudante
`PUT /estudantes/{id}`

```json
{
  "nome": "João Silva Updated",
  "user": "joaosilva_novo",
  "email": "joao.novo@email.com"
}
```

**Campos atualizáveis:** `nome`, `user`, `email`

**Resposta:** `200` - "Dados atualizados com sucesso"

---

#### 11. Deletar estudante
`DELETE /estudantes/{id}`

**Resposta:** `204 No Content`

---

## 🔑 **SOBRE O TOKEN JWT**

- **Expiração:** 2 horas
- **Header:** `Authorization: Bearer {token}`
- **Secret:** configurado em `application.properties`

## 🌐 **CORS**

Configurado para aceitar requisições do frontend em:
- `http://localhost:5173` (Vite)

## 📝 **COLEÇÃO POSTMAN**

```json
{
  "info": {
    "name": "Startdoor Backend",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "http://localhost:8080/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"joao@email.com\",\n  \"senha\": \"123456\"\n}"
            }
          }
        },
        {
          "name": "Cadastrar Estudante",
          "request": {
            "method": "POST",
            "url": "http://localhost:8080/auth/cadastrar/estudante",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"nome\": \"João Silva\",\n  \"cpf\": \"12345678901\",\n  \"user\": \"joaosilva\",\n  \"email\": \"joao@email.com\",\n  \"senha\": \"123456\"\n}"
            }
          }
        },
        {
          "name": "Cadastrar Empresa",
          "request": {
            "method": "POST",
            "url": "http://localhost:8080/auth/cadastrar/empresa",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"nome_fantasia\": \"Tech Solutions\",\n  \"cnpj\": \"12345678000199\",\n  \"email\": \"contato@tech.com\",\n  \"senha\": \"123456\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Empresas",
      "item": [
        {
          "name": "Listar todas",
          "request": {
            "method": "GET",
            "url": "http://localhost:8080/empresas"
          }
        },
        {
          "name": "Buscar por ID",
          "request": {
            "method": "GET",
            "url": "http://localhost:8080/empresas/1"
          }
        },
        {
          "name": "Atualizar",
          "request": {
            "method": "PUT",
            "url": "http://localhost:8080/empresas/1",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"nome_fantasia\": \"Tech Solutions Updated\",\n  \"email\": \"novo@tech.com\"\n}"
            }
          }
        },
        {
          "name": "Deletar",
          "request": {
            "method": "DELETE",
            "url": "http://localhost:8080/empresas/1"
          }
        }
      ]
    },
    {
      "name": "Estudantes",
      "item": [
        {
          "name": "Listar todos",
          "request": {
            "method": "GET",
            "url": "http://localhost:8080/estudantes"
          }
        },
        {
          "name": "Buscar por ID",
          "request": {
            "method": "GET",
            "url": "http://localhost:8080/estudantes/1"
          }
        },
        {
          "name": "Atualizar",
          "request": {
            "method": "PUT",
            "url": "http://localhost:8080/estudantes/1",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"nome\": \"João Silva Updated\",\n  \"user\": \"joaosilva_novo\",\n  \"email\": \"joao.novo@email.com\"\n}"
            }
          }
        },
        {
          "name": "Deletar",
          "request": {
            "method": "DELETE",
            "url": "http://localhost:8080/estudantes/1"
          }
        }
      ]
    }
  ]
}
```

## 🧪 **DADOS DE TESTE**

### Estudantes
```json
{
  "nome": "João Silva",
  "cpf": "12345678901",
  "user": "joaosilva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

### Empresas
```json
{
  "nome_fantasia": "Tech Solutions",
  "cnpj": "12345678000199",
  "email": "contato@tech.com",
  "senha": "123456"
}
```

## 📌 **OBSERVAÇÕES**

- O campo `user` para empresas é definido automaticamente como o email
- Todos os endpoints de listagem/atualização/exclusão requerem token JWT (exceto login e cadastro)
- O token deve ser enviado no header: `Authorization: Bearer {token}`
- O CORS está configurado apenas para desenvolvimento (http://localhost:5173)

