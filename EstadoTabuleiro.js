window.EstadoTabuleiro = function(arrayTabuleiroInicial, monstroAletorio)
{
    const estadoTabuleiro = arrayTabuleiroInicial;

    // ???????????????????????????????????????
    // Adiciona o monstro na primeira posicao valida do tabuleiro
    // ???????????????????????????????????????
    // PRECISA IMPLEMENTAR

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
        
        return true;
    };

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
