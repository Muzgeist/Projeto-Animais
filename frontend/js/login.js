if (getSession()) { window.location.href = 'home.html'; }

document.getElementById('btnLogin').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value.trim();
    const senha  = document.getElementById('loginSenha').value;
    const erro   = document.getElementById('erroLogin');
    erro.classList.add('hidden');
    if (!email || !senha) {
        erro.textContent = 'Preencha email e senha.';
        erro.classList.remove('hidden'); return;
    }
    const u = getUsuarioByEmail(email);
    if (!u || u.senha !== senha) {
        erro.textContent = 'Email ou senha incorretos.';
        erro.classList.remove('hidden'); return;
    }
    setSession(u);
    window.location.href = 'home.html';
});
document.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('btnLogin').click(); });
