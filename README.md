# Variant Lists

Sistema de gerenciamento de listas variantes com suporte a schemas personalizados.

## 🚀 Tecnologias

- TypeScript
- Node.js
- Fastify
- PostgreSQL
- Prisma
- Docker
- Turborepo

## 📋 Pré-requisitos

- Node.js 20.x
- Docker e Docker Compose
- Yarn

## 🛠️ Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/variant-lists.git
cd variant-lists
```

2. Instale as dependências
```bash
yarn install
```

3. Configure as variáveis de ambiente
```bash
# Entre no diretório do backend
cd apps/backend

# Copie o arquivo de exemplo
cp .env.example .env

# Configure as variáveis de acordo com o .env.example
```

4. Inicie o banco de dados
```bash
# Volte para a raiz do projeto
cd ../..

# Inicie o container do PostgreSQL
docker-compose up -d
```

5. Execute as migrações
```bash
yarn prisma migrate dev
```

6. Inicie o projeto em modo desenvolvimento
```bash
yarn dev
```

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura monorepo com as seguintes estruturas principais:

### Apps
- `backend`: API REST com Fastify

### Packages
- `domain`: Regras de negócio e entidades
- `tsconfig`: Configurações compartilhadas de TypeScript

## 📦 Estrutura de Pastas

```
variant-lists/
├── apps/
│   └── backend/          # Aplicação backend
├── packages/
│   ├── domain/          # Regras de negócio
│   └── tsconfig/        # Configurações TS
├── docker-compose.yaml
└── package.json
```

## 🔑 Autenticação

O sistema utiliza JWT para autenticação, com suporte a:
- Login com email ou username
- Refresh tokens via cookies seguros
- Proteção CSRF

## 🚥 API Endpoints

A documentação completa da API está disponível em:
```
http://localhost:3000/documentation
```

## 🧪 Testes

Para executar os testes:

```bash
# Testes unitários
yarn test

# Testes de integração
yarn test:integration
```

## 👥 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 