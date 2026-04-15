const sess = getSession();
if (!sess) window.location.href = 'index.html';
const tipoLabel = sess.tipo === 'ong' ? 'ONG' : 'Adotante';
const tipoClass = sess.tipo === 'ong' ? 'tipo-ong' : 'tipo-adotante';
document.getElementById('dados').innerHTML = `
    <span class="perfil-tipo ${tipoClass}">${tipoLabel}</span>
    <div class="perfil-info">
        <p><strong>Nome</strong>${sess.nome}</p>
        <p><strong>Email</strong>${sess.email}</p>
        <p><strong>Endereço</strong>${sess.endereco}</p>
        <p><strong>Telefone</strong>${sess.telefone}</p>
    </div>`;
function sair() { clearSession(); window.location.href = 'index.html'; }
