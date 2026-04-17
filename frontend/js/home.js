const sess = getSession();

if (sess) {
    document.getElementById('saudacao').textContent = `Olá, ${sess.nome}!`;
    if (sess.tipo === 'ong') document.getElementById('btnCadastrarAnimal').classList.remove('hidden');
    const banner = document.getElementById('bannerBv');
    const msg    = document.getElementById('bannerMsg');
    banner.style.display = '';
    msg.textContent = `Bem-vindo(a) a Yggdrasil, ${sess.nome}!`;
}

const LABEL_ESPECIE = { cao:'Cachorro', gato:'Gato', ave:'Ave', roedor:'Roedor', reptil:'Réptil', outro:'Outro' };
const LABEL_STATUS  = {
    disponivel:  { texto:'Disponível',  css:'badge-disponivel'  },
    em_processo: { texto:'Em processo', css:'badge-em_processo' },
    adotado:     { texto:'Adotado',     css:'badge-adotado'     },
};

function criarCard(a) {
    const st  = LABEL_STATUS[a.status] || { texto: a.status, css: '' };
    const esp = LABEL_ESPECIE[a.especie] || a.especie;

    const card = document.createElement('div');
    card.className = 'card-animal';
    card.onclick = () => window.location.href = `animal.html?id=${a.id}`;

    // Foto — criada via DOM para evitar qualquer problema de escaping
    let fotoEl;
    if (a.foto_url) {
        fotoEl = document.createElement('img');
        fotoEl.className  = 'card-foto';
        fotoEl.alt        = a.nome;
        fotoEl.src        = a.foto_url;
        // Se a imagem falhar, remove ela silenciosamente (sem mostrar nada quebrado)
        fotoEl.onerror = function () { this.remove(); };
    } else {
        // Sem foto: bloco vazio com altura para manter layout
        fotoEl = document.createElement('div');
        fotoEl.className = 'card-foto-vazio';
    }

    const body = document.createElement('div');
    body.className = 'card-body';
    body.innerHTML = `
        <h3>${a.nome}</h3>
        <p>${esp}${a.raca ? ' · ' + a.raca : ''}</p>
        <span class="badge-card ${st.css}">${st.texto}</span>
    `;

    card.appendChild(fotoEl);
    card.appendChild(body);
    return card;
}

function renderizarSecao(faixa, lista) {
    const grid  = document.getElementById('grid-'  + faixa);
    const secao = document.getElementById('secao-' + faixa);
    const badge = document.getElementById('badge-' + faixa);

    // Limpa sem innerHTML para não recriar nada estranho
    while (grid.firstChild) grid.removeChild(grid.firstChild);
    badge.textContent = lista.length;

    if (!lista.length) { secao.style.display = 'none'; return; }
    secao.style.display = '';
    lista.forEach(a => grid.appendChild(criarCard(a)));
}

function renderizar() {
    const especie = document.getElementById('filtroEspecie').value;
    const lista   = getAnimais(especie ? { especie } : {});
    renderizarSecao('filhotes', lista.filter(a => a.faixa_etaria === 'filhote'));
    renderizarSecao('adultos',  lista.filter(a => a.faixa_etaria === 'adulto'));
    renderizarSecao('idosos',   lista.filter(a => a.faixa_etaria === 'idoso'));
}

// Expõe renderizar globalmente para o botão filtrar do HTML
window.renderizar = renderizar;
renderizar();
