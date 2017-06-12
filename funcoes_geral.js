window.criarTabuleiro = (linhas, colunas, respostas) => {
    var tabuleiro = [];

    for (var linha = 0; linha < linhas; linha++) {
        tabuleiro[linha] = [];
        for (var coluna = 0; coluna < colunas; coluna++) {
            
            if( linha == 0 || coluna == 0 || linha == (linhas-1) || coluna == (colunas-1) )
                tabuleiro[linha][coluna] = respostas.shift();
            else
                tabuleiro[linha][coluna] = '?';
        }
    }

    return tabuleiro;
};

window.getTabuleiroComoString = (tabuleiro) => {
    linhas = [];
    for (var linha = 0; linha < tabuleiro.length; linha++)
        linhas.push(tabuleiro[linha].join(' | '));
    return linhas.join("\n");
};

window.getTabuleiroComoHTML = (tabuleiro) => {

    var linhas = tabuleiro.map(linha => {
        var colunasComoDiv = linha.map(valorColuna => `<div class="coluna">${valorColuna ? valorColuna : '0'}</div>`);
        return '<div class="linha">' + colunasComoDiv.join('') + '</div>';
    });

    return '<div class="tabuleiro">' + linhas.join('<br/>')  + '</div>';
};


window.sleep = () => {
  return new Promise(resolve => setTimeout(resolve, ms));  
}
