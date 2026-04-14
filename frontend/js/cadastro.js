if (getSession()) window.location.href = 'home.html';

document.getElementById('tipoUsuario').addEventListener('change', function () {
    document.getElementById('camposCadastro').classList.toggle('hidden', !this.value);
});

document.getElementById('btnCadastrar').addEventListener('click', () => {
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
    if (getUsuarioByEmail(email)) {
        erro.textContent = 'Este email já está cadastrado nos dados de exemplo.';
        erro.classList.remove('hidden');
        return;
    }

    // Cria usuário em memória e já loga
    const novoUsuario = {
        id: Date.now(),
        tipo, nome, email, endereco, telefone, senha,
        foto_url: null,
    };

    // Adiciona na lista em memória (só dura enquanto a página estiver aberta)
    USUARIOS.push(novoUsuario);
    setSession(novoUsuario);

    sucesso.textContent = 'Cadastro realizado! Redirecionando...';
    sucesso.classList.remove('hidden');
    setTimeout(() => window.location.href = 'home.html', 1200);
});
