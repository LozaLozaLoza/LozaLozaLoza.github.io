// DOM
const superBoard = document.getElementById('superBoard');
const modoSelect = document.getElementById('modoSelect');
const startSelect = document.getElementById('startSelect');
const botLevelSelect = document.getElementById('botLevelSelect');
const resetBtn = document.getElementById('resetBtn');
const undoBtn = document.getElementById('undoBtn');
const player1Label = document.getElementById('player1Label');
const player2Label = document.getElementById('player2Label');
const turnoDisplay = document.getElementById('turnoDisplay');
const punt1Elem = document.getElementById('puntuacion1');
const punt2Elem = document.getElementById('puntuacion2');
const puntTablasElem = document.getElementById('puntuacionTablas');

// Estado
let microBoards = Array(9).fill(null).map(() => Array(9).fill(null));
let macroBoard = Array(9).fill(null);
let activeMacro = -1;
let turnoX = true;
let victoriasX = 0;
let victoriasO = 0;
let tablas = 0;
let procesandoIA = false;
let historial = [];
let idPartida = 0;

const winLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

function inicializarTablero() {
    idPartida++;
    microBoards = Array(9).fill(null).map(() => Array(9).fill(null));
    macroBoard = Array(9).fill(null);
    activeMacro = -1;
    turnoX = true;
    procesandoIA = false;

    historial = [];
    undoBtn.disabled = true;

    const existing = document.getElementById('endOverlay');
    if (existing) existing.remove();

    dibujarTablero();
    actualizarUI();

    const modo = modoSelect.value;
    if (modo === 'pvia' && startSelect.value === 'ia') {
        ejecutarIA();
    }
}

function guardarEstado() {
    historial.push({
        micro: JSON.parse(JSON.stringify(microBoards)),
        macro: JSON.parse(JSON.stringify(macroBoard)),
        active: activeMacro,
        turno: turnoX,
        vX: victoriasX,
        vO: victoriasO,
        t: tablas
    });
    undoBtn.disabled = false;
}

function deshacerJugada() {
    if (procesandoIA) return;
    if (historial.length === 0) return;

    const esPvIA = modoSelect.value === 'pvia';
    const pasosADeshacer = (esPvIA && historial.length >= 2) ? 2 : 1;

    let estadoAnterior;
    for (let j = 0; j < pasosADeshacer; j++) {
        estadoAnterior = historial.pop();
    }

    if (estadoAnterior) {
        microBoards = estadoAnterior.micro;
        macroBoard = estadoAnterior.macro;
        activeMacro = estadoAnterior.active;
        turnoX = estadoAnterior.turno;
        victoriasX = estadoAnterior.vX;
        victoriasO = estadoAnterior.vO;
        tablas = estadoAnterior.t;

        const existing = document.getElementById('endOverlay');
        if (existing) existing.remove();

        if (historial.length === 0) undoBtn.disabled = true;

        dibujarTablero();
        actualizarUI();
    }
}

function dibujarTablero() {
    superBoard.innerHTML = '';
    for (let m = 0; m < 9; m++) {
        const macroDiv = document.createElement('div');
        macroDiv.className = 'macro-board';

        if (macroBoard[m] !== null) {
            macroDiv.classList.add('won');
            macroDiv.setAttribute('data-winner', macroBoard[m]);
        }

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
    const modo = modoSelect.value;
    const iaEmpieza = startSelect.value === 'ia';

    if (modo === 'pvp') {
        player1Label.textContent = 'Jugador 1 (X)';
        player2Label.textContent = 'Jugador 2 (O)';
    } else if (modo === 'pvia') {
        player1Label.textContent = iaEmpieza ? 'IA (X)' : 'Jugador 1 (X)';
        player2Label.textContent = iaEmpieza ? 'Jugador 2 (O)' : 'IA (O)';
    }

    punt1Elem.textContent = victoriasX;
    punt2Elem.textContent = victoriasO;
    puntTablasElem.textContent = tablas;

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

function manejarJugada(m, i) {
    if (procesandoIA) return;
    if (macroBoard[m] !== null) return;
    if (activeMacro !== -1 && activeMacro !== m) return;
    if (microBoards[m][i] !== null) return;

    guardarEstado();

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

    const modo = modoSelect.value;
    const tocaIA = (modo === 'pvia' && ((startSelect.value === 'ia' && turnoX) || (startSelect.value === 'humano' && !turnoX)));

    if (tocaIA) {
        ejecutarIA();
    } else {
        dibujarTablero();
    }
}

function aplicarMovimiento(micro, macro, m, i, jugador) {
    micro[m][i] = jugador;

    let ganadorMicro = chequearGanador(micro[m]);
    if (ganadorMicro) {
        macro[m] = ganadorMicro;
    } else if (chequearEmpate(micro[m])) {
        macro[m] = '-';
    }

    activeMacro = macro[i] === null ? i : -1;
}

// ==========================================
// IA: MINIMAX ITERATIVO CON ORDENACIÓN Y HEURÍSTICA POSICIONAL
// ==========================================

async function ejecutarIA() {
    const miPartida = idPartida;
    procesandoIA = true;
    dibujarTablero();
    await sleep(50);

    if (miPartida !== idPartida) return;

    const macroClon = JSON.parse(JSON.stringify(macroBoard));
    const microClon = JSON.parse(JSON.stringify(microBoards));
    const jugadorIA = turnoX ? 'X' : 'O';

    let TIEMPO_MAXIMO_MS = 800;
    let limiteProfundidad = 100;

    const nivel = botLevelSelect.value;

    if (nivel === 'facil') {
        TIEMPO_MAXIMO_MS = 100;
        limiteProfundidad = 2;
    } else if (nivel === 'medio') {
        TIEMPO_MAXIMO_MS = 400;
        limiteProfundidad = 4;
    } else if (nivel === 'dificil') {
        TIEMPO_MAXIMO_MS = 1500;
        limiteProfundidad = 20;
    }

    const tiempoInicio = Date.now();
    let mejorMovGlobal = null;
    let profundidad = 1;

    let rootMoves = obtenerMovimientosPosibles(macroClon, microClon, activeMacro);
    if (rootMoves.length === 0) {
        procesandoIA = false;
        return;
    }

    // Inicializamos el score basándonos en el peso estático para la Profundidad 1
    const pesoCasilla = [2, 1, 2, 1, 3, 1, 2, 1, 2];
    rootMoves.forEach(m => m.score = pesoCasilla[m.i]);

    while (profundidad <= limiteProfundidad) {
        let mejorMovNivel = null;
        let mejorValor = turnoX ? -Infinity : Infinity;
        let tiempoAgotado = false;

        // Ordenación iterativa basada en el cálculo del ciclo anterior
        if (turnoX) {
            rootMoves.sort((a, b) => b.score - a.score);
        } else {
            rootMoves.sort((a, b) => a.score - b.score);
        }

        for (let mov of rootMoves) {
            if (Date.now() - tiempoInicio > TIEMPO_MAXIMO_MS) {
                tiempoAgotado = true;
                break;
            }

            const tMacro = JSON.parse(JSON.stringify(macroClon));
            const tMicro = JSON.parse(JSON.stringify(microClon));

            tMicro[mov.m][mov.i] = jugadorIA;
            let gMicro = chequearGanador(tMicro[mov.m]);
            if (gMicro) tMacro[mov.m] = gMicro;
            else if (chequearEmpate(tMicro[mov.m])) tMacro[mov.m] = '-';

            let proxActivo = tMacro[mov.i] === null ? mov.i : -1;

            let valor = minimax(
                tMacro, tMicro, proxActivo,
                profundidad - 1, -Infinity, Infinity, !turnoX,
                tiempoInicio, TIEMPO_MAXIMO_MS
            );

            if (valor === null) {
                tiempoAgotado = true;
                break;
            }

            // Actualizamos la memoria del movimiento con el cálculo real
            mov.score = valor;

            if (turnoX) {
                if (valor > mejorValor) { mejorValor = valor; mejorMovNivel = mov; }
            } else {
                if (valor < mejorValor) { mejorValor = valor; mejorMovNivel = mov; }
            }
        }

        if (tiempoAgotado) {
            break;
        } else {
            mejorMovGlobal = mejorMovNivel;
            if (Math.abs(mejorValor) > 9000) break;
        }

        profundidad++;
    }

    procesandoIA = false;
    if (miPartida !== idPartida) return;

    if (!mejorMovGlobal && rootMoves.length > 0) {
        mejorMovGlobal = rootMoves[0];
    }

    manejarJugada(mejorMovGlobal.m, mejorMovGlobal.i);
}

function minimax(macro, micro, active, depth, alpha, beta, isMaximizing, tiempoInicio, tiempoMaximo) {
    if (Date.now() - tiempoInicio > tiempoMaximo) return null;

    let ganador = chequearGanador(macro);
    if (ganador === 'X') return 10000 + depth;
    if (ganador === 'O') return -10000 - depth;
    if (chequearEmpate(macro)) return 0;

    if (depth === 0) return evaluarTablero(macro, micro, active, isMaximizing);

    const movs = obtenerMovimientosPosibles(macro, micro, active);
    if (movs.length === 0) return 0;

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let mov of movs) {
            const { nMacro, nMicro, nActive } = simular(macro, micro, mov, 'X');
            let ev = minimax(nMacro, nMicro, nActive, depth - 1, alpha, beta, false, tiempoInicio, tiempoMaximo);

            if (ev === null) return null;

            maxEval = Math.max(maxEval, ev);
            alpha = Math.max(alpha, ev);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let mov of movs) {
            const { nMacro, nMicro, nActive } = simular(macro, micro, mov, 'O');
            let ev = minimax(nMacro, nMicro, nActive, depth - 1, alpha, beta, true, tiempoInicio, tiempoMaximo);

            if (ev === null) return null;

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

    const pesoCasilla = [2, 1, 2, 1, 3, 1, 2, 1, 2];
    movs.sort((a, b) => pesoCasilla[b.i] - pesoCasilla[a.i]);

    return movs;
}

function evaluarTablero(macro, micro, active, isMaximizing) {
    let score = evaluarLineas(macro) * 100;
    for (let m = 0; m < 9; m++) {
        if (macro[m] === null) {
            score += evaluarLineas(micro[m]);
            if (micro[m][4] === 'X') score += 5;
            if (micro[m][4] === 'O') score -= 5;
        }
    }

    if (active === -1) {
        if (isMaximizing) {
            score += 50;
        } else {
            score -= 50;
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
    else if (ganador === '-') tablas++;

    actualizarUI();

    const overlay = document.createElement('div');
    overlay.id = 'endOverlay';
    const panel = document.createElement('div');
    panel.className = 'endPanel';

    const titulo = document.createElement('h2');
    titulo.textContent = ganador === '-' ? '¡Tablas Totales!' : `¡Ganó ${ganador}!`;

    const btn = document.createElement('button');
    btn.textContent = 'Jugar de nuevo';
    btn.onclick = inicializarTablero;

    panel.appendChild(titulo);
    panel.appendChild(btn);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
}

// ------------------------------------------
// EVENTOS Y ARRANQUE
// ------------------------------------------
function actualizarControles() {
    const modo = modoSelect.value;
    if (modo === 'pvp') {
        startSelect.style.display = 'none';
        botLevelSelect.style.display = 'none';
    } else if (modo === 'pvia') {
        startSelect.style.display = 'inline-block';
        botLevelSelect.style.display = 'inline-block';
        botLevelSelect.options[0].text = "IA: Fácil";
        botLevelSelect.options[1].text = "IA: Medio";
        botLevelSelect.options[2].text = "IA: Difícil";
    }
}

resetBtn.addEventListener('click', inicializarTablero);
undoBtn.addEventListener('click', deshacerJugada);

modoSelect.addEventListener('change', () => {
    actualizarControles();
    inicializarTablero();
});
startSelect.addEventListener('change', inicializarTablero);
botLevelSelect.addEventListener('change', inicializarTablero);

// Iniciar
actualizarControles();
inicializarTablero();