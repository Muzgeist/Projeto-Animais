const API = 'http://localhost:3000/api';

document.getElementById('btnLogin').addEventListener('click', async () => {
  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;
  const erro  = document.getElementById('erroLogin');

  erro.classList.add('hidden');

  if (!email || !senha) {
    erro.textContent = 'Preencha email e senha.';
    erro.classList.remove('hidden');
    return;
  }

  try {
    const res  = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });
    const data = await res.json();

    if (!res.ok) {
      erro.textContent = data.erro || 'Erro ao fazer login.';
      erro.classList.remove('hidden');
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('tipo',  data.tipo);
    localStorage.setItem('nome',  data.nome);

    window.location.href = 'home.html';
  } catch {
    erro.textContent = 'Não foi possível conectar ao servidor.';
    erro.classList.remove('hidden');
  }
});
