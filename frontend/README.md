## 📘 **README.md - Frontend Services e Utils**

```markdown
# 📁 Frontend - Services e Utils

Este documento descreve os arquivos JavaScript responsáveis pela comunicação com o backend e utilitários do projeto.

## 📦 Estrutura de Arquivos


## 🔧 Services

### `api.js`
Configuração base do axios com:
- Base URL definida via `import.meta.env.VITE_API_URL` (fallback para `http://localhost:8080`)
  > ⚠️ **Nota:** O arquivo `.env` é opcional. Se não existir, será usado `http://localhost:8080` automaticamente
- Timeout de 10 segundos
- Interceptor para adicionar token JWT no header Authorization
- Interceptor para tratar erros (401 redireciona para login)

### `authService.js`
Responsável por autenticação e cadastros:
- `login(email, senha)` → Autentica usuário e retorna token
- `registerEstudante(dados)` → Cadastra novo estudante
- `registerEmpresa(dados)` → Cadastra nova empresa
- `logout()` → Remove dados da sessão

### `empresaService.js`
Operações CRUD para empresas:
- `listarTodas()` → GET /empresas
- `buscarPorId(id)` → GET /empresas/{id}
- `atualizar(id, dados)` → PUT /empresas/{id}
- `deletar(id)` → DELETE /empresas/{id}

### `estudanteService.js`
Operações CRUD para estudantes:
- `listarTodos()` → GET /estudantes
- `buscarPorId(id)` → GET /estudantes/{id}
- `atualizar(id, dados)` → PUT /estudantes/{id}
- `deletar(id)` → DELETE /estudantes/{id}

## 🧰 Utils

### `constants.js`
Armazena constantes do sistema:
- `API_ENDPOINTS` → Todos os endpoints da API organizados por módulo
- `ERROR_MESSAGES` → Mensagens de erro padronizadas

## 🌐 Endpoints da API

| Método | Rota | Descrição | Service |
|--------|------|-----------|---------|
| POST | `/auth/login` | Login | authService |
| POST | `/auth/cadastrar/estudante` | Cadastro estudante | authService |
| POST | `/auth/cadastrar/empresa` | Cadastro empresa | authService |
| GET | `/empresas` | Lista empresas | empresaService |
| GET | `/empresas/{id}` | Busca empresa por ID | empresaService |
| PUT | `/empresas/{id}` | Atualiza empresa | empresaService |
| DELETE | `/empresas/{id}` | Deleta empresa | empresaService |
| GET | `/estudantes` | Lista estudantes | estudanteService |
| GET | `/estudantes/{id}` | Busca estudante por ID | estudanteService |
| PUT | `/estudantes/{id}` | Atualiza estudante | estudanteService |
| DELETE | `/estudantes/{id}` | Deleta estudante | estudanteService |

## 🔐 Autenticação

- O token JWT é armazenado no `localStorage` com a chave `@App:token`
- Todas as requisições (exceto login e cadastros) enviam o token no header: `Authorization: Bearer {token}`
- Em caso de erro 401, o usuário é redirecionado para a página de login

## 📥 Como usar nos componentes

```javascript
import authService from '../services/authService';
import empresaService from '../services/empresaService';

// Exemplo de login
const handleLogin = async (email, senha) => {
  const result = await authService.login(email, senha);
  if (result.success) {
    localStorage.setItem('@App:token', result.token);
    // redirecionar...
  }
};

// Exemplo de listar empresas
const carregarEmpresas = async () => {
  const result = await empresaService.listarTodas();
  if (result.success) {
    setEmpresas(result.data);
  }
};
```



**Próximos passos:** Desenvolver as telas utilizando estes services para integração com o backend.

