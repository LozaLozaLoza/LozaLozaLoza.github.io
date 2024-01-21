var can = document.getElementById("can");
var cv = can.getContext("2d");

function empezar() {

    resize();
    window.addEventListener('resize', resize, false);
}

function klik() {
    window.open("C:/000/programacion/JavaScript/colores/imagen%20automara/index.html", "_self");
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