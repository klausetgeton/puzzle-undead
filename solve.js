// Estado do tabuleiro que JÁ recebeu novo monstro
// Estoque de monstros referente ao que ainda pode ser utilizado para preencher as posicoes
window.solve = function(estadoTabuleiro, estoqueMonstros) {

    // Poderia retornar o estado inválido, mas estou retornando null
    if( ! estadoTabuleiro.isValid())
    {
        return null;
    }

    // Verifica se está valido e terminou de preencher todas as posicoes
    if(estadoTabuleiro.isFilled())
    {
        // Terminou a lógica e preencheu tudo,
        // poderiamos imprimir o novo array na tela
    }
    else
    {
        console.log('chegou aqui', estoqueMonstros);

        var estoqueMonstrosRecursao = Object.assign({}, estoqueMonstros);
        var vampiro = estoqueMonstrosRecursao.vampiros.pop();
        if(vampiro)
        {
            console.log('indo sentido vampiro');
            return window.solve(new EstadoTabuleiro(estadoTabuleiro.getState(), vampiro), estoqueMonstrosRecursao);
        }

        var estoqueMonstrosRecursao = Object.assign({}, estoqueMonstros);
        var fantasma = estoqueMonstrosRecursao.fantasmas.pop();
        if(fantasma)
        {
            console.log('indo sentido fantasma');
            return window.solve(new EstadoTabuleiro(estadoTabuleiro.getState(), fantasma), estoqueMonstrosRecursao);
        }

        var estoqueMonstrosRecursao = Object.assign({}, estoqueMonstros);
        var zombie = estoqueMonstrosRecursao.zombies.pop();
        if(zombie)
        {
            console.log('indo sentido zombie');
            return window.solve(new EstadoTabuleiro(estadoTabuleiro.getState(), zombie), estoqueMonstrosRecursao);
        }
    }
}
