// Estado do tabuleiro que JÁ recebeu novo monstro
// Estoque de monstros referente ao que ainda pode ser utilizado para preencher as posicoes
window.solve = function(estadoTabuleiro) {

    window.estadosPassados.push(estadoTabuleiro);

    if ( ! window.count)
        window.count = 1;
    else
        window.count++;

    if( ! estadoTabuleiro.isValid() ) {
        return false;
    }

    //verifica se está todo preenchido
    var preenchimento = estadoTabuleiro.isFilled();

    if ( preenchimento.estado ) { //Fileed

        console.log('solucao encontrada terminou');
        console.log(getTabuleiroComoString( estadoTabuleiro.getState() ) );

        return estadoTabuleiro;
    }
    else { //NOT Filled


        var estadoVampiro  = new EstadoTabuleiro( JSON.parse( JSON.stringify( estadoTabuleiro.getState() ) )) ;
        estadoVampiro.set(preenchimento.linha, preenchimento.coluna, 'V');

        // console.log(getTabuleiroComoString( estadoVampiro.getState() ) );

        if ( solucaoEncontrada = window.solve(estadoVampiro) ) {
            return solucaoEncontrada;
        }
        var estadoZumbi  = new EstadoTabuleiro( JSON.parse( JSON.stringify( estadoTabuleiro.getState() ) ) ) ;
        estadoZumbi.set(preenchimento.linha, preenchimento.coluna, 'Z');

        // console.log(getTabuleiroComoString( estadoZumbi.getState() ) );

        if ( solucaoEncontrada = window.solve(estadoZumbi) ) {
            return solucaoEncontrada;
        }

        var estadoFantasma = new EstadoTabuleiro( JSON.parse( JSON.stringify( estadoTabuleiro.getState() ) ) ) ;
        estadoFantasma.set(preenchimento.linha, preenchimento.coluna, 'F');

        // console.log(getTabuleiroComoString( estadoFantasma.getState() ) );

        if ( solucaoEncontrada = window.solve(estadoFantasma) ) {
            return solucaoEncontrada;
        }

        // tudo mais falhou, retorne falso
        return false;
    }
}
