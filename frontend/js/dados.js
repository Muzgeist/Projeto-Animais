/**
 * dados.js — fonte central de dados do sistema.
 *
 * COMO ADICIONAR IMAGENS:
 *   1. Coloque o arquivo em frontend/assets/animais/  (ex: bolt.jpg)
 *   2. No animal correspondente, altere foto_url de null para o caminho:
 *        foto_url: '../assets/animais/bolt.jpg'
 *
 * CRITÉRIO DE FAIXA ETÁRIA (calculado por data_nascimento):
 *   filhote : < 12 meses
 *   adulto  : 1 a 8 anos
 *   idoso   : > 8 anos
 *
 * ESPÉCIES: cao | gato | ave | roedor | reptil | outro
 */

// ─── USUÁRIOS ────────────────────────────────────────────────
const USUARIOS = [
    { id:1, tipo:'ong',      nome:'Abrigo Esperança',  email:'contato@esperanca.org', endereco:'Rua das Flores, 120 — Belo Horizonte, MG', telefone:'3132345678', senha:'123456' },
    { id:2, tipo:'adotante', nome:'Maria Silva',        email:'maria@email.com',        endereco:'Av. Brasil, 500 — Contagem, MG',           telefone:'31987654321', senha:'123456' },
];

// ─── ANIMAIS ─────────────────────────────────────────────────
// 3 filhotes + 3 adultos + 3 idosos por espécie principal = 18 registros
// (+ extras para garantir cobertura de todas as espécies)
const ANIMAIS = [

    // ══════════════ CACHORRO ══════════════
    // filhotes
    { id:1,  nome:'Pingo',   especie:'cao', raca:'SRD',            data_nascimento:'2024-06-10', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Pingo é um filhote esperto e cheio de energia. Adora brincar com crianças e aprende comandos rápido. Já vacinado.', foto_url: null /* '../assets/animais/pingo.jpg' */ },
    { id:2,  nome:'Mel',     especie:'cao', raca:'Beagle',         data_nascimento:'2024-08-20', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Mel é curiosa e brincalhona. Ama explorar o ambiente e farejar tudo. Ótima para famílias ativas.', foto_url: null /* '../assets/animais/mel.jpg' */ },
    { id:3,  nome:'Theo',    especie:'cao', raca:'Poodle',         data_nascimento:'2024-09-05', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Theo é meigo e adora colo. Adapta-se bem a apartamentos. Pelagem hipoalergênica, ótimo para quem tem alergia.', foto_url: null /* '../assets/animais/theo.jpg' */ },
    // adultos
    { id:4,  nome:'Bolt',    especie:'cao', raca:'Labrador',       data_nascimento:'2021-03-15', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Bolt é um cachorro extremamente dócil. Adora crianças e convive bem com outros cães. Castrado e vacinado.', foto_url: null /* '../assets/animais/bolt.jpg' */ },
    { id:5,  nome:'Thor',    especie:'cao', raca:'Vira-lata',      data_nascimento:'2020-11-02', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:'Displasia leve no quadril direito. Não impede atividades normais, mas requer acompanhamento veterinário semestral.', descricao:'Thor é companheiro e leal. Adora passear e está sempre de bom humor. Ótimo com crianças maiores.', foto_url: null /* '../assets/animais/thor.jpg' */ },
    { id:6,  nome:'Lua',     especie:'cao', raca:'Border Collie',  data_nascimento:'2022-01-18', status:'em_processo', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Lua é inteligente e precisa de estímulo mental diário. Aprende truques com facilidade e adora agility.', foto_url: null /* '../assets/animais/lua.jpg' */ },
    // idosos
    { id:7,  nome:'Rex',     especie:'cao', raca:'Pastor Alemão',  data_nascimento:'2013-05-22', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:'Artrite leve nas patas traseiras. Precisa de cama macia e passeios curtos.', descricao:'Rex é um cão nobre e tranquilo. Ama carinho e uma boa soneca ao sol. Ideal para quem busca um companheiro sereno.', foto_url: null /* '../assets/animais/rex.jpg' */ },
    { id:8,  nome:'Bob',     especie:'cao', raca:'Cocker Spaniel', data_nascimento:'2012-09-14', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Bob é gentil e adora rotina. Prefere ambientes calmos. Ótimo companheiro para moradores solitários ou idosos.', foto_url: null /* '../assets/animais/bob.jpg' */ },
    { id:9,  nome:'Duque',   especie:'cao', raca:'SRD',            data_nascimento:'2014-02-07', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Duque é um veterano cheio de amor para dar. Já está castrado, vacinado e adaptado à vida em apartamento.', foto_url: null /* '../assets/animais/duque.jpg' */ },

    // ══════════════ GATO ══════════════
    // filhotes
    { id:10, nome:'Mia',     especie:'gato', raca:'SRD',           data_nascimento:'2024-07-01', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Mia é uma gatinha curiosa e brincalhona. Adora perseguir brinquedos e explorar cada canto do lar.', foto_url: null /* '../assets/animais/mia.jpg' */ },
    { id:11, nome:'Mel G',   especie:'gato', raca:'Siamês',        data_nascimento:'2024-05-15', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Mel é falante e interativa como todo siamês. Adora atenção e não gosta de ficar sozinha por muito tempo.', foto_url: null /* '../assets/animais/mel-g.jpg' */ },
    { id:12, nome:'Bento',   especie:'gato', raca:'Maine Coon',    data_nascimento:'2024-10-03', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Bento já promete ser grande! Tem pelagem densa e temperamento gentil. Sociável com crianças e outros pets.', foto_url: null /* '../assets/animais/bento.jpg' */ },
    // adultos
    { id:13, nome:'Luna G',  especie:'gato', raca:'Persa',         data_nascimento:'2020-04-20', status:'em_processo', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Luna é elegante e tranquila. Prefere ambientes calmos. Não se dá bem com cachorros. Castrada e vacinada.', foto_url: null /* '../assets/animais/luna-g.jpg' */ },
    { id:14, nome:'Garfield',especie:'gato', raca:'Misto Persa',   data_nascimento:'2019-11-30', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Garfield ama comer, dormir e receber carinho nessa ordem. Perfeitamente adaptado à vida indoor.', foto_url: null /* '../assets/animais/garfield.jpg' */ },
    { id:15, nome:'Nina',    especie:'gato', raca:'SRD',           data_nascimento:'2021-08-12', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:'Rinite crônica leve. Necessita de ambiente sem correntes de ar.', descricao:'Nina é afetiva e independente na medida certa. Adora se aconchegar no colo à noite.', foto_url: null /* '../assets/animais/nina.jpg' */ },
    // idosos
    { id:16, nome:'Bianca',  especie:'gato', raca:'Angorá',        data_nascimento:'2012-03-08', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:'Hipertireoidismo controlado com medicação diária.', descricao:'Bianca é uma senhora elegante que adora silêncio e carinho. Vive muito bem em apartamentos tranquilos.', foto_url: null /* '../assets/animais/bianca.jpg' */ },
    { id:17, nome:'Simba',   especie:'gato', raca:'SRD',           data_nascimento:'2013-07-19', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Simba é um gato sereno que passa o dia no sol e a noite no colo. Ótimo para quem busca companhia tranquila.', foto_url: null /* '../assets/animais/simba.jpg' */ },
    { id:18, nome:'Fiona',   especie:'gato', raca:'British SH',    data_nascimento:'2014-01-25', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Fiona tem personalidade forte mas é leal ao seu dono. Gosta de brinquedos de penas e caminhas altas.', foto_url: null /* '../assets/animais/fiona.jpg' */ },

    // ══════════════ AVE ══════════════
    // filhotes
    { id:19, nome:'Kiwi',    especie:'ave', raca:'Calopsita',      data_nascimento:'2024-08-10', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Kiwi está aprendendo a assobiar e já repete algumas sílabas. Adora música e movimento. Muito interativa.', foto_url: null /* '../assets/animais/kiwi.jpg' */ },
    { id:20, nome:'Bico',    especie:'ave', raca:'Periquito',      data_nascimento:'2024-06-22', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Bico é colorido e agitado. Gosta de espelhos e brinquedos. Ideal para quem quer uma ave animada e fácil de cuidar.', foto_url: null /* '../assets/animais/bico.jpg' */ },
    { id:21, nome:'Pipa',    especie:'ave', raca:'Agapornis',      data_nascimento:'2024-09-14', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Pipa é carinhosa e forma laços fortes com seu tutor. Precisa de companhia — adoção em par é bem-vinda!', foto_url: null /* '../assets/animais/pipa.jpg' */ },
    // adultos
    { id:22, nome:'Cleo',    especie:'ave', raca:'Calopsita',      data_nascimento:'2021-08-30', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Cleo adora assobiar e ficar no ombro do tutor. Sociável e já habituada a humanos. Requer gaiola espaçosa.', foto_url: null /* '../assets/animais/cleo.jpg' */ },
    { id:23, nome:'Zazu',    especie:'ave', raca:'Papagaio',       data_nascimento:'2018-03-05', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Zazu fala palavras soltas e frases curtas. Muito inteligente, precisa de estimulação diária. Adora frutas.', foto_url: null /* '../assets/animais/zazu.jpg' */ },
    { id:24, nome:'Frida',   especie:'ave', raca:'Periquito',      data_nascimento:'2020-11-17', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Frida é tranquila e adora observar a movimentação da casa. Convive bem com outras aves de pequeno porte.', foto_url: null /* '../assets/animais/frida.jpg' */ },
    // idosos
    { id:25, nome:'Loro',    especie:'ave', raca:'Papagaio',       data_nascimento:'2005-02-14', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:'Artrite leve nas articulações. Precisa de poleiros em diferentes alturas.', descricao:'Loro tem um vocabulário extenso e personalidade marcante. Ainda ativo e bem humorado, busca um lar experiente.', foto_url: null /* '../assets/animais/loro.jpg' */ },
    { id:26, nome:'Nico',    especie:'ave', raca:'Calopsita',      data_nascimento:'2009-06-20', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Nico é sereno e melodioso. Passa o dia cantando suavemente. Ótimo para ambientes tranquilos e silenciosos.', foto_url: null /* '../assets/animais/nico.jpg' */ },
    { id:27, nome:'Perla',   especie:'ave', raca:'Cacatua',        data_nascimento:'2007-09-03', status:'disponivel',  ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Perla é experiente e bem socializada. Gosta de carinho na cabeça e de observar a rotina da casa.', foto_url: null /* '../assets/animais/perla.jpg' */ },

    // ══════════════ ROEDOR ══════════════
    // filhotes
    { id:28, nome:'Pipoca',  especie:'roedor', raca:'Hamster Sírio',  data_nascimento:'2024-10-05', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Pipoca é ativa e curiosa. Adora escavar e correr na rodinha. Fácil de cuidar, ideal para iniciantes.', foto_url: null /* '../assets/animais/pipoca.jpg' */ },
    { id:29, nome:'Flocos',  especie:'roedor', raca:'Porquinho-da-índia', data_nascimento:'2024-08-18', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Flocos faz sons adoráveis e gosta de interagir. Precisa de companheiro da mesma espécie para se sentir feliz.', foto_url: null /* '../assets/animais/flocos.jpg' */ },
    { id:30, nome:'Bolinha', especie:'roedor', raca:'Gerbil',         data_nascimento:'2024-09-25', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Bolinha é ágil e divertida de observar. Vive bem em pares e precisa de gaiola com material para escavar.', foto_url: null /* '../assets/animais/bolinha-r.jpg' */ },
    // adultos
    { id:31, nome:'Caju',    especie:'roedor', raca:'Porquinho-da-índia', data_nascimento:'2022-04-10', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Caju já está manso e adora ser manipulado. Come bem e tem temperamento dócil. Bom para crianças maiores.', foto_url: null /* '../assets/animais/caju.jpg' */ },
    { id:32, nome:'Chips',   especie:'roedor', raca:'Hamster Anão',   data_nascimento:'2023-01-30', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Chips é compacto e cheio de personalidade. Acorda no crepúsculo e é muito ativo durante a noite.', foto_url: null /* '../assets/animais/chips.jpg' */ },
    { id:33, nome:'Fofinho', especie:'roedor', raca:'Chinchila',      data_nascimento:'2021-07-14', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Fofinho tem pelagem incrivelmente macia. Vive muito tempo e precisa de ambiente fresco. Muito interativo.', foto_url: null /* '../assets/animais/fofinho.jpg' */ },
    // idosos
    { id:34, nome:'Vovô',    especie:'roedor', raca:'Porquinho-da-índia', data_nascimento:'2018-03-22', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:'Maloclusão leve dos dentes. Precisa de dieta específica com vegetais macios.', descricao:'Vovô é calmo e já está acostumado ao toque humano. Perfeito para quem quer um companheiro quieto e fácil.', foto_url: null /* '../assets/animais/vovo.jpg' */ },
    { id:35, nome:'Mel R',   especie:'roedor', raca:'Chinchila',      data_nascimento:'2016-11-08', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Mel ainda está ativa para a idade. Adora banho de areia e correr na roda. Espécie longeva, compromisso de longo prazo.', foto_url: null /* '../assets/animais/mel-r.jpg' */ },
    { id:36, nome:'Faísca',  especie:'roedor', raca:'Gerbil',         data_nascimento:'2019-05-17', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Faísca já passou o auge da agilidade mas ainda explora com curiosidade. Tranquila e fácil de manusear.', foto_url: null /* '../assets/animais/faisca.jpg' */ },

    // ══════════════ RÉPTIL ══════════════
    // filhotes
    { id:37, nome:'Spike',   especie:'reptil', raca:'Dragão Barbudo', data_nascimento:'2024-07-20', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Spike é um filhote ativo e já está acostumado ao manuseio. Come bem e cresce rapidamente. Requer terrário aquecido.', foto_url: null /* '../assets/animais/spike.jpg' */ },
    { id:38, nome:'Jade',    especie:'reptil', raca:'Iguana Verde',   data_nascimento:'2024-05-11', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Jade ainda é pequena mas já mostra temperamento curioso. Herbívora, requer iluminação UVB e espaço para crescer.', foto_url: null /* '../assets/animais/jade.jpg' */ },
    { id:39, nome:'Koba',    especie:'reptil', raca:'Gecko Leopardo', data_nascimento:'2024-09-01', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Koba é dócil e fácil para iniciantes. Come grilos e mealworms. Ativo ao entardecer, ótimo para observar.', foto_url: null /* '../assets/animais/koba.jpg' */ },
    // adultos
    { id:40, nome:'Naga',    especie:'reptil', raca:'Cobra do Milho', data_nascimento:'2021-02-28', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Naga é mansa e tolerante ao manuseio. Come camundongos congelados. Ótima espécie para quem quer um réptil tranquilo.', foto_url: null /* '../assets/animais/naga.jpg' */ },
    { id:41, nome:'Dino',    especie:'reptil', raca:'Dragão Barbudo', data_nascimento:'2020-06-15', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Dino é sociável e reconhece seu tutor. Come vegetais e insetos. Precisa de terrário amplo e lâmpada de calor.', foto_url: null /* '../assets/animais/dino.jpg' */ },
    { id:42, nome:'Cleo R',  especie:'reptil', raca:'Iguana Verde',   data_nascimento:'2019-10-05', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:'Deficiência de Vitamina D3 no passado, já corrigida. Requer exposição regular a luz UVB.', descricao:'Cleo é uma iguana adulta imponente. Já domesticada, aceita manuseio com paciência. Requer tutor experiente.', foto_url: null /* '../assets/animais/cleo-r.jpg' */ },
    // idosos
    { id:43, nome:'Atlas',   especie:'reptil', raca:'Jabuti Piranga', data_nascimento:'2000-01-01', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Atlas é um jabuti longevo e calmo. Vive décadas. Ótimo para quem quer um animal de estimação tranquilo e de baixa manutenção.', foto_url: null /* '../assets/animais/atlas.jpg' */ },
    { id:44, nome:'Gizmo',   especie:'reptil', raca:'Gecko Leopardo', data_nascimento:'2012-04-17', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Gizmo ainda está ativo e come bem. Mais tranquilo que na juventude — ótimo para manuseio com crianças supervisionadas.', foto_url: null /* '../assets/animais/gizmo.jpg' */ },
    { id:45, nome:'Onça',    especie:'reptil', raca:'Cobra do Milho', data_nascimento:'2010-08-30', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Onça é uma cobra experiente e extremamente mansa. Come com regularidade e é saudável para a idade.', foto_url: null /* '../assets/animais/onca.jpg' */ },

    // ══════════════ OUTRO ══════════════
    // filhotes
    { id:46, nome:'Nemo',    especie:'outro', raca:'Peixe Betta',    data_nascimento:'2024-10-15', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Nemo é um betta jovem e colorido. Precisa de aquário só para ele, com aquecedor e filtro silencioso.', foto_url: null /* '../assets/animais/nemo.jpg' */ },
    { id:47, nome:'Tobias',  especie:'outro', raca:'Coelho Mini Lop',data_nascimento:'2024-07-08', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Tobias tem orelhas caídas e é incrivelmente fofo. Adora ser escovado e já usa caixa de areia.', foto_url: null /* '../assets/animais/tobias.jpg' */ },
    { id:48, nome:'Mochi',   especie:'outro', raca:'Ouriço Africano', data_nascimento:'2024-09-20', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Mochi é um filhote de ouriço tímido mas que se solta com paciência. Noturno, requer ambiente calmo.', foto_url: null /* '../assets/animais/mochi.jpg' */ },
    // adultos
    { id:49, nome:'Coelho',  especie:'outro', raca:'Coelho Anão',    data_nascimento:'2021-05-22', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Coelho é curioso e ativo. Adora espaço livre para correr. Castrado, vacinado e usa caixa de areia com facilidade.', foto_url: null /* '../assets/animais/coelho.jpg' */ },
    { id:50, nome:'Bolha',   especie:'outro', raca:'Peixe Koi',      data_nascimento:'2020-03-10', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Bolha é um peixe koi adulto que precisa de lago ou aquário grande. Reconhece o tutor e vem à superfície para ser alimentado.', foto_url: null /* '../assets/animais/bolha.jpg' */ },
    { id:51, nome:'Spike O', especie:'outro', raca:'Ouriço Africano', data_nascimento:'2022-11-03', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Spike já está bem socializado e tolera o manuseio. Ativo, adora explorar e é muito limpo por natureza.', foto_url: null /* '../assets/animais/spike-o.jpg' */ },
    // idosos
    { id:52, nome:'Veloz',   especie:'outro', raca:'Tartaruga Tigre', data_nascimento:'2008-06-01', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Veloz (o nome é irônico) é serena e longeva. Precisa de aquário com área terrestre e aquática. Muito fácil de cuidar.', foto_url: null /* '../assets/animais/veloz.jpg' */ },
    { id:53, nome:'Coco',    especie:'outro', raca:'Coelho Rex',      data_nascimento:'2013-04-14', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:'Esporão dental. Requer limpeza veterinária periódica.', descricao:'Coco é gentil e prefere colo a correr. Um companheiro silencioso e afetuoso para ambientes tranquilos.', foto_url: null /* '../assets/animais/coco.jpg' */ },
    { id:54, nome:'Poseidon',especie:'outro', raca:'Peixe Betta',     data_nascimento:'2021-01-01', status:'disponivel', ong_id:1, ong_nome:'Abrigo Esperança', enfermidade:null, descricao:'Poseidon tem cores vibrantes e nada graciosamente. Precisa de aquário aquecido e água limpa. Muito bonito de observar.', foto_url: null /* '../assets/animais/poseidon.jpg' */ },
];

// ─── HELPERS ─────────────────────────────────────────────────

function calcularFaixaEtaria(dataNascimento) {
    if (!dataNascimento) return null;
    const meses = (new Date() - new Date(dataNascimento)) / (1000 * 60 * 60 * 24 * 30.44);
    if (meses < 12)  return 'filhote';
    if (meses < 96)  return 'adulto';   // 8 anos = 96 meses
    return 'idoso';
}

function getAnimais(filtros = {}) {
    let lista = ANIMAIS.map(a => ({ ...a, faixa_etaria: calcularFaixaEtaria(a.data_nascimento) }));
    if (filtros.especie) lista = lista.filter(a => a.especie === filtros.especie);
    if (filtros.status)  lista = lista.filter(a => a.status  === filtros.status);
    return lista;
}

function getAnimalById(id) {
    const a = ANIMAIS.find(a => a.id === Number(id));
    return a ? { ...a, faixa_etaria: calcularFaixaEtaria(a.data_nascimento) } : null;
}

function getUsuarioByEmail(email) {
    return USUARIOS.find(u => u.email === email) || null;
}

function getSession() {
    const raw = localStorage.getItem('sessao');
    return raw ? JSON.parse(raw) : null;
}
function setSession(usuario) {
    const { senha: _, ...sem } = usuario;
    localStorage.setItem('sessao', JSON.stringify(sem));
}
function clearSession() {
    localStorage.removeItem('sessao');
    localStorage.removeItem('interesses');
}
function getInteresses() {
    const raw = localStorage.getItem('interesses');
    return raw ? JSON.parse(raw) : [];
}
function registrarInteresse(animalId) {
    const sess = getSession();
    if (!sess) return false;
    const lista = getInteresses();
    if (lista.find(i => i.usuario_id === sess.id && i.animal_id === animalId)) return false;
    lista.push({ usuario_id: sess.id, animal_id: animalId, criado_em: new Date().toISOString() });
    localStorage.setItem('interesses', JSON.stringify(lista));
    return true;
}
