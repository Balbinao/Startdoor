# startdoor


Cenário atual- Anotações

## 📚 **README - STARTDOOR BACKEND**

```markdown
# Startdoor Backend

Backend da plataforma Startdoor, desenvolvido com Spring Boot e JWT para autenticação.

## 📋 **VISÃO GERAL**

O backend atualmente possui **apenas sistema de autenticação** implementado:
- Cadastro de Estudante
- Cadastro de Empresa  
- Login (gera token JWT)


## 📦 **COMANDOS DOCKER**

### Subir aplicação
```bash
# Build e start
docker-compose up --build




## 🔐 **ENDPOINTS**

> Base URL: `http://localhost:8080`

### 1. Cadastrar Estudante
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
- `400`: Erro de validação

---

### 2. Cadastrar Empresa
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

**Respostas:**
- `200`: "Empresa cadastrada com sucesso!"
- `400`: Erro de validação

---

### 3. Login
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

> ⚠️ **Nota:** O campo retornado é `toker` (typo). Use como token JWT.

## 🔑 **SOBRE O TOKEN**

- Expira em **2 horas**
- Enviar no header: `Authorization: Bearer {token}`



## 📝 **COLEÇÃO POSTMAN**

```json
{
  "Cadastro Estudante": {
    "method": "POST",
    "url": "http://localhost:8080/auth/cadastrar/estudante",
    "body": {
      "nome": "João Silva",
      "cpf": "12345678901",
      "user": "joaosilva",
      "email": "joao@email.com",
      "senha": "123456"
    }
  },
  "Cadastro Empresa": {
    "method": "POST",
    "url": "http://localhost:8080/auth/cadastrar/empresa",
    "body": {
      "nome_fantasia": "Tech Solutions",
      "cnpj": "12345678000199",
      "email": "contato@tech.com",
      "senha": "123456"
    }
  },
  "Login": {
    "method": "POST",
    "url": "http://localhost:8080/auth/login",
    "body": {
      "email": "joao@email.com",
      "senha": "123456"
    }
  }
}
```
