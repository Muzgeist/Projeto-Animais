async function carregarPerfil() {
    const res = await fetch("http://localhost:3000/api/perfil");
    const data = await res.json();

    document.getElementById("dados").innerHTML = `
        Nome: ${data.nome} <br>
        Email: ${data.email} <br>
        Tipo: ${data.tipo}
    `;
}

carregarPerfil();