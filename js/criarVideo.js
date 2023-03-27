import { conectaApi } from "./conectaApi.js";

// salvar os data attributes
const formulario = document.querySelector("[data-formulario");

// transforma a função em assíncrona pois retorna uma promise
async function criarVideo(evento) {
  // passa o evento para previnir que a ação padrão aconteça (o envio de carregamento da página) 
  evento.preventDefault(); 

  // salvar os data attributes pegando apenas o valor que está sendo digitado
  const imagem = document.querySelector("[data-imagem]").value;
  const url = document.querySelector("[data-url]").value;
  const titulo = document.querySelector("[data-titulo]").value;

  // Descrição é o número de visualizações, mas não tem contador, então usamos math random para pegar número aleatório entre 0 e 1, depois multiplica por 10 para transformar em inteiro. 
  // O math floor arredonda o número para inteiro. E depois transforma em string para passar para requisição
  const descricao = Math.floor(Math.random() * 10).toString();

  
  // tentar criar o vídeo
  try {
    // foi importado a constante para trazer a função criaVideo que é assíncrona, retornando uma promise
    await conectaApi.criaVideo(titulo, descricao, url, imagem);
  
    // enviar para página de envio concluído
    window.location.href = "../pages/envio-concluido.html";
  } catch (e) { 
    // se der problema ao tentar criar o vídeo, exibe o erro do if do conectaApi
    alert(e);
  }

}

// ouvinte de evento para quando ocorrer um envio do formulário o mesmo enviar um evento, a ação padrão é recarregar a página
formulario.addEventListener("submit", evento => criarVideo(evento))