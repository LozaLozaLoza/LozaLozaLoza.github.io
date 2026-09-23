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

// Estado Global
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
let ultimoMov = null;
let ultimoMacroGanado = -1; // Rastrea el cuadrante que se acaba de ganar para animarlo

// ==========================================
// ZOBRIST HASHING Y TABLA DE TRANSPOSICIÓN (64-bits)
// ==========================================
const ZOBRIST_PIECE = Array(9).fill(null).map(() => Array(9).fill(null).map(() => Array(2).fill(0n)));
const ZOBRIST_ACTIVE = Array(10).fill(0n);
let ZOBRIST_TURN = 0n;

let tablaTransposicion = new Map();
const TT_EXACT = 0;
const TT_ALPHA = 1;
const TT_BETA = 2;

function random64() {
    const high = BigInt(Math.floor(Math.random() * 0x100000000));
    const low = BigInt(Math.floor(Math.random() * 0x100000000));
    return (high << 32n) | low;
}

function inicializarZobrist() {
    for (let m = 0; m < 9; m++) {
        for (let i = 0; i < 9; i++) {
            ZOBRIST_PIECE[m][i][0] = random64();
            ZOBRIST_PIECE[m][i][1] = random64();
        }
    }
    for (let i = 0; i < 10; i++) {
        ZOBRIST_ACTIVE[i] = random64();
    }
    ZOBRIST_TURN = random64();
}
inicializarZobrist();

function calcularHashInicial(micro, active, isTurnoX) {
    let h = 0n;
    for (let m = 0; m < 9; m++) {
        for (let i = 0; i < 9; i++) {
            if (micro[m][i] === 'X') h ^= ZOBRIST_PIECE[m][i][0];
            else if (micro[m][i] === 'O') h ^= ZOBRIST_PIECE[m][i][1];
        }
    }
    let actIdx = (active === -1) ? 9 : active;
    h ^= ZOBRIST_ACTIVE[actIdx];
    if (isTurnoX) h ^= ZOBRIST_TURN;
    return h;
}

// Configuración Heurística Parametrizable
let criterio = {
    vialibre: 43.00597740846656,
    macro_peso: 164.65294272749256,
    bonus_centro: 0.06449919883523338,

    bloqueos: {
        mate: 884.5951524587854,
        defensa: 7.9117707153811185,
        ataque: 23.642928063677992,
        expansion: 1.910896181392594
    },

    micro_amenaza_X: [0.03543845405483699, 0.05649834151787704, 0.2812287939718042],
    micro_amenaza_O: [-0.01144571614355605, -0.03649601435783531, -0.17804519600322255],
    macro_amenaza_X: [0.11465330580128974, 0.42164407763860734, 1.1416949340986058],
    macro_amenaza_O: [-0.039520923106254324, -0.4247141113868449, -0.8014577484893486],

    pesoCasilla: [
        0.6856582270252987, 3.275085073495567, 0.6520802183884976,
        0.15412640949126455, 2.4049405957579166, 4.298366057393062,
        3.1166924920957855, 3.3798887628926195, 1.3091436669045398
    ]
};

const winLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ==========================================
// FLUJO BASE Y DOM
// ==========================================

function inicializarTablero() {
    idPartida++;
    microBoards = Array(9).fill(null).map(() => Array(9).fill(null));
    macroBoard = Array(9).fill(null);
    activeMacro = -1;
    turnoX = true;
    procesandoIA = false;
    ultimoMov = null;
    ultimoMacroGanado = -1; // Resetear la animación

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
        ultimoMov = null;
        ultimoMacroGanado = -1; // No animar nada al deshacer

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

            // Aplicar la animación si este es el cuadrante que se acaba de ganar
            if (ultimoMacroGanado === m) {
                macroDiv.classList.add('animate-capture');
            }
        }

        if (activeMacro === m || (activeMacro === -1 && macroBoard[m] === null)) {
            if (macroBoard[m] === null && !procesandoIA) {
                macroDiv.classList.add('active');
            }
        }

        for (let i = 0; i < 9; i++) {
            const microDiv = document.createElement('div');
            microDiv.className = `micro-cell`;

            const isNewest = (ultimoMov && ultimoMov.m === m && ultimoMov.i === i);
            const animClass = isNewest ? 'animate-draw' : '';

            if (microBoards[m][i] === 'X') {
                microDiv.innerHTML = `
                    <svg viewBox="0 0 100 100" class="piece-x ${animClass}">
                        <path d="M 20 20 L 80 80" class="path-x1" />
                        <path d="M 80 20 L 20 80" class="path-x2" />
                    </svg>`;
            } else if (microBoards[m][i] === 'O') {
                microDiv.innerHTML = `
                    <svg viewBox="0 0 100 100" class="piece-o ${animClass}">
                        <circle cx="50" cy="50" r="35" class="path-o" />
                    </svg>`;
            } else {
                microDiv.innerHTML = '';
            }

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
    ultimoMov = { m, i };
    ultimoMacroGanado = -1; // Resetear antes de comprobar la jugada

    let estadoAnteriorMacro = macroBoard[m]; // Recordar cómo estaba este cuadrante

    aplicarMovimiento(microBoards, macroBoard, m, i, turnoX ? 'X' : 'O');

    // Si antes el macrotablero estaba vacío y ahora tiene ganador, es que lo hemos ganado AHORA
    if (estadoAnteriorMacro === null && macroBoard[m] !== null) {
        ultimoMacroGanado = m;
    }

    let ganadorGlobal = chequearGanador(macroBoard);
    if (ganadorGlobal) {
        dibujarTablero();
        terminarPartida(ganadorGlobal);
        return;
    } else if (chequearEmpate(macroBoard)) {
        dibujarTablero();
        terminarPartida('-');
        return;
    }

    turnoX = !turnoX;
    actualizarUI();
    dibujarTablero();

    const modo = modoSelect.value;
    const tocaIA = (modo === 'pvia' && ((startSelect.value === 'ia' && turnoX) || (startSelect.value === 'humano' && !turnoX)));

    if (tocaIA) {
        ejecutarIA();
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

// ==========================================
// IA: MOTOR ITERATIVO Y MÉTODOS DE BÚSQUEDA
// ==========================================

async function ejecutarIA() {
    const miPartida = idPartida;
    procesandoIA = true;

    await sleep(1000);

    if (miPartida !== idPartida) return;

    if (tablaTransposicion.size > 500000) tablaTransposicion.clear();

    const macroClon = JSON.parse(JSON.stringify(macroBoard));
    const microClon = JSON.parse(JSON.stringify(microBoards));
    const jugadorIA = turnoX ? 'X' : 'O';

    let TIEMPO_MAXIMO_MS = 800;
    let limiteProfundidad = 100;

    const nivel = botLevelSelect.value;
    if (nivel === 'facil') { TIEMPO_MAXIMO_MS = 100; limiteProfundidad = 2; }
    else if (nivel === 'medio') { TIEMPO_MAXIMO_MS = 400; limiteProfundidad = 4; }
    else if (nivel === 'dificil') { TIEMPO_MAXIMO_MS = 1500; limiteProfundidad = 20; }

    const tiempoInicio = Date.now();
    let mejorMovGlobal = null;
    let profundidad = 1;

    let rootMoves = obtenerMovimientosPosibles(macroClon, microClon, activeMacro);
    if (rootMoves.length === 0) { procesandoIA = false; return; }

    rootMoves.forEach(m => m.score = criterio.pesoCasilla[m.i]);

    let initialHash = calcularHashInicial(microClon, activeMacro, turnoX);
    let activeIdxOld = (activeMacro === -1) ? 9 : activeMacro;

    while (profundidad <= limiteProfundidad) {
        let mejorMovNivel = null;
        let mejorValor = turnoX ? -Infinity : Infinity;
        let tiempoAgotado = false;

        if (turnoX) rootMoves.sort((a, b) => b.score - a.score);
        else rootMoves.sort((a, b) => a.score - b.score);

        for (let mov of rootMoves) {
            if (Date.now() - tiempoInicio > TIEMPO_MAXIMO_MS) { tiempoAgotado = true; break; }

            const tMacro = JSON.parse(JSON.stringify(macroClon));
            const tMicro = JSON.parse(JSON.stringify(microClon));

            tMicro[mov.m][mov.i] = jugadorIA;
            let gMicro = chequearGanador(tMicro[mov.m]);
            if (gMicro) tMacro[mov.m] = gMicro;
            else if (chequearEmpate(tMicro[mov.m])) tMacro[mov.m] = '-';

            let proxActivo = tMacro[mov.i] === null ? mov.i : -1;

            let nextHash = initialHash;
            nextHash ^= turnoX ? ZOBRIST_PIECE[mov.m][mov.i][0] : ZOBRIST_PIECE[mov.m][mov.i][1];
            nextHash ^= ZOBRIST_ACTIVE[activeIdxOld];
            let activeIdxNew = (proxActivo === -1) ? 9 : proxActivo;
            nextHash ^= ZOBRIST_ACTIVE[activeIdxNew];
            nextHash ^= ZOBRIST_TURN;

            let valor = minimax(
                tMacro, tMicro, proxActivo,
                profundidad - 1, -Infinity, Infinity, !turnoX,
                tiempoInicio, TIEMPO_MAXIMO_MS, nextHash
            );

            if (valor === null) { tiempoAgotado = true; break; }

            mov.score = valor;

            if (turnoX) { if (valor > mejorValor) { mejorValor = valor; mejorMovNivel = mov; } }
            else { if (valor < mejorValor) { mejorValor = valor; mejorMovNivel = mov; } }
        }

        if (tiempoAgotado) break;
        else {
            mejorMovGlobal = mejorMovNivel;
            if (Math.abs(mejorValor) > 9000) break;
        }
        profundidad++;
    }

    procesandoIA = false;
    if (miPartida !== idPartida) return;
    if (!mejorMovGlobal && rootMoves.length > 0) mejorMovGlobal = rootMoves[0];

    manejarJugada(mejorMovGlobal.m, mejorMovGlobal.i);
}

function minimax(macro, micro, active, depth, alpha, beta, isMaximizing, tiempoInicio, tiempoMaximo, currentHash) {
    if (Date.now() - tiempoInicio > tiempoMaximo) return null;

    let originalAlpha = alpha;
    let ttMove = null;

    if (tablaTransposicion.has(currentHash)) {
        let ttEntry = tablaTransposicion.get(currentHash);
        ttMove = ttEntry.bestMov;

        if (ttEntry.depth >= depth) {
            if (ttEntry.flag === TT_EXACT) return ttEntry.value;
            if (ttEntry.flag === TT_ALPHA && ttEntry.value <= alpha) return ttEntry.value;
            if (ttEntry.flag === TT_BETA && ttEntry.value >= beta) return ttEntry.value;
        }
    }

    let ganador = chequearGanador(macro);
    if (ganador === 'X') return 10000 + depth;
    if (ganador === 'O') return -10000 - depth;
    if (chequearEmpate(macro)) return 0;

    if (depth === 0) return evaluarTablero(macro, micro, active, isMaximizing);

    const movs = obtenerMovimientosPosibles(macro, micro, active);
    if (movs.length === 0) return 0;

    if (ttMove) {
        const idx = movs.findIndex(m => m.m === ttMove.m && m.i === ttMove.i);
        if (idx > 0) {
            const [m] = movs.splice(idx, 1);
            movs.unshift(m);
        }
    }

    let bestVal = isMaximizing ? -Infinity : Infinity;
    let bestLocalMov = null;
    let activeIdxOld = (active === -1) ? 9 : active;

    if (isMaximizing) {
        for (let mov of movs) {
            const { nMacro, nMicro, nActive } = simular(macro, micro, mov, 'X');

            let nextHash = currentHash;
            nextHash ^= ZOBRIST_PIECE[mov.m][mov.i][0];
            nextHash ^= ZOBRIST_ACTIVE[activeIdxOld];
            nextHash ^= ZOBRIST_ACTIVE[(nActive === -1) ? 9 : nActive];
            nextHash ^= ZOBRIST_TURN;

            let ev = minimax(nMacro, nMicro, nActive, depth - 1, alpha, beta, false, tiempoInicio, tiempoMaximo, nextHash);
            if (ev === null) return null;

            if (ev > bestVal) {
                bestVal = ev;
                bestLocalMov = mov;
            }
            alpha = Math.max(alpha, ev);
            if (beta <= alpha) break;
        }
    } else {
        for (let mov of movs) {
            const { nMacro, nMicro, nActive } = simular(macro, micro, mov, 'O');

            let nextHash = currentHash;
            nextHash ^= ZOBRIST_PIECE[mov.m][mov.i][1];
            nextHash ^= ZOBRIST_ACTIVE[activeIdxOld];
            nextHash ^= ZOBRIST_ACTIVE[(nActive === -1) ? 9 : nActive];
            nextHash ^= ZOBRIST_TURN;

            let ev = minimax(nMacro, nMicro, nActive, depth - 1, alpha, beta, true, tiempoInicio, tiempoMaximo, nextHash);
            if (ev === null) return null;

            if (ev < bestVal) {
                bestVal = ev;
                bestLocalMov = mov;
            }
            beta = Math.min(beta, ev);
            if (beta <= alpha) break;
        }
    }

    let flag = TT_EXACT;
    if (bestVal <= originalAlpha) flag = TT_ALPHA;
    else if (bestVal >= beta) flag = TT_BETA;

    tablaTransposicion.set(currentHash, { value: bestVal, depth: depth, flag: flag, bestMov: bestLocalMov });

    return bestVal;
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

    movs.sort((a, b) => criterio.pesoCasilla[b.i] - criterio.pesoCasilla[a.i]);
    return movs;
}

// ==========================================
// SISTEMA DE HEURÍSTICA PROBABILÍSTICA Y CONTEXTUAL
// ==========================================

function evaluarProbabilidadYBloqueos(board, pesoAmenazasX, pesoAmenazasO) {
    let ganador = chequearGanador(board);
    if (ganador === 'X') return { probTotal: 1.0, amenazaX: false, amenazaO: false };
    if (ganador === 'O') return { probTotal: -1.0, amenazaX: false, amenazaO: false };
    if (chequearEmpate(board)) return { probTotal: 0.0, amenazaX: false, amenazaO: false };

    let probX = 0;
    let probO = 0;
    let amenazaX = false;
    let amenazaO = false;

    for (let line of winLines) {
        let x = 0, o = 0;
        for (let i of line) {
            if (board[i] === 'X') x++;
            else if (board[i] === 'O') o++;
        }

        if (x > 0 && o === 0) {
            probX += pesoAmenazasX[x];
            if (x === 2) amenazaX = true;
        }
        if (o > 0 && x === 0) {
            probO += pesoAmenazasO[o];
            if (o === 2) amenazaO = true;
        }
    }

    let probTotal = probX + probO;
    if (probTotal > 0.95) probTotal = 0.95;
    if (probTotal < -0.95) probTotal = -0.95;

    return { probTotal, amenazaX, amenazaO };
}

function evaluarTablero(macro, micro, active, isMaximizing) {
    let score = 0;
    let macroContinuo = [...macro];

    let valorEstrategicoX = Array(9).fill(0);
    let valorEstrategicoO = Array(9).fill(0);

    for (let line of winLines) {
        let x = 0, o = 0;
        for (let i of line) {
            if (macro[i] === 'X') x++;
            else if (macro[i] === 'O') o++;
        }

        for (let i of line) {
            if (macro[i] === null) {
                if (x === 2 && o === 0) valorEstrategicoX[i] += criterio.bloqueos.mate;
                else if (x === 1 && o === 0) valorEstrategicoX[i] += criterio.bloqueos.ataque;
                else if (x === 0 && o === 0) valorEstrategicoX[i] += criterio.bloqueos.expansion;
                else if (o > 0 && x === 0) valorEstrategicoX[i] += criterio.bloqueos.defensa;

                if (o === 2 && x === 0) valorEstrategicoO[i] += criterio.bloqueos.mate;
                else if (o === 1 && x === 0) valorEstrategicoO[i] += criterio.bloqueos.ataque;
                else if (o === 0 && x === 0) valorEstrategicoO[i] += criterio.bloqueos.expansion;
                else if (x > 0 && o === 0) valorEstrategicoO[i] += criterio.bloqueos.defensa;
            }
        }
    }

    let asfixia = 0;

    for (let m = 0; m < 9; m++) {
        if (macro[m] === null) {
            let { probTotal, amenazaX, amenazaO } = evaluarProbabilidadYBloqueos(micro[m], criterio.micro_amenaza_X, criterio.micro_amenaza_O);
            score += probTotal;
            macroContinuo[m] = probTotal;

            if (micro[m][4] === 'X') score += criterio.bonus_centro;
            if (micro[m][4] === 'O') score -= criterio.bonus_centro;

            if (amenazaX) asfixia += valorEstrategicoX[m];
            if (amenazaO) asfixia -= valorEstrategicoO[m];

        } else {
            macroContinuo[m] = (macro[m] === 'X') ? 1.0 : (macro[m] === 'O' ? -1.0 : 0.0);
        }
    }

    score += asfixia;

    let macroScore = 0;
    for (let line of winLines) {
        let val0 = macroContinuo[line[0]];
        let val1 = macroContinuo[line[1]];
        let val2 = macroContinuo[line[2]];

        let sumaLinea = val0 + val1 + val2;

        if (sumaLinea > 0.1) {
            if (sumaLinea > 2.0) macroScore += criterio.macro_amenaza_X[2];
            else if (sumaLinea > 1.0) macroScore += criterio.macro_amenaza_X[1];
            else macroScore += criterio.macro_amenaza_X[0];
        } else if (sumaLinea < -0.1) {
            if (sumaLinea < -2.0) macroScore += criterio.macro_amenaza_O[2];
            else if (sumaLinea < -1.0) macroScore += criterio.macro_amenaza_O[1];
            else macroScore += criterio.macro_amenaza_O[0];
        }
    }

    score += (macroScore * criterio.macro_peso);

    if (active === -1) {
        if (isMaximizing) score += criterio.vialibre;
        else score -= criterio.vialibre;
    }

    return score;
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

// Iniciar app
actualizarControles();
inicializarTablero();