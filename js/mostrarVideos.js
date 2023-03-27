import { conectaApi } from "./conectaApi.js";

// usando data attributes para manipular o dom
const lista = document.querySelector("[data-lista");

export default function constroiCard(titulo, descricao, url, imagem) {
  // criar elemento "li" e coloca a classe videos__item
  const video = document.createElement("li");
  video.className = "videos__item";
  video.innerHTML = `
    <iframe width="100%" height="72%" src="${url}" title="${titulo}" 
      frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
      gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="descricao-video">
      <img src="${imagem}">
      <h3>${titulo}</h3>
      <p>${descricao}</p>
    </div>
  `
  return video;
}

async function listaVideos() {
  try {
    const listaAPI = await conectaApi.listaVideos();
    // imprimir na tela os elementos da lista
    listaAPI.forEach(elemento => lista.appendChild(constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)));
  } catch {
    // caso não seja possível carregar os elementos, aparece a mensagem
    lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de vídeos</h2>`
  }
}

listaVideos();