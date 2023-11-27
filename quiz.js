const question = document.querySelector(".question");
/*Essa seleção permite interagir com o elemento relacionado à pergunta do quiz.*/
const answers = document.querySelector(".answers");
/*permite interagir com o contêiner que contém as opções de resposta.*/
const spnQtd = document.querySelector(".spnQtd");
/*pode ser usada para interagir com um elemento relacionado à quantidade de perguntas. */
const textFinish = document.querySelector(".finish span");
/*permite interagir com o conteúdo de texto dentro do contêiner "finish". */
const content = document.querySelector(".content");
/* permite interagir com o contêiner que contém as perguntas e opções de resposta.*/
const contentFinish = document.querySelector(".finish");
/*pode ser usado para interagir com o contêiner "finish", que geralmente é usado para mostrar informações relacionadas ao término do quiz. */
const btnRestart = document.querySelector(".finish button");
/*permite interagir com o botão que pode ser usado para reiniciar o quiz ou a atividade. */

import questions from "./perguntas.js";
/*contém uma matriz de perguntas e opções de respostas para o quiz */
let currentIndex = 0; 
/* é usada para rastrear o índice da pergunta atual no array de perguntas. */
let questionsCorrect = 0;
 /* é usada para rastrear o número de respostas corretas que o usuário deu no quiz. */

btnRestart.onclick = () => {
  /*Esta parte do código lida com um evento de clique no botão com a variável */
  content.style.display = "flex";
  /*é usado para mostrar o conteúdo principal do quiz após o reinício*/
  contentFinish.style.display = "none";
  /*é usado para ocultar o conteúdo relacionado ao término do quiz*/

  currentIndex = 0;
   /* é um ponto de partida para rastrear a posição inicial ou o estado inicial de um elemento em uma lista ou coleção*/
  questionsCorrect = 0; 
  /*  permite que o aplicativo acompanhe o desempenho do usuário e exiba informações como a pontuação ou a porcentagem de perguntas corretas.*/
  loadQuestion();
   /*é responsável por carregar a próxima pergunta do quiz na interface do usuário. */
};

function nextQuestion(e) {
  /* serve para o usuário avança para a próxima pergunta ou opção de resposta*/
  if (e.target.getAttribute("data-correct") === "true") { /* é usado para obter o valor do atributo "data-correct" do elemento alvo */
    questionsCorrect++; /*é geralmente usado para acompanhar o número de perguntas respondidas corretamente. */
  }

  if (currentIndex < questions.length - 1) { /*verifica se ainda há mais perguntas a serem exibidas */
    currentIndex++; /* move a aplicação para a próxima pergunta no array de perguntas*/
    loadQuestion(); /* carrega e exibe a próxima pergunta e suas opções de resposta na página */
  } else {
    finish(); /*lida com o término do quiz */
  }
}

function finish() { /*realiza ações quando o usuário concluir o quiz  */
  textFinish.innerHTML = `você acertou ${questionsCorrect} de ${questions.length}`; /*permite que o valor de questionsCorrect seja inserido dinamicamente no texto. */
  content.style.display = "none"; /*a altera a propriedade CSS */
  contentFinish.style.display = "flex"; /* se refere ao contêiner que contém informações relacionadas ao término do quiz */
}

function loadQuestion() { /* é usada para atualizar a interface do usuário com uma nova pergunta e suas opções de resposta quando o usuário avança para a próxima pergunta no quiz. */
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`; /* se refere ao elemento que exibe a informação sobre a quantidade de perguntas */
  const item = questions[currentIndex]; /*é uma variável que rastreia a posição da pergunta atual. */
  answers.innerHTML = ""; /*se refere a um contêiner onde as opções de resposta para a pergunta atual são exibidas. */
  question.innerHTML = item.question; /*atualiza dinamicamente a pergunta exibida na página para corresponder à pergunta atual do quiz. */

  item.answers.forEach((answer) => { /*Isso inicia um loop que itera sobre o array dentro do objeto item. Cada elemento em answers representa uma opção de resposta. */
    const div = document.createElement("div"); /*é usado para conter uma opção de resposta. */

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `; /*esses codigos foram usados para criar dinamicamente botões de resposta para uma pergunta específica */

    answers.appendChild(div); /*é usada para anexar ou adicionar o elemento div como um filho do elemento  */
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  }); /*adiciona um ouvinte de eventos de clique a cada elemento com a classe "answer" e associa a função nextQuestion a ser executada quando um desses elementos for clicado. */
}

loadQuestion(); /* é usada para atualizar a interface do usuário com uma nova pergunta e suas opções de resposta quando o usuário avança para a próxima pergunta no quiz. */