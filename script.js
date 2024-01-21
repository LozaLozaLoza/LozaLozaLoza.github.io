var can = document.getElementById("can");
var cv = can.getContext("2d");

function empezar() {

    dibujar();

    resize();
    window.addEventListener('resize', resize, false);
}

var margenA = 100;
var margenB = 100;

function dibujar() {
    cv.fillStyle = "#000000";
    cv.fillRect(margenA, margenB, 1000 - 2 * margenA, 1000 / 3 - 2 * margenB);
    cv.fillRect(margenA, margenB + 1000 / 3, 1000 - 2 * margenA, 1000 / 3 - 2 * margenB);
    cv.fillRect(margenA, margenB + 2 * 1000 / 3, 1000 - 2 * margenA, 1000 / 3 - 2 * margenB);
    cv.font = "50px Arial";
    cv.fillStyle = "#ffff00";
    cv.textAlign = "center";
    cv.fillText("Patrones de camuflaje", 500, margenB + 75);
    cv.fillText("Rayas dinamicas", 500, margenB + 1000 / 3 + 75);
    cv.fillText("Automata celular", 500, margenB + 2 * 1000 / 3 + 75);
}

function klik(event) {
    var ratx, raty;
    if (window.innerWidth < window.innerHeight) {
        var t = (window.innerHeight - window.innerWidth - 0) / 2;
        ratx = event.clientX * 1000 / window.innerWidth;
        raty = 1000 * (event.clientY - t) / (window.innerHeight - 2 * t);
    } else {
        var t = (window.innerWidth - window.innerHeight - 0) / 2;
        raty = event.clientY * 1000 / window.innerHeight;
        ratx = 1000 * (event.clientX - t) / (window.innerWidth - 2 * t);
    }
    console.log(raty);
    if (raty < 330) {
        window.open("camuflaje/index.html", "_self");
    } else {
        if (raty < 660) {
            window.open("rayas/index.html", "_self");
        } else {
            window.open("automata/index.html", "_self");
        }
    }
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