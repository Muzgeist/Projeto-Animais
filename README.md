# 🐾 Abrigo — Frontend Estático

Versão do projeto sem dependência de backend ou banco de dados.
Todos os dados ficam em `frontend/js/dados.js`.

## Como abrir

Abra `frontend/screens/index.html` no navegador.
Recomendado: extensão **Live Server** no VSCode.

## Usuários de teste

| Tipo     | Email                    | Senha  |
|----------|--------------------------|--------|
| ONG      | contato@esperanca.org    | 123456 |
| Adotante | maria@email.com          | 123456 |

## Como adicionar imagens dos animais

1. Coloque o arquivo de imagem em `frontend/assets/animais/`
   - Formatos aceitos: `.jpg`, `.jpeg`, `.png`, `.webp`
   - Exemplo: `frontend/assets/animais/bolt.jpg`

2. Abra `frontend/js/dados.js` e localize o animal pelo nome.

3. Substitua o `null` de `foto_url` pelo caminho relativo:
   ```js
   foto_url: '../assets/animais/bolt.jpg'
   ```

## Como adicionar/editar animais

Edite o array `ANIMAIS` em `frontend/js/dados.js`.
Cada animal segue esta estrutura:

```js
{
    id: 7,                          // número único
    nome: 'Rex',
    especie: 'cao',                 // cao | gato | ave | roedor | reptil | outro
    raca: 'Pastor Alemão',          // ou null
    data_nascimento: '2021-06-10',  // formato YYYY-MM-DD, ou null
    status: 'disponivel',           // disponivel | em_processo | adotado
    ong_id: 1,
    ong_nome: 'Abrigo Esperança',
    enfermidade: null,              // string descritiva ou null
    descricao: 'Descrição aqui.',
    foto_url: '../assets/animais/rex.jpg',  // ou null para placeholder
}
```

## Estrutura de pastas

```
frontend/
  assets/
    animais/    ← coloque as fotos dos animais aqui
    ongs/       ← coloque logos/fotos das ONGs aqui (uso futuro)
  css/
    style.css   ← CSS unificado
  js/
    dados.js    ← FONTE CENTRAL de dados e sessão
    login.js
    cadastro.js
    home.js
    perfil.js
    animal.js
    cadastrar-animal.js
    utils.js
  screens/
    index.html           ← Login (ponto de entrada)
    cadastro.html
    home.html
    perfil.html
    animal.html
    cadastrar-animal.html
```

## Observações

- Dados de animais cadastrados durante a sessão somem ao recarregar a página
  (comportamento esperado nesta versão estática — sem banco).
- Ao integrar com o backend, substitua as chamadas em `dados.js` por `fetch()`.
- A foto enviada no cadastro de animal é lida como base64 (FileReader) e
  exibida apenas durante a sessão atual.
