juego = document.getElementById("juego");

//CREAR INPUT PARA INTRODUCIR APUESTA
input = document.createElement("input");
input.setAttribute("type", "text");
input.id = "apuesta"
input.value = 10;
juego.appendChild(input);

//CREAR BOTON PARA EMPEZAR JUEGO
buton = document.createElement("button");
buton.setAttribute("onclick", "jugar()")
buton.appendChild(document.createTextNode("Jugar"));
buton.id = "inicio";
juego.appendChild(buton);

//CREAR PARTE ZONA DE CARTAS CROUPIER
div = document.createElement("div")
div.id = "cartas_croupier";
juego.appendChild(div);

//CREAR LINEA PARA SEPARAR CARTAS DE CROUPIER DE USER
hr = document.createElement("hr");
juego.appendChild(hr);

//CREAR PARTE ZONA DE CARTAS USER
div = document.createElement("div")
div.id = "cartas_user";
juego.appendChild(div);

//AÑADIMOS ESPACIOS
br = document.createElement("br");
juego.appendChild(br);
juego.appendChild(br);

//CREAR PARTE ZONA DE PEDIR CARTAS
div = document.createElement("div")
div.id = "div1";
juego.appendChild(div);

//CREAR PARTE ZONA DE PEDIR CARTAS
p = document.createElement("p")
p.id = "result";
juego.appendChild(p);

function inicializar() {
    document.getElementById("result").innerHTML = "";
    var baraja = JSON.parse('{ "cartas": [{ "palo": "Treboles", "numero": "As" }, { "palo": "Treboles", "numero": "2" }, { "palo": "Treboles", "numero": "3" }, { "palo": "Treboles", "numero": "4" }, { "palo": "Treboles", "numero": "5" }, { "palo": "Treboles", "numero": "6" }, { "palo": "Treboles", "numero": "7" }, { "palo": "Treboles", "numero": "8" }, { "palo": "Treboles", "numero": "9" }, { "palo": "Treboles", "numero": "Jota" }, { "palo": "Treboles", "numero": "Dama" }, { "palo": "Treboles", "numero": "Rey" }, { "palo": "Diamantes", "numero": "As" }, { "palo": "Diamantes", "numero": "2" }, { "palo": "Diamantes", "numero": "3" }, { "palo": "Diamantes", "numero": "4" }, { "palo": "Diamantes", "numero": "5" }, { "palo": "Diamantes", "numero": "6" }, { "palo": "Diamantes", "numero": "7" }, { "palo": "Diamantes", "numero": "8" }, { "palo": "Diamantes", "numero": "9" }, { "palo": "Diamantes", "numero": "Jota" }, { "palo": "Diamantes", "numero": "Dama" }, { "palo": "Diamantes", "numero": "Rey" }, { "palo": "Corazones", "numero": "As" }, { "palo": "Corazones", "numero": "2" }, { "palo": "Corazones", "numero": "3" }, { "palo": "Corazones", "numero": "4" }, { "palo": "Corazones", "numero": "5" }, { "palo": "Corazones", "numero": "6" }, { "palo": "Corazones", "numero": "7" }, { "palo": "Corazones", "numero": "8" }, { "palo": "Corazones", "numero": "9" }, { "palo": "Corazones", "numero": "Jota" }, { "palo": "Corazones", "numero": "Dama" }, { "palo": "Corazones", "numero": "Rey" }, { "palo": "Picas", "numero": "As" }, { "palo": "Picas", "numero": "2" }, { "palo": "Picas", "numero": "3" }, { "palo": "Picas", "numero": "4" }, { "palo": "Picas", "numero": "5" }, { "palo": "Picas", "numero": "6" }, { "palo": "Picas", "numero": "7" }, { "palo": "Picas", "numero": "8" }, { "palo": "Picas", "numero": "9" }, { "palo": "Picas", "numero": "Jota" }, { "palo": "Picas", "numero": "Dama" }, { "palo": "Picas", "numero": "Rey" }] }');

    cartas = [];
    for (let i = 0; i < baraja.cartas.length; i++) {
        cartas.push(baraja.cartas[i]);
    }

    return cartas;
}

function jugar() {
    document.getElementById("apuesta").style.display = "none";
    document.getElementById("inicio").style.display = "none";
    //MEZCAMOS CARTAS------------------------------------------------------------------------------------------
    cartas = inicializar();
    shuffle(cartas);

    //POR HACER
    //RETIRAMOS APUESTA DEL CLIENTE-----------------------------------------------------------------------------
    apuesta = document.getElementById("apuesta").value;
    //console.log(apuesta);
    //console.log(cartas);


    //REPARTIMOS CARTAS-------------------------------------------------------------------------------------------
    cartas_user = [];
    cartas_croupier = [];

    cartas_user.push(cartas.pop());
    cartas_croupier.push(cartas.pop());
    cartas_user.push(cartas.pop());
    cartas_croupier.push(cartas.pop());

    //cartas_user[0] = { "palo": "Treboles", "numero": "As" };
    //cartas_user[1] = { "palo": "Treboles", "numero": "Rey" };

    //POR ACABAR
    //MOSTRAMOS CARTAS----------------------------------------------------------------------------------------------
    mostrar_cartas(cartas_user);
    mostrar_cartas_croupier(cartas_croupier);
    //generarCarta(cartas_user[0]);
    console.log(cartas_user);

    console.log(cartas_croupier);

    //CALCULAMOS SUMA DE LAS CARTAS----------------------------------------------------------------------------------
    suma_user = sumar_cartas(cartas_user);
    suma_croupier = sumar_cartas(cartas_croupier);

    //MOSTRAMOS LA SUMA-----------------------------------------------------------------------------------------------
    console.log("User " + suma_user);
    console.log("Croupier " + suma_croupier);

    //PEDIR USUARIO???-----------------------------------------------------------------------
    if (suma_user == 21) {
        //alert("BLACKJACK!");
        resolucion_partida();
    } else if (suma_croupier == 21) {
        //alert("BLACKJACK!");
        resolucion_partida();
    } else {
        pedir = document.createElement('button');
        pedir.appendChild(document.createTextNode("Pedir"));
        pedir.onclick = function() { pedirUsuario(true) }; //CAMBIAR
        document.getElementById("div1").appendChild(pedir);

        nopedir = document.createElement('button');
        nopedir.appendChild(document.createTextNode("No pedir"));
        nopedir.onclick = function() { pedirUsuario(false) }; //CAMBIAR
        document.getElementById("div1").appendChild(nopedir);
    }
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function mostrar_cartas(cartas) {
    var div = document.getElementById("cartas_user");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    for (let i = 0; i < cartas.length; i++) {
        div.appendChild(generarCarta(cartas[i]));
    }
}

function mostrar_cartas_croupier(cartas) {
    var div = document.getElementById("cartas_croupier");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    for (let i = 0; i < cartas.length; i++) {
        div.appendChild(generarCarta(cartas[i]));
    }
}

function generarCarta(carta) {
    var el = document.createElement('div');
    el.style.margin = "0 10px"
    el.style.display = "inline-block";
    el.style.backgroundColor = "white";
    var icon = '';
    if (carta.palo == 'Corazones')
        icon = '&hearts;';
    else if (carta.palo == 'Picas')
        icon = '&spades;';
    else if (carta.palo == 'Diamantes')
        icon = '&diams;';
    else
        icon = '&clubs;';

    el.className = 'carta';
    el.style.width = "75px";
    el.style.height = "150px";
    el.style.border = "1px solid black";
    el.style.textAlign = "center";
    el.style.fontSize = "xx-large";
    el.style.borderRadius = "10px";
    el.innerHTML = carta.numero + '<br/>' + icon;
    document.getElementById("div1").appendChild(el);
    return el;
}

function sumar_cartas(cartas) {
    total = 0;
    contAs = 0;
    for (let i = 0; i < cartas.length; i++) {
        if (cartas[i].numero == "As") {
            total += 11;
            contAs++;
        } else if (cartas[i].numero == "Jota" || cartas[i].numero == "Dama" || cartas[i].numero == "Rey") {
            total += 10;
        } else {
            total += parseInt(cartas[i].numero);
        }
        if (total > 21 && contAs > 0) {
            total -= 10;
            contAs -= 1;
        }
    }

    return total;

}

function pedirUsuario(pedir) {
    if (pedir) {
        cartas_user.push(cartas.pop());
        suma_user = sumar_cartas(cartas_user);
        console.log(cartas_user);
        suma_user = sumar_cartas(cartas_user);
        console.log("User " + suma_user);
        mostrar_cartas(cartas_user);
        if (suma_user > 21) {
            noPedir();
            //alert("te has pasado");
        }
    } else {
        noPedir();
    }
}

function noPedir() {
    pedir.remove();
    nopedir.remove();
    //PIDE CROUPIER
    if (suma_user < 21) {
        while (suma_croupier < 17 && suma_croupier < suma_user) {
            cartas_croupier.push(cartas.pop());
            suma_croupier = sumar_cartas(cartas_croupier);
            mostrar_cartas_croupier(cartas_croupier);
        }
        console.log(cartas_croupier);
        console.log("Croupier " + suma_croupier);
    }
    resolucion_partida();
}

function resolucion_partida(params) {
    if (suma_user > suma_croupier && suma_user <= 21 || suma_croupier > 21) {
        //console.log("GANA USER")
        document.getElementById("result").innerHTML = "Gana User";
    } else {
        //console.log("GANA LA COUPIER");
        document.getElementById("result").innerHTML = "Gana CPU";
    }
    document.getElementById("inicio").style.display = "";
    document.getElementById("apuesta").style.display = "";
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}