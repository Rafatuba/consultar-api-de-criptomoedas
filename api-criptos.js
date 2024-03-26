const apiCriptos = "https://api.coinranking.com/v2/coins";

async function dadosRetorno() {
  try {
    const resposta = await fetch(apiCriptos);

    const dados = await resposta.json();

    return dados;
  } catch (error) {
    console.error("Erro: ", error);
  }
}

dadosRetorno().then((dados) => {
  console.log(dados.data.coins);

  const criptomoedas = dados.data.coins.slice(0, 10);

  let textoExibicao = "";

  criptomoedas.forEach((cripto) => {
    const precoFormatado = parseFloat(cripto.price).toFixed(2);

    const negativo = cripto.change < 0;

    const classeCor = negativo ? "negativo" : "positivo";

    textoExibicao += `
      <div class="lista">
      
      <img class="icone" src=${cripto.iconUrl}> <br>    
      <div class="textos">                  
      ${cripto.symbol} <br>                     
      ${cripto.name} <br>                     
      USD: ${precoFormatado} <br>
      </div>
      <p class="${classeCor}">${cripto.change}%</p>
      </div>
      `;
  });

  document.getElementById("dadosCripto").innerHTML = textoExibicao;
});
