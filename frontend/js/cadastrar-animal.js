const sess = getSession();
if (!sess || sess.tipo !== 'ong') window.location.href = 'index.html';

document.getElementById('saudacao').textContent = `Olá, ${sess.nome}!`;
document.getElementById('dataNasc').max = new Date().toISOString().split('T')[0];

// ---- Preview de foto ----
let fotoDataUrl = null;

document.getElementById('inputFoto').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const preview = document.getElementById('previewFoto');
    const label   = document.querySelector('.upload-label');
    const reader  = new FileReader();

    reader.onload = e => {
        fotoDataUrl = e.target.result;
        preview.src = fotoDataUrl;
        preview.style.display = 'block';
        label.textContent = file.name;
    };
    reader.readAsDataURL(file);
});

// ---- Enfermidade toggle ----
let enfermidadeVal = null;

function selecionarEnfermidade(v) {
    enfermidadeVal = v;
    document.getElementById('opt-sim').className = 'radio-opt' + (v === 'sim' ? ' selected-sim' : '');
    document.getElementById('opt-nao').className = 'radio-opt' + (v === 'nao' ? ' selected-nao' : '');

    const campo = document.getElementById('campo-enfermidade');
    if (v === 'sim') {
        campo.classList.remove('hidden');
    } else {
        campo.classList.add('hidden');
        document.getElementById('descEnfermidade').value = '';
        esconderErro('erro-desc-enfermidade');
    }
    esconderErro('erro-enfermidade');
}

// ---- Validação ----
function mostrarErro(id)  { document.getElementById(id).classList.remove('hidden'); }
function esconderErro(id) { document.getElementById(id).classList.add('hidden'); }

document.getElementById('btnCadastrar').addEventListener('click', () => {
    const nome      = document.getElementById('nome').value.trim();
    const especie   = document.getElementById('especie').value;
    const raca      = document.getElementById('raca').value.trim();
    const dataNasc  = document.getElementById('dataNasc').value;
    const descricao = document.getElementById('descricao').value.trim();
    const descEnf   = document.getElementById('descEnfermidade').value.trim();
    const erroGeral = document.getElementById('erroGeral');
    const sucesso   = document.getElementById('sucesso');

    // Reset erros
    ['erro-nome','erro-especie','erro-enfermidade','erro-desc-enfermidade','erro-descricao']
        .forEach(esconderErro);
    erroGeral.classList.add('hidden');
    sucesso.classList.add('hidden');

    let ok = true;
    if (!nome)    { mostrarErro('erro-nome');    ok = false; }
    if (!especie) { mostrarErro('erro-especie'); ok = false; }
    if (enfermidadeVal === null) { mostrarErro('erro-enfermidade'); ok = false; }
    if (enfermidadeVal === 'sim' && !descEnf) { mostrarErro('erro-desc-enfermidade'); ok = false; }
    if (!descricao) { mostrarErro('erro-descricao'); ok = false; }
    if (!ok) return;

    // Adiciona o animal ao array em memória
    const novoAnimal = {
        id: Date.now(),
        nome,
        especie,
        raca: raca || null,
        data_nascimento: dataNasc || null,
        status: 'disponivel',
        ong_id: sess.id,
        ong_nome: sess.nome,
        enfermidade: enfermidadeVal === 'sim' ? descEnf : null,
        descricao,
        foto_url: fotoDataUrl || null,  // imagem carregada pelo usuário (base64)
    };

    ANIMAIS.push(novoAnimal);

    sucesso.textContent = 'Animal cadastrado com sucesso! Redirecionando...';
    sucesso.classList.remove('hidden');

    const btn = document.getElementById('btnCadastrar');
    btn.disabled = true;

    setTimeout(() => window.location.href = 'home.html', 1400);
});
