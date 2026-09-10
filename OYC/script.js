// DOM
const boardElement = document.getElementById('ocBoard');
const modoSelect = document.getElementById('modoSelect');
const startSelect = document.getElementById('startSelect');
const resetBtn = document.getElementById('resetBtn');
const btnSelX = document.getElementById('btnSelX');
const btnSelO = document.getElementById('btnSelO');
const player1Label = document.getElementById('player1Label');
const player2Label = document.getElementById('player2Label');
const turnoDisplay = document.getElementById('turnoDisplay');
const puntOrden = document.getElementById('puntuacionOrden');
const puntCaos = document.getElementById('puntuacionCaos');

// Estado
let board = Array(36).fill(null);
let turnoOrden = true;
let piezaSeleccionada = 'X';
let victoriasOrden = 0;
let victoriasCaos = 0;
let procesandoIA = false;

// Generar todas las lineas posibles de 5 en un tablero 6x6
const winLines = [];
// Filas
for (let r = 0; r < 6; r++) {
    winLines.push([r * 6, r * 6 + 1, r * 6 + 2, r * 6 + 3, r * 6 + 4]);
    winLines.push([r * 6 + 1, r * 6 + 2, r * 6 + 3, r * 6 + 4, r * 6 + 5]);
}
// Columnas
for (let c = 0; c < 6; c++) {
    winLines.push([c, c + 6, c + 12, c + 18, c + 24]);
    winLines.push([c + 6, c + 12, c + 18, c + 24, c + 30]);
}
// Diagonales principales
for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
        let s = r * 6 + c;
        winLines.push([s, s + 7, s + 14, s + 21, s + 28]);
    }
}
// Diagonales inversas
for (let r = 0; r < 2; r++) {
    for (let c = 4; c < 6; c++) {
        let s = r * 6 + c;
        winLines.push([s, s + 5, s + 10, s + 15, s + 20]);
    }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

function inicializarTablero() {
    board = Array(36).fill(null);
    turnoOrden = true;
    procesandoIA = false;
    piezaSeleccionada = 'X';
    actualizarBotonesPieza();

    const existing = document.getElementById('endOverlay');
    if (existing) existing.remove();

    dibujarTablero();
    actualizarUI();

    if (modoSelect.value === 'pvia' && startSelect.value === 'ia') {
        ejecutarIA();
    }
}

function dibujarTablero() {
    boardElement.innerHTML = '';
    for (let i = 0; i < 36; i++) {
        const cell = document.createElement('div');
        cell.className = `oc-cell ${board[i] || ''}`;
        cell.textContent = board[i] || '';
        cell.addEventListener('click', () => manejarJugada(i));
        boardElement.appendChild(cell);
    }
}

function actualizarBotonesPieza() {
    btnSelX.classList.toggle('active', piezaSeleccionada === 'X');
    btnSelO.classList.toggle('active', piezaSeleccionada === 'O');

    if (piezaSeleccionada === 'X') {
        btnSelX.style.borderColor = 'var(--accent)';
        btnSelO.style.borderColor = 'transparent';
    } else {
        btnSelO.style.borderColor = 'var(--accent-o)';
        btnSelX.style.borderColor = 'transparent';
    }
}

function actualizarUI() {
    const esPvIA = modoSelect.value === 'pvia';
    const iaEmpieza = startSelect.value === 'ia';

    // Nombres de los jugadores y sus roles
    player1Label.textContent = (esPvIA && iaEmpieza) ? 'IA (Orden)' : 'Humano (Orden)';
    player2Label.textContent = (esPvIA && !iaEmpieza) ? 'IA (Caos)' : 'Humano (Caos)';

    if (!esPvIA) {
        player1Label.textContent = 'Jugador 1 (Orden)';
        player2Label.textContent = 'Jugador 2 (Caos)';
    }

    puntOrden.textContent = victoriasOrden;
    puntCaos.textContent = victoriasCaos;

    // Indicador claro del turno actual
    if (turnoOrden) {
        let txt = esPvIA ? (iaEmpieza ? 'IA (Orden)' : 'Humano (Orden)') : 'Jugador 1 (Orden)';
        turnoDisplay.textContent = `Turno: ${txt}`;
        turnoDisplay.style.color = "var(--accent)";
    } else {
        let txt = esPvIA ? (iaEmpieza ? 'Humano (Caos)' : 'IA (Caos)') : 'Jugador 2 (Caos)';
        turnoDisplay.textContent = `Turno: ${txt}`;
        turnoDisplay.style.color = "var(--accent-o)";
    }
}

function chequearVictoria(b) {
    for (let line of winLines) {
        let first = b[line[0]];
        if (first === null) continue;
        let win = true;
        for (let i = 1; i < 5; i++) {
            if (b[line[i]] !== first) {
                win = false;
                break;
            }
        }
        if (win) return 'Orden';
    }
    return null;
}

function chequearLleno(b) {
    return b.every(cell => cell !== null);
}

async function manejarJugada(i) {
    if (procesandoIA || board[i] !== null) return;

    board[i] = piezaSeleccionada;
    dibujarTablero();

    let ganador = chequearVictoria(board);
    if (ganador) {
        terminarPartida('Orden');
        return;
    } else if (chequearLleno(board)) {
        terminarPartida('Caos');
        return;
    }

    turnoOrden = !turnoOrden;
    actualizarUI();

    const esPvIA = modoSelect.value === 'pvia';
    const iaEmpieza = startSelect.value === 'ia';
    const tocaIA = esPvIA && ((iaEmpieza && turnoOrden) || (!iaEmpieza && !turnoOrden));

    if (tocaIA) {
        ejecutarIA();
    }
}

// ==========================================
// IA: MINIMAX Y HEURISTICA
// ==========================================

async function ejecutarIA() {
    procesandoIA = true;
    await sleep(200);

    const profundidad = 2; // Profundidad baja porque hay 2 opciones por casilla vacia
    let mejorValor = turnoOrden ? -Infinity : Infinity;
    let mejorMov = null;
    let mejorPieza = 'X';

    let casillasVacias = [];
    for (let i = 0; i < 36; i++) {
        if (board[i] === null) casillasVacias.push(i);
    }

    for (let i of casillasVacias) {
        for (let p of ['X', 'O']) {
            board[i] = p;
            let valor = minimax(board, profundidad - 1, -Infinity, Infinity, !turnoOrden);
            board[i] = null;

            if (turnoOrden) { // Orden maximiza
                if (valor > mejorValor) { mejorValor = valor; mejorMov = i; mejorPieza = p; }
            } else { // Caos minimiza
                if (valor < mejorValor) { mejorValor = valor; mejorMov = i; mejorPieza = p; }
            }
        }
    }

    procesandoIA = false;
    piezaSeleccionada = mejorPieza;
    actualizarBotonesPieza();
    manejarJugada(mejorMov);
}

function minimax(b, depth, alpha, beta, isMaximizing) {
    let ganador = chequearVictoria(b);
    if (ganador === 'Orden') return 10000 + depth;
    if (chequearLleno(b)) return -10000 - depth; // Gana Caos
    if (depth === 0) return evaluarTablero(b);

    let casillasVacias = [];
    for (let i = 0; i < 36; i++) {
        if (b[i] === null) casillasVacias.push(i);
    }

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let i of casillasVacias) {
            for (let p of ['X', 'O']) {
                b[i] = p;
                let ev = minimax(b, depth - 1, alpha, beta, false);
                b[i] = null;
                maxEval = Math.max(maxEval, ev);
                alpha = Math.max(alpha, ev);
                if (beta <= alpha) break;
            }
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i of casillasVacias) {
            for (let p of ['X', 'O']) {
                b[i] = p;
                let ev = minimax(b, depth - 1, alpha, beta, true);
                b[i] = null;
                minEval = Math.min(minEval, ev);
                beta = Math.min(beta, ev);
                if (beta <= alpha) break;
            }
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

function evaluarTablero(b) {
    let score = 0;
    for (let line of winLines) {
        let x = 0, o = 0;
        for (let i = 0; i < 5; i++) {
            if (b[line[i]] === 'X') x++;
            else if (b[line[i]] === 'O') o++;
        }

        // Lineas mezcladas no sirven para Orden (Caos las ha bloqueado)
        if (x > 0 && o > 0) continue;

        // Puntos para Orden por acercarse a 5
        if (x > 0) score += Math.pow(10, x);
        if (o > 0) score += Math.pow(10, o);
    }
    return score;
}

function terminarPartida(ganador) {
    if (ganador === 'Orden') victoriasOrden++;
    else victoriasCaos++;
    actualizarUI();

    const overlay = document.createElement('div');
    overlay.id = 'endOverlay';
    const panel = document.createElement('div');
    panel.className = 'endPanel';

    const titulo = document.createElement('h2');
    titulo.textContent = `Gano ${ganador}!`;

    const btn = document.createElement('button');
    btn.textContent = 'Jugar de nuevo';
    btn.onclick = inicializarTablero;

    panel.appendChild(titulo);
    panel.appendChild(btn);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
}

// Eventos
btnSelX.addEventListener('click', () => { if (!procesandoIA) { piezaSeleccionada = 'X'; actualizarBotonesPieza(); } });
btnSelO.addEventListener('click', () => { if (!procesandoIA) { piezaSeleccionada = 'O'; actualizarBotonesPieza(); } });
resetBtn.addEventListener('click', inicializarTablero);

modoSelect.addEventListener('change', () => {
    startSelect.style.display = modoSelect.value === 'pvp' ? 'none' : 'inline-block';
    inicializarTablero();
});
startSelect.addEventListener('change', inicializarTablero);

// Iniciar
startSelect.style.display = modoSelect.value === 'pvp' ? 'none' : 'inline-block';
inicializarTablero();