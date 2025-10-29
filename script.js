
// Obtiene el canvas por su ID y el contexto 2D para dibujar
const canvasJuego = document.getElementById('can');
const contexto = canvasJuego.getContext('2d');

//  Inicializa el canvas al cargar la página
ajustarCanvasPantalla();

//  Ajusta el tamaño del canvas para que coincida con la pantalla del dispositivo
function ajustarCanvasPantalla() {
    const dpr = window.devicePixelRatio || 1; // Densidad de píxeles del dispositivo

    const cssAncho = window.innerWidth;  // Ancho visible en CSS pixels
    const cssAlto = window.innerHeight;  // Alto visible en CSS pixels

    // Establece el tamaño visual del canvas (CSS)
    canvasJuego.style.width = cssAncho + 'px';
    canvasJuego.style.height = cssAlto + 'px';

    // Establece el tamaño interno del canvas en píxeles reales
    canvasJuego.width = Math.round(cssAncho * dpr);
    canvasJuego.height = Math.round(cssAlto * dpr);

    // Escala el contexto para que dibujar en coordenadas CSS sea correcto
    contexto.setTransform(dpr, 0, 0, dpr, 0, 0);
}

var xInicio;
var respuesta;
var respondido = false;

//  Convierte un evento (táctil o mouse) en coordenadas internas del canvas
function obtenerPosicionEnCanvas(evt) {

    let clientX, clientY;

    // Si es evento táctil, toma la posición del primer dedo
    if (evt.touches && evt.touches.length > 0) {
        clientX = evt.touches[0].clientX;
        clientY = evt.touches[0].clientY;
    }
    // Si es evento de tipo touchend, usa changedTouches
    else if (evt.changedTouches && evt.changedTouches.length > 0) {
        clientX = evt.changedTouches[0].clientX;
        clientY = evt.changedTouches[0].clientY;
    }
    // Si es evento de mouse, usa clientX/clientY directamente
    else {
        clientX = evt.clientX;
        clientY = evt.clientY;
    }

    // Devuelve coordenadas internas del canvas
    return { x: clientX, y: clientY };
}


//  Registra los eventos táctiles y de ratón
canvasJuego.addEventListener('touchstart', manejarInicioToque, { passive: false });
canvasJuego.addEventListener('touchend', manejarFinalToque, { passive: false });
canvasJuego.addEventListener('touchmove', manejarMovimientoToque, { passive: false });
canvasJuego.addEventListener('mousedown', manejarMouseDown);



/*******************************************************************************
 * 
 * Empiez el apartado del juego
 * 
 * *****************************************************************************/


function manejarInicioToque(evt) {
    xInicio = obtenerPosicionEnCanvas(evt).x;
}

//  Maneja el final de un toque en pantalla
function manejarFinalToque(evt) {
    var xFinal = obtenerPosicionEnCanvas(evt).x;
    if ((xFinal - xInicio) / window.innerWidth > 0.1) {
        respuesta = false;
        respondido = true;
    }
    if ((xFinal - xInicio) / window.innerWidth < -0.1) {
        respuesta = true;
        respondido = true;
    }

    if (estadoJuego == 0) {
        estadoJuego = 1;
        pensar();
        respondido = false;
        return;
    }
    if (estadoJuego == 3) {
        estadoJuego = 2;
        pensar();
        respondido = false;
        return;
    }
    if (estadoJuego == 4) {
        estadoJuego = 1;
        pensar();
        respondido = false;
        return;
    }
    if (respondido == true) {

        numPregRespon++;
        console.log(numPregRespon);

        if (respuesta == respuestaCorrecta) {
            puntuacion++;
        }
        if (estadoJuego == 1) {
            estadoJuego = 3;
            pensar();
            respondido = false;
            return;
        }
        if (estadoJuego == 2) {
            estadoJuego = 4;
            pensar();
            respondido = false;
            return;
        }
    }
}

//  Maneja el movimiento del dedo sobre la pantalla
function manejarMovimientoToque(evt) {
    if (estadoJuego == 0) return;
    if (estadoJuego == 3) return;
    if (estadoJuego == 4) return;
    var xFinal = obtenerPosicionEnCanvas(evt).x;


    contexto.fillStyle = "#3E7C87";

    if ((xFinal - xInicio) / window.innerWidth > 0.1) {
        contexto.fillStyle = "#ff0000";
    }
    if ((xFinal - xInicio) / window.innerWidth < -0.1) {
        contexto.fillStyle = "#00ff00";
    }

    contexto.fillRect(0, 0, window.innerWidth * 0.1, window.innerHeight * 0.05);

}

//  Maneja clics con el ratón (útil en escritorio)
function manejarMouseDown(evt) {
}

var estadoJuego = 0; // estado del juego, 0 = pantalla de inicio.

import { preguntas2 } from './capitulo2.js';
import { preguntas5 } from './capitulo5.js';

const preguntas = preguntas2;

for (var i = 0; i < preguntas5.length) {
    preguntas.push(preguntas5[i]);
}

// para escribir en pantalla con la letra adecuada
function ajustarFuente(texto, anchoMax, altoMax) {  


    let fontSize = 200;
    contexto.font = `${fontSize}px Verdana`;
    var cabe = 0;
    while (cabe == 0) {
        contexto.font = `${fontSize}px Verdana`;
        var lineas = dividirTexto(texto, anchoMax);
        const alturaTotal = lineas.length * fontSize * 1.2;
        const anchosDeLineas = [];
        for (var i = 0; i < lineas.length; i++) {
            anchosDeLineas[i] = contexto.measureText(lineas[i]).width;
        }
        const anchoMayor = Math.max(...anchosDeLineas);
        if (alturaTotal < altoMax && anchoMayor < anchoMax) {
            cabe = 1;
        } else {
            fontSize -= 1;
        }
    }
    return fontSize;
}

// divide el texto en lineas
function dividirTexto(texto, anchoMax) {
    const palabras = texto.split(" ");
    const lineas = [];
    let linea = "";
    for (var i = 0; i < palabras.length; i++) {
        if (linea == "") {
            linea = palabras[i] + " ";
        } else {
            const prueba = linea + palabras[i] + " ";
            if (contexto.measureText(prueba).width > anchoMax) {
                lineas.push(linea);
                linea = palabras[i] + " ";
            } else {
                linea = prueba;
            }
        }
    }
    if (linea) lineas.push(linea);
    return lineas;
}

//  Dibuja el fondo inicial del canvas
function dibujarInicio() {
    if (estadoJuego == 0) {
        const anchoCss = window.innerWidth;
        const altoCss = window.innerHeight;

        contexto.fillStyle = '#124947'; // Color de fondo oscuro
        contexto.fillRect(0, 0, anchoCss, altoCss); // Rellena todo el canvas

        const texto = "Toca para empezar con el test";

        // Configuración del texto
        let fontSize = ajustarFuente(texto, anchoCss * 0.9, altoCss * 0.9);
        contexto.font = `${fontSize}px Verdana`;
        contexto.fillStyle = '#00ffcc';
        contexto.textAlign = 'center';
        contexto.textBaseline = 'middle';

        // Dibuja el texto centrado
        const texto1 = dividirTexto(texto, anchoCss * 0.9);
        for (var i = 0; i < texto1.length; i++) {
            contexto.fillText(texto1[i], anchoCss / 2, altoCss / 2 - fontSize * 0.6 * texto1.length + fontSize * 1.2 * i);
        }
    }
}

// Llama a la función para pintar el fondo al inicio
dibujarInicio();

var numPregRespon = 0;
var respuestaCorrecta;
var puntuacion = 0;
var numPre;

function pensar() {
    if (numPregRespon == 20) {
        const anchoCss = window.innerWidth;
        const altoCss = window.innerHeight;
        estadoJuego = 0;
        contexto.fillStyle = '#124947'; 
        contexto.fillRect(0, 0, anchoCss, altoCss);

        const texto = "Se ha terminado el test, has respondido " + String(puntuacion) + " bien de 20. Toca para volver a empezar.";

        numPregRespon = 0;
        puntuacion = 0;

        let fontSize = ajustarFuente(texto, anchoCss * 0.9, altoCss * 0.9);
        contexto.font = `${fontSize}px Verdana`;
        contexto.fillStyle = '#00ffcc';
        contexto.textAlign = 'center';
        contexto.textBaseline = 'middle';

        const texto1 = dividirTexto(texto, anchoCss * 0.9);
        for (var i = 0; i < texto1.length; i++) {
            contexto.fillText(texto1[i], anchoCss / 2, altoCss / 2 - fontSize * 0.6 * texto1.length + fontSize * 1.2 * i);
        }
    }
    if (estadoJuego == 1) {
        numPre = Math.floor(Math.random() * preguntas.length);
        var pregunta = preguntas[numPre];
        respuestaCorrecta = pregunta.A.respuesta;

        // dibujar

        const anchoCss = window.innerWidth;
        const altoCss = window.innerHeight;

        contexto.fillStyle = '#3E7C87'; // Color de fondo
        contexto.fillRect(0, 0, anchoCss, altoCss); // Rellena todo el canvas

        contexto.fillStyle = '#000000'; // Color de texto
        var fontSize = ajustarFuente(String(pregunta.numero), anchoCss, altoCss * 0.1);
        contexto.fontSize = fontSize;
        contexto.textAlign = "center";
        contexto.textBaseline = "top";

        // escribe el numero en el 10%
        const numero1 = dividirTexto(String(pregunta.numero), anchoCss);
        for (var i = 0; i < numero1.length; i++) {
            contexto.fillText(numero1[i], anchoCss / 2, altoCss * 0 + fontSize * 1.2 * i);
        }

        // esctibe el tem aen el 40%
        var fontSize = ajustarFuente(pregunta.tema, anchoCss * 0.9, altoCss * 0.4);
        contexto.fontSize = fontSize;

        const texto1 = dividirTexto(pregunta.tema, anchoCss);
        for (var i = 0; i < texto1.length; i++) {
            contexto.fillText(texto1[i], anchoCss / 2, altoCss * 0.1 + fontSize * 1.2 * i);
        }

        // esctibe la letra en el 10%
        var fontSize = ajustarFuente("A", anchoCss * 0.9, altoCss * 0.1);
        contexto.fontSize = fontSize;

        const letra = dividirTexto("A", anchoCss);
        for (var i = 0; i < letra.length; i++) {
            contexto.fillText(letra[i], anchoCss / 2, altoCss * 0.5 + fontSize * 1.2 * i);
        }

        // escribe el enunciado en el 60%
        var fontSize = ajustarFuente(pregunta.A.enunciado, anchoCss * 0.9, altoCss * 0.4);
        contexto.fontSize = fontSize;

        const texto2 = dividirTexto(pregunta.A.enunciado, anchoCss * 0.9);
        for (var i = 0; i < texto2.length; i++) {
            contexto.fillText(texto2[i], anchoCss / 2, altoCss * 0.6 + fontSize * 1.2 * i);
        }
    }
    if (estadoJuego == 3) {
        if (respuestaCorrecta == respuesta) {

            const anchoCss = window.innerWidth;
            const altoCss = window.innerHeight;

            contexto.fillStyle = '#1FCC1F'; // Color de fondo
            contexto.fillRect(0, 0, anchoCss, altoCss); // Rellena todo el canvas

            contexto.fillStyle = '#000000'; // Color de texto
            var fontSize = ajustarFuente("CORRECTO", anchoCss, altoCss * 0.3);
            contexto.fontSize = fontSize;
            contexto.textAlign = "center";
            contexto.textBaseline = "top";

            const texto = dividirTexto("CORRECTO", anchoCss);
            for (var i = 0; i < texto.length; i++) {
                contexto.fillText(texto[i], anchoCss / 2, altoCss * 0 + fontSize * 1.2 * i);
            }


            var fontSize = ajustarFuente(preguntas[numPre].A.explicacion, anchoCss, altoCss * 0.7);
            const texto2 = dividirTexto(preguntas[numPre].A.explicacion, anchoCss);
            for (var i = 0; i < texto2.length; i++) {
                contexto.fillText(texto2[i], anchoCss / 2, altoCss * 0.3 + fontSize * 1.2 * i);
            }

        } else {

            const anchoCss = window.innerWidth;
            const altoCss = window.innerHeight;

            contexto.fillStyle = '#D1580A'; // Color de fondo
            contexto.fillRect(0, 0, anchoCss, altoCss); // Rellena todo el canvas

            contexto.fillStyle = '#000000'; // Color de texto
            var fontSize = ajustarFuente("INCORRECTO", anchoCss, altoCss * 0.3);
            contexto.fontSize = fontSize;
            contexto.textAlign = "center";
            contexto.textBaseline = "top";

            const texto = dividirTexto("INCORRECTO", anchoCss);
            for (var i = 0; i < texto.length; i++) {
                contexto.fillText(texto[i], anchoCss / 2, altoCss * 0 + fontSize * 1.2 * i);
            }


            var fontSize = ajustarFuente(preguntas[numPre].A.explicacion, anchoCss, altoCss * 0.7);
            const texto2 = dividirTexto(preguntas[numPre].A.explicacion, anchoCss);
            for (var i = 0; i < texto2.length; i++) {
                contexto.fillText(texto2[i], anchoCss / 2, altoCss * 0.3 + fontSize * 1.2 * i);
            }

        }
    }
    if (estadoJuego == 2) {
        var pregunta = preguntas[numPre];
        respuestaCorrecta = pregunta.B.respuesta;

        // dibujar

        const anchoCss = window.innerWidth;
        const altoCss = window.innerHeight;

        contexto.fillStyle = '#3E7C87'; // Color de fondo
        contexto.fillRect(0, 0, anchoCss, altoCss); // Rellena todo el canvas

        contexto.fillStyle = '#000000'; // Color de texto
        var fontSize = ajustarFuente(String(pregunta.numero), anchoCss, altoCss * 0.1);
        contexto.fontSize = fontSize;
        contexto.textAlign = "center";
        contexto.textBaseline = "top";

        // escribe el numero en el 10%
        const numero1 = dividirTexto(String(pregunta.numero), anchoCss);
        for (var i = 0; i < numero1.length; i++) {
            contexto.fillText(numero1[i], anchoCss / 2, altoCss * 0 + fontSize * 1.2 * i);
        }

        // esctibe el tem aen el 40%
        var fontSize = ajustarFuente(pregunta.tema, anchoCss * 0.9, altoCss * 0.4);
        contexto.fontSize = fontSize;

        const texto1 = dividirTexto(pregunta.tema, anchoCss);
        for (var i = 0; i < texto1.length; i++) {
            contexto.fillText(texto1[i], anchoCss / 2, altoCss * 0.1 + fontSize * 1.2 * i);
        }

        // esctibe la letra en el 10%
        var fontSize = ajustarFuente("B", anchoCss * 0.9, altoCss * 0.1);
        contexto.fontSize = fontSize;

        const letra = dividirTexto("B", anchoCss);
        for (var i = 0; i < letra.length; i++) {
            contexto.fillText(letra[i], anchoCss / 2, altoCss * 0.5 + fontSize * 1.2 * i);
        }

        // escribe el enunciado en el 60%
        var fontSize = ajustarFuente(pregunta.B.enunciado, anchoCss * 0.9, altoCss * 0.4);
        contexto.fontSize = fontSize;

        const texto2 = dividirTexto(pregunta.B.enunciado, anchoCss * 0.9);
        for (var i = 0; i < texto2.length; i++) {
            contexto.fillText(texto2[i], anchoCss / 2, altoCss * 0.6 + fontSize * 1.2 * i);
        }
    }
    if (estadoJuego == 4) {
        if (respuestaCorrecta == respuesta) {

            const anchoCss = window.innerWidth;
            const altoCss = window.innerHeight;

            contexto.fillStyle = '#1FCC1F'; // Color de fondo
            contexto.fillRect(0, 0, anchoCss, altoCss); // Rellena todo el canvas

            contexto.fillStyle = '#000000'; // Color de texto
            var fontSize = ajustarFuente("CORRECTO", anchoCss, altoCss * 0.3);
            contexto.fontSize = fontSize;
            contexto.textAlign = "center";
            contexto.textBaseline = "top";

            const texto = dividirTexto("CORRECTO", anchoCss);
            for (var i = 0; i < texto.length; i++) {
                contexto.fillText(texto[i], anchoCss / 2, altoCss * 0 + fontSize * 1.2 * i);
            }


            var fontSize = ajustarFuente(preguntas[numPre].B.explicacion, anchoCss, altoCss * 0.7);
            const texto2 = dividirTexto(preguntas[numPre].B.explicacion, anchoCss);
            for (var i = 0; i < texto2.length; i++) {
                contexto.fillText(texto2[i], anchoCss / 2, altoCss * 0.3 + fontSize * 1.2 * i);
            }

        } else {

            const anchoCss = window.innerWidth;
            const altoCss = window.innerHeight;

            contexto.fillStyle = '#D1580A'; // Color de fondo
            contexto.fillRect(0, 0, anchoCss, altoCss); // Rellena todo el canvas

            contexto.fillStyle = '#000000'; // Color de texto
            var fontSize = ajustarFuente("INCORRECTO", anchoCss, altoCss * 0.3);
            contexto.fontSize = fontSize;
            contexto.textAlign = "center";
            contexto.textBaseline = "top";

            const texto = dividirTexto("INCORRECTO", anchoCss);
            for (var i = 0; i < texto.length; i++) {
                contexto.fillText(texto[i], anchoCss / 2, altoCss * 0 + fontSize * 1.2 * i);
            }


            var fontSize = ajustarFuente(preguntas[numPre].B.explicacion, anchoCss, altoCss * 0.7);
            const texto2 = dividirTexto(preguntas[numPre].B.explicacion, anchoCss);
            for (var i = 0; i < texto2.length; i++) {
                contexto.fillText(texto2[i], anchoCss / 2, altoCss * 0.3 + fontSize * 1.2 * i);
            }

        }
    }
}