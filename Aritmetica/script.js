// script.js
const galderaErakuslea = document.getElementById('galderaErakuslea');
const sarreraErakuslea = document.getElementById('sarreraErakuslea');
const puntuazioErakuslea = document.getElementById('puntuazioErakuslea');
const denboraBarra = document.getElementById('denboraBarra');
const mateArbela = document.querySelector('.mate-arbela');
const amaieraGainjartzea = document.getElementById('amaieraGainjartzea');
const azkenPuntuazioa = document.getElementById('azkenPuntuazioa');
const azkenEragiketa = document.getElementById('azkenEragiketa');
const berriroBotoia = document.getElementById('berriroBotoia');
const mailaErakuslea = document.getElementById('mailaErakuslea');
const teklak = document.querySelectorAll('.tekla');

// PARAMETROAK
const PROBABILITATE_OINARRIA = 1.5;

// Egoeraren aldagaiak
let puntuazioa = 0;
let unekoErantzuna = null;
let unekoSarrera = "";
let tenporizadorea = null;
let geratzenDenDenbora = 60000;
const gehienezkoDenboraBisuala = 60000;
let unekoMailakoEragiketak = 2;

const ZIGORRA = 5000;
const SARIA = 2000;
const MAILA_IGOTZEKO_SARIA = 20000;

const ERAGIKETAK = ['+', '-', '*', '/', 'MKT', 'ZKH'];

function lortuZkh(a, b) {
    return b === 0 ? a : lortuZkh(b, a % b);
}

function lortuMkt(a, b) {
    return (a * b) / lortuZkh(a, b);
}

function kalkulatuEragiketaKopurua(puntuak) {
    if (puntuak < 10) return 2;
    if (puntuak < 30) return 3;
    if (puntuak < 60) return 4;
    if (puntuak < 100) return 5;
    return 6;
}

function hasiJokoa() {
    puntuazioa = 0;
    geratzenDenDenbora = 60000;
    unekoSarrera = "";
    unekoMailakoEragiketak = 2;
    puntuazioErakuslea.textContent = puntuazioa;
    amaieraGainjartzea.style.display = "none";
    sarreraErakuslea.textContent = "";

    clearInterval(tenporizadorea);
    tenporizadorea = setInterval(jokoBegizta, 50);

    sortuGaldera();
}

function jokoBegizta() {
    geratzenDenDenbora -= 50;
    if (geratzenDenDenbora <= 0) {
        geratzenDenDenbora = 0;
        amaituJokoa();
    }
    eguneratuDenboraBisualak();
}

function eguneratuDenboraBisualak() {
    const x = geratzenDenDenbora;
    const M = gehienezkoDenboraBisuala;
    const A = 0.1;

    let denboraBisuala = x * (1 + ((1 - A) / M) * (x - M));
    let ehunekoa = (denboraBisuala / M) * 100;

    if (ehunekoa > 100) ehunekoa = 100;
    if (ehunekoa < 0) ehunekoa = 0;

    denboraBarra.style.width = ehunekoa + '%';

    if (geratzenDenDenbora < 15000) {
        denboraBarra.classList.add('abisua');
    } else {
        denboraBarra.classList.remove('abisua');
    }
}

function amaituJokoa() {
    clearInterval(tenporizadorea);
    azkenPuntuazioa.textContent = puntuazioa;
    azkenEragiketa.textContent = galderaErakuslea.textContent + ' = ' + unekoErantzuna;
    amaieraGainjartzea.style.display = "flex";
}

function lortuEragiketaEskuragarriak() {
    let n = kalkulatuEragiketaKopurua(puntuazioa);

    if (n === 2) mailaErakuslea.textContent = "1. Maila (+, -)";
    else if (n === 3) mailaErakuslea.textContent = "2. Maila (Gehitu *)";
    else if (n === 4) mailaErakuslea.textContent = "3. Maila (Gehitu /)";
    else if (n === 5) mailaErakuslea.textContent = "4. Maila (Gehitu MKT)";
    else mailaErakuslea.textContent = "5. Maila (Gehitu ZKH)";

    return ERAGIKETAK.slice(0, n);
}

function aukeratuAusazkoEragiketa() {
    const eragiketak = lortuEragiketaEskuragarriak();
    const n = eragiketak.length;

    let pisuak = eragiketak.map((_, index) => Math.pow(PROBABILITATE_OINARRIA, n - 1 - index));
    let pisuOsoa = pisuak.reduce((batura, p) => batura + p, 0);

    let ausazkoZenbakia = Math.random() * pisuOsoa;
    let metatua = 0;

    for (let i = 0; i < pisuak.length; i++) {
        metatua += pisuak[i];
        if (ausazkoZenbakia <= metatua) {
            return eragiketak[i];
        }
    }

    return eragiketak[eragiketak.length - 1];
}

function sortuGaldera() {
    const erag = aukeratuAusazkoEragiketa();

    let gehienezkoOinarria = 10 + Math.floor(puntuazioa * 0.9);
    let a, b, c;

    switch (erag) {
        case '+':
            a = Math.floor(Math.random() * gehienezkoOinarria) + 1;
            b = Math.floor(Math.random() * gehienezkoOinarria) + 1;
            unekoErantzuna = a + b;
            galderaErakuslea.textContent = a + ' + ' + b;
            break;
        case '-':
            a = Math.floor(Math.random() * gehienezkoOinarria) + 1;
            b = Math.floor(Math.random() * gehienezkoOinarria) + 1;
            c = a + b;
            unekoErantzuna = a;
            galderaErakuslea.textContent = c + ' - ' + b;
            break;
        case '*':
            let gehienezkoBiderketa = Math.max(4, Math.floor(gehienezkoOinarria / 2));
            a = Math.floor(Math.random() * gehienezkoBiderketa) + 2;
            b = Math.floor(Math.random() * gehienezkoBiderketa) + 2;
            unekoErantzuna = a * b;
            galderaErakuslea.textContent = a + ' * ' + b;
            break;
        case '/':
            let gehienezkoZatiketa = Math.max(4, Math.floor(gehienezkoOinarria / 2));
            a = Math.floor(Math.random() * gehienezkoZatiketa) + 2;
            b = Math.floor(Math.random() * gehienezkoZatiketa) + 2;
            c = a * b;
            unekoErantzuna = a;
            galderaErakuslea.textContent = c + ' / ' + b;
            break;
        case 'MKT':
            let gehienezkoMkt = Math.max(3, Math.floor(gehienezkoOinarria / 4));
            a = Math.floor(Math.random() * gehienezkoMkt) + 2;
            b = Math.floor(Math.random() * gehienezkoMkt) + 2;
            unekoErantzuna = lortuMkt(a, b);
            galderaErakuslea.textContent = 'MKT(' + a + ',' + b + ')';
            break;
        case 'ZKH':
            let faktorea = Math.floor(Math.random() * Math.max(3, Math.floor(gehienezkoOinarria / 5))) + 2;
            let biderk1 = Math.floor(Math.random() * 4) + 1;
            let biderk2 = Math.floor(Math.random() * 4) + 1;
            a = faktorea * biderk1;
            b = faktorea * biderk2;
            unekoErantzuna = lortuZkh(a, b);
            galderaErakuslea.textContent = 'ZKH(' + a + ',' + b + ')';
            break;
    }
}

function kudeatuSarrera(balioa) {
    if (balioa === 'del') {
        unekoSarrera = unekoSarrera.slice(0, -1);
    } else if (balioa === 'ok') {
        if (unekoSarrera === "") return;
        egiaztatuErantzuna();
    } else {
        if (unekoSarrera.length < 5) {
            unekoSarrera += balioa;
        }
    }
    sarreraErakuslea.textContent = unekoSarrera;
}

function egiaztatuErantzuna() {
    if (parseInt(unekoSarrera) === unekoErantzuna) {
        puntuazioa++;
        geratzenDenDenbora += SARIA;

        let mailaBerrikoEragiketak = kalkulatuEragiketaKopurua(puntuazioa);
        if (mailaBerrikoEragiketak > unekoMailakoEragiketak) {
            geratzenDenDenbora += MAILA_IGOTZEKO_SARIA;
            unekoMailakoEragiketak = mailaBerrikoEragiketak;
        }

        if (geratzenDenDenbora > gehienezkoDenboraBisuala) {
            geratzenDenDenbora = gehienezkoDenboraBisuala;
        }

        puntuazioErakuslea.textContent = puntuazioa;

        mateArbela.classList.add('zuzena');
        setTimeout(() => mateArbela.classList.remove('zuzena'), 150);

        unekoSarrera = "";
        sortuGaldera();
    } else {
        geratzenDenDenbora -= ZIGORRA;

        mateArbela.classList.add('okerra');
        setTimeout(() => mateArbela.classList.remove('okerra'), 150);

        unekoSarrera = "";
    }
    sarreraErakuslea.textContent = unekoSarrera;
}

// Pantailako teklatuaren integrazioa
teklak.forEach(tekla => {
    tekla.addEventListener('click', (e) => {
        e.preventDefault();
        kudeatuSarrera(tekla.dataset.val);
    });
});

// Ordenagailuko teklatuaren integrazioa
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        kudeatuSarrera(e.key);
    }
    else if (e.key === 'Backspace') {
        kudeatuSarrera('del');
    }
    else if (e.key === 'Enter') {
        if (amaieraGainjartzea.style.display === "flex") {
            hasiJokoa();
        } else {
            kudeatuSarrera('ok');
        }
    }
});

berriroBotoia.addEventListener('click', hasiJokoa);

hasiJokoa();