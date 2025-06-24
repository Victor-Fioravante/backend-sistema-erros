# API de Sugestões e Avaliações de Erros

## Visão Geral

Este projeto é uma API RESTful construída com [NestJS](https://nestjs.com/) que gerencia sugestões e avaliações para códigos de erro de um sistema. A aplicação permite que os usuários criem e consultem sugestões para diferentes códigos de erro e também permite que as sugestões sejam avaliadas.

A API utiliza [Prisma](https://www.prisma.io/) como ORM para interagir com um banco de dados PostgreSQL e `class-validator` para validação de dados de entrada.

## Principais Funcionalidades

* **Gestão de Sugestões**:
    * Criação de novas sugestões para códigos de erro.
    * Busca de sugestões por código de erro.
    * Busca de uma sugestão específica por ID.
* **Gestão de Avaliações**:
    * Criação de avaliações (positivas ou negativas) para as sugestões.
    * Consulta de avaliações.
    * Dashboard com estatísticas de avaliações, incluindo a média total e por sugestão.

## Tecnologias Utilizadas

* **Framework**: NestJS
* **ORM**: Prisma
* **Banco de Dados**: PostgreSQL
* **Validação**: class-validator, class-transformer
* **Linguagem**: TypeScript

## Configuração do Projeto

### Pré-requisitos

* Node.js (versão >= 20.11)
* NPM ou Yarn
* Um servidor de banco de dados PostgreSQL em execução.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/victor-fioravante/backend-sistema-erros.git](https://github.com/victor-fioravante/backend-sistema-erros.git)
    cd backend-sistema-erros
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configuração do Banco de Dados:**
    * Crie um arquivo `.env` na raiz do projeto.
    * Configure a variável de ambiente `DATABASE_URL` com a string de conexão do seu banco de dados PostgreSQL. Exemplo:
        ```
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
        ```

4.  **Execute as migrações do Prisma** para criar as tabelas no banco de dados:
    ```bash
    npx prisma migrate dev
    ```

## Executando a Aplicação

É possível executar a aplicação em diferentes modos:

* **Modo de Desenvolvimento (com watch):**
    ```bash
    npm run start:dev
    ```
    O servidor será iniciado e ficará observando alterações nos arquivos. Por padrão, a aplicação estará disponível em `http://localhost:3000`.

* **Modo de Produção:**
    ```bash
    npm run build
    npm run start:prod
    ```
   

A aplicação será executada com um prefixo global `api`. Portanto, todos os endpoints serão acessíveis a partir de `/api`.

## Endpoints da API

A seguir estão detalhados os endpoints disponíveis na API.

---

### Módulo: `Suggestion`

Controlador responsável pela gestão de sugestões.

**Prefixo:** `/api/suggestion`

#### `POST /suggestion`

Cria uma nova sugestão para um código de erro.

* **Corpo da Requisição:** `CreateSuggestionDto`
    ```json
    {
      "errorCode": "123456",
      "text": "Esta é uma sugestão de solução para o erro."
    }
    ```
   

* **Validações:**
    * `errorCode`: Deve ser uma string de 6 caracteres e conter apenas números.
    * `text`: Deve ser uma string.

#### `GET /suggestion`

Retorna uma lista de todas as sugestões. Pode ser filtrada por `errorCode`.

* **Query Params (opcional):**
    * `errorCode` (string): Filtra as sugestões pelo código de erro.

* **Resposta:** `ResponseSuggestionDto[]`
    ```json
    [
      {
        "id": 1,
        "errorCode": "123456",
        "text": "Esta é uma sugestão de solução para o erro.",
        "createdAt": "2025-06-24T01:30:00.000Z",
        "evaluationIds": [1, 2]
      }
    ]
    ```
   

#### `GET /suggestion/:id`

Busca e retorna uma sugestão específica pelo seu ID.

* **Parâmetros:**
    * `id` (number): O ID da sugestão.

* **Resposta:** Se a sugestão for encontrada, retorna o objeto da sugestão. Caso contrário, retorna um erro `404 Not Found`.

---

### Módulo: `Evaluation`

Controlador para registrar e consultar avaliações das sugestões.

**Prefixo:** `/api/evaluation`

#### `POST /evaluation`

Cria uma nova avaliação para uma sugestão existente.

* **Corpo da Requisição:** `CreateEvaluationDto`
    ```json
    {
      "errorCode": "123456",
      "clientCode": "654321",
      "rating": true,
      "comment": "A sugestão foi muito útil!",
      "suggestionId": 1
    }
    ```
   

* **Validações:**
    * `errorCode` e `clientCode`: Devem ser strings de 6 caracteres contendo apenas números.
    * `rating`: Deve ser um valor booleano (`true` para útil, `false` para não útil).
    * `suggestionId`: Deve ser um número inteiro.
    * `comment`: É uma string opcional.

#### `GET /evaluation`

Retorna uma lista de todas as avaliações registradas.

* **Resposta:** `ResponseEvaluationDto[]`
    ```json
    [
      {
        "errorCode": "123456",
        "clientCode": "654321",
        "rating": true,
        "suggestionId": 1,
        "date": "2025-06-24T01:35:00.000Z",
        "comment": "A sugestão foi muito útil!"
      }
    ]
    ```
   

#### `GET /evaluation/dashboard`

Retorna um dashboard com as estatísticas de avaliação.

* **Resposta:**
    ```json
    {
      "totalAverage": 0.75,
      "averageBySuggestion": [
        {
          "suggestionId": 1,
          "average": 0.8,
          "errorCode": "123456"
        },
        {
          "suggestionId": 2,
          "average": 0.6,
          "errorCode": "654321"
        }
      ]
    }
    ```
   

## Estrutura do Banco de Dados

O ORM Prisma gerencia o schema do banco de dados. As tabelas principais são `suggestion` e `evaluation`.

### Tabela `suggestion`

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | SERIAL | Chave Primária |
| `errorCode` | CHAR(6) | O código do erro relacionado à sugestão. |
| `text` | TEXT | O texto da sugestão. |
| `createdAt`| TIMESTAMP | Data de criação do registro. |



### Tabela `evaluation`

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | SERIAL | Chave Primária |
| `errorCode` | CHAR(6) | O código do erro. |
| `clientCode`| CHAR(6) | O código do cliente que está avaliando. |
| `rating` | BOOLEAN | `true` se a sugestão foi útil, `false` caso contrário. |
| `comment` | TEXT | Comentário opcional. |
|`suggestionId`| INTEGER | Chave estrangeira para a tabela `suggestion`. |
| `createdAt`| TIMESTAMP | Data de criação do registro. |



## Scripts Disponíveis

No `package.json`, você encontrará os seguintes scripts:

* `npm run build`: Compila o projeto TypeScript.
* `npm run format`: Formata o código com o Prettier.
* `npm run lint`: Executa o ESLint para análise estática do código.
* `npm run start`: Inicia a aplicação em modo de desenvolvimento.
* `npm run start:dev`: Inicia a aplicação com o modo "watch".
* `npm run start:prod`: Inicia a aplicação em modo de produção.
* `npm run test`: Executa os testes unitários.
* `npm run test:watch`: Executa os testes em modo "watch".
* `npm run test:cov`: Gera um relatório de cobertura de testes.
* `npm run test:e2e`: Executa os testes de ponta-a-ponta.
