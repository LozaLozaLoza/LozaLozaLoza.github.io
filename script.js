
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
    console.log(xInicio / window.innerWidth);
}

//  Maneja el final de un toque en pantalla
function manejarFinalToque(evt) {
    var xFinal = obtenerPosicionEnCanvas(evt).x;
    console.log(xFinal / window.innerWidth);
    console.log((xFinal - xInicio) / window.innerWidth);
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


    contexto.fillStyle = "#C2729D";

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

const preguntas = [
    {
        numero: 1,
        tema: "En las centrales eléctricas",
        A: {
            enunciado: "La energía eléctrica producida es elevada a una tensión superior para ser transportada.",
            respuesta: true,
            explicacion: "Con el objeto de transportarla a grandes distancias, la energía producida por las centrales eléctricas se eleva a tensiones superiores para reducir las pérdidas en las líneas eléctricas."
        },
        B: {
            enunciado: "La frecuencia de las tensiones generadas debe ser constante.",
            respuesta: true,
            explicacion: "Todas las centrales deben producir tensiones de la misma frecuencia, ya que el sistema eléctrico debe funcionar a frecuencia constante (50 Hz en Europa o 60 Hz en América)."
        }
    },
    {
        numero: 2,
        tema: "En los sistemas de distribución",
        A: {
            enunciado: "Habitualmente puede haber niveles de tensión de 220 kV.",
            respuesta: false,
            explicacion: "220 kV es un nivel de tensión englobado dentro de las redes de transporte."
        },
        B: {
            enunciado: "Habitualmente, los grandes consumidores pueden estar conectados a niveles de ten-sión de 30 kV.",
            respuesta: true,
            explicacion: "A los grandes consumidores les suele interesar económicamente conectarse a niveles de ten-sión superiores a BT (por ejemplo, 30 kV), y ellos mismos se encargan con sus propias su-bestaciones o centros de transformación de transformar la tensión a los niveles que necesiten."
        }
    },
    {
        numero: 3,
        tema: "Respecto a los sistemas de transporte de energía eléctrica",
        A: {
            enunciado: "Las líneas aéreas son las más utilizadas.",
            respuesta: true,
            explicacion: "Para el transporte a grandes distancias, por motivos técnicos y económicos, las líneas aéreas son más adecuadas que las subterráneas, siendo estas últimas ampliamente utiliza-das en sistemas de distribución en zonas urbanas. 54"
        },
        B: {
            enunciado: "Normalmente unen subestaciones situadas a poca distancia.",
            respuesta: false,
            explicacion: "Precisamente el objetivo de las líneas de transporte es el transporte de la energía eléctrica a grandes distancias, uniendo entre sí subestaciones localizadas en zonas muy alejadas."
        }
    },
    {
        numero: 4,
        tema: "En el diseño de los sistemas eléctricos de potencia",
        A: {
            enunciado: "Los transformadores de potencia permiten adaptar los niveles de frecuencia de cada parte del sistema.",
            respuesta: false,
            explicacion: "Los transformadores de potencia adaptan los valores eficaces de los diferentes niveles de tensión del sistema, pero mantienen la misma frecuencia."
        },
        B: {
            enunciado: "La energía generada en los generadores debe ser mayor que la consumida por los consumidores.",
            respuesta: true,
            explicacion: "Además de generar energía eléctrica para garantizar en todo momento la cobertura de la demanda, se deben cubrir las pérdidas que aparecen en el sistema eléctrico, por lo que la energía eléctrica generada debe ser mayor que la consumida por los clientes finales."
        }
    },
    {
        numero: 5,
        tema: "En relación con los elementos de un sistema eléctrico",
        A: {
            enunciado: "Los transformadores de potencia se deben colocar siempre que se superen determi-nadas distancias kilométricas.",
            respuesta: false,
            explicacion: "La función de los transformadores de potencia no está relacionada con las distancias a las que transportar la energía eléctrica, sino con los niveles de tensión que cada compañía eléctrica estime oportuno y eficiente."
        },
        B: {
            enunciado: "Las líneas se dividen en líneas de transporte y líneas de distribución en función de su nivel de tensión.",
            respuesta: true,
            explicacion: "Las líneas de distribución utilizan niveles de tensión inferiores a las líneas de transporte (n220 kV). Principios fundamentales. Pruebas de autoevaluación teórica 55"
        }
    },
    {
        numero: 6,
        tema: "En las máquinas eléctricas rotativas",
        A: {
            enunciado: "En los motores asíncronos trifásicos, el inductor es el rotor.",
            respuesta: false,
            explicacion: "Los motores asíncronos trifásicos generan el campo magnético rotativo, según el teorema de Ferraris, alimentando las bobinas del estator con corriente alterna. Por tanto, el inductor es el estator."
        },
        B: {
            enunciado: "En los generadores síncronos, el inducido es el estator.",
            respuesta: true,
            explicacion: "En los generadores síncronos, el campo magnético rotativo induce tensiones en las bobinas del estator. Por tanto, el estator es el elemento inducido."
        }
    },
    {
        numero: 7,
        tema: "En las máquinas eléctricas",
        A: {
            enunciado: "Es necesaria la presencia de un campo magnético para realizar el proceso de trans-formación de la energía.",
            respuesta: true,
            explicacion: "Tanto en los transformadores (ley de Lenz) como en los generadores (ley de Faraday), así como en los motores (ley de Laplace), se precisa de la presencia de un campo magnético que relacione los diferentes devanados y posibilite la transmisión de energía entre ellos."
        },
        B: {
            enunciado: "Siempre hay una conversión de energía mecánica en energía eléctrica o de energía eléctrica en energía mecánica.",
            respuesta: false,
            explicacion: "En los transformadores de potencia, la conversión es de energía eléctrica a un nivel de ten-sión en energía eléctrica a otro nivel de tensión."
        }
    },
    {
        numero: 8,
        tema: "Respecto al bobinado de un electroimán",
        A: {
            enunciado: "Si se alimenta con corriente continua, la posición de los polos no se modifica.",
            respuesta: true,
            explicacion: "Al estar recorrido el bobinado por corriente continua, el campo magnético generado es constante en el tiempo, por lo que los polos mantienen su posición física en el imán. 56"
        },
        B: {
            enunciado: "Si se alimenta con corriente alterna, el sentido de las líneas de fuerza del campo magnético no se modifica.",
            respuesta: false,
            explicacion: "Las líneas de fuerza modifican su sentido en función del cambio de polaridad de la co-rriente alterna."
        }
    },
    {
        numero: 9,
        tema: "En un electroimán creado a partir de una barra de material ferromagnético sobre la que se enrolla una bobina de N espiras, al circular corriente por las espiras",
        A: {
            enunciado: "El inductor lo forman las espiras y el inducido la barra de material ferromagnético.",
            respuesta: false,
            explicacion: "Las espiras sirven para crear un campo magnético, mientras que el núcleo de material fe-rromagnético se emplea para disminuir la reluctancia y, en consecuencia, disminuir el va-lor de intensidad necesaria para crear un determinado campo magnético."
        },
        B: {
            enunciado: "El circuito magnético lo conforman la barra de material ferromagnético y el aire que lo rodea.",
            respuesta: true,
            explicacion: "Tal y como se observa en la Figura 2.1, el recorrido del flujo magnético se cierra a través de los dos materiales (aire y material ferromagnético). FIGURA 2.1."
        }
    },
    {
        numero: 10,
        tema: "En las máquinas eléctricas rotativas",
        A: {
            enunciado: "No hay circuito magnético.",
            respuesta: false,
            explicacion: "En una máquina rotativa siempre debe haber un circuito magnético que posibilite la circu-lación del flujo magnético por la máquina. Este circuito suele estar formado por el rotor, el entrehierro y el estator. Principios fundamentales. Pruebas de autoevaluación teórica 57"
        },
        B: {
            enunciado: "Las bobinas sólo se colocan en el estator.",
            respuesta: false,
            explicacion: "Además de en el estator, también se colocan en el rotor para que, en función del tipo de máquina, realicen las funciones de inductor o de inducido."
        }
    },
    {
        numero: 11,
        tema: "En cuanto a la composición de las máquinas eléctricas",
        A: {
            enunciado: "Los autotransformadores están constituidos por dos circuitos eléctricos magnética-mente unidos y eléctricamente separados.",
            respuesta: false,
            explicacion: "En un autotransformador, los circuitos primario y secundario están unidos eléctricamente y presentan un devanado común."
        },
        B: {
            enunciado: "En las máquinas asíncronas con rotor de jaula de ardilla, los circuitos eléctricos es-tán formados mediante el arrollamiento de espiras.",
            respuesta: false,
            explicacion: "En las máquinas asíncronas con rotor de jaula de ardilla el circuito eléctrico del rotor está constituido por barras conductoras, distribuidas por la periferia y cortocircuitadas en sus extremos."
        }
    },
    {
        numero: 12,
        tema: "En relación con los diferentes sistemas constitutivos de las máquinas eléc-tricas",
        A: {
            enunciado: "La función del sistema aislante en los transformadores sumergidos en baño de aceite consiste en la refrigeración y aislamiento de aquéllos.",
            respuesta: true,
            explicacion: "La función del sistema aislante en los transformadores sumergidos en aceite es proporcio-nar una rigidez dieléctrica suficiente entre las diferentes partes activas, así como ser el ele-mento conductivo del calor hacia la envolvente del transformador, en donde habitualmente existen aletas de refrigeración."
        },
        B: {
            enunciado: "Sus sistemas de protección deben garantizar que cualquier fallo interno no produzca perturbaciones o solicitaciones excesivas en los sistemas externos.",
            respuesta: true,
            explicacion: "El objetivo de los sistemas de protección es, en primer lugar, proteger la propia máquina y, en segundo lugar, que el posible fallo que pudiera producirse no acabe afectando al siste-ma externo al cual está conectada dicha máquina. 58"
        }
    },
    {
        numero: 13,
        tema: "En relación con los sistemas constructivos de los transformadores",
        A: {
            enunciado: "El sistema aislante permite transformar el nivel de tensión del primario al secun-dario.",
            respuesta: false,
            explicacion: "El sistema aislante no tiene la función de transformar los niveles de tensión, sino de aislar las diferentes partes activas."
        },
        B: {
            enunciado: "El sistema de refrigeración necesita incorporar un ventilador para evacuar el calor generado en la máquina.",
            respuesta: false,
            explicacion: "No siempre es necesario un ventilador, aunque en ocasiones de gran necesidad de disipa-ción de calor sí ayuda a mejorar la refrigeración."
        }
    },
    {
        numero: 14,
        tema: "En relación con el flujo magnético, se puede afirmar que",
        A: {
            enunciado: "Su símil eléctrico es la tensión.",
            respuesta: false,
            explicacion: "El símil eléctrico del flujo magnético es la corriente eléctrica, mientras que el símil eléctri-co de la fuerza magnetomotriz es la tensión aplicada."
        },
        B: {
            enunciado: "Se mide en weber.",
            respuesta: true,
            explicacion: "Su unidad de medida en el SI es el weber, utilizándose en ocasiones también el gauss."
        }
    },
    {
        numero: 15,
        tema: "Respecto a la permeabilidad, se puede afirmar que",
        A: {
            enunciado: "Vale 1 H/m en el caso de que el material sea el aire.",
            respuesta: false,
            explicacion: "La permeabilidad del aire es constante y de valor 4n . 10.7 H/m."
        },
        B: {
            enunciado: "Un valor elevado de la misma reduce la reluctancia del circuito magnético.",
            respuesta: true,
            explicacion: "Esto es así debido a que la reluctancia es inversamente proporcional a la permeabilidad. � % L k . S Principios fundamentales. Pruebas de autoevaluación teórica 59"
        }
    },
    {
        numero: 16,
        tema: "En cuanto a la intensidad de campo magnético",
        A: {
            enunciado: "Representa el flujo por unidad de longitud que existe en un circuito magnético.",
            respuesta: false,
            explicacion: "Lo que realmente representa es el reparto longitudinal de la fuerza magnetomotriz por el circuito magnético."
        },
        B: {
            enunciado: "Su valor depende de la reluctancia del circuito magnético.",
            respuesta: false,
            explicacion: "Según se observa en la ecuación inferior, su valor depende de la longitud del circuito mag-nético, del número de espiras y de la corriente que circula por ellas, pero es independiente del tipo de material magnético utilizado para la construcción del circuito. H % N . I L"
        }
    },
    {
        numero: 17,
        tema: "Sobre la reluctancia de un circuito magnético, se puede afirmar que",
        A: {
            enunciado: "No depende del valor del flujo que circula por el circuito magnético.",
            respuesta: false,
            explicacion: "La reluctancia depende inversamente de la permeabilidad y ésta depende del grado de sa-turación con que trabaja el circuito magnético."
        },
        B: {
            enunciado: "Su símil eléctrico es la reactancia inductiva.",
            respuesta: false,
            explicacion: "El símil eléctrico de la reluctancia es la resistencia eléctrica."
        }
    },
    {
        numero: 18,
        tema: "Tomando en consideración los materiales utilizados en circuitos magnéti-cos",
        A: {
            enunciado: "Los materiales diamagnéticos son los mayoritariamente utilizados en las máquinas eléctricas.",
            respuesta: false,
            explicacion: "Los materiales diamagnéticos son peores conductores del flujo que el aire. En las máqui-nas eléctricas se utilizan materiales ferromagnéticos. 60"
        },
        B: {
            enunciado: "En los materiales amagnéticos, su permeabilidad es igual a la unidad.",
            respuesta: false,
            explicacion: "Su permeabilidad relativa sí es igual a la unidad, pero su permeabilidad absoluta es igual a la del aire (4n . 10.7 H/m)."
        }
    },
    {
        numero: 19,
        tema: "Dentro de las leyes fundamentales del electromagnetismo",
        A: {
            enunciado: "La ley de Lenz justifica el principio de funcionamiento del transformador de po-tencia.",
            respuesta: true,
            explicacion: "Según la ley de Lenz, se establece la fuerza electromotriz inducida en los bobinados del transformador."
        },
        B: {
            enunciado: "La ley de Faraday justifica el principio de funcionamiento de los generadores.",
            respuesta: true,
            explicacion: "La ley de Faraday permite definir y calcular el valor de las tensiones inducidas en un gene-rador."
        }
    },
    {
        numero: 20,
        tema: "Considerando los postulados de la ley de Laplace",
        A: {
            enunciado: "Si el conductor se encuentra alineado con el campo magnético, la fuerza mecánica que aparece es máxima.",
            respuesta: false,
            explicacion: "La fuerza mecánica inducida es nula en ese caso. La fuerza máxima se consigue cuando el campo magnético y el conductor están a 90o. F % I . B . L . sen h"
        },
        B: {
            enunciado: "Al moverse el conductor, también se puede aplicar la ley de Faraday.",
            respuesta: true,
            explicacion: "Sí, puesto que el movimiento de un conductor en el seno de un campo magnético implica, según la ley de Faraday, la inducción de una tensión en él. VAB % E % v . B . L . sen h Principios fundamentales. Pruebas de autoevaluación teórica 61"
        }
    },
    {
        numero: 21,
        tema: "Un conductor rectilíneo (ubicado sobre el eje z) se encuentra inmerso en un campo magnético caracterizado por una inducción B de valor constante que sigue la dirección del eje y.",
        A: {
            enunciado: "Si el conductor se desplaza en la dirección del eje x a velocidad constante, no se in-duce tensión en sus extremos.",
            respuesta: false,
            explicacion: "Según la ley de Faraday, sí se induce tensión y además, en este caso, es máxima. VAB % E % v . B . L . sen h"
        },
        B: {
            enunciado: "Si el conductor se desplaza en la dirección del campo, la tensión inducida en los ex-tremos del conductor es máxima.",
            respuesta: false,
            explicacion: "En ese caso, según la ley de Faraday, la tensión inducida es nula. VAB % E % v . B . L . sen h"
        }
    },
    {
        numero: 22,
        tema: "Por el interior de una espira circula un flujo que varía sinusoidalmente a lo largo del tiempo.",
        A: {
            enunciado: "La tensión instantánea inducida en la espira alcanza su valor máximo en el instante en que el flujo que atraviesa la espira es máximo.",
            respuesta: false,
            explicacion: "Según la aplicación de la ley de Lenz, el valor de la tensión inducida es máximo cuando el flujo pasa por cero, ya que el flujo y la f.e.m. se encuentran desfasados 90o. e(t) %.N . dr(t) dt"
        },
        B: {
            enunciado: "Si la espira se cierra sobre una impedancia, la intensidad que circula por la espira tiende a reforzar en cada instante la variación del flujo que se produce.",
            respuesta: false,
            explicacion: "El efecto es justo el contrario. Según la ley de Lenz, la intensidad circulante tiende a gene-rar una fuerza magnetomotriz que se opone a la variación del flujo. 62"
        }
    },
    {
        numero: 23,
        tema: "En relación con la rueda de Barlow",
        A: {
            enunciado: "Para analizar su modo de funcionamiento como motor no es necesario aplicar la ley de Faraday.",
            respuesta: false,
            explicacion: "Precisamente se aplica la ley de de Faraday para poder conocer la fuerza electromotriz ne-cesaria para definir su régimen de funcionamiento."
        },
        B: {
            enunciado: "Para definir su velocidad de giro es preciso conocer el par resistente.",
            respuesta: true,
            explicacion: "En cualquier motor, se define la velocidad de régimen permanente cuando el par motor se iguala al par resistente."
        }
    },
    {
        numero: 24,
        tema: "En los circuitos magnéticos homogéneos con núcleo ferromagnético",
        A: {
            enunciado: "La relación entre el flujo magnético y la inducción es una relación lineal.",
            respuesta: true,
            explicacion: "Entre el flujo magnético y la inducción existe una relación lineal definida por la sección del circuito magnético. B % J S"
        },
        B: {
            enunciado: "El valor de la permeabilidad depende del nivel de inducción existente en dicho ma-terial.",
            respuesta: true,
            explicacion: "En función del nivel de inducción existente, la pendiente de la curva B-H es diferente y, por tanto, la permeabilidad también (Figura 2.2). FIGURA 2.2. Principios fundamentales. Pruebas de autoevaluación teórica 63"
        }
    },
    {
        numero: 25,
        tema: "En relación con la curva característica de primera imantación de un material ferromagnético, se puede afirmar que",
        A: {
            enunciado: "Presenta diferentes permeabilidades en función del grado de excitación.",
            respuesta: true,
            explicacion: "Esto es así por el hecho de que la curva que define la primera imantación presenta diferen-tes pendientes, ya que la pendiente en cada punto de funcionamiento representa la permea-bilidad del material en dicho punto."
        },
        B: {
            enunciado: "Para conseguir un mismo incremento de la inducción, es necesario excitar más en la zona saturada que en la zona no saturada.",
            respuesta: true,
            explicacion: "Al ser la zona saturada una zona de menor pendiente que la zona lineal, el incremento de intensidad de campo magnético (H) necesario para conseguir un determinado incremento de inducción (B) ha de ser mayor."
        }
    },
    {
        numero: 26,
        tema: "En un circuito homogéneo de material ferromagnético de sección cons-tante",
        A: {
            enunciado: "Al valor de la intensidad de campo magnético que hace que el flujo magnético sea nulo se lo llama fuerza cohercitiva.",
            respuesta: true,
            explicacion: "Tal y como se puede observar en la Figura 2.3, son los puntos en los que el ciclo de histé-resis corta el eje de abscisas o eje de la intensidad de campo magnético (H % OP o H % OQ). FIGURA 2.3. 64"
        },
        B: {
            enunciado: "La curva de magnetización del material es la curva que une todos los máximos de los diferentes ciclos de histéresis.",
            respuesta: true,
            explicacion: "Los máximos de los diferentes ciclos de histéresis se ubican en la curva de magnetización o curva de primera imantación."
        }
    },
    {
        numero: 27,
        tema: "Respecto al análisis de la curva de magnetización de un material ferromag-nético",
        A: {
            enunciado: "La relación B/H es mayor en la zona de saturación que en la zona lineal.",
            respuesta: false,
            explicacion: "La relación B/H es la permeabilidad del material, que coincide con la pendiente de la cur-va de magnetización. Ésta es menor en la zona de saturación que en la zona lineal."
        },
        B: {
            enunciado: "Cuando el material es excitado en alterna, si trabaja en la zona lineal no existe ciclo de histéresis.",
            respuesta: false,
            explicacion: "Siempre que se utilice corriente alterna, se formará un ciclo de histéresis."
        }
    },
    {
        numero: 28,
        tema: "Un circuito magnético serie, de sección constante construido con un solo tipo de material ferromagnético, es excitado mediante un bobinado recorri-do por una intensidad I de corriente continua. Si se duplica la intensidad",
        A: {
            enunciado: "Las pérdidas en el hierro que se producen en el circuito se duplican.",
            respuesta: false,
            explicacion: "Al utilizarse corriente continua, no existe ningún tipo de pérdidas en el hierro."
        },
        B: {
            enunciado: "Si no entra en saturación, el flujo magnético que atraviesa el circuito se duplica.",
            respuesta: true,
            explicacion: "En esas circunstancias la reluctancia se mantiene constante, con lo que, al aplicar la ley de Hopkinson, el flujo se duplica. Principios fundamentales. Pruebas de autoevaluación teórica 65"
        }
    },
    {
        numero: 29,
        tema: "Respecto a los núcleos ferromagnéticos",
        A: {
            enunciado: "La oposición a la circulación del flujo magnético es la misma en todas las direccio-nes cuando se utiliza chapa magnética de grano orientado.",
            respuesta: false,
            explicacion: "Utilizando chapa magnética de grano orientado, el material ofrece diferentes reluctancias según la dirección de circulación del flujo magnético."
        },
        B: {
            enunciado: "La utilización de chapas magnéticas de acero al silicio reduce las pérdidas en el hierro.",
            respuesta: true,
            explicacion: "La presencia del silicio reduce el área del ciclo de histéresis (reduce las pérdidas por histé-resis), además de aumentar la resistividad eléctrica (reduce las pérdidas por Foucault)."
        }
    },
    {
        numero: 30,
        tema: "En un circuito magnético excitado en corriente continua",
        A: {
            enunciado: "Las pérdidas en el hierro aumentan al aumentar la inducción.",
            respuesta: false,
            explicacion: "Al ser corriente continua, la frecuencia es nula y, por tanto, las pérdidas del hierro serán también nulas: PFe % KH . f . Bx máx ! KF . f 2 . B2 máx % 0"
        },
        B: {
            enunciado: "Si se produce un entrehierro, manteniendo constante la excitación, la inducción dis-minuye.",
            respuesta: true,
            explicacion: "Esto es así ya que al aparecer un entrehierro aumenta la reluctancia, es decir, la resistencia magnética. Y si se mantiene constante la excitación, el flujo disminuye y, por tanto, la in-ducción también. N . I % J . �"
        }
    },
    {
        numero: 31,
        tema: "La reluctancia de un circuito magnético",
        A: {
            enunciado: "Aumenta al entrar en saturación.",
            respuesta: true,
            explicacion: "La permeabilidad k es la pendiente de la curva de primera imantación. Al entrar en satura-ción, la pendiente disminuye, por lo que la reluctancia � aumenta (Figura 2.4). � % L k . S 66 FIGURA 2.4."
        },
        B: {
            enunciado: "Aumenta si se produce un entrehierro.",
            respuesta: true,
            explicacion: "La reluctancia del aire es mucho mayor que la del hierro. Por tanto, al añadir una zona con aire, la reluctancia del circuito magnético por el que circula el flujo aumenta."
        }
    },
    {
        numero: 32,
        tema: "Un circuito magnético posee un bobinado de N espiras recorridas por una intensidad de corriente continua.",
        A: {
            enunciado: "Siempre que se duplique la intensidad, se duplicará el valor del flujo que circula por el circuito.",
            respuesta: false,
            explicacion: "Debido a la saturación del material ferromagnético, duplicar la intensidad solamente impli-ca duplicar el flujo si se está en la zona de no saturación (Figura 2.5). FIGURA 2.5."
        },
        B: {
            enunciado: "La reluctancia del circuito permanece constante aunque varíe la intensidad en las espiras.",
            respuesta: false,
            explicacion: "En función de la intensidad se trabaja en un punto u otro de la curva de primera imanta-ción. Para cada uno de estos puntos, la permeabilidad (la pendiente en dichos puntos) varía y, por tanto, varía la reluctancia (�). � % L k . S Principios fundamentales. Pruebas de autoevaluación teórica 67"
        }
    },
    {
        numero: 33,
        tema: "En circuitos magnéticos excitados con corriente continua",
        A: {
            enunciado: "No existe flujo de fugas.",
            respuesta: false,
            explicacion: "El flujo de fugas se produce en circuitos excitados tanto con corriente continua como con corriente alterna."
        },
        B: {
            enunciado: "No existe saturación.",
            respuesta: false,
            explicacion: "El fenómeno de la saturación se produce en circuitos excitados tanto con corriente conti-nua como con corriente alterna."
        }
    },
    {
        numero: 34,
        tema: "En un circuito magnético de material ferromagnético",
        A: {
            enunciado: "La resistividad del hierro no afecta a las pérdidas que se producen en él.",
            respuesta: false,
            explicacion: "La resistividad influye en las pérdidas por corrientes parásitas de Foucault y, por tanto, en las pérdidas en el hierro."
        },
        B: {
            enunciado: "Las chapas magnéticas se aíslan entre sí para disminuir el área relativa a la histéresis.",
            respuesta: false,
            explicacion: "Las chapas apiladas con aislantes entre sí reducen las pérdidas por Foucault, no las pérdi-das por histéresis."
        }
    },
    {
        numero: 35,
        tema: "Las pérdidas en el hierro",
        A: {
            enunciado: "Disminuyen al utilizar el apilamiento de chapas magnéticas de pequeño espesor, no aisladas entre sí.",
            respuesta: false,
            explicacion: "Para disminuir las pérdidas es necesario aislar las chapas y, así, limitar las pérdidas debi-das a la circulación de las corrientes de Foucault."
        },
        B: {
            enunciado: "Para un mismo circuito magnético, son mayores cuando circula un flujo continuo de 0,1 Wb que cuando circula un flujo alterno de 0,05 Wb.",
            respuesta: false,
            explicacion: "Las pérdidas en el hierro son nulas cuando el flujo que circula es continuo y se producen cuando el flujo que circula es alterno. 68"
        }
    },
    {
        numero: 36,
        tema: "La construcción de un núcleo magnético mediante la técnica de chapas api-ladas",
        A: {
            enunciado: "Reduce el valor de las pérdidas por histéresis.",
            respuesta: false,
            explicacion: "La técnica de chapas apiladas se utiliza para reducir el valor de las pérdidas por Foucault."
        },
        B: {
            enunciado: "Implica que el valor de su factor de apilamiento o relleno es menor que 1.",
            respuesta: true,
            explicacion: "El factor de apilamiento se define como la relación entre la sección útil (de material mag-nético) y la sección total: Fr % Su/Stotal. De esta manera, al utilizar la técnica de las chapas apiladas y debido al aislamiento entre ellas, la sección útil disponible es menor que la total."
        }
    },
    {
        numero: 37,
        tema: "Acerca de los circuitos magnéticos",
        A: {
            enunciado: "En circuitos magnéticos homogéneos, la relación entre amperios-vuelta y flujo no es lineal.",
            respuesta: true,
            explicacion: "La fuerza magnetomotriz (amperios-vuelta) y el flujo que circula por el circuito magnético están relacionados mediante la reluctancia, la cual, al depender de la permeabilidad del material, varía según el punto de funcionamiento."
        },
        B: {
            enunciado: "Los circuitos magnéticos heterogéneos se denominan así porque están alimentados por diferentes bobinados.",
            respuesta: false,
            explicacion: "Los circuitos heterogéneos se denominan así porque tienen diferentes características a lo largo del recorrido del flujo magnético."
        }
    },
    {
        numero: 38,
        tema: "Sea un circuito magnético homogéneo sobre el que se arrollan N espiras que están recorridas por una intensidad I de corriente continua de forma que por el circuito magnético circula un flujo JJJ. A medida que aumenta la fuerza magnetomotriz aplicada",
        A: {
            enunciado: "El área encerrada por el ciclo de histéresis aumenta.",
            respuesta: false,
            explicacion: "Si la excitación aplicada es de corriente continua, no hay ciclo de histéresis. Principios fundamentales. Pruebas de autoevaluación teórica 69"
        },
        B: {
            enunciado: "La reluctancia del circuito magnético se mantienen constante.",
            respuesta: false,
            explicacion: "La reluctancia se mantiene constante si el punto de funcionamiento se mantiene sobre la zona lineal de la curva de primera imantación. Si pasa a trabajar en la zona saturada, la reluctancia varía."
        }
    },
    {
        numero: 39,
        tema: "Un circuito magnético homogéneo de sección S posee arrollado un bobina-do de N espiras por el que circula una corriente de I amperios de corriente continua",
        A: {
            enunciado: "Si aparece un entrehierro en dicho circuito, las pérdidas en el hierro disminuyen.",
            respuesta: false,
            explicacion: "No hay ningún tipo de pérdidas en el hierro ya que, al utilizarse corriente continua, no existe variación del flujo magnético con el tiempo."
        },
        B: {
            enunciado: "Sin modificar la sección S, cuanto mayor sea el factor de apilamiento o relleno, mayor será la inducción.",
            respuesta: false,
            explicacion: "Al aumentar el factor de relleno se produce un aumento de la sección útil, lo que implica una menor reluctancia. Al ser la fuerza magnetomotriz constante, el flujo aumenta, y este efecto se compensa con el aumento de la sección útil, por lo que la inducción se mantiene constante."
        }
    },
    {
        numero: 40,
        tema: "Un circuito magnético serie, construido con un solo tipo de material ferro-magnético, tiene una sección útil de 25 cm2 y una longitud de 100 cm. Cuando el circuito es excitado mediante un bobinado compuesto por 100 espiras que es recorrido por una intensidad de 4 A de corriente continua, circula un flujo JJJ. A la vista de estos datos, puede afirmarse que",
        A: {
            enunciado: "El factor de relleno vale 1,25.",
            respuesta: false,
            explicacion: "No hay datos suficientes para determinar el factor de relleno. Además, el factor de relleno tiene un valor comprendido entre 0 y 1. 70"
        },
        B: {
            enunciado: "Si el circuito se excita con 200 espiras recorridas por una intensidad de 2 A de co-rriente continua, el flujo que circula tiene el mismo valor JJ que en el caso enunciado.",
            respuesta: true,
            explicacion: "Puesto que no hay variación de la fuerza magnetomotriz, el flujo circulante es el mismo."
        }
    },
    {
        numero: 41,
        tema: "En un circuito magnético serie de sección constante que funciona en todo momento en su zona lineal, se aplica una fuerza magnetomotriz de corrien-te continua",
        A: {
            enunciado: "Si se disminuye la sección del núcleo a la mitad, el flujo disminuirá a la mitad si no se modifican las demás condiciones de funcionamiento.",
            respuesta: true,
            explicacion: "Al disminuir la sección a la mitad, la reluctancia aumenta al doble, y puesto que la fuerza magnetomotriz se mantiene constante, el flujo disminuirá a la mitad."
        },
        B: {
            enunciado: "Se podría aplicar una segunda fuerza magnetomotriz de tal valor que anulara el flu-jo magnético circulante.",
            respuesta: true,
            explicacion: "Si en un circuito magnético serie se colocan dos fuerzas magnetomotrices de igual valor en oposición, el flujo resultante es nulo."
        }
    },
    {
        numero: 42,
        tema: "Un circuito magnético serie, construido con un solo tipo de material ferro-magnético, tiene una sección útil S y una longitud L. Cuando el circuito es excitado mediante un bobinado compuesto por N espiras que es recorrido por una intensidad I de corriente continua, circula un flujo JJJ. Despreciando los efectos de la saturación, puede afirmarse que",
        A: {
            enunciado: "Para la excitación señalada en el enunciado, si la longitud fuese 2 . L y la sección útil S/2, el flujo que circularía sería de JJJ/4.",
            respuesta: true,
            explicacion: "Al duplicar la longitud y disminuir a la mitad la sección, la reluctancia queda multiplicada por cuatro. Por tanto, según la ley de Hopkinson, el flujo circulante será la cuarta parte."
        },
        B: {
            enunciado: "Para las dimensiones señaladas en el enunciado, si el número de espiras fuese N/2 y la intensidad 2 . I, circularía un flujo JJJ.",
            respuesta: true,
            explicacion: "Al reducir a la mitad el número de espiras y duplicar la intensidad, la fuerza magnetomo-triz no se ve afectada, por lo que el flujo se mantiene constante. Principios fundamentales. Pruebas de autoevaluación teórica 71"
        }
    },
    {
        numero: 43,
        tema: "Dos circuitos magnéticos CM1 y CM2 se construyen con la misma chapa magnética. CM1 tiene longitud L y sección S y CM2 tiene longitud 2 . L y sección S/2. Ambos circuitos son excitados en corriente continua con una misma excitación (N . I ) y trabajan en la zona de no saturación. En estas condiciones",
        A: {
            enunciado: "En ambos circuitos circula el mismo flujo.",
            respuesta: false,
            explicacion: "Puesto que los dos circuitos no presentan la misma reluctancia (la reluctancia de CM2 es cuatro veces mayor que la de CM1), ante la misma fuerza magnetomotriz aplicada, el flujo resultante es diferente."
        },
        B: {
            enunciado: "Las pérdidas en el hierro de CM2 son mayores que las pérdidas en el hierro de CM1.",
            respuesta: false,
            explicacion: "Puesto que la excitación es de corriente continua, no hay ningún tipo de pérdidas en el hierro."
        }
    },
    {
        numero: 44,
        tema: "En relación con los sistemas de inducción, se puede constatar que",
        A: {
            enunciado: "Para inducir una tensión en un generador eléctrico, es necesario que el campo mag-nético sea variable.",
            respuesta: false,
            explicacion: "La inducción de una tensión se puede conseguir con un campo magnético de valor cons-tante en el seno de un rotor giratorio."
        },
        B: {
            enunciado: "El sentido de la fuerza que se crea como consecuencia de la ley de Laplace es inde-pendiente del valor de la intensidad que circula por el conductor.",
            respuesta: true,
            explicacion: "El sentido de la fuerza que aparece sobre el conductor depende del sentido de la intensidad que circula por él, pero no depende del valor de dicha corriente."
        }
    },
    {
        numero: 45,
        tema: "Un campo magnético rotativo, de amplitud constante, se puede obtener",
        A: {
            enunciado: "Girando un bobinado alimentado con corriente alterna monofásica.",
            respuesta: false,
            explicacion: "Según los conceptos teóricos desarrollados, existen tres formas de generar campos magné-ticos rotativos: 72 Con un bobinado móvil recorrido por corriente continua. Con un bobinado fijo monofásico recorrido por corriente alterna. Con bobinados fijos trifásicos (polifásicos en general) recorridos por corrientes alternas trifásicas (polifásicas en general)."
        },
        B: {
            enunciado: "Alimentando tres bobinados fijos en el espacio y desplazados entre sí en el espacio 2nnn/3 mediante un sistema de intensidades trifásicas y equilibradas.",
            respuesta: true,
            explicacion: "Dicho efecto se logra mediante la aplicación del teorema de Ferraris."
        }
    },
    {
        numero: 46,
        tema: "En relación con el estudio del campo magnético",
        A: {
            enunciado: "El teorema de Leblanc dice que en un bobinado monofásico de una máquina rotati-va recorrido por corriente alterna aparecen dos campos magnéticos rotativos que gi-ran a la misma velocidad y con el sentido de giro marcado por la sucesión del neu-tro a la fase.",
            respuesta: false,
            explicacion: "Según el teorema de Leblanc, se obtienen dos campos magnéticos rotativos que giran en sentidos inversos con la misma velocidad absoluta, la cual está impuesta por el número de polos y la frecuencia de la corriente alterna aplicada. n % 60 . f/p"
        },
        B: {
            enunciado: "Su amplitud depende del número de polos de que disponga la máquina.",
            respuesta: false,
            explicacion: "La amplitud del campo magnético depende del número de espiras y del valor de la corrien-te que circula por ellas (fuerza magnetomotriz)."
        }
    },
    {
        numero: 47,
        tema: "El estator de una máquina rotativa está bobinado de forma trifásica.",
        A: {
            enunciado: "Si una misma corriente alimenta las diferentes bobinas, no existe campo magnético rotativo.",
            respuesta: true,
            explicacion: "Según el teorema de Ferraris, las corrientes deben estar desfasadas 120o en cada bobina. Principios fundamentales. Pruebas de autoevaluación teórica 73"
        },
        B: {
            enunciado: "Si las corrientes que alimentan son trifásicas y de 100 Hz, el campo rotativo puede girar a 6.000 rpm.",
            respuesta: true,
            explicacion: "Precisamente se cumple la anterior afirmación si el número de pares de polos es 1. n % 60 . f/p"
        }
    },
    {
        numero: 48,
        tema: "Para la creación de campos magnéticos rotativos",
        A: {
            enunciado: "Es necesario alimentar las bobinas del rotor con corriente alterna.",
            respuesta: false,
            explicacion: "También se puede alimentar con corriente continua, siempre y cuando el rotor se haga girar."
        },
        B: {
            enunciado: "Según el teorema de Ferraris, la velocidad de giro del campo es sólo proporcional a la frecuencia de alimentación de las bobinas.",
            respuesta: false,
            explicacion: "Como se puede observar en la siguiente expresión, también depende del número de polos. n % 60 . f/p"
        }
    },
    {
        numero: 49,
        tema: "La amplitud de un campo magnético rotativo",
        A: {
            enunciado: "Depende del valor de la corriente que circula por las bobinas.",
            respuesta: true,
            explicacion: "Es proporcional a dicho valor, ya que el campo magnético depende de la fuerza magneto-motriz aplicada, que, a su vez, depende de la intensidad circulante por las bobinas."
        },
        B: {
            enunciado: "Depende del número de polos que tiene la máquina.",
            respuesta: false,
            explicacion: "La amplitud del campo magnético no depende en ningún caso del número de pares de po-los de dicha máquina, sino que depende del número de espiras y de la intensidad que cir-cula por ellas. 74"
        }
    },
    {
        numero: 50,
        tema: "En máquinas rotativas",
        A: {
            enunciado: "Si el paso de bobina es igual al paso polar, el factor de paso es 1.",
            respuesta: true,
            explicacion: "Según se observa en la siguiente fórmula, se cumple dicha afirmación. Kp % senA90 YB YPB"
        },
        B: {
            enunciado: "Se aplica el factor de inclinación de ranura en función de la posición que ocupan las cabezas de las espiras.",
            respuesta: false,
            explicacion: "El factor de inclinación tiene en cuenta la inclinación de las ranuras respecto a la genera-triz de la superficie cilíndrica sobre la que se sitúan. 2.2. Preguntas teóricas propuestas En las siguientes 100 preguntas teóricas, indicar en cada caso si el enunciado es verdadero o falso."
        }
    }
];

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
    numPregRespon++;
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

        contexto.fillStyle = '#C2729D'; // Color de fondo 
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

            contexto.fillStyle = '#C2729D'; // Color de fondo 
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

            contexto.fillStyle = '#C2729D'; // Color de fondo 
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
        respuestaCorrecta = pregunta.A.respuesta;

        // dibujar

        const anchoCss = window.innerWidth;
        const altoCss = window.innerHeight;

        contexto.fillStyle = '#C2729D'; // Color de fondo 
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

            contexto.fillStyle = '#C2729D'; // Color de fondo 
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

            contexto.fillStyle = '#C2729D'; // Color de fondo 
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