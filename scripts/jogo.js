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
    verificaracertos(ev, dados);
}

function verificaracertos(ev, idelem){
    let imagem = document.getElementById(idelem);
    if(!ev.target.innerHTML.includes('aqui')){
        return;
    }
    ev.target.innerHTML = "";
    imagem.draggable = false;
    ev.target.appendChild(imagem);
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

// Para celular
let eltransf; //variável global para receber o objeto no toque do celular

let imgdragstart = document.getElementsByClassName('mydrag');
Object.values(imgdragstart).forEach(function(e){
    e.ontouchstart = function(event){
        eltransf = this.id;
    }
});

let imgdragfim = document.getElementsByClassName('dragfim');
Object.values(imgdragfim).forEach(function(e){
    e.ontouchstart = function(event){
        let origem = document.getElementById(eltransf);
        this.innerHTML = origem.parentElement.innerHTML;
        origem.parentElement.innerHTML = "";
        verificaracertos(event, eltransf)
    }
});