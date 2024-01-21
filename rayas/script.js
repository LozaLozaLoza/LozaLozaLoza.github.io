var can = document.getElementById("can");
var cv = can.getContext("2d");

var fps = 60;

var sA = Math.floor(Math.random() * 1000); //valor para el seed de el algoridmo de generacion de numeros pseudo aleatorios
//var sA = 1;
console.log(sA);

var ola1 = [];
var ola2;
var ola3;
var qO = 0;

var lim = 1;
var vLim = 0.002;
var corteZ = 0;
var vCorteZ = 0.06 * fNumAl();
console.log(vCorteZ);

var linesas = [];

function empezar() {

    var prueba = fRuido3(10, 2, 1);
    var triangulosPrueba = fSqMa3(prueba, 0.5);
    console.log(triangulosPrueba);
    //fCrearObj(triangulosPrueba, 1);

    resize();
    window.addEventListener('resize', resize, false);

    var DetCan = Math.floor(fNumAl() * 4) + 1;
    var DetEm = Math.floor(fNumAl() * 2);

    //console.log(DetCan, DetEm);

    //ola2 = fRuido3(100, DetCan, DetEm);

    var DetCan = Math.floor(fNumAl() * 4) + 1;
    var DetEm = Math.floor(fNumAl() * 2);

    //console.log(DetCan, DetEm);

    //ola3 = fRuido3(100, DetCan, DetEm);


    ola2 = fRuido3(100, 2, 0);
    ola3 = fRuido3(100, 3, 1);

    bucle();
}

function bucle() {
    cv.clearRect(0, 0, 1000, 1000);
    cv.fillStyle = "#000000";
    cv.fillRect(0, 0, 1000, 1000);
    var Ola = [];
    if (Math.floor(corteZ) == 99) {
        corteZ += vCorteZ / 10;
    } else {
        corteZ += vCorteZ;
    }
    if (corteZ >= 100) {
        if (qO == 0) {
            qO = 1;
        } else {
            qO = 0;
        }
        corteZ -= 100;
    }
    if (qO == 0) {
        for (var i = 0; i < ola2.length; i++) {
            Ola[i] = [];
            for (var j = 0; j < ola2.length; j++) {
                if (Math.floor(corteZ) == 99) {
                    Ola[i][j] = fSm1(corteZ - Math.floor(corteZ), ola2[i][j][Math.floor(corteZ)], ola3[i][j][0]);
                } else {
                    Ola[i][j] = fSm1(corteZ - Math.floor(corteZ), ola2[i][j][Math.floor(corteZ)], ola2[i][j][Math.floor(corteZ) + 1]);
                }
            }
        }
    } else {
        for (var i = 0; i < ola2.length; i++) {
            Ola[i] = [];
            for (var j = 0; j < ola2.length; j++) {
                if (Math.floor(corteZ) == 99) {
                    Ola[i][j] = fSm1(corteZ - Math.floor(corteZ), ola3[i][j][Math.floor(corteZ)], ola2[i][j][0]);
                } else {
                    Ola[i][j] = fSm1(corteZ - Math.floor(corteZ), ola3[i][j][Math.floor(corteZ)], ola3[i][j][Math.floor(corteZ) + 1]);
                }
            }
        }
    }

    /*
    for (var i = 0; i < Ola.length; i++) {
        for (var j = 0; j < Ola.length; j++) {
            cv.fillStyle = "rgb(" + Math.floor(Ola[i][j] * 256) + ", " + Math.floor(Ola[i][j] * 256) + ", " + Math.floor(Ola[i][j] * 256) + ")";
            cv.fillRect(i * 1000 / Ola.length, j * 1000 / Ola.length, 1000 / Ola.length, 1000 / Ola.length);
        }
    }
    */

    lim += vLim;
    vLim += 0;
    if (lim > 2) {
        lim = 1;
        //ola2 = fRuido2(100, 3, 1);
    }

    for (var r = 0; r < 10; r++) {
        lineas = fSqMa2(Ola, lim - r*2 / 10);
        cv.lineWidth = 10;
        cv.strokeStyle = "#00ff00";
        for (var l = 0; l < lineas.length; l++) {
            cv.beginPath();
            cv.moveTo(lineas[l].x1 * 10, lineas[l].y1 * 10);
            cv.lineTo(lineas[l].x2 * 10, lineas[l].y2 * 10);
            cv.closePath();
            cv.stroke();
        }
    }
    for (var r = 0; r < 10; r++) {
        lineas = fSqMa2(Ola, lim - (r * 2 + 1) / 10);
        cv.lineWidth = 10;
        cv.strokeStyle = "#ff00ff";
        for (var l = 0; l < lineas.length; l++) {
            cv.beginPath();
            cv.moveTo(lineas[l].x1 * 10, lineas[l].y1 * 10);
            cv.lineTo(lineas[l].x2 * 10, lineas[l].y2 * 10);
            cv.closePath();
            cv.stroke();
        }
    }

    //cv.fillStyle = "#ff0000";
    //cv.fillRect(495, 495, 10, 10);

    setTimeout(bucle, 1000/fps);
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
    var Mul = 0;
    for (var o = 0; o < Ca; o++) {
        Ol[o] = fOla2(La, Math.pow(2, o + 1 + Em));
        Mul += 1 / Math.pow(2, o + 1);
    }
    for (var i = 0; i < La; i++) {
        O[i] = [];
        for (var j = 0; j < La; j++) {
            O[i][j] = 0;
            for (var o = 0; o < Ol.length; o++) {
                O[i][j] += Ol[o][i][j] / Math.pow(2, o + 1);
            }
        }
    }
    for (var i = 0; i < La; i++) {
        for (var j = 0; j < La; j++) {
            for (var o = 0; o < Ol.length; o++) {
                O[i][j] = O[i][j] / Mul;
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
    for (var i = 0; i < C*3; i++) {
        A[i] = [];
        for (var j = 0; j < C*3; j++) {
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











function fSqMa2(M, L) {
    var Lin = [];
    for (var i = 0; i < M.length - 1; i++) {
        for (var j = 0; j < M.length - 1; j++) {
            var Aa = M[i][j];
            var Bb = M[i][j + 1];
            var Cc = M[i + 1][j];
            var Dd = M[i + 1][j + 1];

            var A = 0;
            var B = 0;
            var C = 0;
            var D = 0;

            if (Aa > L) {
                A = 1;
            } else {
                A = 0;
            }
            if (Bb > L) {
                B = 1;
            } else {
                B = 0;
            }
            if (Cc > L) {
                C = 1;
            } else {
                C = 0;
            }
            if (Dd > L) {
                D = 1;
            } else {
                D = 0;
            }

            var AB = {
                x: i,
                y: j + 0.5
            }
            var BD = {
                x: i + 0.5,
                y: j + 1
            }
            var DC = {
                x: i + 1,
                y: j + 0.5
            }
            var AC = {
                x: i + 0.5,
                y: j
            }

            AB = fCalPun2(Aa, i, j, Bb, i, j + 1, L);
            BD = fCalPun2(Bb, i, j + 1, Dd, i + 1, j + 1, L);
            DC = fCalPun2(Dd, i + 1, j + 1, Cc, i + 1, j, L);
            AC = fCalPun2(Aa, i, j, Cc, i + 1, j, L);

            if (A == 0) {
                if (B == 0) {
                    if (C == 0) {
                        if (D == 0) {
                            //NADA 0000
                        } else {
                            Lin[Lin.length] = fRaya(BD, DC);// 0001
                        }
                    } else {
                        if (D == 0) {
                            Lin[Lin.length] = fRaya(DC, AC);//0010
                        } else {
                            Lin[Lin.length] = fRaya(BD, AC);//0011
                        }
                    }
                } else {
                    if (C == 0) {
                        if (D == 0) {
                            Lin[Lin.length] = fRaya(AB, BD);//0100
                        } else {
                            Lin[Lin.length] = fRaya(AB, DC);//0101
                        }
                    } else {
                        if (D == 0) {
                            Lin[Lin.length] = fRaya(AB, BD);//0110
                        } else {
                            Lin[Lin.length] = fRaya(AB, AC);//0111
                        }
                    }
                }
            } else {
                if (B == 0) {
                    if (C == 0) {
                        if (D == 0) {
                            Lin[Lin.length] = fRaya(AC, AB);//1000
                        } else {
                            Lin[Lin.length] = fRaya(AC, AB);//1001
                            Lin[Lin.length] = fRaya(BD, DC);
                        }
                    } else {
                        if (D == 0) {
                            Lin[Lin.length] = fRaya(DC, AB);//1010
                        } else {
                            Lin[Lin.length] = fRaya(BD, AB);//1011
                        }
                    }
                } else {
                    if (C == 0) {
                        if (D == 0) {
                            Lin[Lin.length] = fRaya(AC, BD);//1100
                        } else {
                            Lin[Lin.length] = fRaya(AC, DC);//1101
                        }
                    } else {
                        if (D == 0) {
                            Lin[Lin.length] = fRaya(DC, BD);//1110
                        } else {
                            //NADA  1111
                        }
                    }
                }
            }

        }
    }

    return Lin;
}

function fSqMa3(M, L) {
    var Tri = [];
    for (var i = 0; i < M.length - 1; i++) {
        for (var j = 0; j < M.length - 1; j++) {
            for (var k = 0; k < M.length - 1; k++) {
                var Aa = M[i][j][k];
                var Bb = M[i][j][k + 1];
                var Cc = M[i][j + 1][k];
                var Dd = M[i][j + 1][k + 1];
                var Ee = M[i + 1][j][k];
                var Ff = M[i + 1][j][k + 1];
                var Gg = M[i + 1][j + 1][k];
                var Hh = M[i + 1][j + 1][k + 1];

                var A = 0;
                var B = 0;
                var C = 0;
                var D = 0;
                var E = 0;
                var F = 0;
                var G = 0;
                var H = 0;

                if (Aa > L) {
                    A = 1;
                }
                if (Bb > L) {
                    B = 1;
                }
                if (Cc > L) {
                    C = 1;
                }
                if (Dd > L) {
                    D = 1;
                }
                if (Ee > L) {
                    E = 1;
                }
                if (Ff > L) {
                    F = 1;
                }
                if (Gg > L) {
                    G = 1;
                }
                if (Hh > L) {
                    H = 1;
                }

                AB = fCalPun3(Aa, i, j, k, Bb, i, j, k + 1, L);
                AC = fCalPun3(Aa, i, j, k, Cc, i, j + 1, k, L);
                AE = fCalPun3(Aa, i, j, k, Ee, i + 1, j, k, L);
                BD = fCalPun3(Bb, i, j, k + 1, Dd, i, j + 1, k + 1, L);
                BF = fCalPun3(Bb, i, j, k + 1, Ff, i + 1, j, k + 1, L);
                CD = fCalPun3(Cc, i, j + 1, k, Dd, i, j + 1, k + 1, L);
                CG = fCalPun3(Cc, i, j + 1, k, Gg, i + 1, j + 1, k, L);
                DH = fCalPun3(Dd, i, j + 1, k + 1, Hh, i + 1, j + 1, k + 1, L);
                EF = fCalPun3(Ee, i + 1, j, k, Ff, i + 1, j, k + 1, L);
                EG = fCalPun3(Ee, i + 1, j, k, Gg, i + 1, j + 1, k, L);
                FH = fCalPun3(Ff, i + 1, j, k + 1, Hh, i + 1, j + 1, k + 1, L);
                GH = fCalPun3(Gg, i + 1, j + 1, k, Hh, i + 1, j + 1, k + 1, L);

                if (A == 0) {
                    if (B == 0) {
                        if (C == 0) {
                            if (D == 0) {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00000000
                                                //NADA
                                            } else {
                                                //00000001
                                                Tri[Tri.length] = fTriangulo(DH, FH, GH);
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00000010
                                                Tri[Tri.length] = fTriangulo(GH, CG, EG);
                                            } else {
                                                //00000011
                                                Tri[Tri.length] = fTriangulo(DH, FH, CG);
                                                Tri[Tri.length] = fTriangulo(FH, EG, CG);
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00000100
                                                Tri[Tri.length] = fTriangulo(BF, FH, EF);
                                            } else {
                                                //00000101
                                                Tri[Tri.length] = fTriangulo(BF, EF, GH);
                                                Tri[Tri.length] = fTriangulo(BF, GH, DH);
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00000110
                                                Tri[Tri.length] = fTriangulo(BF, EF, FH);
                                                Tri[Tri.length] = fTriangulo(GH, EG, CG);
                                            } else {
                                                //00000111
                                                Tri[Tri.length] = fTriangulo(BF, EF, CG);
                                                Tri[Tri.length] = fTriangulo(EF, EG, CG);
                                                Tri[Tri.length] = fTriangulo(BF, CG, DH);

                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00001000
                                                Tri[Tri.length] = fTriangulo(AE, EF, EG);
                                            } else {
                                                //00001001
                                                Tri[Tri.length] = fTriangulo(AE, EG, EF);
                                                Tri[Tri.length] = fTriangulo(DH, FH, GH);
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00001010
                                                Tri[Tri.length] = fTriangulo(AE, EF, CG);
                                                Tri[Tri.length] = fTriangulo(CG, EF, GH);
                                            } else {
                                                //00001011
                                                Tri[Tri.length] = fTriangulo(AE, EF, CG);
                                                Tri[Tri.length] = fTriangulo(CG, EF, FH);
                                                Tri[Tri.length] = fTriangulo(FH, DH, CG);
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00001100
                                                Tri[Tri.length] = fTriangulo(AE, FH, BF);
                                                Tri[Tri.length] = fTriangulo(AE, EG, BF);
                                            } else {
                                                //00001101
                                                Tri[Tri.length] = fTriangulo(AE, BF, EG);
                                                Tri[Tri.length] = fTriangulo(EG, BF, DH);
                                                Tri[Tri.length] = fTriangulo(EG, DH, GH);
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00001110
                                                Tri[Tri.length] = fTriangulo(AE, BF, CG);
                                                Tri[Tri.length] = fTriangulo(CG, BF, FH);
                                                Tri[Tri.length] = fTriangulo(CG, FH, GH);
                                            } else {
                                                //00001111
                                                Tri[Tri.length] = fTriangulo(AE, BF, DH);
                                                Tri[Tri.length] = fTriangulo(AE, DH, CG);
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00010000
                                                Tri[Tri.length] = fTriangulo(BD, DH, CD);
                                            } else {
                                                //00010001
                                                Tri[Tri.length] = fTriangulo(BD, CD, GH);
                                                Tri[Tri.length] = fTriangulo(BD, GH, FH);
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00010010
                                                Tri[Tri.length] = fTriangulo(BD, DH, CD);
                                                Tri[Tri.length] = fTriangulo(GH, EG, CG);
                                            } else {
                                                //00010011
                                                Tri[Tri.length] = fTriangulo(FH, BD, CD);
                                                Tri[Tri.length] = fTriangulo(FH, CD, CG);
                                                Tri[Tri.length] = fTriangulo(FH, CG, EG);
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00010100
                                                Tri[Tri.length] = fTriangulo(BD, CD, DH);
                                                Tri[Tri.length] = fTriangulo(BF, FH, EF);
                                            } else {
                                                //00010101
                                                Tri[Tri.length] = fTriangulo(GH, BD, CD);
                                                Tri[Tri.length] = fTriangulo(GH, BF, BD);
                                                Tri[Tri.length] = fTriangulo(GH, EF, BF);
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00010110
                                                Tri[Tri.length] = fTriangulo(BD, DH, CD);
                                                Tri[Tri.length] = fTriangulo(GH, CG, EG);
                                                Tri[Tri.length] = fTriangulo(BF, FH, EF);
                                            } else {
                                                //00010111
                                                Tri[Tri.length] = fTriangulo(CD, BF, BD);
                                                Tri[Tri.length] = fTriangulo(CD, EF, BF);
                                                Tri[Tri.length] = fTriangulo(CD, EG, EF);
                                                Tri[Tri.length] = fTriangulo(CD, CG, EG);
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00011000
                                                Tri[Tri.length] = fTriangulo(BD, DH, CD);
                                                Tri[Tri.length] = fTriangulo(AE, EF, EG);
                                            } else {
                                                //00011001
                                                Tri[Tri.length] = fTriangulo(BD, CD, GH);
                                                Tri[Tri.length] = fTriangulo(BD, GH, FH);
                                                Tri[Tri.length] = fTriangulo(AE, EF, EG);
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00011010
                                                Tri[Tri.length] = fTriangulo(BD, DH, CD);
                                                Tri[Tri.length] = fTriangulo(AE, GH, CG);
                                                Tri[Tri.length] = fTriangulo(AE, EF, GH);
                                            } else {
                                                //00011011
                                                Tri[Tri.length] = fTriangulo(BD, CD, FH);
                                                Tri[Tri.length] = fTriangulo(CD, CG, FH);
                                                Tri[Tri.length] = fTriangulo(CG, EF, FH);
                                                Tri[Tri.length] = fTriangulo(AE, EF, CG);
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00011100
                                                Tri[Tri.length] = fTriangulo(BD, DH, CD);
                                                Tri[Tri.length] = fTriangulo(AE, FH, BF);
                                                Tri[Tri.length] = fTriangulo(AE, EG, BF);
                                            } else {
                                                //00011101
                                                Tri[Tri.length] = fTriangulo(BD, CD, BF);
                                                Tri[Tri.length] = fTriangulo(CD, GH, BF);
                                                Tri[Tri.length] = fTriangulo(GH, EG, BF);
                                                Tri[Tri.length] = fTriangulo(EG, AE, BF);
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00011110
                                                Tri[Tri.length] = fTriangulo(BD, CD, DH);
                                                Tri[Tri.length] = fTriangulo(AE, BF, CG);
                                                Tri[Tri.length] = fTriangulo(CG, BF, FH);
                                                Tri[Tri.length] = fTriangulo(CG, FH, GH);
                                            } else {
                                                //00011111
                                                Tri[Tri.length] = fTriangulo(BD, CD, BF);
                                                Tri[Tri.length] = fTriangulo(BF, CD, CG);
                                                Tri[Tri.length] = fTriangulo(BF, CG, AE);
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (D == 0) {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00100000
                                                Tri[Tri.length] = fTriangulo(AC, CG, CD);
                                            } else {
                                                //00100001
                                                Tri[Tri.length] = fTriangulo(AC, CG, CD);
                                                Tri[Tri.length] = fTriangulo(DH, GH, FH);
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00100010
                                            } else {
                                                //00100011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00100100
                                            } else {
                                                //00100101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00100110
                                            } else {
                                                //00100111
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00101000
                                            } else {
                                                //00101001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00101010
                                            } else {
                                                //00101011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00101100
                                            } else {
                                                //00101101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00101110
                                            } else {
                                                //00101111
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00110000
                                            } else {
                                                //00110001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00110010
                                            } else {
                                                //00110011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00110100
                                            } else {
                                                //00110101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00110110
                                            } else {
                                                //00110111
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00111000
                                            } else {
                                                //00111001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00111010
                                            } else {
                                                //00111011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //00111100
                                            } else {
                                                //00111101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //00111110
                                            } else {
                                                //00111111
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (C == 0) {
                            if (D == 0) {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01000000
                                            } else {
                                                //01000001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01000010
                                            } else {
                                                //01000011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01000100
                                            } else {
                                                //01000101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01000110
                                            } else {
                                                //01000111
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01001000
                                            } else {
                                                //01001001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01001010
                                            } else {
                                                //01001011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01001100
                                            } else {
                                                //01001101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01001110
                                            } else {
                                                //01001111
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01010000
                                            } else {
                                                //01010001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01010010
                                            } else {
                                                //01010011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01010100
                                            } else {
                                                //01010101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01010110
                                            } else {
                                                //01010111
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01011000
                                            } else {
                                                //01011001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01011010
                                            } else {
                                                //01011011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01011100
                                            } else {
                                                //01011101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01011110
                                            } else {
                                                //01011111
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (D == 0) {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01100000
                                            } else {
                                                //01100001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01100010
                                            } else {
                                                //01100011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01100100
                                            } else {
                                                //01100101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01100110
                                            } else {
                                                //01100111
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01101000
                                            } else {
                                                //01101001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01101010
                                            } else {
                                                //01101011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01101100
                                            } else {
                                                //01101101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01101110
                                            } else {
                                                //01101111
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01110000
                                            } else {
                                                //01110001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01110010
                                            } else {
                                                //01110011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01110100
                                            } else {
                                                //01110101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01110110
                                            } else {
                                                //01110111
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01111000
                                            } else {
                                                //01111001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01111010
                                            } else {
                                                //01111011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //01111100
                                            } else {
                                                //01111101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //01111110
                                            } else {
                                                //01111111
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (B == 0) {
                        if (C == 0) {
                            if (D == 0) {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10000000
                                            } else {
                                                //10000001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10000010
                                            } else {
                                                //10000011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10000100
                                            } else {
                                                //10000101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10000110
                                            } else {
                                                //10000111
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10001000
                                            } else {
                                                //10001001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10001010
                                            } else {
                                                //10001011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10001100
                                            } else {
                                                //10001101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10001110
                                            } else {
                                                //10001111
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10010000
                                            } else {
                                                //10010001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10010010
                                            } else {
                                                //10010011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10010100
                                            } else {
                                                //10010101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10010110
                                            } else {
                                                //10010111
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10011000
                                            } else {
                                                //10011001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10011010
                                            } else {
                                                //10011011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10011100
                                            } else {
                                                //10011101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10011110
                                            } else {
                                                //10011111
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (D == 0) {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10100000
                                            } else {
                                                //10100001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10100010
                                            } else {
                                                //10100011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10100100
                                            } else {
                                                //10100101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10100110
                                            } else {
                                                //10100111
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10101000
                                            } else {
                                                //10101001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10101010
                                            } else {
                                                //10101011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10101100
                                            } else {
                                                //10101101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10101110
                                            } else {
                                                //10101111
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10110000
                                            } else {
                                                //10110001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10110010
                                            } else {
                                                //00110011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10110100
                                            } else {
                                                //10110101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10110110
                                            } else {
                                                //10110111
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10111000
                                            } else {
                                                //10111001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10111010
                                            } else {
                                                //10111011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //10111100
                                            } else {
                                                //10111101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //10111110
                                            } else {
                                                //10111111
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (C == 0) {
                            if (D == 0) {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11000000
                                            } else {
                                                //11000001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11000010
                                            } else {
                                                //11000011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11000100
                                            } else {
                                                //11000101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11000110
                                            } else {
                                                //11000111
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11001000
                                            } else {
                                                //11001001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11001010
                                            } else {
                                                //11001011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11001100
                                            } else {
                                                //11001101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11001110
                                            } else {
                                                //11001111
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11010000
                                            } else {
                                                //11010001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11010010
                                            } else {
                                                //11010011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11010100
                                            } else {
                                                //11010101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11010110
                                            } else {
                                                //11010111
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11011000
                                            } else {
                                                //11011001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11011010
                                            } else {
                                                //11011011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11011100
                                            } else {
                                                //11011101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11011110
                                            } else {
                                                //11011111
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (D == 0) {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11100000
                                            } else {
                                                //11100001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11100010
                                            } else {
                                                //11100011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11100100
                                            } else {
                                                //11100101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11100110
                                            } else {
                                                //11100111
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11101000
                                            } else {
                                                //11101001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11101010
                                            } else {
                                                //11101011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11101100
                                            } else {
                                                //11101101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11101110
                                            } else {
                                                //11101111
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (E == 0) {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11110000
                                            } else {
                                                //11110001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11110010
                                            } else {
                                                //11110011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11110100
                                            } else {
                                                //11110101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11110110
                                            } else {
                                                //11110111
                                            }
                                        }
                                    }
                                } else {
                                    if (F == 0) {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11111000
                                            } else {
                                                //11111001
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11111010
                                            } else {
                                                //11111011
                                            }
                                        }
                                    } else {
                                        if (G == 0) {
                                            if (H == 0) {
                                                //11111100
                                            } else {
                                                //11111101
                                            }
                                        } else {
                                            if (H == 0) {
                                                //11111110
                                            } else {
                                                //11111111
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


            }
        }
    }

    return Tri;
}

function fCrearObj(T, E) {
    /*
    for (var i = 0; i < detalle; i++) {
        for (var j = 0; j < detalle; j++) {
            document.write("<p>v " + puntos[i][j].x + " " + puntos[i][j].y + " " + puntos[i][j].z + "</p>");
        }
    }
    for (var i = 0; i < detalle - 1; i++) {
        for (var j = 0; j < detalle - 1; j++) {
            document.write("<p>f " + (i * detalle + j + 1) + " " + (i * detalle + j + 1 + 1) + " " + ((i + 1) * detalle + j + 1 + 1) + "</p>");
            document.write("<p>f " + (i * detalle + j + 1) + " " + ((i + 1) * detalle + j + 1 + 1) + " " + ((i + 1) * detalle + j + 1) + "</p>");
        }
    }
    */

    for (var t = 0; t < T.length; t++) {
        document.write("<p>v " + E * T[t].x1 + " " + E * T[t].y1 + " " + E * T[t].z1 + "</p>");
        document.write("<p>v " + E * T[t].x2 + " " + E * T[t].y2 + " " + E * T[t].z2 + "</p>");
        document.write("<p>v " + E * T[t].x3 + " " + E * T[t].y3 + " " + E * T[t].z3 + "</p>");
    }
    for (var t = 0; t < T.length; t++) {
        document.write("<p>f " + (t * 3 + 1) + " " + (t * 3 + 2) + " " + (t * 3 + 3) + "</p>");
    }
}



function fRaya(A, B) {
    return { x1: A.x, y1: A.y, x2: B.x, y2: B.y };
}

function fTriangulo(A, B, C) {
    return { x1: A.x, y1: A.y, z1: A.z, x2: B.x, y2: B.y, z2: B.z, x3: C.x, y3: C.y, z3: C.z };
}

function fCalPun2(A, Ax, Ay, B, Bx, By, L) {
    var T = (L - A) / (B - A);
    return { x: Ax + (Bx - Ax) * T, y: Ay + (By - Ay) * T };
}

function fCalPun3(A, Ax, Ay, Az, B, Bx, By, Bz, L) {
    var T = (L - A) / (B - A);
    return { x: Ax + (Bx - Ax) * T, y: Ay + (By - Ay) * T, z: Az + (Bz - Az) * T };
}



function fNumAl() {
    sA = sA * sA + 1;
    while (sA > 99999999) {
        sA = Math.floor(sA / 10);
    }
    while (sA < 10000000) {
        sA = sA * 10;
    }
    var maxSA = Math.floor(sA / 1000000) * 1000000;

    return Math.floor((sA - maxSA) / 100) / 10000;
}