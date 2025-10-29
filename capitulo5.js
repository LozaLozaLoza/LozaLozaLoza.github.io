export const preguntas5 = [
    {
        "numero": 1,
        "tema": "Un transformador posee un núcleo magnético que presenta un ciclo de his-téresis tal que, alimentado a la tensión nominal, encierra un área A",
        "A": {
            "enunciado": "Si se reduce la tensión de alimentación a la mitad, el área del ciclo se reduce a lamitad.",
            "respuesta": false,
            "explicacion": "El área del ciclo de histéresis representa las pérdidas por histéresis. Si se reduce la tensiónde alimentación a la mitad, se reducirá a la mitad J0 y, por tanto, Bmáx. Como en la expre-sión de las pérdidas por histéresis Bmáx está elevada a la x (valor comprendido entre 1,6 y1,8), el área del ciclo de histéresis se verá reducida, pero no a la mitad.V1 ] E1 % 4,44 . N1 . J0 . fPH % KH . f . Bxmáx"
        },
        "B": {
            "enunciado": "Si se duplica el área del ciclo de histéresis (2A), es debido a que se ha duplicado laintensidad del campo magnético.",
            "respuesta": false,
            "explicacion": "Debido a la existencia de la saturación en la curva B-H del material y a las causas señala-das en la pregunta anterior, la relación entre el área del ciclo de histéresis y la intensidadde campo magnético no es lineal.FIGURA 5.1."
        }
    },
    {
        "numero": 2,
        "tema": "El núcleo magnético de un transformador de potencia tiene una sección totalS, está recorrido por un flujo máximo JJ0 y ha sido construido mediante latécnica de chapas apiladas.",
        "A": {
            "enunciado": "La inducción máxima a la que trabaja la chapa magnética es mayor que JJ0/S.198",
            "respuesta": true,
            "explicacion": "La sección a considerar para calcular la inducción es la sección útil. Como la sección útiles menor que la sección total, la inducción máxima es mayor que la obtenida con el co-ciente J0/S.Bmáx % J0Su%J0Fr . Stotal"
        },
        "B": {
            "enunciado": "No se producen pérdidas por corrientes de Foucault si el transformador está envacío.",
            "respuesta": false,
            "explicacion": "Aun cuando el transformador está en vacío, por él va a circular un flujo variable r(t), porlo que se producirán pérdidas por corrientes de Foucault."
        }
    },
    {
        "numero": 3,
        "tema": "En los núcleos magnéticos de los transformadores de potencia",
        "A": {
            "enunciado": "Una vez alcanzada la saturación, el flujo es sinusoidal si la tensión primaria aplicadaes sinusoidal.",
            "respuesta": true,
            "explicacion": "Si la tensión de alimentación v1(t) es sinusoidal, e1(t) es sinusoidal, y como e1(t) está liga-da con el flujo r(t), éste también será sinusoidal.e1(t) % N1 . dr(t)dt"
        },
        "B": {
            "enunciado": "Su construcción mediante la técnica de chapas apiladas reduce las pérdidas por his-téresis.",
            "respuesta": false,
            "explicacion": "La construcción por chapas apiladas lo que reduce son las pérdidas por Foucault."
        }
    },
    {
        "numero": 4,
        "tema": "En la construcción de dos transformadores monofásicos",
        "A": {
            "enunciado": "Si los números de espiras (N1 y N2) son iguales en ambos transformadores, las inten-sidades nominales también son iguales en ambos.",
            "respuesta": false,
            "explicacion": "La intensidad nominal no depende del número de espiras (N1 y N2), sino que depende delas tensiones nominales y de las potencias aparentes nominales.SN % V1N . I1N % V2N . I2N"
        },
        "B": {
            "enunciado": "Si los números y tipo de espiras (N1 y N2) son iguales en ambos transformadores, ylos núcleos de ambos transformadores son también iguales, las pérdidas en el hierroserán iguales ante la misma tensión de alimentación.Transformadores. Pruebas de autoevaluación teórica199",
            "respuesta": true,
            "explicacion": "Son dos transformadores idénticos que funcionan con la misma inducción, por lo que laspérdidas en el hierro serán las mismas."
        }
    },
    {
        "numero": 5,
        "tema": "Un transformador monofásico de 6.000/400 V funciona en vacío alimentado asu tensión nominal y en esas condiciones, el circuito magnético del transfor-mador funciona en la zona lineal.",
        "A": {
            "enunciado": "Se puede alcanzar la zona de saturación colocando una carga en su secundario.",
            "respuesta": false,
            "explicacion": "Para entrar en saturación es necesario aumentar el flujo que circula por el circuito magnéti-co del transformador. Con la colocación de una carga no es posible lograr dicho objetivo."
        },
        "B": {
            "enunciado": "Se puede alcanzar la zona de saturación incrementando la frecuencia de la tensiónde alimentación.",
            "respuesta": false,
            "explicacion": "Un aumento de la frecuencia de alimentación, sin modificar el valor eficaz de la tensión dealimentación, provoca una disminución del valor del flujo magnético. Por tanto, no es po-sible entrar en saturación mediante dicha acción."
        }
    },
    {
        "numero": 6,
        "tema": "En un transformador de potencia",
        "A": {
            "enunciado": "Si funciona en vacío, no existe flujo de fugas en el primario.",
            "respuesta": false,
            "explicacion": "Sí existe flujo de fugas en el primario. Lo que no existe es flujo de fugas en el secundario,ya que no está recorrido por ninguna intensidad (Figura 5.2).FIGURA 5.2.200"
        },
        "B": {
            "enunciado": "Si funciona en carga, la fuerza magnetomotriz debida a la intensidad del devanadosecundario es de sentido contrario a la fuerza magnetomotriz creada por la intensi-dad del devanado primario.",
            "respuesta": true,
            "explicacion": "Tal y como se observa en la Figura 5.3, la f.m.m. del secundario es de sentido contrario ala f.m.m. del primario, con el fin de que se cumpla para cualquier situación de carga que:N1 . I1 . N2 . I2 % N1 . I10FIGURA 5.3."
        }
    },
    {
        "numero": 7,
        "tema": "Un transformador monofásico de relación de espiras N1/N2 y relación de ten-siones V1N /V2N y 50 Hz, se encuentra trabajando en vacío.",
        "A": {
            "enunciado": "Si se alimenta por el primario con V1N y 100 Hz, la tensión de salida será 0,5 . V2N.",
            "respuesta": false,
            "explicacion": "La tensión de salida será V2N pero a 100 Hz. Como la tensión de alimentación V1N es cons-tante, el producto del flujo máximo por la frecuencia se mantiene constante (el aumento dela frecuencia se compensa con la disminución del flujo máximo). Por tanto, el valor eficazde la tensión de salida también se mantiene constante.V1 ] E1 % 4,44 . N1 . J0 . fV2 % E2 % 4,44 . N2 . J0 . f"
        },
        "B": {
            "enunciado": "Si se alimenta por el primario con 0,5 . V1N y 50 Hz, la tensión de salida será0,5 . V2N.Transformadores. Pruebas de autoevaluación teórica201",
            "respuesta": true,
            "explicacion": "Si el transformador se alimenta a una tensión V1 mitad de la tensión nominal V1N, al ser lafrecuencia y el número de espiras constantes, el flujo máximo se reducirá también a la mi-tad, con lo que la tensión V2 será 0,5 . V2N.V1 ] E1 % 4,44 . N1 . J0 . fV2 % E2 % 4,44 . N2 . J0 . f"
        }
    },
    {
        "numero": 8,
        "tema": "En un transformador de potencia funcionando en vacío",
        "A": {
            "enunciado": "En las espiras del primario, el flujo de fugas tiene distinto sentido que el flujo útil.",
            "respuesta": false,
            "explicacion": "En este caso la f.m.m. del primario crea tanto el flujo útil como el flujo de dispersión, porlo que ambos tienen el mismo sentido (Figura 5.4).FIGURA 5.4."
        },
        "B": {
            "enunciado": "El flujo de fugas del secundario es nulo.",
            "respuesta": true,
            "explicacion": "Como el transformador está trabajando en vacío, por el secundario no circula intensidad,ya que el circuito eléctrico está abierto. Por tanto, no hay f.m.m. en el secundario."
        }
    },
    {
        "numero": 9,
        "tema": "Un transformador monofásico alimentado por el primario con tensión alternasinusoidal, se encuentra trabajando en carga fuera de la zona lineal",
        "A": {
            "enunciado": "El flujo es sinusoidal.",
            "respuesta": true,
            "explicacion": "El hecho de que el flujo sea sinusoidal está impuesto por la tensión de alimentación, que sílo es.v1(t) ] e1(t) % N1 . drm(t)t202"
        },
        "B": {
            "enunciado": "La componente de vacío de la intensidad que circula por el primario es sinusoidal.",
            "respuesta": false,
            "explicacion": "Como se observa en la Figura 5.5, la tensión aplicada es sinusoidal e impone que el flujo también losea, pero la intensidad no lo es debido a la existencia del ciclo de histéresis.FIGURA 5.5."
        }
    },
    {
        "numero": 10,
        "tema": "En un transformador que funciona en vacío",
        "A": {
            "enunciado": "La mayor parte de la intensidad que circula por el transformador es debida a laspérdidas en el hierro.Transformadores. Pruebas de autoevaluación teórica203",
            "respuesta": false,
            "explicacion": "En la intensidad de vacío, la componente más importante es la magnetizante, necesaria pa-ra crear el flujo, no la de pérdidas."
        },
        "B": {
            "enunciado": "En bornes del devanado secundario, la tensión es nula.",
            "respuesta": false,
            "explicacion": "Al estar en vacío, el devanado secundario está en circuito abierto, por lo que no circularáintensidad por él. Sin embargo, sí se inducirá tensión en función de la tensión aplicada alprimario y la relación de transformación."
        }
    },
    {
        "numero": 11,
        "tema": "Un transformador de potencia monofásico de 60 Hz posee una relación detensiones de 230/400 V.",
        "A": {
            "enunciado": "Si funciona en vacío conectado por el lado de BT a una red de 230 V y 50 Hz, elvalor eficaz de la tensión en el lado de AT es 400 V.",
            "respuesta": true,
            "explicacion": "La relación de transformación depende del número de espiras, no de la frecuencia de ali-mentación. Si se alimenta en vacío a 230 V por el primario, se obtienen 400 V en el secun-dario, con independencia del valor de la frecuencia, porque, aunque varíe la frecuencia, elflujo útil es único para primario y secundario."
        },
        "B": {
            "enunciado": "Si funciona en vacío conectado por el lado de AT a una red de 230 V y 60 Hz, elvalor eficaz de la tensión en el lado de BT es 400 V.",
            "respuesta": false,
            "explicacion": "Ésta es así ya que si en AT la tensión es de 230 V, la tensión de BT no puede ser nunca400 V. Tendrá que ser menor que 230 V de acuerdo con la relación de transformación deltransformador: en este caso 132,5 V."
        }
    },
    {
        "numero": 12,
        "tema": "En un transformador monofásico de relación de espiras N1/N2, alimentadopor el primario a tensión alterna constante y que se encuentra trabajandoen vacío",
        "A": {
            "enunciado": "Al aumentar el número de espiras N2, disminuye el flujo.",
            "respuesta": false,
            "explicacion": "Si aumenta N2, aumenta la tensión V2 ya que el flujo (impuesto por la tensión V1) y la fre-cuencia no se modifican.V1 ] E1 % 4,44 . N1 . J0 . fV2 % E2 % 4,44 . N2 . J0 . f204"
        },
        "B": {
            "enunciado": "Al aumentar el número de espiras N1, la tensión inducida en el secundario dis-minuye.",
            "respuesta": true,
            "explicacion": "Puesto que la tensión V1 y la frecuencia son constantes, al aumentar N1 el flujo disminuye,por lo que al secundario le llega menos flujo. De este modo, la tensión V2 disminuirá yaque N2 es constante.V1 ] E1 % 4,44 . N1 . J0 . fV2 % E2 % 4,44 . N2 . J0 . f"
        }
    },
    {
        "numero": 13,
        "tema": "Un transformador de potencia reductor, cuyo número de espiras secunda-rias es constante, funciona alimentado a tensión nominal por el lado de AT.",
        "A": {
            "enunciado": "Si estando en vacío se aumenta el número de espiras primarias, las pérdidas en elhierro disminuyen.",
            "respuesta": true,
            "explicacion": "Al aumentar el número de espiras del primario, como la tensión de alimentación y la fre-cuencia son constantes, el flujo disminuye, disminuyendo por tanto la inducción magnéticamáxima. Como consecuencia, disminuyen las pérdidas en el hierro.V1 ] E1 % 4,44 . N1 . J0 . fPFe % PH ! PF % KH . f . Bxmáx ! KF . f 2 . B2máx"
        },
        "B": {
            "enunciado": "Si se conecta una carga inductiva, es necesario aumentar el número de espiras pri-marias para mantener la tensión secundaria en su valor nominal.",
            "respuesta": false,
            "explicacion": "Si se conecta una carga inductiva, hay una caída de tensión interna que hace que la tensiónsecundaria sea menor que la nominal (V2 a V2N). Para devolver la tensión secundaria a suvalor nominal es necesario aumentar E2, para lo cual, como el número de espiras del se-cundario (N2) y la frecuencia son constantes, es necesario aumentar el flujo. Como el flujoestá impuesto por la tensión de alimentación V1, para aumentar el flujo, a tensión y fre-cuencia constantes, es necesario disminuir el número de espiras del primario N1.V1 ] E1 % 4,44 . N1 . J0 . fV2 ] E2 % 4,44 . N2 . J0 . f"
        }
    },
    {
        "numero": 14,
        "tema": "En el diseño de los transformadores de potencia monofásicos reductores",
        "A": {
            "enunciado": "Para que las pérdidas por efecto Joule sean iguales en el primario y en el secunda-rio, el número de espiras de ambos bobinados debe coincidir.Transformadores. Pruebas de autoevaluación teórica205",
            "respuesta": false,
            "explicacion": "Las pérdidas por efecto Joule dependen de la resistencia de las espiras y de la intensidadque circula por ellas. Por tanto, para que las pérdidas por efecto Joule sean iguales en am-bos bobinados, deberá cumplirse que:R1 % Rñ2 %AN1N2B2. R2"
        },
        "B": {
            "enunciado": "El bobinado primario tiene mayor sección que el bobinado secundario.",
            "respuesta": false,
            "explicacion": "Tiene menor sección ya que, al ser un transformador reductor, por el primario circularámenor intensidad."
        }
    },
    {
        "numero": 15,
        "tema": "En un transformador de potencia en carga, alimentado a tensión nominalpor el primario",
        "A": {
            "enunciado": "El flujo de fugas del secundario posee sentido opuesto al flujo mutuo.",
            "respuesta": true,
            "explicacion": "El flujo de fugas del secundario es debido solamente a la intensidad del secundario. Portanto, es de sentido contrario al flujo mutuo, ya que éste es debido a las intensidades delprimario y secundario que crean fuerzas magnetomotrices de sentidos opuestos, siendo pre-ponderante la del primario (Figura 5.6).FIGURA 5.6."
        },
        "B": {
            "enunciado": "La tensión en bornes del secundario es siempre diferente de la nominal, indepen-dientemente del tipo de carga.206",
            "respuesta": false,
            "explicacion": "Con cargas capacitivas, en las condiciones límite a partir de las cuales empieza a producir-se el efecto Ferranti, la tensión de salida del secundario es igual a la nominal."
        }
    },
    {
        "numero": 16,
        "tema": "Cuando se calcula el circuito equivalente de un transformador monofásicoelevador",
        "A": {
            "enunciado": "Para obtener el circuito equivalente referido al primario es necesario realizar losdos ensayos por el lado de baja tensión.",
            "respuesta": false,
            "explicacion": "Lo habitual es que el ensayo de vacío se realice por el lado de BT y el de cortocircuito porel lado de AT, independientemente del lado al cual se quiera referir el circuito equivalente."
        },
        "B": {
            "enunciado": "La impedancia equivalente Ze referida al lado de AT es mayor que la referida al la-do de BT.",
            "respuesta": true,
            "explicacion": "Al ser un transformador elevador, la relación de transformación a % N1/N2 es mayor que 1,por lo que:ZeAT % ZeBT . a2 b ZeBT"
        }
    },
    {
        "numero": 17,
        "tema": "En la realización de ensayos a transformadores para la determinación delcircuito equivalente",
        "A": {
            "enunciado": "El ensayo de cortocircuito proporciona los mismos valores de Re y Xe, independien-temente de la intensidad del ensayo.",
            "respuesta": true,
            "explicacion": "La Re y la Xe son valores propios del transformador, y no dependen de la tensión utilizadaen el ensayo. Únicamente la variación de la frecuencia afectaría al valor de Xe."
        },
        "B": {
            "enunciado": "El ensayo de vacío da los mismos valores numéricos de G0 y B0 independientementedel lado por el que se realice el ensayo.",
            "respuesta": false,
            "explicacion": "Los valores de G0 y B0 dependerán del lado por el que se realice el ensayo de vacío. Si loscálculos se realizan con los valores del ensayo de vacío por el lado de AT, G0 y B0 estaránreferidos a AT (G0 % W0/(V10)2). Por el contrario, si los cálculos se realizan con los valoresdel ensayo de vacío por el lado de BT, G0 y B0 estarán referidos a BT (G0 % W0/(V20)2).Por ejemplo, para el caso de la conductancia:G1o0 % W0V 210G2o0 % W0V 220G1o0 Ç G2o0Transformadores. Pruebas de autoevaluación teórica207"
        }
    },
    {
        "numero": 18,
        "tema": "Un transformador monofásico de potencia es sometido a un ensayo de cor-tocircuito nominal. En este ensayo",
        "A": {
            "enunciado": "El valor de la impedancia equivalente depende del valor de la tensión aplicada en elensayo.",
            "respuesta": false,
            "explicacion": "El valor de la impedancia equivalente Ze es propia y característica de cada transformador.Depende de la frecuencia, pero no del valor de la tensión aplicada."
        },
        "B": {
            "enunciado": "Las pérdidas en el hierro son despreciables frente a las pérdidas en las espiras.",
            "respuesta": true,
            "explicacion": "Las pérdidas en el hierro son función de la tensión aplicada, y como en el ensayo de corto-circuito nominal la tensión aplicada es mucho más pequeña que la tensión nominal, laspérdidas en el hierro son mucho más pequeñas que las nominales. Por tanto, se puedendespreciar frente a las pérdidas en el cobre (pérdidas en las espiras), que en un ensayo decortocircuito nominal son las nominales por estar circulando la intensidad nominal."
        }
    },
    {
        "numero": 19,
        "tema": "En un transformador monofásico reductor",
        "A": {
            "enunciado": "La intensidad del ensayo de vacío nominal es menor si se alimenta por el lado de ATque si se alimenta por el lado de BT.",
            "respuesta": true,
            "explicacion": "Como es un transformador reductor, la tensión en el primario es mayor que en el secunda-rio, por lo que la intensidad primaria es menor que la secundaria."
        },
        "B": {
            "enunciado": "En el ensayo de cortocircuito nominal, la intensidad absorbida es menor si se ali-menta por el lado de BT.",
            "respuesta": false,
            "explicacion": "Al ser un transformador reductor, la intensidad en el secundario es mayor que la del prima-rio, ya que la tensión secundaria es menor que la primaria."
        }
    },
    {
        "numero": 20,
        "tema": "En un transformador se realizan dos ensayos de vacío. En el primero seaplica el valor eficaz de la tensión nominal a 50 Hz, mientras que en el se-gundo se aplica el mismo valor eficaz de la tensión pero a 60 Hz.",
        "A": {
            "enunciado": "El valor resultante de G0 es diferente si se usan los datos de un ensayo o del otro.",
            "respuesta": true,
            "explicacion": "El parámetro G0 refleja las pérdidas en el hierro, las cuales son dependientes de la frecuen-cia de alimentación. Por tanto, su valor es diferente en uno y otro ensayo.208"
        },
        "B": {
            "enunciado": "Podría darse el caso de que las intensidades medidas en los dos ensayos fueraniguales.",
            "respuesta": false,
            "explicacion": "La corriente de vacío se calcula como producto de la tensión de alimentación del ensayode vacío V0 y de la admitancia de la rama de vacío Y0. La admitancia Y0 depende de lafrecuencia, por lo que, ante el mismo valor eficaz de la tensión V0, la corriente de vacío esdiferente en cada ensayo.I0 % Y0 . V0"
        }
    },
    {
        "numero": 21,
        "tema": "Un transformador monofásico de potencia de 6.000/400 V funciona en cargaalimentado por AT a 6 kV. En estas condiciones",
        "A": {
            "enunciado": "Si la carga que alimenta es capacitiva pura, la tensión en bornes del secundario esmayor de 400 V.",
            "respuesta": true,
            "explicacion": "Debido al efecto Ferranti, como es una carga capacitiva pura, el coeficiente de variaciónde tensión (u) será negativo, por lo que la tensión del secundario será mayor.V2 % V2N .A1 . u100B"
        },
        "B": {
            "enunciado": "Si las pérdidas en los conductores son iguales a las pérdidas en el hierro, el transfor-mador está funcionando con el índice de carga correspondiente al rendimiento má-ximo.",
            "respuesta": true,
            "explicacion": "En el punto de rendimiento máximo, las pérdidas en el hierro son iguales a las del cobre."
        }
    },
    {
        "numero": 22,
        "tema": "Un transformador monofásico se encuentra trabajando alimentado a su ten-sión nominal por el primario, mientras que en el secundario se halla conec-tada una carga inductiva pura.",
        "A": {
            "enunciado": "Si se duplica el índice de carga, se duplica exactamente el valor del coeficiente devariación de tensión.",
            "respuesta": false,
            "explicacion": "No se duplicará exactamente, tal y como se puede apreciar en la expresión de Arnold.u % i . (uR . cos r ! uX . sen r) ! i2200. (uX . cos r . uR . sen r)2Transformadores. Pruebas de autoevaluación teórica209"
        },
        "B": {
            "enunciado": "Si se desconectase la carga inductiva del secundario, la tensión del secundarioaumentaría.",
            "respuesta": true,
            "explicacion": "Al quitar la carga inductiva se queda el transformador en vacío, por lo que su tensión se-cundaria aumenta respecto a la situación de carga inductiva."
        }
    },
    {
        "numero": 23,
        "tema": "En un transformador monofásico de 13.000/230 V al que se le alimenta porel primario a la tensión nominal, la tensión en el secundario cuando trabajaen carga",
        "A": {
            "enunciado": "Es siempre menor que 230 V.",
            "respuesta": false,
            "explicacion": "Para ciertas cargas capacitivas, cuando se produce el efecto Ferranti, la tensión en el se-cundario es mayor de 230 V."
        },
        "B": {
            "enunciado": "Está retrasada 90o respecto a la tensión primaria si la carga es inductiva pura.",
            "respuesta": false,
            "explicacion": "Si la carga es inductiva pura, lo que estará retrasado 90o será la intensidad de secundariorespecto a la tensión secundaria."
        }
    },
    {
        "numero": 24,
        "tema": "Si la tensión de cortocircuito de un transformador monofásico es del 10%",
        "A": {
            "enunciado": "Cuando se produce un cortocircuito brusco en el secundario, siendo la tensión apli-cada en el primario la nominal, la corriente resultante es 10 veces la intensidad no-minal.",
            "respuesta": true,
            "explicacion": "Tal y como se observa en el siguiente desarrollo, se cumple dicha afirmación:Ze % V1ccI1N%V1NI1cc accidentalúI1cc accidental % I1N . V1NV1cc% I1N . 10010 % 10 . I1N"
        },
        "B": {
            "enunciado": "La relación Re/Xe es 0,1.",
            "respuesta": false,
            "explicacion": "La tensión de cortocircuito no depende de la relación existente entre la resistencia y lareactancia equivalente del transformador.210"
        }
    },
    {
        "numero": 25,
        "tema": "Si en un transformador que funciona a la intensidad nominal, con carga in-ductiva pura, se disminuye la carga a la mitad",
        "A": {
            "enunciado": "Las pérdidas en el cobre disminuyen a la mitad.",
            "respuesta": false,
            "explicacion": "Disminuyen a la cuarta parte ya que son proporcionales a la intensidad al cuadrado."
        },
        "B": {
            "enunciado": "Disminuye el rendimiento máximo del transformador.",
            "respuesta": false,
            "explicacion": "El rendimiento para una carga inductiva pura (cos r%0) es nulo para cualquier índice decarga.g %cos rcos r ! w0i ! i . wj"
        }
    },
    {
        "numero": 26,
        "tema": "En un transformador monofásico en carga",
        "A": {
            "enunciado": "Para cargas resistivas puras, el coeficiente de variación de tensión es cero.",
            "respuesta": false,
            "explicacion": "Tal como se refleja en el diagrama de Kapp, ante una carga resistiva pura el coeficiente devariación de tensión tiene un valor distinto de cero."
        },
        "B": {
            "enunciado": "Para cualquier carga de carácter capacitivo, el transformador consume potenciareactiva.",
            "respuesta": false,
            "explicacion": "El transformador consume potencia reactiva si el conjunto transformador-carga tiene unfactor de potencia de carácter inductivo. Para ciertas cargas capacitivas el conjunto sí pue-de tener carácter capacitivo, pero no para cualquier tipo de carga capacitiva."
        }
    },
    {
        "numero": 27,
        "tema": "Un transformador monofásico se encuentra alimentado a la tensión nominaly de él se sabe que presenta un rendimiento máximo para el índice de carga0,707.",
        "A": {
            "enunciado": "Si aumenta el factor de potencia de la carga acoplada, aumenta el índice para el quese produce el rendimiento máximo.Transformadores. Pruebas de autoevaluación teórica211",
            "respuesta": false,
            "explicacion": "El índice de rendimiento máximo no depende del factor de potencia, sino que depende delas pérdidas en el hierro a la tensión de alimentación y de las pérdidas en el cobre nominales.ig máx %JW0WccIN"
        },
        "B": {
            "enunciado": "Las pérdidas en el hierro y en el cobre coinciden cuando el transformador trabaja aplena carga.",
            "respuesta": false,
            "explicacion": "Las pérdidas en el hierro y en el cobre coinciden en la situación de rendimiento máximo(i % 0,707), no en la situación de plena carga (i % 1)."
        }
    },
    {
        "numero": 28,
        "tema": "Un transformador de potencia, que funciona alimentado a su tensión nomi-nal, tiene en su punto de rendimiento máximo (índice de carga 0,75) unaspérdidas totales de 3.000 W.",
        "A": {
            "enunciado": "Las pérdidas en el cobre a plena carga son de 1.500 W.",
            "respuesta": false,
            "explicacion": "En el punto de rendimiento máximo, la suma de las pérdidas en el hierro y las pérdidas enel cobre es de 3.000 W. Como en este punto ambas pérdidas son iguales, las pérdidas en elcobre en la situación de rendimiento máximo (i % 0,75) serán 1.500 W. Las pérdidas en elcobre son proporcionales a la intensidad al cuadrado, por lo que a plena carga (i % 1) seránsuperiores a 1.500 W (Figura 5.7).W0 % Wcc % i2g máx . WccINúWccIN % Wcci2g máx% 1.5000,752 % 2.666,67 W b 1.500 WFIGURA 5.7.212"
        },
        "B": {
            "enunciado": "Las pérdidas en el hierro a tensión nominal son de 1.500 W.",
            "respuesta": true,
            "explicacion": "Se sabe que, en condiciones de rendimiento máximo, las pérdidas totales del transformadorson 3.000 W. En estas condiciones, las pérdidas en el hierro y las pérdidas en el cobre soniguales, por lo que se puede asegurar que las pérdidas en el hierro son 1.500 W. Como eltransformador funciona alimentado a su tensión nominal, estas pérdidas en el hierro se co-rresponden con las medidas en el ensayo de vacío nominal, es decir, son las pérdidas en elhierro a la tensión nominal."
        }
    },
    {
        "numero": 29,
        "tema": "En un transformador de potencia monofásico de relación de transformación6.600/230 V",
        "A": {
            "enunciado": "El valor del índice de carga de rendimiento máximo del transformador cuando sealimenta por AT es distinto que cuando se alimenta por BT.",
            "respuesta": false,
            "explicacion": "Puesto que las pérdidas no dependen del lado por el que se realiza el ensayo, el índice decarga de rendimiento máximo es el mismo si se alimenta por AT o por BT.ig máx %JW0WccIN"
        },
        "B": {
            "enunciado": "Si la tensión del ensayo de cortocircuito (a intensidad nominal) cuando se alimentapor AT es de 528 V, cuando el ensayo se realice con alimentación por BT (a intensi-dad nominal) la tensión deberá ser de 18,4 V.",
            "respuesta": true,
            "explicacion": "Si se refiere la tensión de 528 V al lado de BT:V2ccN % V1ccNa%5286.600/230% 18,4 V"
        }
    },
    {
        "numero": 30,
        "tema": "En un determinado transformador monofásico, cuando trabaja con un índi-ce de carga de 0,7, las pérdidas en el hierro resultan iguales a las del cobre.Respecto a esta situación de carga",
        "A": {
            "enunciado": "Cuando el transformador trabaje a plena carga, el rendimiento será menor.",
            "respuesta": true,
            "explicacion": "Como las pérdidas son iguales, el rendimiento máximo se produce para un índice de cargade 0,7, por lo que para otro índice de carga el rendimiento será menor.Transformadores. Pruebas de autoevaluación teórica213"
        },
        "B": {
            "enunciado": "Cuando el transformador trabaje a plena carga, las pérdidas en el hierro seránmayores.",
            "respuesta": false,
            "explicacion": "Las pérdidas en el hierro dependen de la tensión aplicada, no del índice de carga con elque trabaja el transformador."
        }
    },
    {
        "numero": 31,
        "tema": "En un transformador de potencia",
        "A": {
            "enunciado": "El rendimiento es mayor cuando alimenta una carga resistiva pura que cuando ali-menta una carga de factor de potencia 0,7 inductivo, sea cual sea el valor de una yotra carga.",
            "respuesta": false,
            "explicacion": "Dependiendo del índice de carga, se puede obtener más o menos rendimiento en uno u otrotipo de carga (resistiva o inductiva).g %cos rcos r ! w0i ! i . wj"
        },
        "B": {
            "enunciado": "Para un determinado valor del factor de potencia de la carga, el rendimientoaumenta siempre que aumenta el índice de carga.",
            "respuesta": false,
            "explicacion": "El rendimiento aumentará con el índice de carga hasta que se alcance su valor máximo. Apartir de este valor, el rendimiento disminuye al aumentar el índice de carga.FIGURA 5.8."
        }
    },
    {
        "numero": 32,
        "tema": "Si se incrementa la frecuencia de la tensión de alimentación en un transfor-mador en carga (resistiva pura) y se mantiene constante la tensión eficazprimaria",
        "A": {
            "enunciado": "La caída de tensión en el transformador aumenta.214",
            "respuesta": true,
            "explicacion": "Al aumentar la frecuencia, la impedancia interna del transformador aumenta ya que el va-lor de la reactancia equivalente depende de la frecuencia.Ze % Re ! jXeúXe % 2n . f . L"
        },
        "B": {
            "enunciado": "El transformador trabaja con un flujo menor.",
            "respuesta": true,
            "explicacion": "Al aumentar la frecuencia, manteniendo constante el valor eficaz de la tensión, el flujo dis-minuye:V1 ] E1 % 4,44 . N1 . J0 . f"
        }
    },
    {
        "numero": 33,
        "tema": "Un transformador monofásico de relación 400/230 V (50 Hz) y 250 kVA, tieneuna uZ % 10%.",
        "A": {
            "enunciado": "Si se le realiza el ensayo de cortocircuito nominal alimentado a 60 Hz, el valor de uZque resulta de los datos de este ensayo es superior al 10%.",
            "respuesta": true,
            "explicacion": "Dado que uZ % 10% ha sido obtenida a 50 Hz, en el ensayo a 60 Hz la uZ es mayor, puestoque el aumento de frecuencia afecta a la reactancia equivalente, haciendo que aumente suvalor.uZ % Ze . I1NV1N. 100"
        },
        "B": {
            "enunciado": "En el ensayo de vacío con alimentación por AT (400 V) a 50 Hz circula más flujoque en el ensayo de vacío con alimentación por AT (400 V) a 60 Hz.",
            "respuesta": true,
            "explicacion": "Al disminuir la frecuencia de alimentación, ante la misma tensión eficaz, aumenta el flujomagnético.V1 ] E1 % 4,44 . N1 . J0 . f"
        }
    },
    {
        "numero": 34,
        "tema": "El rendimiento de un transformador trifásico",
        "A": {
            "enunciado": "Es siempre máximo a plena carga.",
            "respuesta": false,
            "explicacion": "El índice de rendimiento máximo de un transformador depende de la relación entre las pér-didas en el hierro a la tensión de alimentación y las pérdidas en el cobre nominales deltransformador.Transformadores. Pruebas de autoevaluación teórica215"
        },
        "B": {
            "enunciado": "Es siempre máximo con el factor de potencia unidad, independientemente del índi-ce de carga.",
            "respuesta": false,
            "explicacion": "El rendimiento máximo no depende sólo del factor de potencia, sino que también dependedel índice de carga (Figura 5.9).FIGURA 5.9."
        }
    },
    {
        "numero": 35,
        "tema": "El transformador trifásico T1 de 30/6 kV a 50 Hz tiene un índice horario 5(grupo C) y el transformador trifásico T2 de 33/6,6 kV a 50 Hz tiene un índicehorario 11 (grupo D).",
        "A": {
            "enunciado": "Ambos transformadores se pueden acoplar en paralelo sobre una red primaria de30 kV.",
            "respuesta": true,
            "explicacion": "Esto es debido a que pertenecen a los grupos C y D, tienen la misma relación de transfor-mación y ambos pueden soportar 30 kV."
        },
        "B": {
            "enunciado": "Si estando en vacío, el transformador T1 se alimenta por AT a 30 kV y 60 Hz, latensión eficaz secundaria será de 7,2 kV.",
            "respuesta": false,
            "explicacion": "La tensión eficaz secundaria seguirá siendo de 6 kV, pero en este caso a 60 Hz. ComoE1 % 4,44 . N1 . J0 . f, a tensión constante y manteniendo el número de espiras constante, sila frecuencia aumenta, el flujo disminuye en la misma proporción. En el secundario secumple que E2 % 4,44 . N2 . J0 . f. Como el flujo ha disminuido en la misma proporciónque ha aumentado la frecuencia, el valor eficaz de la tensión en el secundario no varía."
        }
    },
    {
        "numero": 36,
        "tema": "Se dispone de tres transformadores monofásicos para construir un bancotrifásico. La relación de transformación de cada transformador monofásicoes 30.000/3.000 V.",
        "A": {
            "enunciado": "No se puede construir un banco Yd11 de relación 30.000/3.000 V.216",
            "respuesta": true,
            "explicacion": "Como la relación de transformación de cada transformador monofásico es de 30.000/3.000 V,para poder hacer un banco trifásico de relación 30.000/3.000 las conexiones deberían sertriángulo-triángulo."
        },
        "B": {
            "enunciado": "Se puede construir un banco trifásico que a partir de una red trifásica primaria de30.000 V, proporcione una red trifásica secundaria de 1.732 V.",
            "respuesta": true,
            "explicacion": "Dicha relación de transformación se obtendría realizando una conexión estrella-triángulo."
        }
    },
    {
        "numero": 37,
        "tema": "Tres transformadores monofásicos de 220/127 kV, cuya relación entre espi-ras es N1/N2, se emplean para construir un banco trifásico.",
        "A": {
            "enunciado": "Para conectarlos a una red trifásica primaria de 380 kV y una red trifásica secunda-ria de 127 kV, su conexión debe ser en estrella-triángulo.",
            "respuesta": true,
            "explicacion": "En el triángulo, la tensión por fase es igual a la tensión compuesta (127 kV), mientras queen la estrella se cumple que:U % ∂3 . V % ∂3 . 220 % 380 kV"
        },
        "B": {
            "enunciado": "Si se conectan en conexión estrella-estrella, la relación de transformación del bancoes ∂3 . (N1/N2).",
            "respuesta": false,
            "explicacion": "La relación de transformación tendría el siguiente valor:RT % UI IIU12% ∂3 . V1∂3 . V2% V1V2% N1N2"
        }
    },
    {
        "numero": 38,
        "tema": "En un transformador trifásico, con conexión Yy6",
        "A": {
            "enunciado": "La relación de transformación coincide con la relación del número de espiras.",
            "respuesta": true,
            "explicacion": "Esto es así ya que es una conexión estrella-estrella. En otro tipo de conexión no tiene porqué ser así.Transformadores. Pruebas de autoevaluación teórica217"
        },
        "B": {
            "enunciado": "Las tensiones compuestas del primario y del secundario están en fase.",
            "respuesta": false,
            "explicacion": "En este caso el desfase entre tensiones compuestas de primario y secundario es de 180o, yaque posee un índice horario 6."
        }
    },
    {
        "numero": 39,
        "tema": "El transformador trifásico T1 de 1.200/400 V y 50 Hz tiene un índice horario0 y el transformador trifásico T2 de 1.200/400 V y 50 Hz tiene un índice hora-rio 4.",
        "A": {
            "enunciado": "Ambos transformadores se pueden acoplar en paralelo.",
            "respuesta": true,
            "explicacion": "Esto es debido a que son del mismo grupo (grupo A) y tienen la misma relación de trans-formación."
        },
        "B": {
            "enunciado": "Ambos transformadores se pueden acoplar en paralelo con otro transformador delgrupo D.",
            "respuesta": false,
            "explicacion": "Los transformadores T1 y T2 son del grupo A y no se pueden acoplar en paralelo transfor-madores del grupo A con transformadores del grupo D."
        }
    },
    {
        "numero": 40,
        "tema": "En un transformador Yz5",
        "A": {
            "enunciado": "Ante una carga desequilibrada conectada entre fase y neutro, las tensiones fase-neutro en el primario son equilibradas.",
            "respuesta": true,
            "explicacion": "Se desequilibran las intensidades en el primario y en el secundario, pero no las tensionespor fase."
        },
        "B": {
            "enunciado": "Ante una carga desequilibrada conectada entre fases, las intensidades del primarioson equilibradas.",
            "respuesta": false,
            "explicacion": "Se desequilibran las intensidades, pero no las tensiones por fase."
        }
    },
    {
        "numero": 41,
        "tema": "A un transformador trifásico T1 del tipo Dy11 se acopla en paralelo un se-gundo transformador T2. Para que se produzca un correcto acoplamiento",
        "A": {
            "enunciado": "El transformador T2 debe poseer forzosamente una conexión Dy.218",
            "respuesta": false,
            "explicacion": "El transformador T2 ha de tener la misma relación de transformación, además de tener elmismo índice horario o ser de los grupos C o D."
        },
        "B": {
            "enunciado": "Si la relación de transformación de ambos transformadores es la misma, la relaciónde intensidades de línea en ambos transformadores también es igual.",
            "respuesta": true,
            "explicacion": "Las intensidades de línea están en relación inversa que las tensiones compuestas, cuya re-lación coincide en ambos transformadores."
        }
    },
    {
        "numero": 42,
        "tema": "Dos transformadores de potencia monofásicos (T1 y T2) tienen la misma re-lación de transformación (con las mismas tensiones nominales) y la mismapotencia nominal. Si la tensión de cortocircuito del T1 es del 10% y la ten-sión de cortocircuito del T2 es del 8%",
        "A": {
            "enunciado": "La impedancia equivalente del T1 es mayor que la impedancia equivalente del T2.",
            "respuesta": true,
            "explicacion": "Como ambos transformadores tienen las mismas tensiones y potencias nominales, ambostendrán la misma intensidad nominal. Así, según la expresión de la tensión de cortocircui-to, el transformador de mayor uZ será el que tenga mayor Ze.uZ % Ze . I1NV1N. 100"
        },
        "B": {
            "enunciado": "Si acoplados en paralelo el T1 funciona a plena carga, el T2 funcionará con un índicede carga de 0,8.",
            "respuesta": false,
            "explicacion": "En los acoplamientos en paralelo de transformadores de tensión de cortocircuito diferente,el transformador de menor uZ es el que antes se sobrecarga. Por tanto, si el T1 ya está aplena carga, el T2 estará sobrecargado."
        }
    },
    {
        "numero": 43,
        "tema": "En el acoplamiento en paralelo de dos transformadores que tienen las mis-mas tensiones nominales",
        "A": {
            "enunciado": "El que tiene la menor tensión de cortocircuito es el que trabaja con mayor índice decarga.Transformadores. Pruebas de autoevaluación teórica219",
            "respuesta": true,
            "explicacion": "En dos transformadores en paralelo se cumple que i1 . uZ1 % i2 . uZ2. Por tanto, el que tieneuna menor uZ es el que trabaja siempre con mayor índice de carga."
        },
        "B": {
            "enunciado": "Se puede asegurar que el reparto de potencia entre ambos es igual a la relación en-tre sus potencias nominales.",
            "respuesta": false,
            "explicacion": "El reparto de potencia también depende de las tensiones de cortocircuito de cada transfor-mador. La potencia de cada transformador será:S1 % SGSNG. SN1uZ1. uZGS2 % SGSNG. SN2uZ2. uZGDividiendo ambas ecuaciones, se obtiene la siguiente relación:S1S2% SN1SN2. uZ2uZ1"
        }
    },
    {
        "numero": 44,
        "tema": "Dos transformadores, que cumplen con las condiciones de acoplamiento yposeen igual tensión de cortocircuito (uZ), son acoplados en paralelo.",
        "A": {
            "enunciado": "El índice de carga de ambos transformadores es el mismo, independientemente de lacarga acoplada.",
            "respuesta": true,
            "explicacion": "Esto es debido a que en el acoplamiento en paralelo se cumple que iT1 . uZT1 % iT2 . uZT2.Por eso, si las uZ coinciden, coincidirán los índices de carga de ambos transformadores."
        },
        "B": {
            "enunciado": "La potencia nominal aparente es la misma en ambos transformadores.",
            "respuesta": false,
            "explicacion": "No tiene por qué serlo. Que sus índices de carga sean iguales no implica que sus intensida-des nominales sean iguales."
        }
    },
    {
        "numero": 45,
        "tema": "Un transformador TA de 220/132 kV y 150 MVA se acopla en paralelo con untransformador TB de 220/132 kV y 100 MVA. Se sabe que entre los dospueden suministrar, sin sobrecargarse ninguno de ellos, una potencia de250 MVA.",
        "A": {
            "enunciado": "La relación Re /Xe es igual en ambos transformadores.220",
            "respuesta": true,
            "explicacion": "Para que la potencia que pueda dar el grupo sin sobrecargas coincida con la suma escalarde las potencias nominales de los transformadores, es necesario que se cumpla la igualdadde ángulos de las impedancias equivalentes y que ambos trabajen a plena carga:uR TAuX TA% uR TBuX TBúRe TAXe TA% Re TBXe TB"
        },
        "B": {
            "enunciado": "Cuando suministren una potencia de 75 MVA, el TA suministrará 45 MVA y el TBsuministrará 30 MVA.",
            "respuesta": true,
            "explicacion": "Teniendo en cuenta que los dos funcionan siempre con el mismo índice de carga, y queéste coincide con el del grupo, se cumple que:75250 % STA150 % STB100Por tanto:STA % 75 . 150250 % 45 MVASTB % 75 . 100250 % 30 MVA"
        }
    },
    {
        "numero": 46,
        "tema": "Se dispone de un transformador trifásico Yd5, uZ % 6%, conectado a unared de 132/13,2 kV. Por necesidad de aumentar la carga se desea conectarloen paralelo con otro transformador.",
        "A": {
            "enunciado": "Se puede acoplar en paralelo un transformador de índice horario 5, uZ%8% y rela-ción de tensiones 132/13,2 kV.",
            "respuesta": true,
            "explicacion": "Tienen igual relación de transformación y son del mismo grupo (grupo C), por lo que sepueden acoplar en paralelo."
        },
        "B": {
            "enunciado": "Se puede acoplar en paralelo un transformador Yd5, uZ % 8% y relación de tensio-nes 60/6 kV.",
            "respuesta": false,
            "explicacion": "Un transformador de 60 kV no está diseñado para soportar una tensión de 132 kV."
        }
    },
    {
        "numero": 47,
        "tema": "Un transformador trifásico de índice horario 9",
        "A": {
            "enunciado": "Pertenece al mismo grupo de conexión que un Dy5.Transformadores. Pruebas de autoevaluación teórica221",
            "respuesta": true,
            "explicacion": "Ambos pertenecen al mismo grupo de conexión (grupo C), el cual está integrado por lostransformadores de índice horario 5, 9 y 1."
        },
        "B": {
            "enunciado": "En lo que se refiere a la condición relativa a desfases, puede acoplarse en paralelocon un transformador Yd11.",
            "respuesta": true,
            "explicacion": "Los transformadores pertenecientes a los grupos C y D pueden acoplarse en paralelo reali-zando las conexiones externas adecuadas."
        }
    },
    {
        "numero": 48,
        "tema": "Un autotransformador monofásico de 220/127 kV, 50 Hz y 10 MVA, se ali-menta por el lado de AT.",
        "A": {
            "enunciado": "El bobinado serie pertenece solamente al primario.",
            "respuesta": true,
            "explicacion": "En un autotransformador reductor el bobinado serie pertenece sólo al primario.FIGURA 5.10."
        },
        "B": {
            "enunciado": "En carga, la intensidad de salida del autotransformador por el secundario es menorque la intensidad que recorre el bobinado común.",
            "respuesta": false,
            "explicacion": "La intensidad de salida es mayor que la intensidad del bobinado común: I2 b (I2 . I1)FIGURA 5.11.222"
        }
    },
    {
        "numero": 49,
        "tema": "En un autotransformador de 230/460 V",
        "A": {
            "enunciado": "El porcentaje de potencia que se transmite de forma inductiva es superior al que setransmite de forma conductiva.",
            "respuesta": false,
            "explicacion": "El porcentaje de potencia que se transmite de forma inductiva es:ScS % BTAT % 230460 % 0,5ú50%El porcentaje de potencia que se transmite de forma conductiva es:SiS % AT . BTAT% 460 . 230460% 0,5ú50%Se comprueba como, en este caso, ambos porcentajes son iguales."
        },
        "B": {
            "enunciado": "Las pérdidas en el hierro nominales son mayores cuando trabaja como reductor quecuando trabaja como elevador.",
            "respuesta": false,
            "explicacion": "Si se alimenta por el primario a la tensión nominal primaria o por el secundario a la ten-sión nominal secundaria, el flujo es el mismo. Por tanto, las pérdidas en el hierro seránidénticas en ambos casos."
        }
    },
    {
        "numero": 50,
        "tema": "Sean un transformador y un autotransformador que tienen la misma rela-ción de transformación (mismas tensiones nominales) y la misma potencianominal.",
        "A": {
            "enunciado": "El transformador tiene mayor tensión de cortocircuito que el autotransformador.",
            "respuesta": true,
            "explicacion": "Debido a la configuración de los bobinados, en el autotransformador equivalente la Ze esmenor que en el transformador. Por otro lado, los valores de intensidades nominales sonlos mismos. En consecuencia, la tensión de cortocircuito del autotransformador es menor."
        },
        "B": {
            "enunciado": "Si funcionasen en paralelo, la potencia aparente suministrada por cada uno de ellossería la misma.",
            "respuesta": false,
            "explicacion": "Al disponer de diferente tensión de cortocircuito y, a su vez, la misma potencia nominal yla misma relación de transformación (con los mismos valores de tensiones nominales deprimario y secundario), el reparto de potencias no es el mismo para los dos.Transformadores. Pruebas de autoevaluación teórica223"
        }
    }
];