const sess = getSession();

if (sess) {
    document.getElementById('saudacao').textContent = `Olá, ${sess.nome}!`;
    if (sess.tipo === 'ong') document.getElementById('btnCadastrarAnimal').classList.remove('hidden');
}

const LABEL_ESPECIE = { cao:'Cachorro', gato:'Gato', ave:'Ave', roedor:'Roedor', reptil:'Réptil', outro:'Outro' };
const LABEL_STATUS  = {
    disponivel:  { texto:'Disponível',  css:'badge-disponivel' },
    em_processo: { texto:'Em processo', css:'badge-em_processo' },
    adotado:     { texto:'Adotado',     css:'badge-adotado' },
};

function placeholderSVG() {
    return `<div class="card-foto-placeholder">
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2">
            <rect x="4" y="10" width="40" height="30" rx="4"/>
            <circle cx="24" cy="23" r="7"/>
            <circle cx="36" cy="16" r="2" fill="currentColor"/>
        </svg>
    </div>`;
}

function criarCard(animal) {
    const st   = LABEL_STATUS[animal.status] || { texto: animal.status, css: '' };
    const esp  = LABEL_ESPECIE[animal.especie] || animal.especie;
    const foto = animal.foto_url
        ? `<img class="card-foto" src="${animal.foto_url}" alt="${animal.nome}">`
        : placeholderSVG();
    const card = document.createElement('div');
    card.className = 'card-animal';
    card.onclick = () => window.location.href = `animal.html?id=${animal.id}`;
    card.innerHTML = `
        ${foto}
        <div class="card-body">
            <h3>${animal.nome}</h3>
            <p>${esp}${animal.raca ? ' · ' + animal.raca : ''}</p>
            <span class="badge-card ${st.css}">${st.texto}</span>
        </div>`;
    return card;
}

function renderizarSecao(faixa, lista) {
    const grid  = document.getElementById('grid-' + faixa);
    const secao = document.getElementById('secao-' + faixa);
    const badge = document.getElementById('badge-' + faixa);
    grid.innerHTML = '';
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

renderizar();
