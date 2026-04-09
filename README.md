# 🐾 Abrigo – Sistema de Adoção de Animais

## Pré-requisitos
- Node.js 18+
- MySQL 8+

## Setup do Banco

```bash
mysql -u root -p
CREATE DATABASE abrigo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE abrigo;
SOURCE database/schema.sql;
```

## Setup do Backend

```bash
cd backend
cp .env.example .env
# edite .env com suas credenciais
npm install
npm run dev
```

## Rodando o Frontend

Abra `frontend/screens/index.html` no navegador (ou use Live Server no VSCode).

## Rotas da API

| Método | Rota              | Auth | Descrição                     |
|--------|-------------------|------|-------------------------------|
| POST   | /api/register     | ❌   | Cadastro de usuário            |
| POST   | /api/login        | ❌   | Login, retorna JWT             |
| GET    | /api/perfil       | ✅   | Dados do usuário logado        |
| GET    | /api/animais      | ❌   | Lista animais (filtros opcionais) |
| GET    | /api/animais/:id  | ❌   | Detalhe de um animal           |
| POST   | /api/animais      | ✅ ONG | Cadastrar animal             |
