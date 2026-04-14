// Redireciona se já logado
if (getSession()) window.location.href = 'home.html';

document.getElementById('btnLogin').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value.trim();
    const senha  = document.getElementById('loginSenha').value;
    const erro   = document.getElementById('erroLogin');

    erro.classList.add('hidden');

    if (!email || !senha) {
        erro.textContent = 'Preencha email e senha.';
        erro.classList.remove('hidden');
        return;
    }

    const usuario = getUsuarioByEmail(email);

    if (!usuario || usuario.senha !== senha) {
        erro.textContent = 'Email ou senha incorretos.';
        erro.classList.remove('hidden');
        return;
    }

    setSession(usuario);
    window.location.href = 'home.html';
});

// Permite pressionar Enter para logar
document.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btnLogin').click();
});
