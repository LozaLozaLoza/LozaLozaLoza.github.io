// DOM
const superBoard = document.getElementById('superBoard');
const modoSelect = document.getElementById('modoSelect');
const startSelect = document.getElementById('startSelect');
const resetBtn = document.getElementById('resetBtn');
const player1Label = document.getElementById('player1Label');
const player2Label = document.getElementById('player2Label');
const turnoDisplay = document.getElementById('turnoDisplay');
const punt1Elem = document.getElementById('puntuacion1');
const punt2Elem = document.getElementById('puntuacion2');

// Estado
let microBoards = Array(9).fill(null).map(() => Array(9).fill(null));
let macroBoard = Array(9).fill(null);
let activeMacro = -1; // -1 significa jugada libre en cualquier tablero disponible
let turnoX = true;
let victoriasX = 0;
let victoriasO = 0;
let procesandoIA = false;

const winLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]           // Diagonales
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

function inicializarTablero() {
    microBoards = Array(9).fill(null).map(() => Array(9).fill(null));
    macroBoard = Array(9).fill(null);
    activeMacro = -1;
    turnoX = true;
    procesandoIA = false;

    const existing = document.getElementById('endOverlay');
    if (existing) existing.remove();

    dibujarTablero();
    actualizarUI();

    if (modoSelect.value === 'pvia' && startSelect.value === 'ia') {
        ejecutarIA();
    }
}

function dibujarTablero() {
    superBoard.innerHTML = '';
    for (let m = 0; m < 9; m++) {
        const macroDiv = document.createElement('div');
        macroDiv.className = 'macro-board';

        // Estado del mini tablero (Victoria o Empate)
        if (macroBoard[m] !== null) {
            macroDiv.classList.add('won');
            macroDiv.setAttribute('data-winner', macroBoard[m]);
        }

        // Resaltar el tablero donde se debe jugar
        if (activeMacro === m || (activeMacro === -1 && macroBoard[m] === null)) {
            if (macroBoard[m] === null && !procesandoIA) {
                macroDiv.classList.add('active');
            }
        }

        for (let i = 0; i < 9; i++) {
            const microDiv = document.createElement('div');
            microDiv.className = `micro-cell ${microBoards[m][i] || ''}`;
            microDiv.textContent = microBoards[m][i] || '';

            microDiv.addEventListener('click', () => manejarJugada(m, i));
            macroDiv.appendChild(microDiv);
        }
        superBoard.appendChild(macroDiv);
    }
}

function actualizarUI() {
    const esPvIA = modoSelect.value === 'pvia';
    const iaEmpieza = startSelect.value === 'ia';

    player1Label.textContent = (esPvIA && iaEmpieza) ? 'IA (X)' : 'Jugador 1 (X)';
    player2Label.textContent = (esPvIA && !iaEmpieza) ? 'IA (O)' : 'Jugador 2 (O)';

    punt1Elem.textContent = victoriasX;
    punt2Elem.textContent = victoriasO;

    if (turnoX) {
        turnoDisplay.textContent = "Turno de las X";
        turnoDisplay.style.color = "var(--accent)";
    } else {
        turnoDisplay.textContent = "Turno de las O";
        turnoDisplay.style.color = "var(--accent-o)";
    }
}

function chequearGanador(board) {
    for (let line of winLines) {
        if (board[line[0]] && board[line[0]] !== '-' && board[line[0]] === board[line[1]] && board[line[0]] === board[line[2]]) {
            return board[line[0]];
        }
    }
    return null;
}

function chequearEmpate(board) {
    return board.every(cell => cell !== null);
}

async function manejarJugada(m, i) {
    if (procesandoIA) return;
    if (macroBoard[m] !== null) return; // Tablero ya ganado/empatado
    if (activeMacro !== -1 && activeMacro !== m) return; // Movimiento ilegal
    if (microBoards[m][i] !== null) return; // Casilla ocupada

    aplicarMovimiento(microBoards, macroBoard, m, i, turnoX ? 'X' : 'O');

    dibujarTablero();

    let ganadorGlobal = chequearGanador(macroBoard);
    if (ganadorGlobal) {
        terminarPartida(ganadorGlobal);
        return;
    } else if (chequearEmpate(macroBoard)) {
        terminarPartida('-');
        return;
    }

    turnoX = !turnoX;
    actualizarUI();

    const esPvIA = modoSelect.value === 'pvia';
    const tocaIA = esPvIA && ((startSelect.value === 'ia' && turnoX) || (startSelect.value === 'humano' && !turnoX));

    if (tocaIA) {
        ejecutarIA();
    } else {
        dibujarTablero(); // Refresca los bordes activos
    }
}

function aplicarMovimiento(micro, macro, m, i, jugador) {
    micro[m][i] = jugador;

    let ganadorMicro = chequearGanador(micro[m]);
    if (ganadorMicro) {
        macro[m] = ganadorMicro;
    } else if (chequearEmpate(micro[m])) {
        macro[m] = '-'; // Empate, casilla bloqueada
    }

    // El siguiente tablero activo es la casilla donde se jugo
    activeMacro = macro[i] === null ? i : -1;
}

// ==========================================
// IA Y MINIMAX CON PODA ALFA-BETA
// ==========================================

async function ejecutarIA() {
    procesandoIA = true;
    dibujarTablero(); // Quitar resaltados mientras piensa
    await sleep(50); // Dar respiro a la UI

    // Clonacion profunda del estado para no afectar la UI
    const macroClon = JSON.parse(JSON.stringify(macroBoard));
    const microClon = JSON.parse(JSON.stringify(microBoards));
    const jugadorIA = turnoX ? 'X' : 'O';

    // Profundidad dinamica para mantener el navegador fluido
    const profundidad = activeMacro === -1 ? 5 : 6;

    let mejorMov = null;
    let mejorValor = turnoX ? -Infinity : Infinity;

    const movimientos = obtenerMovimientosPosibles(macroClon, microClon, activeMacro);

    for (let mov of movimientos) {
        const tMacro = JSON.parse(JSON.stringify(macroClon));
        const tMicro = JSON.parse(JSON.stringify(microClon));

        tMicro[mov.m][mov.i] = jugadorIA;
        let gMicro = chequearGanador(tMicro[mov.m]);
        if (gMicro) tMacro[mov.m] = gMicro;
        else if (chequearEmpate(tMicro[mov.m])) tMacro[mov.m] = '-';

        let proxActivo = tMacro[mov.i] === null ? mov.i : -1;

        let valor = minimax(tMacro, tMicro, proxActivo, profundidad - 1, -Infinity, Infinity, !turnoX);

        if (turnoX) { // Maximizar
            if (valor > mejorValor) { mejorValor = valor; mejorMov = mov; }
        } else { // Minimizar
            if (valor < mejorValor) { mejorValor = valor; mejorMov = mov; }
        }
    }

    procesandoIA = false;
    if (mejorMov) manejarJugada(mejorMov.m, mejorMov.i);
}

function minimax(macro, micro, active, depth, alpha, beta, isMaximizing) {
    let ganador = chequearGanador(macro);
    if (ganador === 'X') return 10000 + depth;
    if (ganador === 'O') return -10000 - depth;
    if (chequearEmpate(macro)) return 0;
    if (depth === 0) return evaluarTablero(macro, micro);

    const movs = obtenerMovimientosPosibles(macro, micro, active);
    if (movs.length === 0) return 0;

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let mov of movs) {
            const { nMacro, nMicro, nActive } = simular(macro, micro, mov, 'X');
            let ev = minimax(nMacro, nMicro, nActive, depth - 1, alpha, beta, false);
            maxEval = Math.max(maxEval, ev);
            alpha = Math.max(alpha, ev);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let mov of movs) {
            const { nMacro, nMicro, nActive } = simular(macro, micro, mov, 'O');
            let ev = minimax(nMacro, nMicro, nActive, depth - 1, alpha, beta, true);
            minEval = Math.min(minEval, ev);
            beta = Math.min(beta, ev);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

function simular(macro, micro, mov, jugador) {
    const nMacro = [...macro];
    const nMicro = micro.map(arr => [...arr]);

    nMicro[mov.m][mov.i] = jugador;
    let gMicro = chequearGanador(nMicro[mov.m]);
    if (gMicro) nMacro[mov.m] = gMicro;
    else if (chequearEmpate(nMicro[mov.m])) nMacro[mov.m] = '-';

    const nActive = nMacro[mov.i] === null ? mov.i : -1;
    return { nMacro, nMicro, nActive };
}

function obtenerMovimientosPosibles(macro, micro, active) {
    let movs = [];
    if (active !== -1) {
        for (let i = 0; i < 9; i++) {
            if (micro[active][i] === null) movs.push({ m: active, i: i });
        }
    } else {
        for (let m = 0; m < 9; m++) {
            if (macro[m] === null) {
                for (let i = 0; i < 9; i++) {
                    if (micro[m][i] === null) movs.push({ m: m, i: i });
                }
            }
        }
    }
    return movs;
}

function evaluarTablero(macro, micro) {
    let score = evaluarLineas(macro) * 100;
    for (let m = 0; m < 9; m++) {
        if (macro[m] === null) {
            score += evaluarLineas(micro[m]);
            if (micro[m][4] === 'X') score += 5; // Control del centro
            if (micro[m][4] === 'O') score -= 5;
        }
    }
    return score;
}

function evaluarLineas(board) {
    let score = 0;
    for (let line of winLines) {
        let x = 0, o = 0;
        for (let i of line) {
            if (board[i] === 'X') x++;
            else if (board[i] === 'O') o++;
        }
        if (x > 0 && o === 0) score += Math.pow(10, x);
        if (o > 0 && x === 0) score -= Math.pow(10, o);
    }
    return score;
}

function terminarPartida(ganador) {
    if (ganador === 'X') victoriasX++;
    else if (ganador === 'O') victoriasO++;
    actualizarUI();

    const overlay = document.createElement('div');
    overlay.id = 'endOverlay';
    const panel = document.createElement('div');
    panel.className = 'endPanel';

    const titulo = document.createElement('h2');
    titulo.textContent = ganador === '-' ? 'Empate Total!' : `Gano ${ganador}!`;

    const btn = document.createElement('button');
    btn.textContent = 'Jugar de nuevo';
    btn.onclick = inicializarTablero;

    panel.appendChild(titulo);
    panel.appendChild(btn);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
}

// Eventos
resetBtn.addEventListener('click', inicializarTablero);
modoSelect.addEventListener('change', () => {
    startSelect.style.display = modoSelect.value === 'pvp' ? 'none' : 'inline-block';
    inicializarTablero();
});
startSelect.addEventListener('change', inicializarTablero);

// Iniciar
startSelect.style.display = modoSelect.value === 'pvp' ? 'none' : 'inline-block';
inicializarTablero();
