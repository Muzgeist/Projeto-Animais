const API = 'http://localhost:3000/api';

document.getElementById('tipoUsuario').addEventListener('change', function () {
  const campos = document.getElementById('camposCadastro');
  campos.classList.toggle('hidden', !this.value);
});

document.getElementById('btnCadastrar').addEventListener('click', async () => {
  const tipo     = document.getElementById('tipoUsuario').value;
  const nome     = document.getElementById('cadNome').value.trim();
  const email    = document.getElementById('cadEmail').value.trim();
  const endereco = document.getElementById('cadEndereco').value.trim();
  const telefone = document.getElementById('cadTelefone').value.trim();
  const senha    = document.getElementById('cadSenha').value;
  const erro     = document.getElementById('erroCadastro');
  const sucesso  = document.getElementById('sucessoCadastro');

  erro.classList.add('hidden');
  sucesso.classList.add('hidden');

  if (!tipo || !nome || !email || !endereco || !telefone || !senha) {
    erro.textContent = 'Preencha todos os campos.';
    erro.classList.remove('hidden');
    return;
  }
  if (!/^\d{10,11}$/.test(telefone)) {
    erro.textContent = 'Telefone deve ter 10 ou 11 dígitos numéricos.';
    erro.classList.remove('hidden');
    return;
  }

  try {
    const res  = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo, nome, email, endereco, telefone, senha }),
    });
    const data = await res.json();

    if (!res.ok) {
      erro.textContent = data.erro || 'Erro ao cadastrar.';
      erro.classList.remove('hidden');
      return;
    }

    sucesso.textContent = 'Cadastro realizado! Redirecionando...';
    sucesso.classList.remove('hidden');
    setTimeout(() => window.location.href = 'index.html', 1500);
  } catch {
    erro.textContent = 'Não foi possível conectar ao servidor.';
    erro.classList.remove('hidden');
  }
});
