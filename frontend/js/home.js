const API_URL = "http://localhost:3000/api";

// estado global simples
let animais = [];
let filtroAtual = "todos";

// ==========================
// INIT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    carregarUsuario();
    carregarAnimais();
});

// ==========================
// USUÁRIO
// ==========================
async function carregarUsuario() {
    try {
        const res = await fetch(`${API_URL}/perfil`);
        const user = await res.json();

        document.getElementById("boasVindas").innerText =
            `Bem vindo de volta, ${user.nome}`;

    } catch (err) {
        console.error("Erro ao carregar usuário:", err);
    }
}

// ==========================
// ANIMAIS
// ==========================
async function carregarAnimais() {
    try {
        const res = await fetch(`${API_URL}/animais`);
        animais = await res.json();

        renderizar();

    } catch (err) {
        console.error("Erro ao carregar animais:", err);
    }
}

// ==========================
// FILTRO
// ==========================
function filtrar(tipo) {
    filtroAtual = tipo;
    renderizar();
}

// ==========================
// CLASSIFICAÇÃO POR IDADE
// ==========================
function classificarIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    const idadeMeses = (hoje - nascimento) / (1000 * 60 * 60 * 24 * 30);
    const idadeAnos = idadeMeses / 12;

    if (idadeMeses <= 12) return "filhote";
    if (idadeAnos <= 8) return "adulto";
    return "idoso";
}

// ==========================
// FILTRO DE ESPÉCIE
// ==========================
function aplicarFiltro(lista) {
    if (filtroAtual === "todos") return lista;

    return lista.filter(a => {
        if (!a.especie) return false;

        const especie = a.especie.toLowerCase();

        if (filtroAtual === "outros") {
            return especie !== "cachorro" && especie !== "gato";
        }

        return especie === filtroAtual;
    });
}

// ==========================
// RENDERIZAÇÃO
// ==========================
function renderizar() {
    const filtrados = aplicarFiltro(animais);

    const filhotes = [];
    const adultos = [];
    const idosos = [];

    filtrados.forEach(animal => {
        const tipo = classificarIdade(animal.data_nascimento);

        if (tipo === "filhote") filhotes.push(animal);
        else if (tipo === "adulto") adultos.push(animal);
        else idosos.push(animal);
    });

    renderCarrossel("filhotes", filhotes);
    renderCarrossel("adultos", adultos);
    renderCarrossel("idosos", idosos);
}

// ==========================
// CARDS
// ==========================
function renderCarrossel(id, lista) {
    const container = document.getElementById(id);
    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum animal encontrado</p>";
        return;
    }

    lista.forEach(animal => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${animal.nome}</h3>
            <p>${animal.especie}</p>
            <button onclick="verAnimal(${animal.id})">Ver</button>
        `;

        container.appendChild(card);
    });
}

// ==========================
// NAVEGAÇÃO
// ==========================
function irPerfil() {
    window.location.href = "perfil.html";
}

function verAnimal(id) {
    window.location.href = `animal.html?id=${id}`;
}