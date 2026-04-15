# 🐾 Abrigo — Sistema de Adoção de Animais

## Como abrir
Abra `frontend/screens/index.html` no navegador.
Recomendado: extensão **Live Server** no VSCode.

## Usuários de teste
| Tipo     | Email                 | Senha  |
|----------|-----------------------|--------|
| ONG      | contato@esperanca.org | 123456 |
| Adotante | maria@email.com       | 123456 |

## Como adicionar imagens
1. Coloque o arquivo em `frontend/assets/animais/` (ex: `bolt.jpg`)
2. Abra `frontend/js/dados.js`
3. Localize o animal pelo nome e substitua `foto_url: null` por:
   ```js
   foto_url: '../assets/animais/bolt.jpg'
   ```

## Paleta de cores
| Cor         | Código    | Uso                          |
|-------------|-----------|------------------------------|
| Verde claro | `#80EF80` | Destaques, seções, badges    |
| Marrom      | `#895129` | Títulos, botões, elementos   |
| Branco      | `#FFFFFF` | Cards, containers            |
| Fundo       | `#F5F3EE` | Background geral             |

## Estrutura de animais (dados.js)
- **6 espécies**: Cachorro, Gato, Ave, Roedor, Réptil, Outro
- **3 faixas etárias por espécie**: Filhote (< 1 ano), Adulto (1–8 anos), Idoso (> 8 anos)
- **3 animais por faixa**: 54 animais de exemplo no total
- Faixa etária calculada dinamicamente — nunca armazenada

## Adicionar novo animal em dados.js
```js
{
    id: 99,                           // número único
    nome: 'Rex',
    especie: 'cao',                   // cao | gato | ave | roedor | reptil | outro
    raca: 'Pastor Alemão',            // ou null
    data_nascimento: '2021-06-10',    // YYYY-MM-DD, ou null
    status: 'disponivel',             // disponivel | em_processo | adotado
    ong_id: 1,
    ong_nome: 'Abrigo Esperança',
    enfermidade: null,                // string ou null
    descricao: 'Descrição aqui.',
    foto_url: '../assets/animais/rex.jpg',  // ou null para placeholder
}
```
