const API = 'http://localhost:3000/api';

function getToken() { return localStorage.getItem('token'); }

if (!getToken()) window.location.href = 'index.html';

async function carregarPerfil() {
  try {
    const res  = await fetch(`${API}/perfil`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (res.status === 401) {
      logout();
      return;
    }

    const data = await res.json();
    document.getElementById('dados').innerHTML = `
      <p><strong>Nome:</strong> ${data.nome}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Tipo:</strong> ${data.tipo === 'ong' ? 'ONG' : 'Adotante'}</p>
      <p><strong>Endereço:</strong> ${data.endereco}</p>
      <p><strong>Telefone:</strong> ${data.telefone}</p>
    `;
  } catch {
    document.getElementById('dados').innerHTML = '<p class="erro">Erro ao carregar perfil.</p>';
  }
}

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

carregarPerfil();
