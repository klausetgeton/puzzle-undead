window.EstadoTabuleiro = function(arrayTabuleiroInicial, monstroAletorio)
{
    const estadoTabuleiro = arrayTabuleiroInicial;

    // ???????????????????????????????????????
    // Adiciona o monstro na primeira posicao valida do tabuleiro
    // ???????????????????????????????????????
    // PRECISA IMPLEMENTAR

    // Retorna se o que tem até agora dentro do tabuleiro está valido ou não
    const isValid = function (){
        // PRECISA IMPLEMENTAR
        // ???????????????????????????????????????????????????????????????
        // Aqui precisamos fazer a lógica para ler cada linha e contando com base nos mosntros
        // se a quantidade está certa por linha
        //
        // for (var i = 0; i < arrayTabuleiroInicial.length; i++) {
        //     arrayTabuleiroInicial[i]
        // }
        // ???????????????????????????????????????????????????????????????
        return true;
    };

    // Retorna se todas as posicoes do array estão preenchidas, nao necessáriamente dizendo que está valido
    const isFilled = function(){
        // PRECISA IMPLEMENTAR
        // ???????????????????????????????????????????????????????????????
        return false;
        // ???????????????????????????????????????????????????????????????
    }

    const getState = function(){
        return estadoTabuleiro;
    }

    return {
        isValid : isValid,
        getState : getState,
        isFilled : isFilled
    };
};
