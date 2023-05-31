console.log(`************************************ 
** ADS 2023.1 - IFPI Campus Picos **
****** Aluno: Matheus da Silva ******
* Bem vindo ao Jogo de Adivinhação *
************************************
`);

const N = parseInt(Math.random() * 100);
let nome = prompt("Qual seu nome(jogador)?");

for (let i = 1; i <= 5; i++) {
  let chute = parseInt(prompt("Qual seu chute?"));
  
  if (chute === N) {
    console.log("Parabéns " + nome + "! Você acertou!");
    break;
  } else {
    console.log(nome + " Você errou! Tente novamente. Você ainda tem " + (5 - i) + " tentativas.");
  }

  if (i === 5) {
    console.log("Game Over! " + nome + ", suas chances acabaram! O número secreto era " + N + ".");
  }
}