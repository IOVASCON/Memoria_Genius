let order = [];
let clickedOrder = [];
let score = 0;

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number + 250);
}

let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

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

let nextLevel = () => {
    score++;
    shuffleOrder();
}

let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];
    score = 0;
    nextLevel();
}

let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    score = 0;
    nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

document.getElementById('start-game').addEventListener('click', () => {
    playGame();
});

document.getElementById('stop-game').addEventListener('click', () => {
    if (confirm('Você deseja parar e reiniciar o jogo?')) {
        stopGame();
        startGame(); // Reinicia o jogo imediatamente
    }
});

function stopGame() {
    game.sequence = [];
    game.userSequence = [];
    game.score = 0;
    updateScore(); // Atualiza a pontuação para mostrar 0
    alert('Jogo parado. Pressione "Iniciar Jogo" para jogar novamente.');
}

/*
function updateScore() {
    document.getElementById('score').textContent = `Pontuação: ${game.score}`;
}
*/

let hits = 0;
let misses = 0;

function updateScore() {
    document.getElementById('score').textContent = `Pontuação: ${game.score}`;
    document.getElementById('hits').textContent = `Acertos: ${hits}`;
    document.getElementById('misses').textContent = `Erros: ${misses}`;
}

function incrementHit() {
    hits++;
    updateScore();
}

function incrementMiss() {
    misses++;
    updateScore();
}

// Supondo que você chame incrementHit e incrementMiss nos eventos apropriados do jogo
