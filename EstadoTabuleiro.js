window.EstadoTabuleiro = function(arrayTabuleiroInicial, monstroAletorio)
{
    const estadoTabuleiro = arrayTabuleiroInicial;

    const set = function (linha, coluna, valor) {
        estadoTabuleiro[linha][coluna] = valor;
    };

    // Retorna se o que tem até agora dentro do tabuleiro está valido ou não
    const isValid = function (){
        
        if ( contaMonstro('V') > 4 )
            return false;
        if ( contaMonstro('Z') > 4 )
            return false;
        if ( contaMonstro('F') > 4 )
            return false;
        
        //qualquer linha invalida volta na recursao
        if (   !validaDirecao( 'linha', 1, 'esquerda') || !validaDirecao( 'linha', 2, 'esquerda') || !validaDirecao( 'linha', 3, 'esquerda') || !validaDirecao( 'linha', 4, 'esquerda')
            || !validaDirecao( 'linha', 1, 'direita')  || !validaDirecao( 'linha', 2, 'direita')  || !validaDirecao( 'linha', 3, 'direita')  || !validaDirecao( 'linha', 4, 'direita') 
            || !validaDirecao( 'coluna', 1, 'cima')    || !validaDirecao( 'coluna', 2, 'cima')    || !validaDirecao( 'coluna', 3, 'cima')    || !validaDirecao( 'coluna', 4, 'cima')
            || !validaDirecao( 'coluna', 1, 'baixo')   || !validaDirecao( 'coluna', 2, 'baixo')   || !validaDirecao( 'coluna', 3, 'baixo')    || !validaDirecao( 'coluna', 4, 'baixo')
            ) {
            return false;
        }

        return true;
    };

    //Somente linhas preenchidas são validadas, linhas com ? são consideradas okay
    // linha = numero da linha que está sendo validada
    // lado = qual lado está sendo avaliado esquerda ou direita
    // retorna true para linhas validas
    const validaDirecao = function(linhaColuna, numLinhaColuna, lado ) {

        var quantidadeMonstros = 0;
        var movimento             = {};
        movimento.passouEspelho   = false;
        movimento.fimLinha        = false;
        movimento.monstrosVistos  = 0;
        movimento.linhaPreenchida = true;

        if ( linhaColuna == 'linha') {
            movimento.linhaAtual  = numLinhaColuna;
            
            // Esquerda vai para ->
            // Direita vai para <-
            if( lado == 'esquerda') {
                movimento.direcao     = 'direita';
                quantidadeMonstros    = estadoTabuleiro[numLinhaColuna][0];
                movimento.colunaAtual = 0;
            }
            if( lado == 'direita') {
                movimento.direcao     = 'esquerda';
                movimento.colunaAtual = 5;
                quantidadeMonstros    = estadoTabuleiro[numLinhaColuna][5];
            }
        }

        if ( linhaColuna == 'coluna') {
            movimento.colunaAtual = numLinhaColuna;

            // Esquerda vai para ->
            // Direita vai para <-
            if( lado == 'cima') {
                movimento.direcao     = 'baixo';
                movimento.linhaAtual  = 0;
                quantidadeMonstros    = estadoTabuleiro[0][numLinhaColuna];
            }
            if( lado == 'baixo') {
                movimento.direcao     = 'cima';
                movimento.linhaAtual  = 5;
                quantidadeMonstros    = estadoTabuleiro[5][numLinhaColuna];
            }
        }
        

        while( !movimento.fimLinha ) {
            andar(movimento);
        }

        if ( quantidadeMonstros != movimento.monstrosVistos && movimento.linhaPreenchida )
            return false;

        return true;
    }

    const andar = function( movimento ) {
        
        if ( movimento.direcao == 'direita' )
            movimento.colunaAtual++;

        if ( movimento.direcao == 'cima' )
            movimento.linhaAtual--;

        if ( movimento.direcao == 'esquerda' )
            movimento.colunaAtual--;

        if ( movimento.direcao == 'baixo' )
            movimento.linhaAtual++;

        //O que tem nessa celula onde o movimento está;
        var valorCelula = estadoTabuleiro[movimento.linhaAtual][movimento.colunaAtual];

        //quando a linha não está completamente preenchida
        if ( valorCelula == '?') {
            movimento.fimLinha = true;
            movimento.linhaPreenchida = false;
            return;
        }

        if( isEspelho( valorCelula ) ) {
            // mudar direcao;
            movimento.direcao = getDirecao(movimento, valorCelula);
            movimento.passouEspelho = true;
        }

        if ( valorCelula == 'Z' ) {
            movimento.monstrosVistos++;
        }
        else {
            if ( movimento.passouEspelho ) {
                if( valorCelula == 'F')
                    movimento.monstrosVistos++;
            }
            else {
                if( valorCelula == 'V')
                    movimento.monstrosVistos++;
            }
        }
        
        //Significa que chegou até o outro lado
        if ( Number.isInteger(valorCelula) ) {
            movimento.fimLinha = true;
        }
    }

    const getDirecao = function ( movimento, espelho ) {

        if ( espelho == '/') {

            if( movimento.direcao == 'direita')
                return 'cima';

            if( movimento.direcao == 'esquerda')
                return 'baixo';

            if( movimento.direcao == 'cima')
                return 'direita';

            if( movimento.direcao == 'baixo')
                return 'esquerda';
        }

        if ( espelho == '\\') {
            if( movimento.direcao == 'direita')
                return 'baixo';

            if( movimento.direcao == 'esquerda')
                return 'cima';

            if( movimento.direcao == 'cima')
                return 'esquerda';

            if( movimento.direcao == 'baixo')
                return 'direita';
        }
    }

    const isEspelho = function ( valorCelula ) {
        if( valorCelula == '/' || valorCelula == '\\')
            return true;
    }

    const contaMonstro = function (monstro) {
        var cont = 0;
        for (var linha = 0; linha < estadoTabuleiro.length; linha++) {
            for (var coluna = 0; coluna < estadoTabuleiro[linha].length; coluna++) {
                if( estadoTabuleiro[linha][coluna] == monstro){
                    cont++;
                }
            }
        }
        return cont;
    }

    // Retorna se todas as posicoes do array estão preenchidas, nao necessáriamente dizendo que está valido
    const isFilled = function(){
        var tudoPreenchido = {};
        tudoPreenchido.estado = true;
        for (var linha = 0; linha < estadoTabuleiro.length; linha++) {
            for (var coluna = 0; coluna < estadoTabuleiro[linha].length; coluna++) {
                // console.log(estadoTabuleiro[linha][coluna]);
                if( estadoTabuleiro[linha][coluna] == '?'){
                    tudoPreenchido.estado = false;
                    tudoPreenchido.linha = linha;
                    tudoPreenchido.coluna = coluna;
                    break;
                }
            }

            if( ! tudoPreenchido.estado)
            {
                break;
            }
        }

        return tudoPreenchido;
    }

    const getState = function(){
        return estadoTabuleiro;
    }

    return {
        isValid : isValid,
        getState : getState,
        isFilled : isFilled,
        set : set
    };
};