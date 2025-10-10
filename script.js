// app.js — Puntos y Cajas (móvil) con PvP / PvIA, touch y pausas visuales
// Variables en castellano y funciones autónomas

// DOM
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const modoSelect = document.getElementById('modoSelect');
const sizeSelect = document.getElementById('sizeSelect');
const resetBtn = document.getElementById('resetBtn');
const punt1Elem = document.getElementById('puntuacion1');
const punt2Elem = document.getElementById('puntuacion2');
const turnoElem = document.getElementById('turnoDisplay');
const player2Label = document.getElementById('player2Label');

// Config inicial
let tamaño = parseInt(sizeSelect.value, 10) || 4;
let espacio = 0;
let radioPunto = 6;

// Tablero
let horizontales, verticales, cajas;

// Turnos y puntuación
let turnoJugador1 = true;
let puntuacionJugador1 = 0;
let puntuacionJugador2 = 0;

// Puntero y UX
let ratonX = null;
let ratonY = null;
let mostrarPuntero = false;

// IA params
const TIEMPO_MAX_MS = 2000;
const PROFUNDIDAD_LIMITE = 30;
let nodosBuscadosUltima = 0;
let tiempoUltimaBusquedaMs = 0;

// Pausa helper
function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

// --- Retina & tamaño canvas ---
function ajustarCanvasParaPantalla() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    espacio = rect.width / (tamaño + 1);
    radioPunto = Math.max(6, Math.floor(espacio * 0.06));
}
window.addEventListener('load', () => { ajustarCanvasParaPantalla(); inicializarTableroConTamaño(tamaño); });
window.addEventListener('resize', () => { ajustarCanvasParaPantalla(); dibujarTablero(); });
window.addEventListener('orientationchange', () => { setTimeout(() => { ajustarCanvasParaPantalla(); dibujarTablero(); }, 120); });

// --- Inicialización tablero ---
function inicializarTableroConTamaño(nuevoTamaño) {
    tamaño = nuevoTamaño;
    ajustarCanvasParaPantalla();

    horizontales = Array(tamaño).fill(null).map(() => Array(tamaño - 1).fill(false));
    verticales = Array(tamaño - 1).fill(null).map(() => Array(tamaño).fill(false));
    cajas = Array(tamaño - 1).fill(null).map(() => Array(tamaño - 1).fill(null));

    turnoJugador1 = true;
    puntuacionJugador1 = 0;
    puntuacionJugador2 = 0;
    nodosBuscadosUltima = 0;
    tiempoUltimaBusquedaMs = 0;

    const existing = document.getElementById('endOverlay');
    if (existing) existing.remove();
    canvas.style.pointerEvents = '';

    actualizarUI();
    dibujarTablero();
}

// --- Dibujo ---
function dibujarTablero() {
    ajustarCanvasParaPantalla();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // cajas
    for (let f = 0; f < tamaño - 1; f++) {
        for (let c = 0; c < tamaño - 1; c++) {
            if (cajas[f][c]) {
                ctx.fillStyle = cajas[f][c] === 'jugador1' ? 'rgba(0,180,80,0.22)' : 'rgba(200,30,30,0.22)';
                const x = (c + 1) * espacio;
                const y = (f + 1) * espacio;
                ctx.fillRect(x , y , espacio, espacio);
            }
        }
    }

    // horizontales
    ctx.strokeStyle = '#0b1220';
    ctx.lineWidth = Math.max(2, Math.round(espacio * 0.04));
    for (let f = 0; f < tamaño; f++) {
        for (let c = 0; c < tamaño - 1; c++) {
            if (horizontales[f][c]) linea(c, f, c + 1, f);
        }
    }

    // verticales
    for (let f = 0; f < tamaño - 1; f++) {
        for (let c = 0; c < tamaño; c++) {
            if (verticales[f][c]) linea(c, f, c, f + 1);
        }
    }

    // puntos
    ctx.fillStyle = '#111827';
    for (let f = 0; f < tamaño; f++) {
        for (let c = 0; c < tamaño; c++) {
            ctx.beginPath();
            ctx.arc((c + 1) * espacio, (f + 1) * espacio, radioPunto, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // puntero fantasma
    if (mostrarPuntero && ratonX !== null && ratonY !== null) {
        const mov = obtenerAristaCercana(ratonX, ratonY);
        if (mov) {
            ctx.strokeStyle = 'rgba(10,132,255,0.35)';
            ctx.lineWidth = Math.max(2, Math.round(espacio * 0.04));
            if (mov.tipo === 'h') linea(mov.col, mov.fil, mov.col + 1, mov.fil);
            else linea(mov.col, mov.fil, mov.col, mov.fil + 1);
        } else {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(10,132,255,0.35)';
            ctx.lineWidth = 2;
            ctx.arc(ratonX, ratonY, Math.max(10, Math.round(espacio * 0.06)), 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    actualizarUI();
}

function linea(c1, f1, c2, f2) {
    ctx.beginPath();
    ctx.moveTo((c1 + 1) * espacio, (f1 + 1) * espacio);
    ctx.lineTo((c2 + 1) * espacio, (f2 + 1) * espacio);
    ctx.stroke();
}

// --- UI actualizaciones ---
function actualizarUI() {
    if (punt1Elem) punt1Elem.textContent = puntuacionJugador1;
    if (punt2Elem) punt2Elem.textContent = puntuacionJugador2;
    if (turnoElem) turnoElem.textContent = turnoJugador1 ? 'Jugador 1' : (modoSelect.value === 'pvp' ? 'Jugador 2' : 'IA');
    if (modoSelect.value === 'pvia') {
        player2Label.textContent = 'IA';
    } else {
        player2Label.textContent = 'Jugador 2';
    }
}

// --- Eventos (mouse/touch) ---
canvas.addEventListener('mousemove', (e) => { const pos = getPointerFromMouse(e); ratonX = pos.x; ratonY = pos.y; dibujarTablero(); });
canvas.addEventListener('mouseleave', () => { mostrarPuntero = false; dibujarTablero(); });
canvas.addEventListener('mouseenter', () => { mostrarPuntero = true; });
canvas.addEventListener('click', (e) => { const pos = getPointerFromMouse(e); manejarClicAt(pos.x, pos.y); });

canvas.addEventListener('touchstart', (ev) => { if (ev.cancelable) ev.preventDefault(); mostrarPuntero = true; const pos = getPointerFromTouch(ev.touches[0]); ratonX = pos.x; ratonY = pos.y; dibujarTablero(); }, { passive: false });
canvas.addEventListener('touchmove', (ev) => { if (ev.cancelable) ev.preventDefault(); const pos = getPointerFromTouch(ev.touches[0]); ratonX = pos.x; ratonY = pos.y; dibujarTablero(); }, { passive: false });
canvas.addEventListener('touchend', (ev) => { if (ev.cancelable) ev.preventDefault(); mostrarPuntero = false; const t = ev.changedTouches && ev.changedTouches[0]; if (t) { const pos = getPointerFromTouch(t); manejarClicAt(pos.x, pos.y); } }, { passive: false });

function getPointerFromMouse(e) { const rect = canvas.getBoundingClientRect(); return { x: e.clientX - rect.left, y: e.clientY - rect.top }; }
function getPointerFromTouch(touch) { const rect = canvas.getBoundingClientRect(); return { x: touch.clientX - rect.left, y: touch.clientY - rect.top }; }

// --- Selector handlers ---
resetBtn.addEventListener('click', () => inicializarTableroConTamaño(tamaño));
sizeSelect.addEventListener('change', () => { const nuevo = parseInt(sizeSelect.value, 10) || 4; if (nuevo !== tamaño) inicializarTableroConTamaño(nuevo); });
modoSelect.addEventListener('change', () => inicializarTableroConTamaño(tamaño));

// --- Lógica del juego: distancia y búsqueda arista ---
function distanciaPuntoSegmento(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1, dy = y2 - y1;
    if (dx === 0 && dy === 0) return Math.hypot(px - x1, py - y1);
    const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
    const tc = Math.max(0, Math.min(1, t));
    const projX = x1 + tc * dx;
    const projY = y1 + tc * dy;
    return Math.hypot(px - projX, py - projY);
}

function obtenerAristaCercana(x, y) {
    ajustarCanvasParaPantalla();
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    const tolerancia = isTouch ? Math.max(espacio * 0.45, 20) : Math.max(espacio * 0.35, 18);
    let mejor = null;
    let mejorDist = Infinity;

    for (let f = 0; f < tamaño; f++) {
        for (let c = 0; c < tamaño - 1; c++) {
            if (horizontales[f][c]) continue;
            const x1 = (c + 1) * espacio, y1 = (f + 1) * espacio, x2 = (c + 2) * espacio, y2 = y1;
            const d = distanciaPuntoSegmento(x, y, x1, y1, x2, y2);
            if (d < mejorDist && d <= tolerancia) { mejorDist = d; mejor = { tipo: 'h', fil: f, col: c }; }
        }
    }

    for (let f = 0; f < tamaño - 1; f++) {
        for (let c = 0; c < tamaño; c++) {
            if (verticales[f][c]) continue;
            const x1 = (c + 1) * espacio, y1 = (f + 1) * espacio, x2 = x1, y2 = (f + 2) * espacio;
            const d = distanciaPuntoSegmento(x, y, x1, y1, x2, y2);
            if (d < mejorDist && d <= tolerancia) { mejorDist = d; mejor = { tipo: 'v', fil: f, col: c }; }
        }
    }

    return mejor;
}

// --- Comprobar cajas completadas ---
function comprobarCajasCompletadas() {
    const completadas = [];
    for (let f = 0; f < tamaño - 1; f++) {
        for (let c = 0; c < tamaño - 1; c++) {
            if (!cajas[f][c] && horizontales[f][c] && horizontales[f + 1][c] && verticales[f][c] && verticales[f][c + 1]) {
                completadas.push({ f, c });
            }
        }
    }
    return completadas;
}

// --- Fin de partida y overlay ---
function esFinPartida() {
    for (let f = 0; f < tamaño - 1; f++) for (let c = 0; c < tamaño - 1; c++) if (!cajas[f][c]) return false;
    return true;
}

function mostrarPantallaFinal() {
    if (document.getElementById('endOverlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'endOverlay';
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.45)';
    overlay.style.zIndex = '9999';

    const panel = document.createElement('div');
    panel.className = 'endPanel';

    const titulo = document.createElement('h2'); titulo.textContent = 'Partida finalizada'; panel.appendChild(titulo);

    const texto = document.createElement('p'); texto.style.margin = '8px 0';
    if (puntuacionJugador1 > puntuacionJugador2) texto.textContent = `¡Jugador 1 gana! ${puntuacionJugador1} — ${puntuacionJugador2}`;
    else if (puntuacionJugador1 < puntuacionJugador2) texto.textContent = modoSelect.value === 'pvia' ? `IA gana ${puntuacionJugador2} — ${puntuacionJugador1}` : `¡Jugador 2 gana! ${puntuacionJugador2} — ${puntuacionJugador1}`;
    else texto.textContent = `Empate ${puntuacionJugador1} — ${puntuacionJugador2}`;
    panel.appendChild(texto);

    const btnCont = document.createElement('div'); btnCont.style.display = 'flex'; btnCont.style.gap = '10px'; btnCont.style.justifyContent = 'center'; btnCont.style.marginTop = '10px';
    const btnReiniciar = document.createElement('button'); btnReiniciar.textContent = 'Reiniciar'; btnReiniciar.onclick = () => { document.body.removeChild(overlay); inicializarTableroConTamaño(tamaño); };
    const btnCerrar = document.createElement('button'); btnCerrar.textContent = 'Cerrar'; btnCerrar.onclick = () => { document.body.removeChild(overlay); canvas.style.pointerEvents = ''; };
    btnCont.appendChild(btnReiniciar); btnCont.appendChild(btnCerrar);
    panel.appendChild(btnCont);

    overlay.appendChild(panel); document.body.appendChild(overlay);
    canvas.style.pointerEvents = 'none';
}

// --- Manejo de clic/touch: aplicar jugada ---
function manejarClicAt(x, y) {
    if (document.getElementById('endOverlay')) return;
    const mov = obtenerAristaCercana(x, y);
    if (!mov) return;

    if (mov.tipo === 'h') {
        if (horizontales[mov.fil][mov.col]) return;
        horizontales[mov.fil][mov.col] = true;
    } else {
        if (verticales[mov.fil][mov.col]) return;
        verticales[mov.fil][mov.col] = true;
    }

    const completadas = comprobarCajasCompletadas();
    if (completadas.length > 0) {
        const propietario = turnoJugador1 ? 'jugador1' : 'jugador2';
        for (const b of completadas) cajas[b.f][b.c] = propietario;
        if (turnoJugador1) puntuacionJugador1 += completadas.length; else puntuacionJugador2 += completadas.length;
        dibujarTablero();
        if (esFinPartida()) { mostrarPantallaFinal(); return; }
        // conserva turno
        return;
    }

    // no completó → alterna turno
    turnoJugador1 = !turnoJugador1;
    dibujarTablero();
    if (esFinPartida()) { mostrarPantallaFinal(); return; }

    // si ahora es turno IA y modo PvIA, lanzarla con pequeña pausa
    if (modoSelect.value === 'pvia' && !turnoJugador1) {
        setTimeout(() => { jugadaIA(); }, 380);
    }
}

// --- IA: clonados, heurística y minimax con tiempo ---
function clonarEstado(e) { return { horizontales: e.horizontales.map(r => r.slice()), verticales: e.verticales.map(r => r.slice()), cajas: e.cajas.map(r => r.slice()), puntuacionJugador1: e.puntuacionJugador1, puntuacionJugador2: e.puntuacionJugador2, turnoJugador1: e.turnoJugador1 }; }
function comprobarCajasEnEstado(e) { const completadas = []; for (let f = 0; f < tamaño - 1; f++) { for (let c = 0; c < tamaño - 1; c++) { if (!e.cajas[f][c] && e.horizontales[f][c] && e.horizontales[f + 1][c] && e.verticales[f][c] && e.verticales[f][c + 1]) completadas.push({ f, c }); } } return completadas; }
function aplicarMovimientoEnEstado(e, mov, byIA) { if (mov.tipo === 'h') e.horizontales[mov.fil][mov.col] = true; else e.verticales[mov.fil][mov.col] = true; const comp = comprobarCajasEnEstado(e); if (comp.length > 0) { const dueño = byIA ? 'jugador2' : 'jugador1'; for (const b of comp) e.cajas[b.f][b.c] = dueño; if (byIA) e.puntuacionJugador2 += comp.length; else e.puntuacionJugador1 += comp.length; } else e.turnoJugador1 = !e.turnoJugador1; return comp.length; }
function movimientosPosiblesDesdeEstado(e) { const movs = []; for (let f = 0; f < tamaño; f++) for (let c = 0; c < tamaño - 1; c++) if (!e.horizontales[f][c]) movs.push({ tipo: 'h', fil: f, col: c }); for (let f = 0; f < tamaño - 1; f++) for (let c = 0; c < tamaño; c++) if (!e.verticales[f][c]) movs.push({ tipo: 'v', fil: f, col: c }); return movs; }
function evaluarEstado(e) { let val = e.puntuacionJugador2 - e.puntuacionJugador1; let tresIA = 0, tresP = 0; for (let f = 0; f < tamaño - 1; f++) { for (let c = 0; c < tamaño - 1; c++) { if (e.cajas[f][c]) continue; let lados = 0; if (e.horizontales[f][c]) lados++; if (e.horizontales[f + 1][c]) lados++; if (e.verticales[f][c]) lados++; if (e.verticales[f][c + 1]) lados++; if (e.turnoJugador1 === false) { if (lados === 3) tresIA++; } else { if (lados === 3) tresP++; } } } return val + 0.5 * (tresIA - tresP); }

function minimaxIterativoConTiempo(estadoInicial, tiempoMaxMs = TIEMPO_MAX_MS, profundidadLimite = PROFUNDIDAD_LIMITE) {
    const inicio = Date.now(); const deadline = inicio + tiempoMaxMs;
    let mejorConocido = { mov: null, valor: evaluarEstado(estadoInicial) };
    nodosBuscadosUltima = 0;
    function comprobarTiempo() { if (Date.now() > deadline) throw new Error('TIMEOUT'); }
    function minimaxTemporal(e, profundidad, alfa, beta, esMax) {
        comprobarTiempo(); nodosBuscadosUltima++;
        const movs = movimientosPosiblesDesdeEstado(e);
        if (movs.length === 0 || profundidad === 0) return { valor: evaluarEstado(e), mov: null };
        let mejorMov = null;
        if (esMax) {
            let maxEval = -Infinity;
            for (const mv of movs) {
                const hijo = clonarEstado(e); aplicarMovimientoEnEstado(hijo, mv, true);
                const siguienteEsMax = hijo.turnoJugador1 === false;
                const res = minimaxTemporal(hijo, profundidad - 1, alfa, beta, siguienteEsMax);
                if (res.valor > maxEval) { maxEval = res.valor; mejorMov = mv; }
                alfa = Math.max(alfa, res.valor);
                if (beta <= alfa) break;
            }
            return { valor: maxEval, mov: mejorMov };
        } else {
            let minEval = +Infinity;
            for (const mv of movs) {
                const hijo = clonarEstado(e); aplicarMovimientoEnEstado(hijo, mv, false);
                const siguienteEsMax = hijo.turnoJugador1 === false;
                const res = minimaxTemporal(hijo, profundidad - 1, alfa, beta, siguienteEsMax);
                if (res.valor < minEval) { minEval = res.valor; mejorMov = mv; }
                beta = Math.min(beta, res.valor);
                if (beta <= alfa) break;
            }
            return { valor: minEval, mov: mejorMov };
        }
    }
    try {
        for (let profundidad = 1; profundidad <= profundidadLimite; profundidad++) {
            comprobarTiempo();
            const copia = clonarEstado(estadoInicial);
            const res = minimaxTemporal(copia, profundidad, -Infinity, +Infinity, true);
            if (res.mov) mejorConocido = { mov: res.mov, valor: res.valor };
        }
    } catch (err) {
        if (err.message !== 'TIMEOUT') throw err;
    } finally {
        tiempoUltimaBusquedaMs = Date.now() - inicio;
    }
    return mejorConocido;
}

// --- IA jugada con pausas (async) ---
async function jugadaIA() {
    await sleep(380);
    const estado = { horizontales: horizontales.map(r => r.slice()), verticales: verticales.map(r => r.slice()), cajas: cajas.map(r => r.slice()), puntuacionJugador1, puntuacionJugador2, turnoJugador1: false };
    const { mov: mejorMov } = minimaxIterativoConTiempo(estado, TIEMPO_MAX_MS, PROFUNDIDAD_LIMITE);
    if (!mejorMov) {
        const movs = movimientosPosiblesDesdeEstado(estado);
        if (movs.length === 0) return;
        const fallback = movs[Math.floor(Math.random() * movs.length)];
        await aplicarMovimientoReal(fallback, true);
        return;
    }
    await aplicarMovimientoReal(mejorMov, true);
}

// aplicar movimiento real con pausas y secuenciación
async function aplicarMovimientoReal(mov, byIA) {
    if (mov.tipo === 'h') horizontales[mov.fil][mov.col] = true;
    else verticales[mov.fil][mov.col] = true;
    dibujarTablero();
    const completadas = comprobarCajasCompletadas();
    if (completadas.length > 0) {
        const propietario = byIA ? 'jugador2' : (turnoJugador1 ? 'jugador1' : 'jugador2');
        for (const b of completadas) cajas[b.f][b.c] = propietario;
        if (byIA) puntuacionJugador2 += completadas.length;
        else { if (turnoJugador1) puntuacionJugador1 += completadas.length; else puntuacionJugador2 += completadas.length; }
        dibujarTablero();
        await sleep(360);
        if (esFinPartida()) { mostrarPantallaFinal(); return; }
        if (byIA) { await sleep(220); await jugadaIA(); return; }
        return;
    }
    turnoJugador1 = !turnoJugador1;
    dibujarTablero();
    if (esFinPartida()) { mostrarPantallaFinal(); return; }
    if (modoSelect.value === 'pvia' && !turnoJugador1) { setTimeout(() => { jugadaIA(); }, 360); }
}

// --- Inicializar primera vez ---
inicializarTableroConTamaño(tamaño);

// Previene scroll por touchmove sobre toda la página cuando el canvas está activo
function bloquearScrollGlobal() {
    // touchmove global
    window.addEventListener('touchmove', function (e) {
        // permitir si el usuario está interactuando con inputs fuera del juego (no aplicable aquí)
        if (!e.target.closest('#gameCanvas')) {
            return;
        }
        if (e.cancelable) e.preventDefault();
    }, { passive: false });

    // evitar doble tap para hacer zoom (iOS)
    let lastTouch = 0;
    window.addEventListener('touchend', function (e) {
        const now = Date.now();
        if (now - lastTouch <= 300) {
            if (e.cancelable) e.preventDefault();
        }
        lastTouch = now;
    }, { passive: false });

    // evitar gesto de pellizco y gesturestart en iOS Safari
    window.addEventListener('gesturestart', function (e) {
        if (e.cancelable) e.preventDefault();
    }, { passive: false });

    // también bloquear teclas que puedan hacer zoom (Ctrl/Cmd + +/-)
    window.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
            e.preventDefault();
        }
    }, { passive: false });
}
bloquearScrollGlobal();


// Exponer estado para depuración
window._puntosYCajas = {
    reiniciar: () => inicializarTableroConTamaño(tamaño),
    estado: () => ({ horizontales, verticales, cajas, turnoJugador1, puntuacionJugador1, puntuacionJugador2 }),
    estadisticasIA: () => ({ nodosBuscadosUltima, tiempoUltimaBusquedaMs })

};

