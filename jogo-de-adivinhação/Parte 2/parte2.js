console.log(`************************************ 
** ADS 2023.1 - IFPI Campus Picos **
****** Aluno: Matheus da Silva ******
* Bem vindo ao Jogo de Adivinhação *
************************************
`);


const N = parseInt(Math.random() * 100);
let nome = prompt("Qual seu nome(jogador)?");

let i = 1;
while (i !== N) {
  console.log("Tentativa " + i);
  let chute = parseInt(prompt("Qual seu chute, "+ nome +"?"));
  console.log(nome +", seu chute foi " + chute);

  if (chute < 0) {
    console.log(nome + " você não pode chutar números negativos.\n");
    continue;
  }

  i++;
  
  if (chute === N) {
    console.log("Parabéns, " + nome + "! Você acertou em "+ (i - 1) + " tentativas");
    break;
  } else if (chute < N){
      console.log(nome + ", você errou!, seu chute foi menor que o número secreto\n")
    } else {
      console.log(nome + ", você errou!, seu chute foi maior que o número secreto\n")
    }
  }