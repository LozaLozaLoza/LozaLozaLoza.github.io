// DOM
const board = document.getElementById('sequenceBoard');
const modoSelect = document.getElementById('modoSelect');
const startSelect = document.getElementById('startSelect');
const resetBtn = document.getElementById('resetBtn');
const punt1Elem = document.getElementById('puntuacion1');
const punt2Elem = document.getElementById('puntuacion2');
const turnoElem = document.getElementById('turnoDisplay');
const player1Label = document.getElementById('player1Label');
const player2Label = document.getElementById('player2Label');
const btnX = document.getElementById('btnX');
const btnO = document.getElementById('btnO');

// Estado
let secuencia = "";
let turnoJugador1 = true;
let puntuacionJugador1 = 0;
let puntuacionJugador2 = 0;

// Utilidades
const sleep = ms => new Promise(res => setTimeout(res, ms));

function actualizarUI() {
    board.innerHTML = '';
    for (let char of secuencia) {
        const div = document.createElement('div');
        div.className = `tile ${char}`;
        div.textContent = char;
        board.appendChild(div);
    }
    board.scrollLeft = board.scrollWidth;

    punt1Elem.textContent = `${puntuacionJugador1} Victorias`;
    punt2Elem.textContent = `${puntuacionJugador2} Victorias`;

    const esPvIA = modoSelect.value === 'pvia';
    const iaEmpieza = startSelect.value === 'ia';

    if (esPvIA) {
        if (iaEmpieza) {
            player1Label.textContent = 'IA (5 letras x2)';
            player2Label.textContent = 'Humano (3 letras x3)';
        } else {
            player1Label.textContent = 'Humano (5 letras x2)';
            player2Label.textContent = 'IA (3 letras x3)';
        }
    } else {
        player1Label.textContent = 'Jugador 1 (5 letras x2)';
        player2Label.textContent = 'Jugador 2 (3 letras x3)';
    }

    if (turnoJugador1) {
        turnoElem.textContent = (esPvIA && iaEmpieza) ? 'IA' : 'Jugador 1';
    } else {
        turnoElem.textContent = (esPvIA && !iaEmpieza) ? 'IA' : 'Jugador 2';
    }
}

function inicializarTablero() {
    secuencia = "";
    turnoJugador1 = true;
    const existing = document.getElementById('endOverlay');
    if (existing) existing.remove();
    actualizarUI();

    const esPvIA = modoSelect.value === 'pvia';
    const iaEmpieza = startSelect.value === 'ia';

    if (esPvIA && iaEmpieza) {
        deshabilitarBotones(true);
        jugadaIA();
    } else {
        deshabilitarBotones(false);
    }
}

// Lógica de Juego y Evaluaciones (ACTUALIZADA)
function evaluarVictoria(seq) {
    // Regla P2: 3 letras, 3 veces
    for (let i = 0; i <= seq.length - 3; i++) {
        let sub = seq.substring(i, i + 3);
        let apariciones = 0;
        for (let j = 0; j <= seq.length - 3; j++) {
            if (seq.substring(j, j + 3) === sub) apariciones++;
        }
        // Ahora devolvemos también el patrón
        if (apariciones >= 3) return { ganador: 'P2', patron: sub };
    }

    // Regla P1: 5 letras, 2 veces
    for (let i = 0; i <= seq.length - 5; i++) {
        let sub = seq.substring(i, i + 5);
        let apariciones = 0;
        for (let j = 0; j <= seq.length - 5; j++) {
            if (seq.substring(j, j + 5) === sub) apariciones++;
        }
        // Ahora devolvemos también el patrón
        if (apariciones >= 2) return { ganador: 'P1', patron: sub };
    }
    return null;
}

// Minimax Algoritmo Perfecto con Memoization (ACTUALIZADO)
const memo = new Map();

function resolverJuego(seq, esTurnoP1) {
    if (memo.has(seq)) return memo.get(seq);

    let resultado = evaluarVictoria(seq);

    // Verificamos el ganador extrayéndolo del objeto resultado
    if (resultado) {
        if (resultado.ganador === 'P1') return 100 - seq.length;
        if (resultado.ganador === 'P2') return -100 + seq.length;
    }

    if (esTurnoP1) {
        let maxEval = -Infinity;
        for (let letra of ['X', 'O']) {
            let ev = resolverJuego(seq + letra, false);
            if (ev > maxEval) maxEval = ev;
        }
        memo.set(seq, maxEval);
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let letra of ['X', 'O']) {
            let ev = resolverJuego(seq + letra, true);
            if (ev < minEval) minEval = ev;
        }
        memo.set(seq, minEval);
        return minEval;
    }
}

async function jugadaIA() {
    let mejorMov = 'X';
    const iaEsP1 = startSelect.value === 'ia';

    if (iaEsP1) {
        let maxEval = -Infinity;
        for (let letra of ['X', 'O']) {
            let ev = resolverJuego(secuencia + letra, false);
            if (ev > maxEval) { maxEval = ev; mejorMov = letra; }
        }
    } else {
        let minEval = Infinity;
        for (let letra of ['X', 'O']) {
            let ev = resolverJuego(secuencia + letra, true);
            if (ev < minEval) { minEval = ev; mejorMov = letra; }
        }
    }

    await sleep(350);
    manejarJugada(mejorMov);
}

function deshabilitarBotones(estado) {
    btnX.disabled = estado;
    btnO.disabled = estado;
}

// Manejar Jugada (ACTUALIZADA)
function manejarJugada(letra) {
    if (document.getElementById('endOverlay')) return;

    secuencia += letra;
    let resultado = evaluarVictoria(secuencia);

    if (resultado) {
        if (resultado.ganador === 'P1') puntuacionJugador1++;
        else puntuacionJugador2++;
        actualizarUI();
        // Pasamos ambos datos a la pantalla final
        mostrarPantallaFinal(resultado.ganador, resultado.patron);
        return;
    }

    turnoJugador1 = !turnoJugador1;
    actualizarUI();

    const esPvIA = modoSelect.value === 'pvia';
    const iaEmpieza = startSelect.value === 'ia';
    const tocaIA = esPvIA && ((iaEmpieza && turnoJugador1) || (!iaEmpieza && !turnoJugador1));

    if (tocaIA) {
        deshabilitarBotones(true);
        jugadaIA();
    } else {
        deshabilitarBotones(false);
    }
}

// Pantalla Final (ACTUALIZADA)
function mostrarPantallaFinal(ganador, patron) {
    const overlay = document.createElement('div');
    overlay.id = 'endOverlay';

    const panel = document.createElement('div');
    panel.className = 'endPanel';
    const titulo = document.createElement('h2');
    titulo.textContent = '¡Partida terminada!';

    const texto = document.createElement('p');
    texto.style.margin = '8px 0';
    // Usamos line-height para que se lea mejor el salto de línea
    texto.style.lineHeight = '1.5';

    const esPvIA = modoSelect.value === 'pvia';
    const iaEmpieza = startSelect.value === 'ia';

    if (ganador === 'P1') {
        const p1Nombre = (esPvIA && iaEmpieza) ? "La IA" : "El Jugador 1";
        // Añadimos el patrón al texto usando innerHTML para ponerlo en negrita
        texto.innerHTML = `¡${p1Nombre} gana forzando una repetición!<br>Patrón (5 letras): <strong>${patron}</strong>`;
    } else {
        const p2Nombre = (esPvIA && !iaEmpieza) ? "La IA" : "El Jugador 2";
        texto.innerHTML = `¡${p2Nombre} gana encontrando el patrón!<br>Patrón (3 letras): <strong>${patron}</strong>`;
    }

    const btnCont = document.createElement('div');
    btnCont.style.display = 'flex';
    btnCont.style.gap = '10px';
    btnCont.style.justifyContent = 'center';
    btnCont.style.marginTop = '16px';

    const btnReiniciar = document.createElement('button');
    btnReiniciar.textContent = 'Jugar otra vez';
    btnReiniciar.onclick = () => inicializarTablero();

    btnCont.appendChild(btnReiniciar);
    panel.appendChild(titulo);
    panel.appendChild(texto);
    panel.appendChild(btnCont);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    deshabilitarBotones(true);
}

// Eventos
btnX.addEventListener('click', () => manejarJugada('X'));
btnO.addEventListener('click', () => manejarJugada('O'));
resetBtn.addEventListener('click', inicializarTablero);
startSelect.addEventListener('change', inicializarTablero);

modoSelect.addEventListener('change', () => {
    startSelect.style.display = modoSelect.value === 'pvp' ? 'none' : 'inline-block';
    inicializarTablero();
});

// Iniciar
startSelect.style.display = modoSelect.value === 'pvp' ? 'none' : 'inline-block';
inicializarTablero();