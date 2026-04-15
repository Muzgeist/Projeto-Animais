const sess = getSession();
if (!sess || sess.tipo !== 'ong') window.location.href = 'index.html';

document.getElementById('saudacao').textContent = `Olá, ${sess.nome}!`;
document.getElementById('dataNasc').max = new Date().toISOString().split('T')[0];

let fotoDataUrl = null;
document.getElementById('inputFoto').addEventListener('change', function () {
    const file = this.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        fotoDataUrl = e.target.result;
        const prev = document.getElementById('previewFoto');
        prev.src = fotoDataUrl; prev.style.display = 'block';
        document.querySelector('.upload-label').textContent = file.name;
    };
    reader.readAsDataURL(file);
});

let enfermidadeVal = null;
function selecionarEnfermidade(v) {
    enfermidadeVal = v;
    document.getElementById('opt-sim').className = 'radio-opt' + (v === 'sim' ? ' selected-sim' : '');
    document.getElementById('opt-nao').className = 'radio-opt' + (v === 'nao' ? ' selected-nao' : '');
    const campo = document.getElementById('campo-enfermidade');
    if (v === 'sim') { campo.classList.remove('hidden'); }
    else { campo.classList.add('hidden'); document.getElementById('descEnfermidade').value = ''; esconderErro('erro-desc-enfermidade'); }
    esconderErro('erro-enfermidade');
}
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

    ['erro-nome','erro-especie','erro-enfermidade','erro-desc-enfermidade','erro-descricao'].forEach(esconderErro);
    erroGeral.classList.add('hidden');
    sucesso.classList.add('hidden');

    let ok = true;
    if (!nome)               { mostrarErro('erro-nome');             ok = false; }
    if (!especie)            { mostrarErro('erro-especie');          ok = false; }
    if (enfermidadeVal === null) { mostrarErro('erro-enfermidade');  ok = false; }
    if (enfermidadeVal === 'sim' && !descEnf) { mostrarErro('erro-desc-enfermidade'); ok = false; }
    if (!descricao)          { mostrarErro('erro-descricao');        ok = false; }
    if (!ok) return;

    cadastrarAnimal({
        nome, especie,
        raca: raca || null,
        data_nascimento: dataNasc || null,
        ong_id: sess.id,
        ong_nome: sess.nome,
        enfermidade: enfermidadeVal === 'sim' ? descEnf : null,
        descricao,
        foto_url: fotoDataUrl || null,
    });

    sucesso.textContent = 'Animal cadastrado com sucesso! Redirecionando...';
    sucesso.classList.remove('hidden');
    document.getElementById('btnCadastrar').disabled = true;
    setTimeout(() => window.location.href = 'home.html', 1200);
});
