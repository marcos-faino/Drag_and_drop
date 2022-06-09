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
    });
}

function iniciardrag(ev){
    ev.dataTransfer.setData("img", ev.target.id);
}

let quant = 0;
let acertos = 0;
function receberImagem(ev){
    ev.preventDefault();
    var dados = ev.dataTransfer.getData("img");
    let imagem = document.getElementById(dados);
    ev.target.innerHTML = "";
    imagem.draggable = false;
    ev.target.appendChild(imagem);
    //console.log(ev.target.id.substr(ev.target.id.length-1, 1));
    //console.log(imagem.src.substr(imagem.src.length-5,1));
    if(ev.target.id.substr(ev.target.id.length-1, 1) == imagem.src.substr(imagem.src.length-5,1)){
        acertos++;
    }
    quant++
    if(quant ===3 ){
        verificarfim();
        quant=0;
    }
}

function permitirSoltar(ev){
    ev.preventDefault();
}

function verificarfim(){
    console.log(acertos);
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