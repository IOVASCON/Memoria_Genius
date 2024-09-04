// Inicialização de arrays para armazenar a sequência de cores e a sequência clicada pelo jogador
let order = [];
let clickedOrder = [];
// Inicialização da pontuação do jogador
let score = 0;

// Seleção dos elementos de cor do DOM
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

// Função para embaralhar e criar uma nova ordem de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4); // Escolhe um número aleatório entre 0 e 3
    order.push(colorOrder); // Adiciona este número à sequência de cores
    clickedOrder = []; // Reseta a sequência de cores clicadas pelo usuário

    // Acende as cores na ordem gerada
    for(let i in order) {
        let elementColor = createColorElement(order[i]); // Obtém o elemento DOM da cor
        lightColor(elementColor, Number(i) + 1); // Acende a cor
    }
}

// Função para iluminar uma cor
let lightColor = (element, number) => {
    number = number * 500; // Calcula o tempo em milissegundos para o delay
    setTimeout(() => {
        element.classList.add('selected'); // Adiciona a classe 'selected' para iluminar a cor
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected'); // Remove a classe 'selected' para desligar a luz
    }, number + 250);
}

// Função para verificar se a sequência clicada pelo usuário está correta
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver(); // Chama a função de fim de jogo se a sequência estiver errada
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel(); // Avança para o próximo nível se a sequência estiver correta
    }
}

// Função para processar o clique em uma cor
let click = (color) => {
    clickedOrder.push(color); // Adiciona a cor clicada à sequência
    createColorElement(color).classList.add('selected'); // Ilumina a cor clicada

    setTimeout(() => {
        createColorElement(color).classList.remove('selected'); // Apaga a luz da cor clicada
        checkOrder(); // Verifica a sequência após o usuário clicar
    },250);
}

// Função para retornar o elemento de cor baseado no número
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

// Função para avançar para o próximo nível
let nextLevel = () => {
    score++; // Incrementa a pontuação
    shuffleOrder(); // Embaralha uma nova ordem de cores
}

// Função chamada quando o jogador perde o jogo
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];
    score = 0; // Reseta a pontuação
    nextLevel(); // Inicia um novo nível automaticamente
}

// Função inicial para iniciar o jogo
let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    score = 0; // Reseta a pontuação
    nextLevel(); // Inicia o primeiro nível
}

// Event listeners para os botões de iniciar e parar/reiniciar o jogo
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

document.getElementById('start-game').addEventListener('click', playGame);
document.getElementById('stop-game').addEventListener('click', () => {
    if (confirm('Você deseja parar e reiniciar o jogo?')) {
        stopGame();
        playGame(); // Reinicia o jogo imediatamente
    }
});

// Função para parar o jogo e reiniciar
function stopGame() {
    order = [];
    clickedOrder = [];
    score = 0;
    updateScore(); // Atualiza a pontuação para mostrar 0
    alert('Jogo parado. Pressione "Iniciar Jogo" para jogar novamente.');
}

// Função para atualizar a pontuação na tela
function updateScore() {
    document.getElementById('score').textContent = `Pontuação: ${score}`;
    document.getElementById('hits').textContent = `Acertos: ${hits}`;
    document.getElementById('misses').textContent = `Erros: ${misses}`;
}

// Funções para incrementar acertos e erros
function incrementHit() {
    hits++;
    updateScore();
}

function incrementMiss() {
    misses++;
    updateScore();
}
