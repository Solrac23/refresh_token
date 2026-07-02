# 🔐 refresh_token

Estudo prático de autenticação com **JWT + Refresh Token** em Node.js, construído com foco em boas práticas de segurança, arquitetura limpa e controle de acesso (ACL).

---

## 📌 O que é este projeto?

Este projeto implementa um sistema completo de autenticação, demonstrando o fluxo de:

- **Registro e login** de usuários
- **Access token (JWT)** de curta duração
- **Refresh token** para renovar o access token sem precisar de novo login
- **Controle de acesso** por roles e permissions (ACL)

O objetivo é estudar como implementar esse fluxo de forma segura e bem estruturada em uma API REST real.

---

## 🔄 Como funciona o fluxo de autenticação

```
[Cliente]                          [API]                        [Banco]
   |                                 |                              |
   |-- POST /auth/login -----------> |                              |
   |   { username, password }        |-- verifica usuário -------> |
   |                                 |<-- retorna user ------------ |
   |                                 |                              |
   |<-- 200 OK -------------------- |                              |
   |   { accessToken, refreshToken } |-- salva refresh token ----> |
   |                                 |                              |
   |                                 |                              |
   |-- GET /courses --------------> |                              |
   |   Authorization: Bearer <jwt>  |-- valida JWT                 |
   |<-- 200 OK -------------------- |                              |
   |                                 |                              |
   |   [JWT expira]                  |                              |
   |                                 |                              |
   |-- POST /auth/refresh-token ---> |                              |
   |   { refresh_token: "..." }      |-- busca token no banco ---> |
   |                                 |<-- retorna token ----------- |
   |<-- 200 OK -------------------- |                              |
   |   { accessToken, refreshToken } |-- emite novo token -------> |
```

### Por que dois tokens?

| Token | Duração | Finalidade |
|---|---|---|
| **Access Token (JWT)** | Curta (minutos/horas) | Autorizar requisições protegidas |
| **Refresh Token** | Longa (horas/dias) | Renovar o access token sem novo login |

O access token é **stateless** (não precisa do banco para validar) e expira rápido — reduzindo a janela de uso em caso de vazamento. O refresh token permite renovar a sessão sem pedir a senha novamente.

---

## 🛡️ Controle de Acesso (ACL)

O projeto implementa dois níveis de autorização além da autenticação:

**Roles** — grupos de acesso (ex: `admin`, `editor`)
**Permissions** — ações específicas (ex: `create:course`, `delete:user`)

Cada usuário pode ter múltiplas roles e permissions, verificadas via middlewares `checkRoles` e `checkPermissions` nas rotas protegidas.

---

## 🗂️ Estrutura do projeto

```
src/
├── app.ts                         # Configuração do servidor Fastify
├── routes/                        # Definição das rotas da API
│   ├── auth.routes.ts             # POST /auth/login, POST /auth/refresh-token
│   ├── user.routes.ts             # POST /users, GET /users/:id, POST /users/acl
│   ├── roles.routes.ts            # Gerenciamento de roles
│   ├── permissions.routes.ts      # Gerenciamento de permissions
│   └── course.routes.ts           # GET /courses (rota protegida de exemplo)
├── use-cases/                     # Regras de negócio (uma pasta por caso de uso)
│   ├── authenticate-user/
│   ├── refresh-token-user/
│   ├── create-user/
│   └── ...
├── repositories/                  # Acesso ao banco de dados via Prisma
├── provider/
│   ├── generate-refresh-token-provider.ts
│   └── jwt/
├── middlewares/
│   ├── authenticate.ts            # Verifica JWT
│   ├── check-roles.ts             # Verifica roles do usuário
│   └── check-permissions.ts      # Verifica permissions do usuário
├── schemas/                       # Validação de entrada/saída com Zod
└── plugins/
    └── jwt.plugins.ts
prisma/
└── schema.prisma                  # Modelos do banco de dados
```

---

## 🚀 Endpoints da API

Todos os endpoints são prefixados com `/api/v1`.

### Autenticação

| Método | Rota | Proteção | Descrição |
|---|---|---|---|
| `POST` | `/auth/login` | — | Autentica o usuário e retorna os tokens |
| `POST` | `/auth/refresh-token` | — | Renova o access token |

### Usuários

| Método | Rota | Proteção | Descrição |
|---|---|---|---|
| `POST` | `/users` | — | Cria um novo usuário |
| `GET` | `/users/:id` | JWT | Busca usuário por ID |
| `POST` | `/users/acl` | JWT | Atribui roles/permissions a um usuário |

### Roles e Permissions

| Método | Rota | Proteção | Descrição |
|---|---|---|---|
| `POST` | `/roles` | JWT | Cria uma role |
| `POST` | `/permissions` | JWT | Cria uma permission |

### Exemplo (rota protegida)

| Método | Rota | Proteção | Descrição |
|---|---|---|---|
| `GET` | `/courses` | JWT | Lista cursos (exemplo de rota autenticada) |

A documentação interativa completa está disponível em `http://localhost:{PORT}/docs` (Scalar UI).

---

## 🧱 Banco de dados

Modelagem com **Prisma ORM** e **PostgreSQL**.

```
User
 ├── RefreshToken (1:1)
 ├── usersRoles (N:N com Roles)
 └── usersPermissions (N:N com Permissions)

Roles
 └── permissionsRoles (N:N com Permissions)
```

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **Node.js** | 24 | Runtime JavaScript |
| **TypeScript** | ^6.0 | Tipagem estática |
| **Fastify** | ^5.8 | Framework HTTP de alta performance |
| **@fastify/jwt** | ^10.1 | Geração e verificação de JWT |
| **@fastify/cors** | ^11.2 | Configuração de CORS |
| **@fastify/helmet** | ^13.0 | Headers de segurança HTTP (produção) |
| **@fastify/swagger** | ^9.7 | Geração de documentação OpenAPI |
| **Scalar** | ^1.57 | UI de documentação interativa |
| **Prisma ORM** | ^7.8 | ORM e migrations do banco |
| **PostgreSQL** | 18 | Banco de dados relacional |
| **Zod** | ^4.4 | Validação de schemas e tipos |
| **fastify-type-provider-zod** | ^6.1 | Integração Zod + Fastify com tipos |
| **dayjs** | ^1.11 | Manipulação de datas |
| **Biome** | ^2.4 | Linter e formatter |
| **Docker / Docker Compose** | — | Ambiente do banco de dados |
| **pnpm** | 10.33 | Gerenciador de pacotes |

---

## ⚙️ Como rodar o projeto

### Pré-requisitos

- Node.js 24+
- pnpm
- Docker e Docker Compose

### 1. Clone o repositório

```bash
git clone https://github.com/Solrac23/refresh_token.git
cd refresh_token
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env.development` na raiz baseado no `Makefile.example`:

```env
PORT=3333
NODE_ENV=development

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/refresh_token_db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=refresh_token_db

JWT_SECRET=sua_chave_secreta_aqui
```

### 3. Suba o banco de dados

```bash
# Usando o Makefile
make docker-compose-dev dev=.env.development

# Ou diretamente
docker compose --env-file .env.development -f docker-compose.yaml up -d
```

### 4. Instale as dependências e rode as migrations

```bash
pnpm install
pnpm generate:dev
pnpm migrate:dev init
```

### 5. Inicie o servidor

```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3333`
A documentação em `http://localhost:3333/docs`

---

## 📚 Conceitos estudados

- Fluxo de autenticação com **JWT de curta duração + refresh token de longa duração**
- **Token rotation** — o refresh token é invalidado e um novo é emitido a cada uso
- **ACL (Access Control List)** — controle granular de acesso por roles e permissions
- **Arquitetura em camadas** — separação entre routes, controllers, use-cases e repositories
- **Injeção de dependência** manual via construtores
- **Validação de schema** com Zod integrado ao Fastify com type-safety completo
- **Documentação automática** de API com OpenAPI + Scalar
