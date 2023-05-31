// Importando o módulo fs para lidar com operações de leitura e escrita de arquivos
const fs = require('fs');

const pontuacaoRecorde = lerPontuacaoVencedor(); // atualiza a pontuação recorde na mensagem de boas-vindas abaixo, se não existir um recorde imprimirá '0'

console.log(`************************************ *
*** ADS 2023.1 - IFPI Campus Picos ***
** Bem vindo ao Jogo de Adivinhação **
****** Aluno: Matheus da Silva ******
* Recorde de pontos atual: ${pontuacaoRecorde} pontos *
**************************************
`);

// Função para ler o ranking geral dos jogadores a partir do arquivo "ranking.txt"
function lerRankingGeral() {
  try {
    const data = fs.readFileSync('ranking.txt', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Função para salvar o ranking geral dos jogadores no arquivo "ranking.txt"
function salvarRankingGeral(ranking) {
  fs.writeFileSync('ranking.txt', JSON.stringify(ranking));
}

// Função para ler a pontuação do jogador vencedor a partir do arquivo "recorde.txt"
function lerPontuacaoVencedor() {
  try {
    const data = fs.readFileSync('recorde.txt', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return 0;
  }
}

// Função para salvar a pontuação do jogador vencedor no arquivo "recorde.txt"
function salvarPontuacaoVencedor(pontuacao) {
  fs.writeFileSync('recorde.txt', JSON.stringify(pontuacao));
}

// Função para ordenar o ranking de jogadores com base nos pontos
function ordenarRanking(ranking) {
  ranking.sort((a, b) => b.pontos - a.pontos);
}

// Função para exibir o ranking de jogadores no console
function exibirRanking(ranking) {
  console.log("***********************************************************");
  console.log("                     RANKING DE PONTOS                     ");
  console.log("***********************************************************");
  
  // Loop que percorre os elementos do array 'ranking'
  for (let i = 0; i < ranking.length; i++) {
    console.log(`${i + 1}º - ${ranking[i].pontos} pontos`);
  } // Imprime a posição, pontuação e nome do jogador no ranking
  
  console.log();
}

// Função para gerar um número aleatório entre 1 e 100
function gerarNumeroAleatorio() {
  return Math.floor(Math.random() * 99) + 1;
}

// Função para obter o nome do jogador
function obterNomeJogador(numeroJogador) {
  const nome = prompt(`Qual o nome do Jogador ${numeroJogador}?`);
  console.log();
  return nome;
}

// Função para exibir o menu de jogar novamente
function exibirMenuJogarNovamente() {
  console.log("***********************************************************");
  console.log("***********************************************************");
  console.log("0 - Sair");
  console.log("1 - Jogar novamente\n");
}

// Função para obter a opção de jogar novamente escolhida pelo jogador
function obterOpcaoJogarNovamente() {
  const opcao = parseInt(prompt("Escolha uma opção:"));
  return opcao;
}

// Função principal que implementa a lógica do jogo
function jogar() {
  const nomeJogador1 = obterNomeJogador(1);
  const nomeJogador2 = obterNomeJogador(2);
  console.log("Adivinhem o número secreto entre 1 e 100!\n");

  let i = 1; // Contador de tentativas
  let pontosMaximos = 100; // Pontuação máxima inicial
  const numeroSecreto = gerarNumeroAleatorio(); // Gerando o número secreto

  let vencedor = null; // Variável para armazenar o nome do jogador vencedor

  while (true) {
    console.log(`Tentativa ${i}`);
    const chuteJogador1 = parseInt(prompt(`Qual o seu chute, ${nomeJogador1}?`));
    console.log(`${nomeJogador1}, seu chute foi ${chuteJogador1}`);

    // Verificando se o chute é válido
    if (chuteJogador1 < 0) {
      console.log(`${nomeJogador1}, você não pode chutar números negativos.\n`);
      continue; // Reinicia o loop sem contar como uma tentativa válida
    }

    // Verificando se o chute acertou o número secreto
    if (chuteJogador1 === numeroSecreto) {
      vencedor = nomeJogador1;
      pontosMaximos = 100 - (i - 1) * 10; // Calcula a pontuação máxima do jogador com base no número de tentativas realizadas
      console.log("Na mosca!\n");
      break;
    } else if (chuteJogador1 < numeroSecreto) {
      console.log(`${nomeJogador1}, você errou! Seu chute foi menor que o número secreto.\n`);
    } else {
      console.log(`${nomeJogador1}, você errou! Seu chute foi maior que o número secreto.\n`);
    }

    // Repetindo a lógica para o segundo jogador
    console.log(`Tentativa ${i}`);
    let chuteJogador2 = parseInt(prompt(`Qual o seu chute, ${nomeJogador2}?`));
    console.log(`${nomeJogador2}, seu chute foi ${chuteJogador2}`);

    // Esse loop 'while' para o jogador 2 garantirá que o programa continuará pedindo um novo chute até que um número válido seja inserido.
    while (chuteJogador2 < 0) {
      console.log(`${nomeJogador2}, você não pode chutar números negativos.\n`);
      console.log(`Tentativa ${i}`);
      chuteJogador2 = parseInt(prompt(`Qual o seu chute, ${nomeJogador2}?`));
      console.log(`${nomeJogador2}, seu chute foi ${chuteJogador2}`);
    } // Isso garante que o jogador 2 tenha a oportunidade de digitar novamente quando inserir um número negativo.

    if (chuteJogador2 === numeroSecreto) {
      vencedor = nomeJogador2;
      pontosMaximos = 100 - (i - 1) * 10;
      console.log("Na mosca!\n");
      break;
    } else if (chuteJogador2 < numeroSecreto) {
      console.log(`${nomeJogador2}, você errou! Seu chute foi menor que o número secreto.\n`);
    } else {
      console.log(`${nomeJogador2}, você errou! Seu chute foi maior que o número secreto.\n`);
    }
    i++; // Incrementando o contador de tentativas
  }
  
  const rankingGeral = lerRankingGeral();
  const novoVencedor = {
    jogador: vencedor,
    pontos: pontosMaximos
  };
  rankingGeral.push(novoVencedor);
  ordenarRanking(rankingGeral);
  salvarRankingGeral(rankingGeral);

  console.log("***********************************************************");
  console.log(`Parabéns, ${novoVencedor.jogador}! Você acertou em ${i} tentativas.`);

  const pontuacaoVencedor = lerPontuacaoVencedor();
  if (pontuacaoVencedor === 0 || pontosMaximos > pontuacaoVencedor) {
    salvarPontuacaoVencedor(pontosMaximos);
    console.log(`Você é o novo recordista de pontos com ${pontosMaximos} pontos.`);
  } else if(pontosMaximos === pontuacaoVencedor) {
    console.log(`Sua pontuação foi ${pontosMaximos} igualando ao recorde atual que já era de ${pontuacaoVencedor} pontos`);
  } else {
    console.log(`Sua pontuação foi ${pontosMaximos}, ficando abaixo do recorde atual que é de ${pontuacaoVencedor} pontos.`);
  }

  console.log("***********************************************************\n");

  exibirRanking(rankingGeral);

  return pontosMaximos;
}

// Função para perguntar ao jogador se deseja jogar novamente
function jogarNovamente() {
  exibirMenuJogarNovamente();
  const opcao = obterOpcaoJogarNovamente();
  return opcao === 1;
}

let jogarNovamenteFlag = true;

// Loop principal que controla o jogo e a opção de jogar novamente
while (jogarNovamenteFlag) {
  pontosMaximos = jogar();
  jogarNovamenteFlag = jogarNovamente();
}