async function listaVideos() {
  const conexao = await fetch("http://localhost:3000/videos");
  // converte os dados que estão em formato bytes para json
  const conexaoConvertida = await conexao.json();

  return conexaoConvertida;
}

async function criaVideo(titulo, descricao, url, imagem) {
  const conexao = await fetch("http://localhost:3000/videos", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      titulo: titulo,
      descricao: `${descricao} mil visualizações`,
      url: url,
      imagem: imagem
    })
  });

  // Se a conexão está com problema (não OK), exibirá a mensagem
  if (!conexao.ok) {
    throw new Error("Não foi possível enviar o vídeo");
  }

  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;
}

async function buscaVideo(termoDeBusca) {
  // salvar a promise com a palavra que for digitada para fazer busca
  const conexao = await fetch(`http://localhost:3000/videos?q=${termoDeBusca}`);
  const conexaoConvertida = conexao.json();

  return conexaoConvertida;
}

export const conectaApi = {
  listaVideos,
  criaVideo,
  buscaVideo
}

/* FETCH é um método assíncrono, o parâmetro obrigatório é a url da API e retorna uma promise - não retorna um resultado, mas uma promessa que pode ser resolvida ou rejeitada 
  Quando não informa outro parâmetro, está fazendo uma requisição GET - solicitando para a API retornar os dados
*/