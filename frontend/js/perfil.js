const sess = getSession();
if (!sess) window.location.href = 'index.html';

// ── Preenche dados ──────────────────────────────────────────
const tipoLabel = sess.tipo === 'ong' ? 'ONG' : 'Adotante';
const tipoClass = sess.tipo === 'ong' ? 'tipo-ong' : 'tipo-adotante';

document.getElementById('tipoBadge').textContent = tipoLabel;
document.getElementById('tipoBadge').className   = 'perfil-tipo-badge ' + tipoClass;
document.getElementById('perfilNome').textContent  = sess.nome;
document.getElementById('perfilEmail').textContent = sess.email;
document.getElementById('dadoNome').textContent     = sess.nome;
document.getElementById('dadoEmail').textContent    = sess.email;
document.getElementById('dadoTelefone').textContent = sess.telefone || '—';
document.getElementById('dadoEndereco').textContent = sess.endereco || '—';

// ── Foto de perfil ──────────────────────────────────────────
function carregarFotoPerfil(url) {
    const img         = document.getElementById('avatarImg');
    const placeholder = document.getElementById('avatarPlaceholder');
    if (url) {
        img.src = url;
        img.style.display = 'block';
        placeholder.style.display = 'none';
    } else {
        img.style.display = 'none';
        placeholder.style.display = 'flex';
    }
}
carregarFotoPerfil(sess.foto_url || null);

document.getElementById('inputFotoPerfil').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        const dataUrl = e.target.result;
        carregarFotoPerfil(dataUrl);
        updateSession({ foto_url: dataUrl });
    };
    reader.readAsDataURL(file);
});

// ── Interesses (adotante) ───────────────────────────────────
if (sess.tipo === 'adotante') {
    const interesses = getInteresses().filter(i => i.usuario_id === sess.id);
    if (interesses.length > 0) {
        const secao = document.getElementById('secaoInteresses');
        const lista = document.getElementById('listaInteresses');
        secao.style.display = '';
        interesses.forEach(i => {
            const animal = getAnimalById(i.animal_id);
            if (!animal) return;
            const item = document.createElement('div');
            item.className = 'interesse-item';
            item.onclick   = () => window.location.href = `animal.html?id=${animal.id}`;
            item.innerHTML = `
                <div class="interesse-info">
                    <span class="interesse-nome">${animal.nome}</span>
                    <span class="interesse-detalhe">${animal.especie === 'cao' ? 'Cachorro' : animal.especie === 'gato' ? 'Gato' : animal.especie} · ${animal.raca || 'SRD'}</span>
                </div>
                <span class="interesse-status badge-disponivel">Solicitado</span>
            `;
            lista.appendChild(item);
        });
    }
}

function sair() {
    clearSession();
    window.location.href = 'index.html';
}
