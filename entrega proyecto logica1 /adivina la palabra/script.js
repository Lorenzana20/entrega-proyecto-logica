let palabrasFacil = ["GUITARRA", "PERRO", "TURQUESA", "CASA", "ARBOL", "FLORES", "AZUL", "GATO", "SILLA", "MESA", "AGUA", "SOL", "LUNA"];
let ayudasFacil = [
    "Instrumento Musical",
    "Animal doméstico",
    "Es un color",
    "Edificación habitable",
    "Planta de gran tamaño",
    "Plantas ornamentales",
    "Color primario",
    "Animal doméstico",
    "Mueble para sentarse",
    "Mueble para colocar objetos",
    "Sustancia transparente e incolora",
    "Estrella que ilumina la Tierra",
    "Satélite natural de la Tierra"
];

let palabrasMedio = ["TECLADO", "GUATEMALA", "COMPUTADORA", "PROGRAMACION", "INTELIGENCIA", "INTERNET", "TELEVISION", "CULTURA", "DIVERSIDAD", "GENEROSIDAD", "IMAGINACION", "FUNDAMENTAL"];
let ayudasMedio = [
    "Hardware de computadora",
    "Es un país",
    "Dispositivo electrónico",
    "Escritura de código",
    "Capacidad para comprender y razonar",
    "Red global de computadoras",
    "Medio de comunicación audiovisual",
    "Conjunto de conocimientos y costumbres",
    "Variedad y diferencia",
    "Calidad de ser generoso",
    "Capacidad de crear imágenes mentales",
    "Básico e importante"
];

let palabrasDificil = ["GERSON", "ORDENADOR", "ELEFANTE", "COMPLEJIDAD", "DESCONOCIDO", "INMORTAL", "INTRINCADO", "UBICUIDAD", "QUIMERA", "SOBREHUMANO", "SOBRECOGEDOR", "SINGULARIDAD", "INDOMABLE"];
let ayudasDificil = [
    "Nombre del ingeniero de lógica",
    "Dispositivo electrónico",
    "Animal grande",
    "Estado o carácter de lo complejo",
    "Que no se conoce o se reconoce",
    "Que no puede morir",
    "Muy complicado",
    "Estar presente en todas partes",
    "Animal fabuloso",
    "Que está más allá de lo humano",
    "Que causa gran impresión o temor",
    "Cualidad de ser único o excepcional",
    "Que no se puede dominar o vencer"
];

let palabrasSuperDificil = ["HIPOPOTAMO", "SUPERCALIFRAGILISTICOESPIALIDOSO", "DESOXIRRIBONUCLEICO", "INCONMENSURABILIDAD", "IMPREDECIBILIDAD", "PARALELEPIPEDO", "INCONMENSURABLE", "PLUVIOMETRICO", "CONSTANTINOPOLITANO", "ANFETAMINOMANO"];
let ayudasSuperDificil = [
    "Animal grande de agua",
    "Palabra mágica",
    "Molécula genética",
    "Imposibilidad de medir",
    "Que no se puede prever",
    "Cuerpo geométrico",
    "Que no se puede medir",
    "Relativo a la medición de la lluvia",
    "Relativo a la antigua ciudad",
    "Adicto a las anfetaminas"
];

let dificultades = {
    'fácil': { palabras: [...palabrasFacil], ayudas: [...ayudasFacil], maxAciertos: 3 },
    'medio': { palabras: [...palabrasMedio], ayudas: [...ayudasMedio], maxAciertos: 2 },
    'difícil': { palabras: [...palabrasDificil], ayudas: [...ayudasDificil], maxAciertos: 1 },
    'super difícil': { palabras: [...palabrasSuperDificil], ayudas: [...ayudasSuperDificil], maxAciertos: Infinity }
};

let dificultadActual = 'fácil';
let cantPalabrasJugadas = 0;
let intentosRestantes = 5;
let errores = 0;
let posActual;
let arrayPalabraActual = [];
let cantidadAcertadas = 0;
let divsPalabraActual = [];
let totalQueDebeAcertar;
let aciertos = 0;

function cargarNuevaPalabra() {
    if (dificultades[dificultadActual].palabras.length === 0) {
        alert(`No hay más palabras en la dificultad ${dificultadActual}. Cambiando a la siguiente dificultad.`);
        cambiarDificultad();
    }

    cantPalabrasJugadas++;
    if (cantPalabrasJugadas > dificultades[dificultadActual].palabras.length) {
        cantPalabrasJugadas = 1;
    }

    posActual = Math.floor(Math.random() * dificultades[dificultadActual].palabras.length);
    let palabra = dificultades[dificultadActual].palabras[posActual];
    totalQueDebeAcertar = palabra.length;
    cantidadAcertadas = 0;
    arrayPalabraActual = palabra.split('');

    document.getElementById("palabra").innerHTML = "";
    document.getElementById("letrasIngresadas").innerHTML = "";

    for (let i = 0; i < palabra.length; i++) {
        var divLetra = document.createElement("div");
        divLetra.className = "letra";
        document.getElementById("palabra").appendChild(divLetra);
    }

    divsPalabraActual = document.getElementsByClassName("letra");

    intentosRestantes = 5;
    document.getElementById("intentos").innerHTML = intentosRestantes;
    document.getElementById("ayuda").innerHTML = dificultades[dificultadActual].ayudas[posActual];

    dificultades[dificultadActual].palabras.splice(posActual, 1);
    dificultades[dificultadActual].ayudas.splice(posActual, 1);
}

document.addEventListener("keydown", event => {
    if (isLetter(event.key)) {
        let letrasIngresadas = document.getElementById("letrasIngresadas").innerHTML;
        letrasIngresadas = letrasIngresadas.split(' ');

        if (letrasIngresadas.lastIndexOf(event.key.toUpperCase()) === -1) {
            let acerto = false;

            for (let i = 0; i < arrayPalabraActual.length; i++) {
                if (arrayPalabraActual[i] === event.key.toUpperCase()) {
                    divsPalabraActual[i].innerHTML = event.key.toUpperCase();
                    acerto = true;
                    cantidadAcertadas++;
                }
            }

            if (acerto) {
                if (totalQueDebeAcertar === cantidadAcertadas) {
                    for (let i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintar";
                    }
                    aciertos++;
                    comprobarAciertos();
                    setTimeout(cargarNuevaPalabra, 2000);
                }
            } else {
                intentosRestantes--;
                document.getElementById("intentos").innerHTML = intentosRestantes;

                if (intentosRestantes <= 0) {
                    errores++;
                    if (errores >= 3) {
                        alert("Demasiados errores. Volviendo a la dificultad fácil.");
                        cambiarADificultadFacil();
                    } else {
                        for (let i = 0; i < arrayPalabraActual.length; i++) {
                            divsPalabraActual[i].className = "letra pintarError";
                        }
                        setTimeout(cargarNuevaPalabra, 2000);
                    }
                }
            }

            document.getElementById("letrasIngresadas").innerHTML += event.key.toUpperCase() + " ";
        }
    }
});

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function comprobarAciertos() {
    if (aciertos >= dificultades[dificultadActual].maxAciertos) {
        cambiarDificultad();
    }
}

function cambiarDificultad() {
    if (dificultadActual === 'fácil') {
        dificultadActual = 'medio';
    } else if (dificultadActual === 'medio') {
        dificultadActual = 'difícil';
    } else if (dificultadActual === 'difícil') {
        dificultadActual = 'super difícil';
    } else {
        alert("¡Has completado todas las dificultades!");
        return;
    }
    aciertos = 0;
    document.getElementById("dificultad").textContent = dificultadActual.charAt(0).toUpperCase() + dificultadActual.slice(1);
    if (dificultades[dificultadActual].palabras.length === 0) {
        recargarPalabras();
    }
}

function cambiarADificultadFacil() {
    dificultadActual = 'fácil';
    aciertos = 0;
    errores = 0;
    recargarPalabras();
    document.getElementById("dificultad").textContent = 'Fácil';
    cargarNuevaPalabra();
}

function recargarPalabras() {
    dificultades['fácil'].palabras = [...palabrasFacil];
    dificultades['fácil'].ayudas = [...ayudasFacil];
    dificultades['medio'].palabras = [...palabrasMedio];
    dificultades['medio'].ayudas = [...ayudasMedio];
    dificultades['difícil'].palabras = [...palabrasDificil];
    dificultades['difícil'].ayudas = [...ayudasDificil];
    dificultades['super difícil'].palabras = [...palabrasSuperDificil];
    dificultades['super difícil'].ayudas = [...ayudasSuperDificil];
}

cargarNuevaPalabra();