// script.js
const questionDisplay = document.getElementById('questionDisplay');
const inputDisplay = document.getElementById('inputDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const timerBar = document.getElementById('timerBar');
const mathBoard = document.querySelector('.math-board');
const endOverlay = document.getElementById('endOverlay');
const finalScoreDisplay = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');
const levelDisplay = document.getElementById('levelDisplay');
const keys = document.querySelectorAll('.key');

// Variables de estado
let score = 0;
let currentAnswer = null;
let currentInput = "";
let timer = null;
let timeLeft = 60000;
const maxVisualTime = 60000;

const PENALTY = 5000;
const REWARD = 1500;

const OPERATIONS = ['+', '-', '*', '/'];

function startGame() {
    score = 0;
    timeLeft = 60000;
    currentInput = "";
    scoreDisplay.textContent = score;
    endOverlay.style.display = "none";
    inputDisplay.textContent = "";

    clearInterval(timer);
    timer = setInterval(gameLoop, 50);

    generateQuestion();
}

function gameLoop() {
    timeLeft -= 50;
    if (timeLeft <= 0) {
        timeLeft = 0;
        endGame();
    }
    updateTimerVisuals();
}

function updateTimerVisuals() {
    const x = timeLeft;
    const M = maxVisualTime;
    const A = 0.1;

    // Funcion matematica de engano visual
    let visualTime = x * (1 + ((1 - A) / M) * (x - M));

    let percentage = (visualTime / M) * 100;

    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;

    timerBar.style.width = percentage + '%';

    // La alerta visual en base al tiempo real
    if (timeLeft < 15000) {
        timerBar.classList.add('warning');
    } else {
        timerBar.classList.remove('warning');
    }
}

function endGame() {
    clearInterval(timer);
    finalScoreDisplay.textContent = score;
    endOverlay.style.display = "flex";
}

function getAvailableOperations() {
    let n = Math.min(4, 2 + Math.floor(score / 10));

    if (n === 2) levelDisplay.textContent = "Nivel 1 (Sumas, Restas)";
    else if (n === 3) levelDisplay.textContent = "Nivel 2 (Anade Mult.)";
    else levelDisplay.textContent = "Nivel 3 (Todas habilitadas)";

    return OPERATIONS.slice(0, n);
}

function pickRandomOperation() {
    const ops = getAvailableOperations();
    const n = ops.length;

    let weights = ops.map((_, index) => Math.pow(2, n - 1 - index));
    let totalWeight = Math.pow(2, n) - 1;

    let randomNum = Math.floor(Math.random() * totalWeight) + 1;
    let cumulative = 0;

    for (let i = 0; i < weights.length; i++) {
        cumulative += weights[i];
        if (randomNum <= cumulative) {
            return ops[i];
        }
    }
    return ops[0];
}

function generateQuestion() {
    const op = pickRandomOperation();

    let baseMax = 10 + Math.floor(score * 1.5);
    let a, b, c;

    switch (op) {
        case '+':
            a = Math.floor(Math.random() * baseMax) + 1;
            b = Math.floor(Math.random() * baseMax) + 1;
            currentAnswer = a + b;
            questionDisplay.textContent = a + ' + ' + b;
            break;
        case '-':
            a = Math.floor(Math.random() * baseMax) + 1;
            b = Math.floor(Math.random() * baseMax) + 1;
            c = a + b;
            currentAnswer = a;
            questionDisplay.textContent = c + ' - ' + b;
            break;
        case '*':
            let maxMult = Math.max(4, Math.floor(baseMax / 2));
            a = Math.floor(Math.random() * maxMult) + 2;
            b = Math.floor(Math.random() * maxMult) + 2;
            currentAnswer = a * b;
            questionDisplay.textContent = a + ' * ' + b;
            break;
        case '/':
            let maxDiv = Math.max(4, Math.floor(baseMax / 2));
            a = Math.floor(Math.random() * maxDiv) + 2;
            b = Math.floor(Math.random() * maxDiv) + 2;
            c = a * b;
            currentAnswer = a;
            questionDisplay.textContent = c + ' / ' + b;
            break;
    }
}

function handleInput(val) {
    if (val === 'del') {
        currentInput = currentInput.slice(0, -1);
    } else if (val === 'ok') {
        if (currentInput === "") return;
        checkAnswer();
    } else {
        if (currentInput.length < 5) {
            currentInput += val;
        }
    }
    inputDisplay.textContent = currentInput;
}

function checkAnswer() {
    if (parseInt(currentInput) === currentAnswer) {
        score++;
        timeLeft += REWARD;
        scoreDisplay.textContent = score;

        mathBoard.classList.add('correct');
        setTimeout(() => mathBoard.classList.remove('correct'), 150);

        currentInput = "";
        generateQuestion();
    } else {
        timeLeft -= PENALTY;

        mathBoard.classList.add('incorrect');
        setTimeout(() => mathBoard.classList.remove('incorrect'), 150);

        currentInput = "";
    }
    inputDisplay.textContent = currentInput;
}

keys.forEach(key => {
    key.addEventListener('click', (e) => {
        e.preventDefault();
        handleInput(key.dataset.val);
    });
});

restartBtn.addEventListener('click', startGame);

startGame();