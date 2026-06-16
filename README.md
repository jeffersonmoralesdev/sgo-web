## Como executar o projeto

### Pré-requisitos

Antes de iniciar, é necessário ter instalado:

* Node.js
* pnpm
* Docker
* Docker Compose

### 1. Clonar o repositório

```bash
git clone https://github.com/jeffersonmoralesdev/sgo-web.git
```

```bash
cd sgo-web
```

### 2. Instalar as dependências

```bash
pnpm install
```

### 3. Configurar as variáveis de ambiente

Copie o arquivo `.env.example` para um novo arquivo chamado `.env`:

```bash
cp .env.example .env
```

No Windows PowerShell, o comando equivalente é:

```powershell
Copy-Item .env.example .env
```

Depois, confira e ajuste os valores das variáveis conforme o ambiente local.

### 4. Subir o banco de dados com Docker

Com o Docker em execução, suba o container do banco de dados:

```bash
docker compose up -d
```

Esse comando inicia o serviço do MySQL configurado no arquivo `docker-compose.yml`.

### 5. Executar as migrations

Após o banco estar em execução, aplique as migrations do Drizzle para criar as tabelas da aplicação:

```bash
pnpm drizzle-kit migrate
```

### 6. Criar o administrador inicial

Execute o seed para criar o primeiro usuário com perfil de administrador:

```bash
pnpm db:seed-admin
```

O sistema não possui cadastro público de usuários. Por isso, o primeiro administrador é criado por seed para permitir o acesso inicial ao sistema.

Após o primeiro login, recomenda-se que o administrador altere seus dados e cadastre os usuários operadores necessários.

### 7. Rodar o projeto

```bash
pnpm run dev
```

A aplicação ficará disponível localmente em:

```txt
http://localhost:3000
```



