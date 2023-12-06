window.onload = function(){
    let disp = [1,2,3];
    let vetor = [1,2,3];

    vetor.forEach(function(e){
        num = disp[Math.floor(Math.random()*disp.length)];
        disp.splice(disp.indexOf(num), 1);
        let img = document.getElementById('drag'+e);
        img.src = 'imagens/'+num+'.png';
        img.ondragstart = iniciardrag;
        divreceb = document.getElementById('receb'+ e );
        divreceb.ondrop = receberImagem;
        divreceb.ondragover = permitirSoltar;
        divorig = document.getElementById('orig'+ e );
        divorig.ondrop = receberImagem;
        divorig.ondragover = permitirSoltar;
        let mc = new Hammer(img);
        mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        mc.on("panleft panright panup pandown", function(ev) {
            dragdrop(ev, img);
        });
        mc.on("panend", function(ev) {
            teste(ev);
        });
    });
}

function teste(ev){
    console.log("Soltei aqui...", ev.changedPointers[0].clientX + "  " + ev.changedPointers[0].clientY)
}

function iniciardrag(ev){
    ev.dataTransfer.setData("img", ev.target.id);
}

let quant = 0;
let acertos = 0;
// Para celular
let eltransf; //variável global para receber o objeto no toque do celular

function receberImagem(ev){
    ev.preventDefault();
    var dados = ev.dataTransfer.getData("img");
    verificaracertos(dados, ev.target);
}

function verificaracertos(idelem, destino){
    let imagem = document.getElementById(idelem);
    if(destino.innerHTML.indexOf('aqui') == -1){
        return;
    }
    destino.innerHTML = "";
    imagem.draggable = false;
    destino.appendChild(imagem);
    if(destino.id.substr(destino.id.length-1, 1) == imagem.src.substr(imagem.src.length-5,1)){
        acertos++;
    }
    quant++;
    if(quant ===3 ){
        verificarfim();
        quant=0;
    }
}

function permitirSoltar(ev){
    ev.preventDefault();
}

function verificarfim(){
    if(acertos === 3){
        mensagem.innerHTML = '<h2 class="bg-warning text-success text-center">Parabéns vc acertou!!!!</h2>';
    }else{
        mensagem.innerHTML = '<h2 class="bg-warning text-danger text-center">Tente novamente!!!</h2>';
    }
    acertos = 0;
}

btReiniciar.onclick = function(){
    window.location.reload();
}

idimg = ""

// pegar informações da posição de um elemento na tela.
// console.log(receb1.getBoundingClientRect()['x']);

function dragdrop(ev, img){
    ev.preventDefault();
    idimg = ev.target.id;
    img.style.position = "fixed";
    img.style.top = (Math.floor(ev.changedPointers[0].clientY - (img.clientHeight/2))) + "px";
    img.style.left = (Math.floor(ev.changedPointers[0].clientX - (img.clientWidth/2))) + "px";
}