// Estado do tabuleiro que JÁ recebeu novo monstro
// Estoque de monstros referente ao que ainda pode ser utilizado para preencher as posicoes
window.solve = function(estadoTabuleiro, estoqueMonstros) {

    if ( !window.count)
        window.count = 1;
    else
        window.count++;

    if( !estadoTabuleiro.isValid() ) {
        return false;
    }

    //verifica se está todo preenchido
    var preenchimento = estadoTabuleiro.isFilled();

    if ( preenchimento.estado ) { //Fileed
        if ( estadoTabuleiro.isValid() ) {
            //termina
        }
        else {
            return false;
        }
    }
    else { //NOT Filled


        var estadoVampiro  = new EstadoTabuleiro( JSON.parse( JSON.stringify( estadoTabuleiro.getState() ) ), {} ) ;
        // var estadoVampiro  = new EstadoTabuleiro( window.tabuleiro, {} ) ;
        estadoVampiro.set(preenchimento.linha, preenchimento.coluna, 'V');

        // console.log(getTabuleiroComoString( estadoVampiro.getState() ) );

        if ( window.solve(estadoVampiro, {vampire:1}) ) {
            alert('terminou');
            return true;
        }
        var estadoZumbi  = new EstadoTabuleiro( JSON.parse( JSON.stringify( estadoTabuleiro.getState() ) ), {} ) ;
        estadoZumbi.set(preenchimento.linha, preenchimento.coluna, 'Z');

        // console.log(getTabuleiroComoString( estadoZumbi.getState() ) );
        
        if ( window.solve(estadoZumbi, {zombi:1}) ) {
            alert('terminou');
            return true;
        }

        var estadoFantasma = new EstadoTabuleiro( JSON.parse( JSON.stringify( estadoTabuleiro.getState() ) ), {} ) ;
        estadoFantasma.set(preenchimento.linha, preenchimento.coluna, 'F');

        // console.log(getTabuleiroComoString( estadoFantasma.getState() ) );

        
        if ( window.solve(estadoFantasma, {}) ) {
            alert('terminou');
            return true;
        }

        // tudo mais falhou, retorne falso
        return false;
    }

    // // Poderia retornar o estado inválido, mas estou retornando null
    // if( ! estadoTabuleiro.isValid())
    // {
    //     return null;
    // }

    // // Verifica se está valido e terminou de preencher todas as posicoes
    // if(estadoTabuleiro.isFilled())
    // {
    //     // Terminou a lógica e preencheu tudo,
    //     // poderiamos imprimir o novo array na tela
    // }
    // else
    // {
    //     console.log('chegou aqui', estoqueMonstros);

    //     var estoqueMonstrosRecursao = Object.assign({}, estoqueMonstros);
    //     var vampiro = estoqueMonstrosRecursao.vampiros.pop();
    //     if(vampiro)
    //     {
    //         console.log('indo sentido vampiro');
    //         return window.solve(new EstadoTabuleiro(estadoTabuleiro.getState(), vampiro), estoqueMonstrosRecursao);
    //     }

    //     var estoqueMonstrosRecursao = Object.assign({}, estoqueMonstros);
    //     var fantasma = estoqueMonstrosRecursao.fantasmas.pop();
    //     if(fantasma)
    //     {
    //         console.log('indo sentido fantasma');
    //         return window.solve(new EstadoTabuleiro(estadoTabuleiro.getState(), fantasma), estoqueMonstrosRecursao);
    //     }

    //     var estoqueMonstrosRecursao = Object.assign({}, estoqueMonstros);
    //     var zombie = estoqueMonstrosRecursao.zombies.pop();
    //     if(zombie)
    //     {
    //         console.log('indo sentido zombie');
    //         return window.solve(new EstadoTabuleiro(estadoTabuleiro.getState(), zombie), estoqueMonstrosRecursao);
    //     }
    // }
}