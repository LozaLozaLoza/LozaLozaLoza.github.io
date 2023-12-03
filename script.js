var can = document.getElementById("can");
var cv = can.getContext("2d");

var sA = Math.floor(Math.random() * 9999);
//console.log(sA);

var cCL = 1000;

var mapa1, mapa2, mapa3, mapadx, mapady;

function crearMapas() {
    mapa1 = fRuido2(cCL, 2, 5);
    mapa2 = fRuido2(cCL, 2, 5);
    mapa3 = fRuido2(cCL, 2, 5);
    mapadx = fRuido2(cCL, 4, 4);
    mapady = fRuido2(cCL, 4, 4);
}

var cp = [
    [1, 0, 0], [0, 1, 0], [0, 0, 1] // basandose en (r,g,b)
];

var colores = [];

var color = -1;

function empezar() {
    /*
    var Det = prompt("cual quieres que sea el detalle? [2,8]");
    crearColores(Det);
    alert("con el detalle " + Det + " hay " + colores.length + " colores.");
    */
    sA = Math.floor(Math.random() * 9999999);
    console.log(sA);

    resize();
    window.addEventListener('resize', resize, false);

    crearMapas();

    crearColores(8);

    dibujar();
}

function crearColores(D) {
    colores = [];
    for (var i = 0; i < D; i++) {
        for (var j = 0; j < D; j++) {
            for (var k = 0; k < D; k++) {
                colores[colores.length] = {
                    x: i / (D - 1), // cp[0]
                    y: j / (D - 1), // cp[1]
                    z: k / (D - 1)  // cp[2]
                };
            }
        }
    }
}

function decirColores() {
    var R = cp[0][0] * colores[color].x + cp[1][0] * colores[color].y + cp[2][0] * colores[color].z;
    var G = cp[0][1] * colores[color].x + cp[1][1] * colores[color].y + cp[2][1] * colores[color].z;
    var B = cp[0][2] * colores[color].x + cp[1][2] * colores[color].y + cp[2][2] * colores[color].z;

    alert("color 1: rgb(" + Math.floor(255 * R) + ", " + Math.floor(255 * G) + "," + Math.floor(255 * B) + ")");
    alert("color 2: rgb(" + Math.floor(255 * (1 - R)) + ", " + Math.floor(255 * (1 - G)) + "," + Math.floor(255 * (1 - B)) + ")");
}

function dibujar() {
    var c = Math.floor(fNumAl() * colores.length);
    var R = cp[0][0] * colores[c].x + cp[1][0] * colores[c].y + cp[2][0] * colores[c].z;
    var G = cp[0][1] * colores[c].x + cp[1][1] * colores[c].y + cp[2][1] * colores[c].z;
    var B = cp[0][2] * colores[c].x + cp[1][2] * colores[c].y + cp[2][2] * colores[c].z;

    C1 = "rgb(" + Math.floor(255 * R) + ", " + Math.floor(255 * G) + "," + Math.floor(255 * B) + ")";
    C2 = "rgb(" + Math.floor(255 * (1 - R)) + ", " + Math.floor(255 * (1 - G)) + "," + Math.floor(255 * (1 - B)) + ")";
    if (fNumAl() > 0.5) {
        C3 = "#000000";
    } else {
        C3 = "#ffffff";
    }

    /*
    C1 = "#004444";
    C2 = "#33aa66";
    C3 = "#77cc99";
    */

    var C = [C1, C2, C3];

    var Dxm = 0;
    for (var i = 0; i < mapadx.length; i++) {
        for (var j = 0; j < mapadx[i].length; j++) {
            Dxm += mapadx[i][j];
        }
    }
    Dxm = Dxm / (cCL * cCL);

    var Dym = 0;
    for (var i = 0; i < mapady.length; i++) {
        for (var j = 0; j < mapady[i].length; j++) {
            Dym += mapady[i][j];
        }
    }
    Dym = Dym / (cCL * cCL);

    var De = fNumAl() * 2500;

    for (var i = 0; i < mapa1.length; i++) {
        for (var j = 0; j < mapa1[i].length; j++) {
            var Dx = Math.floor((mapadx[i][j] - Dxm) * De);
            var Dy = Math.floor((mapady[i][j] - Dym) * De);
            if (i + Dx < 0) {
                Dx = -1 * i;
            } else {
                if (i + Dx > mapadx.length - 1) {
                    Dx = mapadx.length - 1 - i;
                }
            }
            if (j + Dy < 0) {
                Dy = -1 * j;
            } else {
                if (j + Dy > mapady.length - 1) {
                    Dy = mapadx.length - 1 - j;
                }
            }
            var V1 = mapa1[i + Dx][j + Dy];
            var V2 = mapa2[i + Dx][j + Dy];
            var V3 = mapa3[i + Dx][j + Dy];
            var V = 0;

            if (V1 > V2) { // 2 no
                if (V1 > V3) { //3 no
                    if (V2 > V3) { //3 no
                        V = 1;
                    } else { // 2 no
                        V = 1;
                    }
                } else { // 1 no
                    if (V2 > V3) {
                        V = 3;
                    } else {
                        V = 3;
                    }
                }
            } else { // 1 no
                if (V1 > V3) { // 3 no
                    if (V2 > V3) {
                        V = 2;
                    } else {
                        V = 2;
                    }
                } else { //1no
                    if (V2 > V3) {
                        V = 2;
                    } else {
                        V = 3;
                    }
                }
            }
            cv.fillStyle = C[V - 1];
            cv.fillRect(i * (1000 / cCL), j * (1000 / cCL), 20, 20);
        }
    }
}








function fRuido1(La, Ca) {
    var Ol = [];
    var O = [];
    for (var i = 0; i < Ca; i++) {
        Ol[i] = fOla1(La, Math.pow(2, i));
    }
    for (var i = 0; i < La; i++) {
        O[i] = 0;
        for (var o = 0; o < Ol.length; o++) {
            O[i] += Ol[o][i] / Math.pow(2, o + 1);
        }
    }
    return O;
}

function fRuido2(La, Ca, Em) {
    var Ol = [];
    var O = [];
    for (var i = Em; i < Ca + Em; i++) {
        Ol[i] = fOla2(La, 1 + i * 5);
    }
    for (var i = 0; i < La; i++) {
        O[i] = [];
        for (var j = 0; j < La; j++) {
            O[i][j] = 0;
            for (var o = Em; o < Ol.length; o++) {
                O[i][j] += Ol[o][i][j] / Math.pow(1.8, o + 1);
            }
        }
    }
    return O;
}

function fRuido3(La, Ca, Em) {
    var Ol = [];
    var O = [];
    var Mul = 0;
    for (var o = 0; o < Ca; o++) {
        Ol[o] = fOla3(La, Math.pow(2, o + 1 + Em));
        Mul += 1 / Math.pow(2, o + 1);
    }
    for (var i = 0; i < La; i++) {
        O[i] = [];
        for (var j = 0; j < La; j++) {
            O[i][j] = [];
            for (var k = 0; k < La; k++) {
                O[i][j][k] = 0;
                for (var o = 0; o < Ol.length; o++) {
                    O[i][j][k] += Ol[o][i][j][k] / Math.pow(2, o + 1);
                }
            }
        }
    }
    for (var i = 0; i < La; i++) {
        for (var j = 0; j < La; j++) {
            for (var k = 0; k < La; k++) {
                for (var o = 0; o < Ol.length; o++) {
                    O[i][j][k] = O[i][j][k] / Mul;
                }
            }
        }
    }
    return O;
}

function fOla1(L, C) {
    var A = [];
    var D = L / C;
    var I = Math.floor(fNumAl() * D);
    for (var i = 0; i < C; i++) {
        A[i] = fNumAl();
    }
    var A1 = [];
    for (var i = 0; i < L; i++) {
        var Pa0 = A[Math.floor((i + I) / D)];
        if (Pa0 == null) {
            A[Math.floor((i + I) / D)] = fNumAl();
            Pa0 = A[Math.floor((i + I) / D)];
        }
        var Pa1 = A[Math.floor((i + I) / D) + 1];
        if (Pa1 == null) {
            A[Math.floor((i + I) / D) + 1] = fNumAl();
            Pa1 = A[Math.floor((i + I) / D) + 1];
        }
        var Xi = ((i + I) - Math.floor((i + I) / D) * D) / D;
        A1[i] = fSm1(Xi, Pa0, Pa1);
    }
    return A1;
}

function fOla2(L, C) {
    var A = [];
    var D = L / C;
    var I = Math.floor(fNumAl() * D);
    var J = Math.floor(fNumAl() * D);
    for (var i = 0; i < C * 3; i++) {
        A[i] = [];
        for (var j = 0; j < C * 3; j++) {
            A[i][j] = fNumAl();
        }
    }


    var A1 = [];
    for (var i = 0; i < L; i++) {
        A1[i] = [];
        for (var j = 0; j < L; j++) {
            var Pa0 = A[Math.floor((i + I) / D)];
            if (Pa0 == null) {
                A[Math.floor((i + I) / D)] = [];
                for (var j = 0; j < C; j++) {
                    A[Math.floor((i + I) / D)][j] = fNumAl();
                }
                Pa0 = A[Math.floor((i + I) / D)];
            }
            var Pa1 = A[1 + Math.floor((i + I) / D)];
            if (Pa1 == null) {
                A[1 + Math.floor((i + I) / D)] = [];
                for (var j = 0; j < C; j++) {
                    A[1 + Math.floor((i + I) / D)][j] = fNumAl();
                }
                Pa1 = A[1 + Math.floor((i + I) / D)];
            }

            var Pa00 = A[Math.floor((i + I) / D)][Math.floor((j + J) / D)];
            if (Pa00 == null) {
                A[Math.floor((i + I) / D)][Math.floor((j + J) / D)] = fNumAl();
                Pa00 = A[Math.floor((i + I) / D)][Math.floor((j + J) / D)];
            }
            var Pa01 = A[Math.floor((i + I) / D)][1 + Math.floor((j + J) / D)];
            if (Pa01 == null) {
                A[Math.floor((i + I) / D)][1 + Math.floor((j + J) / D)] = fNumAl();
                Pa01 = A[Math.floor((i + I) / D)][1 + Math.floor((j + J) / D)];
            }
            var Pa10 = A[1 + Math.floor((i + I) / D)][Math.floor((j + J) / D)];
            if (Pa10 == null) {
                A[1 + Math.floor((i + I) / D)][Math.floor((j + J) / D)] = fNumAl();
                Pa10 = A[1 + Math.floor((i + I) / D)][Math.floor((j + J) / D)];
            }
            var Pa11 = A[1 + Math.floor((i + I) / D)][1 + Math.floor((j + J) / D)];
            if (Pa11 == null) {
                A[1 + Math.floor((i + I) / D)][1 + Math.floor((j + J) / D)] = fNumAl();
                Pa11 = A[1 + Math.floor((i + I) / D)][1 + Math.floor((j + J) / D)];
            }

            var Xi = ((i + I) - Math.floor((i + I) / D) * D) / D;
            var Yi = ((j + J) - Math.floor((j + J) / D) * D) / D;
            A1[i][j] = fSm2(Xi, Yi, Pa00, Pa01, Pa10, Pa11);
        }
    }
    return A1;
}

function fOla3(L, C) {
    var A = [];
    var D = L / C;
    var I = Math.floor(fNumAl() * D);
    var J = Math.floor(fNumAl() * D);
    var K = Math.floor(fNumAl() * D);
    for (var i = 0; i < C * 3; i++) {
        A[i] = [];
        for (var j = 0; j < C * 3; j++) {
            A[i][j] = [];
            for (var k = 0; k < C * 3; k++) {
                A[i][j][k] = fNumAl();
            }
        }
    }

    var A1 = [];
    for (var i = 0; i < L; i++) {
        A1[i] = [];
        for (var j = 0; j < L; j++) {
            A1[i][j] = [];
            for (var k = 0; k < L; k++) {

                var Pa000 = A[Math.floor((i + I) / D)][Math.floor((j + J) / D)][Math.floor((k + K) / D)];
                var Pa001 = A[Math.floor((i + I) / D)][Math.floor((j + J) / D)][1 + Math.floor((k + K) / D)];
                var Pa010 = A[Math.floor((i + I) / D)][1 + Math.floor((j + J) / D)][Math.floor((k + K) / D)];
                var Pa011 = A[Math.floor((i + I) / D)][1 + Math.floor((j + J) / D)][1 + Math.floor((k + K) / D)];
                var Pa100 = A[1 + Math.floor((i + I) / D)][Math.floor((j + J) / D)][Math.floor((k + K) / D)];
                var Pa101 = A[1 + Math.floor((i + I) / D)][Math.floor((j + J) / D)][1 + Math.floor((k + K) / D)];
                var Pa110 = A[1 + Math.floor((i + I) / D)][1 + Math.floor((j + J) / D)][Math.floor((k + K) / D)];
                var Pa111 = A[1 + Math.floor((i + I) / D)][1 + Math.floor((j + J) / D)][1 + Math.floor((k + K) / D)];

                var Xi = ((i + I) - Math.floor((i + I) / D) * D) / D;
                var Yi = ((j + J) - Math.floor((j + J) / D) * D) / D;
                var Zi = ((k + K) - Math.floor((k + K) / D) * D) / D;
                A1[i][j][k] = fSm3(Xi, Yi, Zi, Pa000, Pa001, Pa010, Pa011, Pa100, Pa101, Pa110, Pa111);
            }
        }
    }

    return A1;
}

function fSm1(Xs, P0, P1) {
    return (1 - 3 * Xs * Xs + 2 * Xs * Xs * Xs) * (P0 - P1) + P1;
}

function fSm2(Xs, Ys, P00, P01, P10, P11) {
    var P0 = fSm1(Xs, P00, P10);
    var P1 = fSm1(Xs, P01, P11);

    return fSm1(Ys, P0, P1);
}

function fSm3(Xs, Ys, Zs, P000, P001, P010, P011, P100, P101, P110, P111) {
    var P0 = fSm2(Xs, Ys, P000, P010, P100, P110);
    var P1 = fSm2(Xs, Ys, P001, P011, P101, P111);

    return fSm1(Zs, P0, P1);
}


function fNumAl() {
    sA = sA * sA + 1;
    while (sA > 99999999) {
        sA = Math.floor(sA / 10);
    }
    while (sA < 10000000) {
        sA = sA * 10 + 85;
    }
    var maxSA = Math.floor(sA / 1000000) * 1000000;

    return Math.floor((sA - maxSA) / 100) / 10000;
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