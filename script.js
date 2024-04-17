var can = document.getElementById("can");
var cv = can.getContext("2d");

var listaDeColores = ["#000000", "#0000ff", "#00ff00", "#00ffff", "#ff0000", "#ff00ff", "ffff00", "#000000"];

var nBuc = 2;
var ancho = nBuc * 2 + 2;
var tiles = [];
var tilesP = [];
var tilesD = [];
var tiles2 = [];
var bucles = [];
var bucleElegido = 0;

cv.lineWidth = 50 / ancho;

function next() {
    if (compro()) {
        if (Math.random() < 0.1) {
            nBuc++;
            if (nBuc == 9) {
                alert("¡Te has pasado el juego!");
                nBuc = 0;
            }
        }
        ancho = nBuc * 2 + 2;
        cv.lineWidth = 50 / ancho;
        empezar();
    }
}

function NEXT() {
    if (Math.random() < 0.1) {
        nBuc++;
        if (nBuc == 10) {
            alert("te has pasado el juego!");
            nBuc = 2;
        }
    }
    ancho = nBuc * 2 + 2;
    cv.lineWidth = 50 / ancho;
    empezar();
}

function compro() {
    var Bn = 1;
    for (var i = 0; i < ancho; i++) {
        for (var j = 0; j < ancho; j++) {
            if (tilesP[i][j] !== -1) {
                if (tilesP[i][j].length == 1) {
                    if (tilesD[i][j].length == 1) {
                        if (tilesP[i][j][0] !== tilesD[i][j][0]) {
                            Bn = 0;
                        }
                    } else {
                        Bn = 0;
                    }
                } else {
                    if (tilesD[i][j].length == 2) {
                        if (!(tilesP[i][j][0] == tilesD[i][j][0] || tilesP[i][j][0] == tilesD[i][j][1])) {
                            Bn = 0;
                        }
                        if (!(tilesP[i][j][1] == tilesD[i][j][0] || tilesP[i][j][1] == tilesD[i][j][1])) {
                            Bn = 0;
                        }
                    } else {
                        Bn = 0;
                    }
                }
            }
        }
    }
    return Bn;
}

function empezar1() {

    fCrearTiles(ancho);
    fCrearBucles(nBuc);
    deshacer();
    resize();
    window.addEventListener('resize', resize, false);
    document.addEventListener('mousedown', function (event) {
        clik(event.clientX);
    });
    dibujar();
    //next();
}

function empezar() {

    fCrearTiles(ancho);
    fCrearBucles(nBuc);
    deshacer();
    resize();
    dibujar();
    next();
}

function deshacer() {
    for (var d = 0; d < ancho; d++) {
        var D = Math.random() * ancho;
        bucleElegido++;
        console.log(bucleElegido);
        if (bucleElegido >= nBuc) {
            bucleElegido = 0;
        }
        dibujar();
        for (var D2 = 0; D2 < D; D2++) {
            mover();
        }
    }
}



function resize() {
    if (window.innerWidth < window.innerHeight) {
        can.style.position = 'fixed';
        can.style.top = (window.innerHeight - window.innerWidth - 10) / 2;
        can.style.left = '0';
        can.style.width = window.innerWidth - 10;
        can.style.height = window.innerWidth - 10;
    } else {
        can.style.position = 'fixed';
        can.style.top = '0';
        can.style.left = (window.innerWidth - window.innerHeight - 10) / 2;
        can.style.width = window.innerHeight - 10;
        can.style.height = window.innerHeight - 10;
    }
}

function fCrearTiles(A) {
    for (var i = 0; i < A; i++) {
        tiles[i] = [];
        tiles2[i] = [];
        tilesP[i] = [];
        tilesD[i] = [];
        for (var j = 0; j < A; j++) {
            tiles[i][j] = -1;
            tilesP[i][j] = -1;
            tilesD[i][j] = -1;
            tiles2[i][j] = 0;
        }
    }
}

function fCrearBucles(B) {

    for (var b = 0; b < B; b++) {

        var bool = 0;
        var X1 = Math.floor(Math.random() * (ancho - 2)) + 1;
        var Y1 = Math.floor(Math.random() * (ancho - 2)) + 1;
        while (bool == 0) {
            if (tiles2[X1][Y1] == 0) {
                bool = 1;
                for (var i = 0; i < ancho; i++) {
                    tiles2[i][Y1] = 1;
                }
                for (var j = 0; j < ancho; j++) {
                    tiles2[X1][j] = 1;
                }
            } else {
                X1 = Math.floor(Math.random() * (ancho - 2)) + 1;
                Y1 = Math.floor(Math.random() * (ancho - 2)) + 1;
            }
        }

        bool = 0;
        var X2 = Math.floor(Math.random() * (ancho - 2)) + 1;
        var Y2 = Math.floor(Math.random() * (ancho - 2)) + 1;
        while (bool == 0) {
            if (tiles2[X2][Y2] == 0) {
                bool = 1;
                for (var i = 0; i < ancho; i++) {
                    tiles2[i][Y2] = 1;
                }
                for (var j = 0; j < ancho; j++) {
                    tiles2[X2][j] = 1;
                }
            } else {
                X2 = Math.floor(Math.random() * (ancho - 2)) + 1;
                Y2 = Math.floor(Math.random() * (ancho - 2)) + 1;
            }
        }

        if (X2 < X1) {
            var A = X1;
            X1 = X2;
            X2 = A;
        }
        if (Y2 < Y1) {
            var A = Y1;
            Y1 = Y2;
            Y2 = A;
        }

        for (var i = 0; i < ancho; i++) {
            for (var j = 0; j < ancho; j++) {
                if (i == X1) {
                    if (j <= Y1 && j >= Y2) {
                        if (tiles[i][j] == -1) {
                            tiles[i][j] = [b];
                        } else {
                            if (tiles[i][j][0] !== b) {
                                tiles[i][j] = [tiles[i][j][0], b];
                            }
                        }
                    }
                    if (j >= Y1 && j <= Y2) {
                        if (tiles[i][j] == -1) {
                            tiles[i][j] = [b];
                        } else {
                            if (tiles[i][j][0] !== b) {
                                tiles[i][j] = [tiles[i][j][0], b];
                            }
                        }
                    }
                }
                if (i == X2) {
                    if (j <= Y1 && j >= Y2) {
                        if (tiles[i][j] == -1) {
                            tiles[i][j] = [b];
                        } else {
                            if (tiles[i][j][0] !== b) {
                                tiles[i][j] = [tiles[i][j][0], b];
                            }
                        }
                    }
                    if (j >= Y1 && j <= Y2) {
                        if (tiles[i][j] == -1) {
                            tiles[i][j] = [b];
                        } else {
                            if (tiles[i][j][0] !== b) {
                                tiles[i][j] = [tiles[i][j][0], b];
                            }
                        }
                    }
                }
                if (j == Y1) {
                    if (i <= X1 && i >= X2) {
                        if (tiles[i][j] == -1) {
                            tiles[i][j] = [b];
                        } else {
                            if (tiles[i][j][0] !== b) {
                                tiles[i][j] = [tiles[i][j][0], b];
                            }
                        }
                    }
                    if (i >= X1 && i <= X2) {
                        if (tiles[i][j] == -1) {
                            tiles[i][j] = [b];
                        } else {
                            if (tiles[i][j][0] !== b) {
                                tiles[i][j] = [tiles[i][j][0], b];
                            }
                        }
                    }
                }
                if (j == Y2) {
                    if (i <= X1 && i >= X2) {
                        if (tiles[i][j] == -1) {
                            tiles[i][j] = [b];
                        } else {
                            if (tiles[i][j][0] !== b) {
                                tiles[i][j] = [tiles[i][j][0], b];
                            }
                        }
                    }
                    if (i >= X1 && i <= X2) {
                        if (tiles[i][j] == -1) {
                            tiles[i][j] = [b];
                        } else {
                            if (tiles[i][j][0] !== b) {
                                tiles[i][j] = [tiles[i][j][0], b];
                            }
                        }
                    }
                }
            }
        }

        bucles[b] = {
            color: listaDeColores[b],
            x1: X1,
            y1: Y1,
            x2: X2,
            y2: Y2
        };
    }

    for (var i = 0; i < ancho; i++) {
        for (var j = 0; j < ancho; j++) {
            tilesP[i][j] = tiles[i][j];
            tilesD[i][j] = tiles[i][j];
        }
    }
}

function fColorAleatorio() {
    var R = Math.floor(Math.random() * 150) + 50;
    var G = Math.floor(Math.random() * 150) + 50;
    var B = Math.floor(Math.random() * 150) + 50;

    return "rgb(" + R + "," + G + "," + B + ")";
}

function dibujar() {

    cv.clearRect(0, 0, 1000, 1000);
    for (var b = 0; b < bucles.length; b++) {
        var tilBu = [];
        for (var i = 0; i < ancho; i++) {
            tilBu[i] = [];
            for (var j = 0; j < ancho; j++) {
                if (tiles[i][j] == -1) {
                    tilBu[i][j] = 0;
                } else {
                    tilBu[i][j] = 0;
                    for (var b2 = 0; b2 < tiles[i][j].length; b2++) {
                        if (b == tiles[i][j][b2]) {
                            tilBu[i][j] = 1;
                        }
                    }
                }
            }
        }

        if (b == bucleElegido) {
            cv.fillStyle = "#ff0000";
        } else {
            cv.fillStyle = "#000000";
        }

        for (var i = 1; i < ancho - 1; i++) {
            for (var j = 1; j < ancho - 1; j++) {
                if (tilBu[i][j] == 1) {
                    if (!(tilBu[i - 1][j] == 1 && tilBu[i + 1][j] == 1)) {
                        if (tilBu[i][j - 1] == 1) {
                            cv.fillRect(i * 1000 / ancho + 400 / ancho, 1000 - (j + 1) * 1000 / ancho + 400 / ancho, 200 / ancho, 600 / ancho);
                        }
                        if (tilBu[i][j + 1] == 1) {
                            cv.fillRect(i * 1000 / ancho + 400 / ancho, 1000 - (j + 1) * 1000 / ancho, 200 / ancho, 600 / ancho);
                        }
                    }
                    if (!(tilBu[i][j - 1] == 1 && tilBu[i][j + 1] == 1)) {
                        if (tilBu[i - 1][j] == 1) {
                            cv.fillRect(i * 1000 / ancho, 1000 - (j + 1) * 1000 / ancho + 400 / ancho, 600 / ancho, 200 / ancho);
                        }
                        if (tilBu[i + 1][j] == 1) {
                            cv.fillRect(i * 1000 / ancho + 400 / ancho, 1000 - (j + 1) * 1000 / ancho + 400 / ancho, 600 / ancho, 200 / ancho);
                        }
                    }
                }
            }
        }
    }
    /*
    var tilBu = [];
    for (var i = 0; i < ancho; i++) {
        tilBu[i] = [];
        for (var j = 0; j < ancho; j++) {
            if (tiles[i][j] == -1) {
                tilBu[i][j] = 0;
            } else {
                tilBu[i][j] = 0;
                for (var b2 = 0; b2 < tiles[i][j].length; b2++) {
                    if (bucleElegido == tiles[i][j][b2]) {
                        tilBu[i][j] = 1;
                    }
                }
            }
        }
    }

    cv.fillStyle = bucles[bucleElegido].color;

    for (var i = 1; i < ancho - 1; i++) {
        for (var j = 1; j < ancho - 1; j++) {
            if (tilBu[i][j] == 1) {
                if (!(tilBu[i - 1][j] == 1 && tilBu[i + 1][j] == 1)) {
                    if (tilBu[i][j - 1] == 1) {
                        cv.fillRect(i * 1000 / ancho + 300 / ancho, 1000 - (j + 1) * 1000 / ancho + 300 / ancho, 400 / ancho, 700 / ancho);
                    }
                    if (tilBu[i][j + 1] == 1) {
                        cv.fillRect(i * 1000 / ancho + 300 / ancho, 1000 - (j + 1) * 1000 / ancho, 400 / ancho, 700 / ancho);
                    }
                }
                if (!(tilBu[i][j - 1] == 1 && tilBu[i][j + 1] == 1)) {
                    if (tilBu[i - 1][j] == 1) {
                        cv.fillRect(i * 1000 / ancho, 1000 - (j + 1) * 1000 / ancho + 300 / ancho, 700 / ancho, 400 / ancho);
                    }
                    if (tilBu[i + 1][j] == 1) {
                        cv.fillRect(i * 1000 / ancho + 300 / ancho, 1000 - (j + 1) * 1000 / ancho + 300 / ancho, 700 / ancho, 400 / ancho);
                    }
                }
            }
        }
    }
    */

    for (var i = 1; i < ancho - 1; i++) {
        for (var j = 1; j < ancho - 1; j++) {
            if (tilesP[i][j] !== -1) {
                if (tilesP[i][j].length == 2) {
                    cv.fillStyle = bucles[tilesP[i][j][0]].color;
                    cv.beginPath();
                    cv.arc(i * 1000 / ancho + 500 / ancho, 1000 - j * 1000 / ancho - 500 / ancho, 300 / ancho, 0, Math.PI);
                    cv.fill();
                    cv.stroke();

                    cv.fillStyle = bucles[tilesP[i][j][1]].color;
                    cv.beginPath();
                    cv.arc(i * 1000 / ancho + 500 / ancho, 1000 - j * 1000 / ancho - 500 / ancho, 300 / ancho, Math.PI, 2 * Math.PI);
                    cv.fill();
                    cv.stroke();
                } else {
                    cv.fillStyle = bucles[tilesP[i][j][0]].color;
                    cv.beginPath();
                    cv.arc(i * 1000 / ancho + 500 / ancho, 1000 - j * 1000 / ancho - 500 / ancho, 300 / ancho, 0, 2 * Math.PI);
                    cv.fill();
                    cv.stroke();
                }
            }
        }
    }
}

function clik(Cx) {
    console.log(Cx);
    if (Cx < window.innerWidth / 2) {
        next();
        mover();
    } else {
        bucleElegido++;
        console.log(bucleElegido);
        if (bucleElegido >= nBuc) {
            bucleElegido = 0;
        }
        dibujar();
    }
}

function mover() {
    var X1 = bucles[bucleElegido].x1;
    var Y1 = bucles[bucleElegido].y1;
    var X2 = bucles[bucleElegido].x2;
    var Y2 = bucles[bucleElegido].y2;

    var A = tilesP[X1][Y1];

    for (var i = X1; i <= X2; i++) {
        tilesP[i][Y1] = tilesP[i + 1][Y1];
    }
    for (var j = Y1; j <= Y2; j++) {
        tilesP[X2][j] = tilesP[X2][j + 1];
    }
    for (var i = X2; i >= X1; i--) {
        tilesP[i][Y2] = tilesP[i - 1][Y2];
    }
    for (var j = Y2; j > Y1; j--) {
        tilesP[X1][j] = tilesP[X1][j - 1];
    }
    tilesP[X1][Y1 + 1] = A;
    dibujar();
}