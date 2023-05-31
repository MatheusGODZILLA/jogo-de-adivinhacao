// Importando o módulo fs do Node.js e atribuindo-o a uma constante chamada 'fs'
const fs = require('fs'); 
// Ele fornece métodos para interagir com arquivos e diretórios do sistema de arquivos.
//carregando o módulo fs para poder acessar e usar seus métodos, como readFileSync, writeFileSync, unlinkSync, 
//entre outros. Esses métodos permitem ler, escrever, apagar e manipular arquivos no sistema de arquivos.

console.log(`************************************
** ADS 2023.1 - IFPI Campus Picos **
****** Aluno: Matheus da Silva ******
* Bem vindo ao Jogo de Adivinhação *
************************************
`); // Mensagem de boas vindas

// Função para ler o valor atual do recorde armazenado no arquivo (se houver)
function lerRecorde() {
  try {
    const data = fs.readFileSync('recorde.txt', 'utf8');
    return parseInt(data);
  } catch (err) {
    // Se o arquivo não existir ou estiver vazio, retorna 0 como recorde inicial
    return 0;
  }
}

// Função para salvar o novo recorde no arquivo
function salvarRecorde(pontos) {
  const recordeAtual = lerRecorde();
  if (pontos > recordeAtual) {
    fs.writeFileSync('recorde.txt', pontos.toString());
  }
}

// Função para gerar um número aleatório entre 1 e 100
function gerarNumeroAleatorio() {
  return Math.floor(Math.random() * 99) + 1;
}

// Função para obter o nome do jogador
function obterNomeJogador() {
  const nome = prompt("Qual seu nome (jogador)?");
  console.log();
  return nome;
}

// Função para exibir o menu de dificuldade
function exibirMenuDificuldade() {
  console.log("Qual o nível de dificuldade?");
  console.log("(1) Fácil (2) Médio (3) Difícil");
  console.log("Informe o nível\n");
}

// Função para obter a opção de dificuldade escolhida pelo jogador
function obterOpcaoDificuldade() {
  const opcao = parseInt(prompt("Qual o nível de dificuldade você deseja usar?"));
  console.log();
  return opcao;
}

// Função para calcular o número máximo de tentativas com base no nível de dificuldade
function calcularMaxTentativas(nivel) {
  if (nivel === 1) {
    return 10;
  } else if (nivel === 2) {
    return 5;
  } else if (nivel === 3) {
    return 4;
  } else {
    console.log("Nível inválido. O jogo será encerrado.");
    return 0;
  }
}

// Função para calcular a pontuação máxima com base no nível de dificuldade
function calcularPontosMaximos(nivel) {
  if (nivel >= 1 && nivel <= 3) {
    return 100;
  } else {
    return 0;
  }
}

// Função para exibir o menu de jogar novamente após uma jogada
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

// Função principal do jogo
function jogar() {
  const nome = obterNomeJogador(); // Obtém o nome do jogador
  exibirMenuDificuldade(); // Exibe o menu de dificuldade
  const nivel = obterOpcaoDificuldade(); // Obtém o nível de dificuldade escolhido pelo jogador
  const maxTentativas = calcularMaxTentativas(nivel); // Calcula o número máximo de tentativas com base no nível de dificuldade
  let pontosMaximos = calcularPontosMaximos(nivel); // Calcula a pontuação máxima com base no nível de dificuldade

  console.log("Adivinhe o número secreto entre 1 e 100!\n");
  
  if (maxTentativas === 0) {
    return 0; // Retorna 0 se o nível for inválido
  }

  let i = 1; // Variável para contar o número de tentativas
  let pontos = pontosMaximos; // Inicializa a pontuação com o valor máximo possível
  const numeroSecreto = gerarNumeroAleatorio(); // Gera um número secreto aleatório

  while (i <= maxTentativas) {
    console.log(`Tentativa ${i}`);
    const chute = parseInt(prompt(`Qual seu chute, ${nome}?`));
    console.log(`${nome}, seu chute foi ${chute}`);

    if (chute < 0) {
      console.log(`${nome}, você não pode chutar números negativos.\n`);
      continue;
    } // Verifica se o chute é negativo

    if (chute === numeroSecreto) {
      console.log(`Parabéns ${nome}! Você acertou em ${i} tentativas`);
      break;
    } else if (chute < numeroSecreto) {
      console.log(`${nome}, você errou! Seu chute foi menor que o número secreto.\n`);
    } else {
      console.log(`${nome}, você errou! Seu chute foi maior que o número secreto.\n`);
    } // Verifica se o chute do jogador é igual ao número secreto

    i++; // Incrementa o contador de tentativas
    if (nivel === 1) {
      pontos -= 10; // Diminui a pontuação em 10 pontos a cada tentativa no nível 1
    } else if (nivel === 2) {
      pontos -= 20; // Diminui a pontuação em 20 pontos a cada tentativa no nível 2
    } else if (nivel === 3) {
      pontos -= 25; // Diminui a pontuação em 25 pontos a cada tentativa no nível 3
    }
  }

  if (i > maxTentativas) {
    pontos = 0; // Se exceder o número máximo de tentativas, a pontuação é zerada
    console.log("Você perdeu! Tente novamente!");
  }

  console.log(`Sua pontuação final é: ${pontos}\n`);

  const recorde = lerRecorde(); // Obtém o recorde anterior (se houver)
  if (pontos > recorde) {
    console.log(`Você é o novo recordista de pontos com ${pontos} pontos\n`);
    salvarRecorde(pontos); // Salva o novo recorde no arquivo
  } else if (pontos === recorde){
    console.log(`Sua pontuação foi ${pontos} igualando ao recorde atual que já era de ${recorde} pontos\n`);
  } else {
    console.log(`Sua pontuação foi ${pontos} ficando abaixo do recorde atual que é de ${recorde} pontos\n`);
  }

  return pontosMaximos; // Retorna o valor de pontosMaximos
}

// Função para jogar novamente
function jogarNovamente() {
  exibirMenuJogarNovamente(); // Exibe o menu para jogar novamente
  const opcao = obterOpcaoJogarNovamente(); // Obtém a opção escolhida pelo jogador
  return opcao === 1;
}

let jogarNovamenteFlag = true; // Variável de controle para continuar jogando

while (jogarNovamenteFlag) {
  pontosMaximos = jogar(); // Inicia o jogo
  jogarNovamenteFlag = jogarNovamente(); // Verifica se o jogador deseja jogar novamente e atualiza a variável de controle
}