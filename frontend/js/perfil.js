const sess=getSession();
if(!sess){window.location.href='index.html';}
const isOng=sess.tipo==='ong';
document.getElementById('tipoBadge').textContent=isOng?'ONG':'Adotante';
document.getElementById('tipoBadge').className='perfil-badge-tipo '+(isOng?'tipo-ong':'tipo-adotante');
document.getElementById('perfilNome').textContent=sess.nome;
document.getElementById('pEmail').textContent=sess.email;
document.getElementById('pTelefone').textContent=sess.telefone||'—';
document.getElementById('pEndereco').textContent=sess.endereco||'—';
function aplicarFoto(url){
    const img=document.getElementById('avatarImg'),ph=document.getElementById('avatarPlaceholder');
    if(url){img.src=url;img.style.display='block';ph.style.display='none';}
    else{img.style.display='none';ph.style.display='flex';}
}
aplicarFoto(sess.foto_url||null);
document.getElementById('inputFotoPerfil').addEventListener('change',function(){
    const file=this.files[0];if(!file)return;
    const r=new FileReader();
    r.onload=e=>{aplicarFoto(e.target.result);updateSession(sess.id,{foto_url:e.target.result});};
    r.readAsDataURL(file);
});
if(!isOng){
    const meus=getInteresses().filter(i=>i.usuario_id===sess.id);
    if(meus.length){
        document.getElementById('secaoInteresses').style.display='';
        const lista=document.getElementById('listaInteresses');
        meus.forEach(i=>{
            const a=getAnimalById(i.animal_id);if(!a)return;
            const el=document.createElement('div');el.className='pi-interesse';
            el.onclick=()=>window.location.href=`animal.html?id=${a.id}`;
            el.innerHTML=`<span class="pi-i-nome">${a.nome}</span><span class="pi-i-esp">${a.raca||a.especie}</span>`;
            lista.appendChild(el);
        });
    }
}
function sair(){clearSession();window.location.href='index.html';}
