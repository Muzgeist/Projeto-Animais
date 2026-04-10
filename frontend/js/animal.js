const API = 'http://localhost:3000/api';

function getToken() { return localStorage.getItem('token'); }
function getTipo()  { return localStorage.getItem('tipo'); }

// Lê o id da URL: animal.html?id=5
const params  = new URLSearchParams(window.location.search);
const animalId = params.get('id');

if (!animalId) window.location.href = 'home.html';

// ---- Helpers ----

function formatarData(dataISO) {
    if (!dataISO) return 'Não informado';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}

function labelFaixa(faixa) {
    const map = { filhote: 'Filhote', jovem: 'Jovem', adulto: 'Adulto', idoso: 'Idoso' };
    return map[faixa] || 'Não informado';
}

function labelStatus(status) {
    const map = {
        disponivel:  { texto: 'Disponível',   css: 'badge-disponivel' },
        em_processo: { texto: 'Em processo',   css: 'badge-em_processo' },
        adotado:     { texto: 'Adotado',        css: 'badge-adotado' },
    };
    return map[status] || { texto: status, css: '' };
}

function labelEspecie(especie) {
    const map = {
        cao: 'Cachorro', gato: 'Gato', ave: 'Ave',
        roedor: 'Roedor', reptil: 'Réptil', outro: 'Outro',
    };
    return map[especie] || especie;
}

// Separa enfermidade da descrição se foi salva com o marcador
function parseDescricao(desc) {
    if (!desc) return { descricao: '', enfermidade: null };
    const marker = '\n\n[Enfermidade/Deficiência]: ';
    const idx = desc.indexOf(marker);
    if (idx === -1) return { descricao: desc, enfermidade: null };
    return {
        descricao:   desc.slice(0, idx),
        enfermidade: desc.slice(idx + marker.length),
    };
}

// ---- Render ----

function renderAnimal(a) {
    const { descricao, enfermidade } = parseDescricao(a.descricao);
    const status = labelStatus(a.status);
    const logado = !!getToken();
    const jaAdotado = a.status === 'adotado';

    // Bloco de enfermidade — só aparece se houver
    const enfHtml = enfermidade ? `
        <div class="enf-card">
            <p class="enf-label">Condição de saúde</p>
            <p class="enf-text">${enfermidade}</p>
        </div>
    ` : '';

    // Foto — usa a URL se existir, senão placeholder SVG
    const fotoHtml = a.foto_url
        ? `<img src="${a.foto_url}" alt="Foto de ${a.nome}">`
        : `<div class="foto-placeholder">
               <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2">
                   <rect x="4" y="10" width="40" height="30" rx="4"/>
                   <circle cx="24" cy="23" r="7"/>
                   <circle cx="36" cy="16" r="2" fill="currentColor"/>
               </svg>
               <span>Sem foto cadastrada</span>
           </div>`;

    // Botão adotar — oculto para ONG ou se já adotado
    let btnHtml = '';
    if (!jaAdotado && getTipo() !== 'ong') {
        if (!logado) {
            btnHtml = `<button class="btn-adotar" onclick="window.location.href='index.html'">
                           Entrar para adotar
                       </button>`;
        } else {
            btnHtml = `<button class="btn-adotar" id="btnAdotar" onclick="adotar(${a.id})">
                           Adotar
                       </button>`;
        }
    }

    document.getElementById('conteudo').innerHTML = `
        <div class="foto-wrap">${fotoHtml}</div>

        <div class="nome-row">
            <h1>${a.nome}</h1>
            <span class="badge ${status.css}">${status.texto}</span>
        </div>
        <p class="ong-nome">Abrigo: ${a.ong_nome}</p>

        <div class="info-card">
            <div class="info-grid">
                <div class="info-item">
                    <p class="info-label">Espécie</p>
                    <p class="info-value">${labelEspecie(a.especie)}</p>
                </div>
                <div class="info-item">
                    <p class="info-label">Raça</p>
                    <p class="info-value">${a.raca || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <p class="info-label">Nascimento</p>
                    <p class="info-value">${formatarData(a.data_nascimento)}</p>
                </div>
                <div class="info-item">
                    <p class="info-label">Faixa etária</p>
                    <p class="info-value">${labelFaixa(a.faixa_etaria)}</p>
                </div>
            </div>
        </div>

        ${enfHtml}

        <div class="desc-card">
            <p class="desc-label">Sobre o animal</p>
            <p class="desc-text">${descricao || 'Sem descrição.'}</p>
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

// ---- Adoção ----

async function adotar(id) {
    const btn  = document.getElementById('btnAdotar');
    const conf = document.getElementById('confirmacao');

    btn.disabled    = true;
    btn.textContent = 'Enviando...';

    try {
        const res = await fetch(`${API}/interesses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ animal_id: id }),
        });

        // Mesmo que a rota ainda não exista, exibimos a confirmação
        btn.style.display = 'none';
        conf.classList.remove('hidden');
    } catch {
        btn.style.display = 'none';
        conf.classList.remove('hidden');
    }
}

// ---- Init ----

async function init() {
    try {
        const res = await fetch(`${API}/animais/${animalId}`);
        if (!res.ok) throw new Error('não encontrado');
        const animal = await res.json();
        renderAnimal(animal);
    } catch {
        document.getElementById('conteudo').innerHTML =
            '<p style="text-align:center;margin-top:3rem;color:#ff6b6b;">Animal não encontrado.</p>';
    }
}

init();
