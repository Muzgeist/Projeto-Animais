const animalId = new URLSearchParams(window.location.search).get('id');
if (!animalId) window.location.href = 'home.html';

const sess = getSession();

const LABEL_ESPECIE = {
    cao: 'Cachorro', gato: 'Gato', ave: 'Ave',
    roedor: 'Roedor', reptil: 'Réptil', outro: 'Outro',
};
const LABEL_FAIXA = { filhote: 'Filhote', jovem: 'Jovem', adulto: 'Adulto', idoso: 'Idoso' };
const LABEL_STATUS = {
    disponivel:  { texto: 'Disponível',  css: 'badge-disponivel' },
    em_processo: { texto: 'Em processo', css: 'badge-em_processo' },
    adotado:     { texto: 'Adotado',     css: 'badge-adotado' },
};

function formatarData(iso) {
    if (!iso) return 'Não informado';
    const [a, m, d] = iso.split('-');
    return `${d}/${m}/${a}`;
}

function render(animal) {
    const st  = LABEL_STATUS[animal.status] || { texto: animal.status, css: '' };
    const jaAdotado = animal.status === 'adotado';

    // Foto
    const fotoHtml = animal.foto_url
        ? `<img src="${animal.foto_url}" alt="Foto de ${animal.nome}">`
        : `<div class="foto-placeholder">
               <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2">
                   <rect x="4" y="10" width="40" height="30" rx="4"/>
                   <circle cx="24" cy="23" r="7"/>
                   <circle cx="36" cy="16" r="2" fill="currentColor"/>
               </svg>
               <span>Sem foto cadastrada</span>
           </div>`;

    // Enfermidade
    const enfHtml = animal.enfermidade
        ? `<div class="enf-card">
               <p class="enf-label">Condição de saúde</p>
               <p class="enf-text">${animal.enfermidade}</p>
           </div>`
        : '';

    // Botão adotar
    let btnHtml = '';
    if (!jaAdotado) {
        if (!sess) {
            btnHtml = `<button class="btn-adotar" onclick="window.location.href='index.html'">Entrar para adotar</button>`;
        } else if (sess.tipo !== 'ong') {
            btnHtml = `<button class="btn-adotar" id="btnAdotar" onclick="adotar()">Adotar</button>`;
        }
    }

    document.getElementById('conteudo').innerHTML = `
        <div class="foto-wrap">${fotoHtml}</div>

        <div class="nome-row">
            <h1>${animal.nome}</h1>
            <span class="badge ${st.css}">${st.texto}</span>
        </div>
        <p class="ong-nome">Abrigo: ${animal.ong_nome}</p>

        <div class="info-card">
            <div class="info-grid">
                <div class="info-item">
                    <p class="info-label">Espécie</p>
                    <p class="info-value">${LABEL_ESPECIE[animal.especie] || animal.especie}</p>
                </div>
                <div class="info-item">
                    <p class="info-label">Raça</p>
                    <p class="info-value">${animal.raca || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <p class="info-label">Nascimento</p>
                    <p class="info-value">${formatarData(animal.data_nascimento)}</p>
                </div>
                <div class="info-item">
                    <p class="info-label">Faixa etária</p>
                    <p class="info-value">${LABEL_FAIXA[animal.faixa_etaria] || 'Não informado'}</p>
                </div>
            </div>
        </div>

        ${enfHtml}

        <div class="desc-card">
            <p class="desc-label">Sobre o animal</p>
            <p class="desc-text">${animal.descricao || 'Sem descrição.'}</p>
        </div>

        <div class="confirmacao hidden" id="confirmacao">
            <div class="check-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" width="24" height="24">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </div>
            <p>Solicitação enviada!</p>
            <span>Sua solicitação foi encaminhada ao abrigo responsável.</span>
        </div>

        ${btnHtml}
    `;
}

function adotar() {
    registrarInteresse(Number(animalId));

    const btn  = document.getElementById('btnAdotar');
    const conf = document.getElementById('confirmacao');
    if (btn) btn.disabled = true;
    if (btn) btn.textContent = 'Enviando...';

    setTimeout(() => {
        if (btn) btn.style.display = 'none';
        if (conf) conf.classList.remove('hidden');
    }, 700);
}

// Init
const animal = getAnimalById(animalId);
if (!animal) {
    document.getElementById('conteudo').innerHTML =
        '<p style="text-align:center;margin-top:3rem;color:#ff6b6b;">Animal não encontrado.</p>';
} else {
    render(animal);
}
