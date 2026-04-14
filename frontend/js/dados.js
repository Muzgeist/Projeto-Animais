/**
 * dados.js — fonte central de dados do sistema.
 *
 * Para adicionar imagens:
 *   - Coloque o arquivo em frontend/assets/animais/  (ex: bolt.jpg)
 *   - Substitua o null de foto_url pela string do caminho relativo:
 *       foto_url: '../assets/animais/bolt.jpg'
 *
 * Para adicionar/editar animais, edite o array ANIMAIS abaixo.
 * Para trocar usuários de exemplo, edite USUARIOS.
 */

// =============================================================
// USUÁRIOS DE EXEMPLO
// =============================================================
const USUARIOS = [
    {
        id: 1,
        tipo: 'ong',
        nome: 'Abrigo Esperança',
        email: 'contato@esperanca.org',
        endereco: 'Rua das Flores, 120 — Belo Horizonte, MG',
        telefone: '3132345678',
        senha: '123456',
        foto_url: null,   // '../assets/ongs/esperanca.jpg'
    },
    {
        id: 2,
        tipo: 'adotante',
        nome: 'Maria Silva',
        email: 'maria@email.com',
        endereco: 'Av. Brasil, 500 — Contagem, MG',
        telefone: '31987654321',
        senha: '123456',
        foto_url: null,
    },
];

// =============================================================
// ANIMAIS DE EXEMPLO
// =============================================================
// faixa_etaria é calculada automaticamente a partir de data_nascimento.
// Deixe foto_url: null para exibir o placeholder.
// Para adicionar imagem: foto_url: '../assets/animais/nome-do-arquivo.jpg'
// =============================================================
const ANIMAIS = [
    {
        id: 1,
        nome: 'Bolt',
        especie: 'cao',
        raca: 'Labrador',
        data_nascimento: '2022-03-15',
        status: 'disponivel',
        ong_id: 1,
        ong_nome: 'Abrigo Esperança',
        enfermidade: null,
        descricao: 'Bolt é um cachorro extremamente dócil e cheio de energia. Adora crianças e se dá muito bem com outros cães. Já é castrado e vacinado. Busca um lar com quintal ou bastante espaço para correr e brincar.',
        foto_url: null,   // '../assets/animais/bolt.jpg'
    },
    {
        id: 2,
        nome: 'Mia',
        especie: 'gato',
        raca: 'SRD',
        data_nascimento: '2023-07-10',
        status: 'disponivel',
        ong_id: 1,
        ong_nome: 'Abrigo Esperança',
        enfermidade: null,
        descricao: 'Mia é uma gatinha muito carinhosa e independente. Gosta de colos mas também sabe ficar sozinha. Ideal para apartamento. Vacinada e vermifugada.',
        foto_url: null,   // '../assets/animais/mia.jpg'
    },
    {
        id: 3,
        nome: 'Thor',
        especie: 'cao',
        raca: 'Vira-lata',
        data_nascimento: '2020-11-02',
        status: 'disponivel',
        ong_id: 1,
        ong_nome: 'Abrigo Esperança',
        enfermidade: 'Displasia leve no quadril direito. Não impede atividades normais, mas requer acompanhamento veterinário semestral.',
        descricao: 'Thor é um companheiro leal e tranquilo. Apesar da displasia, leva uma vida normal e adora passear. Bom com crianças maiores. Castrado e vacinado.',
        foto_url: null,   // '../assets/animais/thor.jpg'
    },
    {
        id: 4,
        nome: 'Luna',
        especie: 'gato',
        raca: 'Persa',
        data_nascimento: '2019-04-20',
        status: 'em_processo',
        ong_id: 1,
        ong_nome: 'Abrigo Esperança',
        enfermidade: null,
        descricao: 'Luna é uma gata elegante e tranquila. Prefere ambientes calmos e silenciosos. Não se dá bem com cachorros. Castrada e vacinada.',
        foto_url: null,   // '../assets/animais/luna.jpg'
    },
    {
        id: 5,
        nome: 'Pingo',
        especie: 'cao',
        raca: 'Poodle',
        data_nascimento: '2024-01-05',
        status: 'disponivel',
        ong_id: 1,
        ong_nome: 'Abrigo Esperança',
        enfermidade: null,
        descricao: 'Pingo é um filhote curioso e brincalhão. Aprende rápido e adora atenção. Perfeito para famílias com crianças. Vacinado e em acompanhamento veterinário.',
        foto_url: null,   // '../assets/animais/pingo.jpg'
    },
    {
        id: 6,
        nome: 'Cleo',
        especie: 'ave',
        raca: 'Calopsita',
        data_nascimento: '2021-08-30',
        status: 'disponivel',
        ong_id: 1,
        ong_nome: 'Abrigo Esperança',
        enfermidade: null,
        descricao: 'Cleo é uma calopsita sociável que adora assobiar. Já está acostumada com humanos e gosta de ficar no ombro. Requer gaiola espaçosa e interação diária.',
        foto_url: null,   // '../assets/animais/cleo.jpg'
    },
];

// =============================================================
// HELPERS
// =============================================================

function calcularFaixaEtaria(dataNascimento) {
    if (!dataNascimento) return null;
    const hoje = new Date();
    const nasc = new Date(dataNascimento);
    const meses = (hoje - nasc) / (1000 * 60 * 60 * 24 * 30.44);
    if (meses < 3)  return 'filhote';
    if (meses < 12) return 'jovem';
    if (meses < 84) return 'adulto';
    return 'idoso';
}

function getAnimais(filtros = {}) {
    let lista = ANIMAIS.map(a => ({
        ...a,
        faixa_etaria: calcularFaixaEtaria(a.data_nascimento),
    }));
    if (filtros.especie) lista = lista.filter(a => a.especie === filtros.especie);
    if (filtros.status)  lista = lista.filter(a => a.status  === filtros.status);
    return lista;
}

function getAnimalById(id) {
    const a = ANIMAIS.find(a => a.id === Number(id));
    if (!a) return null;
    return { ...a, faixa_etaria: calcularFaixaEtaria(a.data_nascimento) };
}

function getUsuarioByEmail(email) {
    return USUARIOS.find(u => u.email === email) || null;
}

// Sessão em memória (localStorage)
function getSession() {
    const raw = localStorage.getItem('sessao');
    return raw ? JSON.parse(raw) : null;
}

function setSession(usuario) {
    const { senha: _, ...sem_senha } = usuario;
    localStorage.setItem('sessao', JSON.stringify(sem_senha));
}

function clearSession() {
    localStorage.removeItem('sessao');
    localStorage.removeItem('interesses');
}

// Interesses registrados localmente
function getInteresses() {
    const raw = localStorage.getItem('interesses');
    return raw ? JSON.parse(raw) : [];
}

function registrarInteresse(animalId) {
    const sess = getSession();
    if (!sess) return false;
    const lista = getInteresses();
    const jaExiste = lista.find(i => i.usuario_id === sess.id && i.animal_id === animalId);
    if (jaExiste) return false;
    lista.push({ usuario_id: sess.id, animal_id: animalId, criado_em: new Date().toISOString() });
    localStorage.setItem('interesses', JSON.stringify(lista));
    return true;
}
