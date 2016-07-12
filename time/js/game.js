//Variaveis instanciadas que serão  usadas na classe game
//LA para marca local onde personagem esta na tela
var LA=0;
//vdefinir altura que personagem esta no jogo
var TA=550;
//pega possição do jogador
var posicaoJogador;
//declara a moeda
var myBit;
//usado para definir qual caixa de dialogo sera usado no momento 
var textoMoedas;
//contador de moeda do placar
var contadorMoedas = 0;
//estatos do jogador
var tamanhoJogador = 'pequeno';
var jogadorImune = false;
var player_chain = false;
var bullet = false;
var velocidadeJogador = 85;
var vida=3;
var cont=0;


/**
 *  Carrega imagens e sons
 */
function carregaAssets() {
    game.load.image('inimigo', 'assets/inimigo.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  
    // Carrega imagens do mapa
    game.load.image('tilepaisagem', 'assets/tilepaisagem.png');
     game.load.image('mariotileset', 'assets/mariotileset.png');

    // Carrega mapa
    game.load.tilemap('mapa', 'assets/mapacaverna1.json', null, Phaser.Tilemap.TILED_JSON);

    // Carrega moedas
    game.load.spritesheet('coin', 'assets/coin.png', 32, 32);
    // Carrega som para moedas
    game.load.audio('collect-coin', ['assets/collect-coin.ogg']);
    // Carrega som para pulo em cima de algo
    game.load.audio('kick', ['assets/kick.ogg']);
    // Carega som de fim do jogo
    game.load.audio('lose', ['assets/lose.ogg']);
    // Carega som de canhão
    game.load.audio('cannon', ['assets/cannon.ogg']);


//carrega audios dos balões
    game.load.audio('audio1', ['assets/audio/audio1.ogg']);
    game.load.audio('audio2', ['assets/audio/audio2.ogg']);
    game.load.audio('audio3', ['assets/audio/audio3.ogg']);
    game.load.audio('audio4', ['assets/audio/audio4.ogg']);
    game.load.audio('audio5', ['assets/audio/audio5.ogg']);
    game.load.audio('audio6', ['assets/audio/audio6.ogg']);
    game.load.audio('audio7', ['assets/audio/audio7.ogg']);
    game.load.audio('audio8', ['assets/audio/audio8.ogg']);
    game.load.audio('audio9', ['assets/audio/audio9.ogg']);
    game.load.audio('audio10', ['assets/audio/audio10.ogg']);
    game.load.audio('audio11', ['assets/audio/audio11.ogg']);
    game.load.audio('audio12', ['assets/audio/audio12.ogg']);
    game.load.audio('audio13', ['assets/audio/audio13.ogg']);
    game.load.audio('audio14', ['assets/audio/audio14.ogg']);
    game.load.audio('audio15', ['assets/audio/audio15.ogg']);
    game.load.audio('audio16', ['assets/audio/audio16.ogg']);
    game.load.audio('audio17', ['assets/audio/audio17.ogg']);
    game.load.audio('audio18', ['assets/audio/audio18.ogg']);
    game.load.audio('audio19', ['assets/audio/audio19.ogg']);
    game.load.audio('audio20', ['assets/audio/audio20.ogg']);
    game.load.audio('audio21', ['assets/audio/audio21.ogg']);
    game.load.audio('audio22', ['assets/audio/audio22.ogg']);
    game.load.audio('audio23', ['assets/audio/audio23.ogg']);
    game.load.audio('audio24', ['assets/audio/audio24.ogg']);
    game.load.audio('audio25', ['assets/audio/audio25.ogg']);
    game.load.audio('audio26', ['assets/audio/audio26.ogg']);
    game.load.audio('audio27', ['assets/audio/audio27.ogg']);
    game.load.audio('audio28', ['assets/audio/audio28.ogg']);
    game.load.audio('audio29', ['assets/audio/audio29.ogg']);
    game.load.audio('audio30', ['assets/audio/audio30.ogg']);
    game.load.audio('audio31', ['assets/audio/audio31.ogg']);



    // Carrega fundos do cenário
    game.load.image('brasil', 'assets/brasil.png');
    game.load.image('familia', 'assets/real.png');
    game.load.image('cultivo', 'assets/cultivo.png');
    game.load.image('escravidao', 'assets/escravos.png');
    game.load.image('exploracao', 'assets/exploracao.png');
    game.load.image('ocupacao', 'assets/ocupacao.png');
    game.load.image('vida', 'assets/vida.png');
    game.load.image('teste', 'assets/teste.png');
    game.load.image('navega', 'assets/navega.png');
    game.load.image('portugal', 'assets/portugal.png');

}

/**
 *  Cria cenário do jogo
 */
function criaCenario() {
    textobjects = game.add.group();

    game.time.advancedTiming = true;
    fpsText = game.add.text(game.camera.width-60, 40, 'fps...', { font: '16px Arial', fill: '#ffffff' } );
    fpsText.fixedToCamera = true;
    textobjects.add(fpsText);

    // Cria fundos do cenário
    paralax9 = game.add.tileSprite(28950, 0, 3100, 660, 'brasil');
    paralax8 = game.add.tileSprite(25500, 0, 3470, 660, 'familia');
    paralax7 = game.add.tileSprite(22400, 0, 3190, 660, 'cultivo');
    paralax6 = game.add.tileSprite(19185, 0, 3220, 660, 'escravidao');
    paralax5 = game.add.tileSprite(15880, 0, 3320, 660, 'exploracao');
    paralax4 = game.add.tileSprite(13000, 0, 3150, 660, 'ocupacao');
    paralax3 = game.add.tileSprite(9400, 0, 3600, 660, 'vida');
    paralax2 = game.add.tileSprite(6100, 0, 3300, 660, 'teste');
    paralax1 = game.add.tileSprite(3100, 0, 3100, 660, 'navega');
    paralax0 = game.add.tileSprite(0, 0, 3100, 660,'portugal');


    criaFisica();

    // Adiciona mapa
    map = game.add.tilemap('mapa');

    // Insere tileset

     map.addTilesetImage('tilepaisagem', 'tilepaisagem');
     map.addTilesetImage('mariotileset', 'mariotileset');

    criaCamadasDoJogo();

    // Cria camada do cenário e define-a do tamanho do mundo
    layer = map.createLayer('cenario');
    layer.resizeWorld();

    // Define os cursores do teclado para poder controlar o jogador
    cursors = game.input.keyboard.createCursorKeys();

    // Cria o jogador
    criaJogador();

    criaInimigos();
    criaMoedas();
    criaTextoPontuacao();

    // Adiciona objeto de controle de músicas do jogo
    musicaMoedas = game.add.audio('collect-coin', 1, true);
    musicaKick = game.add.audio('kick', 1, true);
    musicaLose = game.add.audio('lose', 1, true);
    musicaCannon = game.add.audio('cannon', 1, true);
  //adiciona o controle do audio dos balões chamando o audio e o tempo
    musica1 = game.add.audio('audio1', 8, true);
    musica2 = game.add.audio('audio2', 5, true);
    musica3 = game.add.audio('audio3', 5, true);
    musica4 = game.add.audio('audio4', 8, true);
    musica5 = game.add.audio('audio5', 7, true);
    musica6 = game.add.audio('audio6', 5, true);
    musica7 = game.add.audio('audio7', 9, true);
    musica8 = game.add.audio('audio8', 7, true);
    musica9 = game.add.audio('audio9', 5, true);
    musica10 = game.add.audio('audio10', 9, true);
    musica11 = game.add.audio('audio11', 7, true);
    musica12 = game.add.audio('audio12', 10, true);
    musica13 = game.add.audio('audio13', 8, true);
    musica14 = game.add.audio('audio14', 8, true);
    musica15 = game.add.audio('audio15', 5, true);
    musica16 = game.add.audio('audio16', 9, true);
    musica17 = game.add.audio('audio17', 8, true);
    musica18 = game.add.audio('audio18', 6, true);
    musica19 = game.add.audio('audio19', 9, true);
    musica20 = game.add.audio('audio20', 6, true);
    musica21 = game.add.audio('audio21', 8, true);
    musica22 = game.add.audio('audio22', 8, true);
    musica23 = game.add.audio('audio23', 8, true);
    musica24 = game.add.audio('audio24', 5, true);
    musica25 = game.add.audio('audio25', 9, true);
    musica26 = game.add.audio('audio26', 7, true);
    musica27 = game.add.audio('audio27', 10, true);
    musica28 = game.add.audio('audio28', 8, true);
    musica29 = game.add.audio('audio29', 7, true);
    musica30 = game.add.audio('audio30', 9, true);
    musica31 = game.add.audio('audio31', 7, true);
}


function atualizaJogo() {
    // atualiza a posição do jogador no mundo do jogo de acordo com cada local que ele morre e a moeda coletada ,levando ele a sempre volta no mesmo mapa que morreu não ao inicio da faze
    if (contadorMoedas>3 && contadorMoedas<6){
            LA=3100;
            TA=600;
            
           
        }else if (contadorMoedas>6 && contadorMoedas<9){
            LA=6100;
            TA=600;
           

        }else if (contadorMoedas>9 && contadorMoedas<12){
            LA=9400;
            TA=600;
           

        }else if (contadorMoedas>12 && contadorMoedas<15){
            LA=9400;
            TA=600;
           

        }else if (contadorMoedas>15 && contadorMoedas<18){
            LA=13000;
            TA=600;
           

        }else if (contadorMoedas>18 && contadorMoedas<21){
            LA=15880;
            TA=600;
           

        }else if (contadorMoedas>21 && contadorMoedas<24){
            LA=18181;
            TA=600;
           

        }else if (contadorMoedas>24 && contadorMoedas<27){
            LA=22400;
            TA=600;
           

        }else if (contadorMoedas>27 && contadorMoedas<30){
            LA=25500;
            TA=600;
           

        }else if (contadorMoedas>30 && contadorMoedas<33){
            LA=28950;
            TA=600;
           

        }
        //passa seu novo local pro metodo 
    movimentaJogador();

    // Detecta colisão de jogador com moedas
    coins.forEach(function(moeda){
        if (checkOverlap(jogador, moeda)){
            encostouEmMoeda(jogador, moeda);
        }
    }, this)
     
}

function criaTextoPontuacao(){
    // Cria imagem genérica
    var myBitmap = game.add.bitmapData(200, 100);
    // Define fundo
    myBitmap.context.fillStyle = "#FFFFFF";
    // Desenha retângulo
    myBitmap.context.fillRect(0,0,200,60);
    // Cria sprite e adiciona-a no jogo
    sprite = game.add.sprite(10, 10, myBitmap);
    // Faz sprite seguir câmera
    sprite.fixedToCamera = true;
     
    // Cria texto para exibir pontuação do usuário
    textoMoedas = game.add.text(15, 15, "Pontuação: " + contadorMoedas + " moedas\nVida: "+vida+"/3" , {
        font: "18px Arial",
        fill: "#",
        align: "left"
    });

    // Faz texto seguir câmera
    textoMoedas.fixedToCamera = true;
}



function movimentaJogador(){

    if (cursors.left.isDown)
    {
        // Move jogador para esquerda
        jogador.body.moveLeft(velocidadeJogador);
        jogador.animations.play('left');
              }
    else if (cursors.right.isDown)
    {    

        // Move jogador para direita
        jogador.body.moveRight(velocidadeJogador);
        jogador.animations.play('right');
      

    }else
    {
        // Para animações
        jogador.animations.stop();
        // Define frame fixo
        jogador.frame = 4;
    }

    //  Permite jogador pular somente se está tocando o chão
    if (cursors.up.isDown)
    {
        if (touchingDown(jogador.body)){
            jogador.body.moveUp(650);    
        }
    }
}

//configura a parte na fisica p2 onde o jogador só poderá pular se tiver tocando no chão
function touchingDown(someone) {
    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;

    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === someone.data || c.bodyB === someone.data)        {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
            if (c.bodyA === someone.data) d *= -1;
            if (d > 0.5) result = true;
        }
    }

    return result;
}


 //Função que cria o jogador
function criaJogador(){
    // Cria o personagem e o adiciona no jogo
    jogador = game.add.sprite(LA, game.world.height - TA, 'dude');

    // É necessário adicionar a física no jogador
    game.physics.p2.enable(jogador,false); 

    jogador.body.data.gravityScale=1;
    jogador.body.allowSleep=true; 

    // cria as animações para o movimeto do jogador
    jogador.animations.add('left', [0, 1, 2, 3], 10, true);
    jogador.animations.add('right', [5, 6, 7, 8], 10, true);


    // Faz câmera seguir jogador
    game.camera.follow(jogador);
    // Não permite jogador girar
    jogador.body.fixedRotation = true;

    defineJogadorPequeno();

    // Define qual grupo de colisão o jogador pertence (playerCG)
    jogador.body.setCollisionGroup(playerCG);
    // Define material do jogador
    jogador.body.setMaterial(materialJogador);
    // Define qual quais grupos de colisão o jogador irá colidir
    jogador.body.collides([groundCG, enemyGroundCG, enemyAirCG, platformCG]);

    // Define função que será chamada quando jogador encosta em inimigo
    jogador.body.createGroupCallback(enemyGroundCG, encostouInimigo, this);

    // Conexão com bala ou algo voador
    jogador.body.createGroupCallback(enemyAirCG, encostouInimigo, this);
}


//cria inimigo
function criaInimigos(){
    // O grupo inimigos será usado para gerenciar todos os inimigos
    inimigos = game.add.group();
    // Definimos aqui que qualquer inimigo terá um corpo
    inimigos.enableBody = true;
    // Define a física que será usada pelos inimigos
    inimigos.physicsBodyType = Phaser.Physics.P2JS;

    
//Carrega grupo camadaInimigos
    map.createFromObjects('camadaInimigos', 28, 'inimigo', 0, true, false, inimigos);
    inimigos.forEach(configuraInimigos, this);
}



function configuraInimigos(inimigo){
    // Define qual grupo de colisão o inimigo pertence (enemyGroundCG)
    inimigo.body.setCollisionGroup(enemyGroundCG);
    
    // Define qual quais grupos de colisão o inimigo irá colidir
    inimigo.body.collides([playerCG, groundCG, platformCG, enemyboundsCG]);

    // Fixa rotação do inimio
    inimigo.body.fixedRotation=true;

    // Caso jogo esteja parado, não processa corpo do inimigo
    inimigo.body.allowSleep=true;

    // Define vida do inimigo
    inimigo.health = 10;
}




 //Carrega moedas no jogo e define seu comportamento

function criaMoedas(){
    // Adiciona música da moeda no jogo
    musicaMoedas = game.add.audio('collect-coin', 1, true);

    // Cria grupo de moedas
    coins = game.add.group();

    // Carrega moedas do grupo camadaMoedas (
    map.createFromObjects('camadaMoedas', 22, 'coin', 0, true, false, coins);

    // Adiciona a função add no objeto animations e cria animação giraMoeda em todos as moedas
    coins.callAll('animations.add', 'animations', 'giraMoeda', [0, 1, 2, 3, 4, 5], 10, true);
    // Chama animação recém criada (giraMoeda) em todas as moedas
    coins.callAll('animations.play', 'animations', 'giraMoeda');

    coins.forEach(function(moeda){
        // Habilita física p2 na moeda
        game.physics.p2.enable(moeda);
        // Com a física habilitada a moeda irá cair, com esta linha ela fica parada (estática)
        moeda.body.static=true;
        // Define que esta moeda está viva
        moeda.estaViva = 1;

        // Ajuste necessário por ativar a física (32 / 2)
        moeda.body.y += 16;
        moeda.body.x += 16;
        
    }, this)
}

/**
 *  Função que gerencia conexão com inimigo
 */
function encostouInimigo (jogador, inimigo) {
    mataInimigo(inimigo);

    // Verifica se pulou em cima do inimigo
    if (touchingUp(inimigo)){
        // Faz jogador pular
        jogador.velocity.y = -650;
        // Executa música de pulo em algo
        musicaKick.play('', 0, 1, false);
    }else{
        // Em vez de terminar o jogo
        encostouEmAlgoMortifero();
    }
}




 //Função que termina o jogo, removendo jogador e rodando música
function fimDoJogo(){
    // Remove jogador do jogo
    if(vida==1){
            // Remove jogador do jogo
            criaFim();
        musicaLose.play('', 0, 1, false);


    }else{
        //mata boneco e cria outro decrementa vida e atualiza
        jogador.kill();
        criaJogador();
        vida--;
            textoMoedas.setText('Pontuação: ' + contadorMoedas + ' moedas'+"\nVida: "+vida+"/3");

    }

}

//define a reação quando o jogador encosta na moeda e libera os balões de texto
function encostouEmMoeda(player, moeda) {
    if (moeda.estaViva == 1){

        // Executa som da moeda por 1 segundo
        musicaMoedas.play('', 0, 1, false);
        // Exclui a moeda do jogo
        moeda.body.sprite.kill();
        // Define que moeda já foi pega
        moeda.estaViva = false;
        // Contabiliza moedas
        contabilizaMoedas();

        var vetor=["Era uma vez um país muito distante\nchamado Portugal,cheio de grandes cidades,\ncom casas, lojas, igrejas e ruas cheias de gente,\n governada pelo rei\nDom Manuel. I.",
"La as pessoas gostavam muito de uns\ntemperos especiais os quais eles chamavam\nde especiarias.",
"Para ter essas especiarias tinha que\n ir até um país\nchamado Índia, e para\nchegar la só de barco.",

"A pedido do Rei de Portugal, Pedro Álvares\nCabral foi enviado as Índias e assim partiu\n com suas tripulação em caravelas em busca\n de ir as Índias.",
"Mas Cabral acabou errando o caminho\npara as Índias. E chegou nas terras onde\n hoje é o Brasil e  no dia 22 de\nabril avistou um monte.", 
"Chamaram esse monte de  Monte Pascoal.\n O nome dado a terra descoberta foi\n Terra de Vera Cruz.",

"Ao chegar nas terras os portugueses se\ndeparam com os índios tupiniquins. E se\nespantaram por seus hábitos de não usar\nroupas, pintar o compõe morar varias famílias\nem casas de folhas e madeira.", 
"Os índios também se espantaram com os\nportugueses que usavam roupas, tinham pele\nclara e tinha varias coisas diferentes como\narmas, espelhos, entre outras coisas\nnovas que fascinou os índios.",
"Apesar das diferenças, o contato\nentre eles foi amigável e se comunicaram\natravés de sinais.",

"Os índios viviam da caça, peca e\ncoleta de frutos. Usavam  arco e flecha\ne viviam em contato com a natureza e\na respeitavam muito.Tinham sua própria cultura.",
"Eles possuem sua própria religião. Tinham o\ncacique, chefe da tribo. O pajé, professor, e\nque cuidava da parte religião e da medicina.",
"Na tripulação de Portugal, tinha um escrivão,\nque tinha a função de escrever sobre tudo que\n havia acontecido na viagem. Seu nome era\n Pero Vaz de Caminhas. E relatou tudo que viu\não rei de Portugal.",

"De inicio, os portugueses não se interessaram\nmuito nas terras por não acharem nada de valor\nque os interessassem. Mas ao saberem da\nexistência das novas terras, vários piratas\ncomeçaram a atacá-las.",
"O interesse de Portugal pelas terra então voltou,\n acharam em uma arvore daqui chamada pau\nbrasil da qual podiam fabricar moveis e usar\nsua seiva (tinta) para colorir tecidos.",
"Foi ai que começou a exploração dos indios.\nE as riquezas do Brasil começaram a ir\npara Portugal.",

"Com o descobrimento do pau brasil, os índios\ncomeçaram a ser utilizados para cortar\n arvores e carregar os navios. Em troca do\ntrabalho os portugueses davam a eles roupas,\nespelhos, entre outros apetrechos.",
"Essa madeira era levada para Portugal onde se\ntransformava em moveis e tinta para colorir\nroupas. Os portugueses não se importavam\ncom a cultura dos Índios.",
"Começaram a mudar a cultura dos indios,\nfazendo com que eles ficassem mais\nparecidos com os portugueses.",


"Começaram a ser cultivados no Brasil\ncana-de-açúcar. E foi para ajudar no cultivo\ndessa cultura que em 1580 os negros\nchegaram ao Brasil.",
"Os negros eram capturados na África,\ntrazidos contra sua vontade nos navios\nnegreiros e vendidos no Brasil, para trabalhar\nnas lavouras de cana, cultura mais lucrativa\nna época.",
"Quando chegavam ao Brasil, os escravos\nficavam em senzalas, trabalhavam cerca de\n14 horas por dia e tinham direito a\n apenas uma refeição diária.",

"Depois disso, coroa portuguesa resolveu\ncolonizar o Brasil e deu início ao processo de\ncultivo de cana-de-açúcar no nos engenhos\npara produzir açúcar para vender no\nmercado europeu.",
"Mas quando os holandeses foram expulsos,\ncomeçando a produzir cana-de-açúcar em suas\ncolonias e conseguiram ganhar espaço na\neuropa, deixando para trás o Brasil.",
"Em meados do século XVIII, as atenções foram\npara Minas Gerais na exploração de ouro,\ncolocando a economia açucareira em\nsegundo plano.",


"A vinda da família real portuguesa para o\nBrasil foi em 1808, quando Napoleão Bonaparte\ninvadiu Portugal. e D. João VI, sua familía\ne parte da corte fugiram para\no Brasil.",
"Após sua chegada ao Brasil, abriu os portos\nbrasileiros para o comércio com todas as\nnações. Pois antes só faziamos comercio com\nPortugal. O Brasil se tornou o Reino Unido\nde Portugal.",
"Com a morte de sua mãe, D. João governava\nportugal a distancia. \nMas aconteceu uma revolta\nem Portugal e ele teve que retornar ao país,\ndeixando seu filho, D. Pedro I, como\nPríncipe Regente do Brasil.",


"A saída de D. João foi um desastre, pois\nele levou o dinheiro e o\n ouro do Brasil. D. Pedro,\nque ficou no seu lugar, tomou uma série de\nmedidas que desagradaram o povo, que\nse preparava para independência do Brasil.",
"D. Pedro organizou e obrigou as tropas de\nPortugal a voltarem para Portugal. E incentivava o povo a\nlutar pela independência.",
"O príncipe viajou para acalmar o povo e recebeu\numa carta de Portugal que exigia sua volta.\n Ele à recebeu  próximo ao rio Ipiranga, levantou a\nespada e gritou: Independência ou Morte!.",
"Essa foi a independência do Brasil\nem 7 de setembro de 1822 e D. Pedro\nfoi declarado imperador do Brasil."

];
           posicaoJogadorX = jogador.body.x;
        //tamanho e largura
        myBit=game.add.bitmapData(430,120);
        //cor fundo
        myBit.context.fillStyle="#000000";
        // cria fundo
        myBit.context.fillRect(0,0,450,120);
        // cria sprint e adiciona ele
        sprite=game.add.sprite(posicaoJogadorX-200,game.camera.height / 6,myBit);

        sprite.fixedToCamera=false;
        var textoJogo = game.add.text(posicaoJogadorX - 200, game.camera.height / 6, vetor[cont], {
        font: "20px Arial",
        fill: "#FFFFFF",
            });

        cont++;
        if(contadorMoedas== 1){
        musica1.play('', 0, 8, false);

        }
        if(contadorMoedas == 2){
        musica2.play('', 0, 5, false);
        }
        if(contadorMoedas == 3){
        musica3.play('', 0, 5, false);
        }
        else if(contadorMoedas == 4){
        musica4.play('', 0, 8, false);
        }
        else if(contadorMoedas == 5){
        musica5.play('', 0, 7, false);
        }
        else if(contadorMoedas == 6){
        musica6.play('', 0, 5, false);
        }
        else if(contadorMoedas == 7){
        musica7.play('', 0, 9, false);
        }
        else if(contadorMoedas == 8){
        musica8.play('', 0, 7, false);
        }
        else if(contadorMoedas == 9){
        musica9.play('', 0, 5, false);
        }
        else if(contadorMoedas == 10){
        musica10.play('', 0, 9, false);
        }

        else if(contadorMoedas == 11){
        musica11.play('', 0, 7, false);
        }
        else if(contadorMoedas == 12){
        musica12.play('', 0, 10, false);
        }
        else if(contadorMoedas == 13){
        musica13.play('', 0, 8, false);
        }
        else if(contadorMoedas == 14){
        musica14.play('', 0, 8, false);
        }
        else if(contadorMoedas == 15){
        musica15.play('', 0, 5, false);
        }
        else if(contadorMoedas == 16){
        musica16.play('', 0, 9, false);
        }
        else if(contadorMoedas == 17){
        musica17.play('', 0, 8, false);
        }
        else if(contadorMoedas == 18){
        musica18.play('', 0, 6, false);
        }
        else if(contadorMoedas == 19){
        musica19.play('', 0, 9, false);
        }
        else if(contadorMoedas == 20){
        musica20.play('', 0, 6, false);
        }
        if(contadorMoedas == 21){
        musica21.play('', 0, 8, false);
        }
        else if(contadorMoedas == 22){
        musica22.play('', 0, 8, false);
        }
        else if(contadorMoedas == 23){
        musica23.play('', 0, 8, false);
        }
        else if(contadorMoedas == 24){
        musica24.play('', 0, 5, false);
        }
        else if(contadorMoedas == 25){
        musica25.play('', 0, 9, false);
        }
        else if(contadorMoedas == 26){
        musica26.play('', 0, 7, false);
        }
        else if(contadorMoedas == 27){
        musica27.play('', 0, 10, false);
        }
        else if(contadorMoedas == 28){
        musica28.play('', 0, 8, false);
        }
        else if(contadorMoedas == 29){
        musica29.play('', 0, 7, false);
        }
        else if(contadorMoedas == 30){
        musica30.play('', 0, 9, false);
        }
         else if(contadorMoedas == 31){
        musica31.play('', 0, 7, false);
        }
    }
}

/**
 *  Detecta colisão entre inimigo e cenário
 */
function inimigoColidiuTile(inimigo, cenario){
    // Se o inimigo encostou em algo na esquerda, manda para direita
    if (inimigo.body.blocked.left){
        inimigo.body.velocity.x += 100;
    }

    // Se o inimigo encostou em algo na direita, manda para esquerda
    if (inimigo.body.blocked.right){
        inimigo.body.velocity.x -= 100;
    }
}


/**
 *  Incrementa contador de moedas e exibe novo valor para jogador
 */
function contabilizaMoedas(){
    // Incrementa contador
    contadorMoedas++;
    // Atualiza texto

    textoMoedas.setText('Pontuação: ' + contadorMoedas + ' moedas'+"\nVida: "+vida+"/3");
}



/**
 *  Define o tamanho do jogador pequeno
 */
function defineJogadorPequeno(){
    tamanhoJogador = 'pequeno';
    jogador.scale.setTo(0.8,0.8);
}


function encostouEmAlgoMortifero(){
     if (jogadorImune){
        return false;
    }

    if (tamanhoJogador == 'grande'){
        fadeJogador();
        defineJogadorPequeno();
    }else{
        fimDoJogo();
    }
} 


function mataInimigo(inimigo){
    inimigo.sprite.damage(5);  
    inimigo.moveUp(20);
    inimigo.clearCollision(true,true);
    inimigo.data.gravityScale=1;
    inimigo.angularVelocity=10;
}




//cria a fisica do jogo
function criaFisica(){  
   //eventos de colisão
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.defaultRestitution = 0;
    game.physics.p2.gravity.y = 1900;
    // Pcalcula jogo parado
    game.world.enableBodySleeping = true;
    game.stage.smoothed = false;

    // Cria grupos de colisões 
    playerCG = game.physics.p2.createCollisionGroup();
    groundCG = game.physics.p2.createCollisionGroup();
    enemyGroundCG = game.physics.p2.createCollisionGroup();
    enemyAirCG = game.physics.p2.createCollisionGroup();
    enemyboundsCG = game.physics.p2.createCollisionGroup();
    platformCG = game.physics.p2.createCollisionGroup();


    // Cria materiais do chão
    
    // Chão normal
    materialChao = game.physics.p2.createMaterial('ground');

    // Material do jogador
    materialJogador = game.physics.p2.createMaterial('player');

    
    // Define comportamento entre material do jogador e chão
    game.physics.p2.createContactMaterial(materialJogador, materialChao, { 
        friction: 2, 
        restitution: 0.1,
        surfaceVelocity: 0
    }); 

}



//tras as camadas criadas no tileset para o jogo
function criaCamadasDoJogo(){
    limitesInimigo = map.createLayer('limitesInimigo');
    limitesInimigo.visible = false;

//cria a camada de teste que fica em segundo plano do cenario
    layerteste = map.createLayer('teste');
    layerteste.visible = true;



    // Define quais tiles devem ser considerados de colisão
    map.setCollisionByExclusion([0],true, limitesInimigo);

    // Cria física para cada tile encontrado na camada limitesInimigo
    camadaLimitesInimigo = game.physics.p2.convertTilemap(map, limitesInimigo);

    camadaContato = game.physics.p2.convertCollisionObjects(map,"camadaContato");
    camadaGelo = game.physics.p2.convertCollisionObjects(map,"camadaGelo");
    
    //setup all tiles with collisiongroups or materials
    for (i=0; i<camadaContato.length; i++){
        // Define qual o grupo de colisão para a camadaContato
        camadaContato[i].setCollisionGroup(groundCG);

        // Define com quais grupos de colisão irá colidir (jogador, inimigos etc)
        camadaContato[i].collides([playerCG, enemyGroundCG]);

        // Define material da camada de contato
        camadaContato[i].setMaterial(materialChao);
    }

    // Define que todos os limitadores de inimigos irão se chocar com os inimigos
    for (i=0; i < camadaLimitesInimigo.length; i++){
        // Define o grupo de colisão para os tiles
        camadaLimitesInimigo[i].setCollisionGroup(enemyboundsCG);

        // Define que irá colidir com o grupo de inimigos apenas
        camadaLimitesInimigo[i].collides([enemyGroundCG]);
    }

 }


function movimentaInimigosVivos (enemy) {
    if (enemy.health==10){
        if (enemy.name == "monstro"){

            if (touchingLeft(enemy.body) || touchingRight(enemy.body)){
                enemy.body.x -= enemy.velo/50; 
                enemy.velo *= -1;
                enemy.scale.x *= -1; 
            }

            enemy.body.velocity.x = enemy.velo;
        }

 
    } 
}


//configura a física P2 manualmente
function touchingUp(someone) {
    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;
    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === someone.data || c.bodyB === someone.data)        {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
            if (c.bodyA === someone.data) d *= -1;
            if (d < -0.5) result = true;
        }
    } return result;
}
function touchingDown(someone) {
    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;
    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === someone.data || c.bodyB === someone.data)        {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
            if (c.bodyA === someone.data) d *= -1;
            if (d > 0.5) result = true;
        }
    } return result;
}
function touchingLeft(someone) {
    var xAxis = p2.vec2.fromValues(1,0);
    var result = false;
    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === someone.data || c.bodyB === someone.data)        {
            var d = p2.vec2.dot(c.normalA, xAxis); // Normal dot Y-axis
            if (c.bodyA === someone.data) d *= -1;
            if (d < -0.5) result = true;
        }
    } return result;
}
function touchingRight(someone) {
    var xAxis = p2.vec2.fromValues(1,0);
    var result = false;
    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === someone.data || c.bodyB === someone.data)        {
            var d = p2.vec2.dot(c.normalA, xAxis); // Normal dot Y-axis
            if (c.bodyA === someone.data) d *= -1;
            if (d > 0.5) result = true;
        }
    } return result;
}

/**
 *  Verifica overlap entre 2 sprites
 */
function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}