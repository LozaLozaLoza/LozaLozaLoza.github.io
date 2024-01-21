var can = document.getElementById("can");
var cv = can.getContext("2d");

var columnas = 200;
var filas = 200;
var anchoCuadrado = can.width / columnas;
var altoCuadrado = can.height / filas;

var tiles = [];

var reglas = 0;

function empezar() {
    resize();
    window.addEventListener('resize', resize, false);
    crearTiles();
    crearReglas();
    iterar();
    dibujar();
    bucle();
}

function crearTiles() {
    tiles = [];
    for (var i = 0; i < columnas; i++) {
        tiles[i] = [];
        for (var j = 0; j < filas; j++) {
            if (j == 0) {
                tiles[i][j] = Math.floor(Math.random() * 3);
            }
        }
    }
}

function crearReglas() {
    reglas = [];
    for (var i = 0; i < 3; i++) {
        reglas[i] = [];
        for (var a = 0; a < 3; a++) {
            reglas[i][a] = [];
            for (var d = 0; d < 3; d++) {
                reglas[i][a][d] = Math.floor(Math.random() * 3);
            }
        }
    }
}

function iterar() {
    var Iz = 0;
    var Ar = 0;
    var De = 0;
    for (var j = 1; j < filas; j++) {
        for (var i = 0; i < columnas; i++) {
            if (i == 0) {
                Iz = tiles[columnas - 1][j - 1];
                Ar = tiles[i][j - 1];
                De = tiles[i+1][j - 1];
            } else {
                if (i == columnas - 1) {
                    Iz = tiles[i - 1][j - 1];
                    Ar = tiles[i][j - 1];
                    De = tiles[0][j - 1];
                } else {
                    Iz = tiles[i - 1][j - 1];
                    Ar = tiles[i][j - 1];
                    De = tiles[i + 1][j - 1];
                }
            }
            tiles[i][j] = reglas[Iz][Ar][De];
        }
    }
}

function dibujar() {
    for (var i = 0; i < columnas; i++) {
        for (var j = 0; j < filas; j++) {
            if (tiles[i][j] == 0) {
                cv.fillStyle = "#ff0000";
            } else {
                if (tiles[i][j] == 1) {
                    cv.fillStyle = "#00ff00";
                } else {
                    cv.fillStyle = "#0000ff";
                }
            }
            cv.fillRect(anchoCuadrado * i, altoCuadrado * j, anchoCuadrado, altoCuadrado);
        }
    }
}

function bucle() {
    for (var i = 0; i < columnas; i++) {
        for (var j = 0; j < filas - 1; j++) {
            tiles[i][j] = tiles[i][j + 1];
        }
    }
    for (var i = 0; i < columnas; i++) {
        if (i == 0) {
            Iz = tiles[columnas - 1][filas - 2];
            Ar = tiles[i][filas - 2];
            De = tiles[i + 1][filas - 2];
        } else {
            if (i == columnas - 1) {
                Iz = tiles[i - 1][filas - 2];
                Ar = tiles[i][filas - 2];
                De = tiles[0][filas - 2];
            } else {
                Iz = tiles[i - 1][filas - 2];
                Ar = tiles[i][filas - 2];
                De = tiles[i + 1][filas - 2];
            }
        }
        tiles[i][filas-1] = reglas[Iz][Ar][De];
    }
    dibujar();
    setTimeout(bucle, 100);
}

function resize() {
    if (window.innerWidth < window.innerHeight) {
        can.style.position = 'fixed';
        can.style.top = (window.innerHeight - window.innerWidth - 0) / 2;
        can.style.left = '0';
        can.style.width = window.innerWidth - 0;
        can.style.height = window.innerWidth - 0;
    } else {
        can.style.position = 'fixed';
        can.style.top = '0';
        can.style.left = (window.innerWidth - window.innerHeight - 0) / 2;
        can.style.width = window.innerHeight - 0;
        can.style.height = window.innerHeight - 0;
    }
}