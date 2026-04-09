const API = 'http://localhost:3000/api';

function irPerfil() { window.location.href = 'perfil.html'; }

function getToken() { return localStorage.getItem('token'); }

// Redireciona se não autenticado
if (!getToken()) window.location.href = 'index.html';

// Saudação e botão ONG
const nome = localStorage.getItem('nome');
const tipo = localStorage.getItem('tipo');
document.getElementById('saudacao').textContent = `Olá, ${nome}!`;
if (tipo === 'ong') {
  document.getElementById('btnCadastrarAnimal').classList.remove('hidden');
}

async function carregarAnimais() {
  const especie = document.getElementById('filtroEspecie').value;
  const lista   = document.getElementById('listaAnimais');
  lista.innerHTML = '<p>Carregando...</p>';

  try {
    let url = `${API}/animais?status=disponivel`;
    if (especie) url += `&especie=${especie}`;

    const res    = await fetch(url);
    const animais = await res.json();

    if (!animais.length) {
      lista.innerHTML = '<p>Nenhum animal disponível no momento.</p>';
      return;
    }

    lista.innerHTML = animais.map(a => `
      <div class="card-animal" onclick="window.location.href='animal.html?id=${a.id}'">
        <h3>${a.nome}</h3>
        <p><strong>Espécie:</strong> ${a.especie}</p>
        ${a.raca ? `<p><strong>Raça:</strong> ${a.raca}</p>` : ''}
        <p><strong>Faixa etária:</strong> ${a.faixa_etaria || 'não informado'}</p>
        <p><strong>ONG:</strong> ${a.ong_nome}</p>
      </div>
    `).join('');
  } catch {
    lista.innerHTML = '<p class="erro">Erro ao carregar animais.</p>';
  }
}

carregarAnimais();
