if (getSession()) window.location.href = 'home.html';
document.getElementById('tipoUsuario').addEventListener('change', function() {
    document.getElementById('camposCadastro').classList.toggle('hidden', !this.value);
});
document.getElementById('btnCadastrar').addEventListener('click', () => {
    const tipo=document.getElementById('tipoUsuario').value,
          nome=document.getElementById('cadNome').value.trim(),
          email=document.getElementById('cadEmail').value.trim(),
          endereco=document.getElementById('cadEndereco').value.trim(),
          telefone=document.getElementById('cadTelefone').value.trim(),
          senha=document.getElementById('cadSenha').value,
          erro=document.getElementById('erroCadastro'),
          sucesso=document.getElementById('sucessoCadastro');
    erro.classList.add('hidden'); sucesso.classList.add('hidden');
    if (!tipo||!nome||!email||!endereco||!telefone||!senha) { erro.textContent='Preencha todos os campos.'; erro.classList.remove('hidden'); return; }
    if (!/^\d{10,11}$/.test(telefone)) { erro.textContent='Telefone deve ter 10 ou 11 dígitos.'; erro.classList.remove('hidden'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { erro.textContent='Email inválido.'; erro.classList.remove('hidden'); return; }
    const novo = cadastrarUsuario({tipo,nome,email,endereco,telefone,senha,foto_url:null});
    if (!novo) { erro.textContent='Este email já está cadastrado.'; erro.classList.remove('hidden'); return; }
    setSession(novo);
    sucesso.textContent='Cadastro realizado! Redirecionando...'; sucesso.classList.remove('hidden');
    setTimeout(()=>window.location.href='home.html', 1100);
});
