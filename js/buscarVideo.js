import { conectaApi } from "./conectaApi.js";
import constroiCard from "./mostrarVideos.js";

async function buscarVideo(evento) {
  // para não recarregar a página
  evento.preventDefault();

  // salvando os dados do data atributes 
  const dadosDePesquisa = document.querySelector("[data-pesquisa]").value;
  // fazer a busca dinâmica com os dados obtidos
  const busca = await conectaApi.buscaVideo(dadosDePesquisa);

  const lista = document.querySelector("[data-lista]");

  // enquanto a lista tem um primeiro filho, é para remover o primeiro filho da lista, até deixá-la vazia
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  // depois que a lista está vazia, faz a pesquisa
  // cada item da lista que retornar da busca, um filho vai ser anexado na lista, criando um card para cada elemento da lista e cada um que foi criado, foi anexado ao pai, o elemento "ul"
  busca.forEach(elemento => lista.appendChild(constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)));

  // se não tiver nada na lista, for vazia, aparece a mensagem
  if (busca.length == 0) {
    lista.innerHTML = `<h2 class="mensagem__titulo">Não existem vídeos com esse termo</h2>`;
  }
}

const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]");

// ouvinte de evento de click no botão e envia o evento do clique para a função buscarVideo
botaoDePesquisa.addEventListener("click", evento => buscarVideo(evento));