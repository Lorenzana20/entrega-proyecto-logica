// Obtener elementos del DOM
// Texto de dificultad seleccionada
const textoDificultad = document.getElementById('textoDificultad');
// Botón 'Comprobar'
const btnComprobar = document.getElementById('comprobar');
// Container de pantalla de alerta
const alerta = document.getElementById('alerta');
// Pantalla de alerta
const alertap = document.getElementById('alertap');

// Texto número máximo
let numMax = document.getElementById('numMax');
// Texto del número que penso la maquina o sube dificultad
let numeroPense = document.getElementById('numeroPense');
// Texto numero Correcto o No Correcto
let correctoNoCorrecto = document.getElementById('correctoNoCorrecto');
// Texto para saber si el número ingresado es mayor o menor 
let mayorMenor = document.getElementById('mayorMenor');
// Texto para mostrar el número ingresado
let numIngresado = document.getElementById('numIngresado');
// Input para ingresar número
let numeroIngresado = document.getElementById('numero');
// Texto para mostrar la cantidad de intentos restantes
let intentosTexto = document.getElementById('numIntentos');

// Variables donde se guardará la cantidad de ganadas, de intentos,
// el número pensado, el número mínumo y máximo
let ganadas = 0;
let intentos = 6;
let min = 1;
let max = 11;
let numeroPensado = Math.floor(Math.random() * (max - min) + min);

// Función cambiar la dificultad de juego en función de las 
// veces que se haya ganado
function minMax() {
    if(ganadas === 0) {
        textoDificultad.textContent = 'Fácil';
        max = 11;
        numMax.textContent = max - 1;
        intentos = 6;
        intentosTexto.textContent = intentos;
        numeroPensado = Math.floor(Math.random() * (max - min) + min);
        return;
    } else if (ganadas === 1) {
        textoDificultad.textContent = 'Medio';
        max = 51;
        numMax.textContent = max - 1;
        intentos = 6;
        intentosTexto.textContent = intentos;
        numeroPensado = Math.floor(Math.random() * (max - min) + min);
        return;
    } else if (ganadas === 2) {
        textoDificultad.textContent = 'Difícil';
        max = 101;
        numMax.textContent = max - 1;
        intentos = 6;
        intentosTexto.textContent = intentos;
        numeroPensado = Math.floor(Math.random() * (max - min) + min);
        return;
    } else if (ganadas === 3) {
        textoDificultad.textContent = 'Ingeniero';
        max = 1001;
        numMax.textContent = max - 1;
        intentos = 6;
        intentosTexto.textContent = intentos;
        numeroPensado = Math.floor(Math.random() * (max - min) + min);
        return;
    }
}

// Evento para comprobar si el número ingresado es menor, mayor o correcto, 
// mostrar alerta gaaste o perdiste y cambiar texto de la pantalla dependiendo
// del número ingresado
btnComprobar.onclick = function() {
    if (numeroIngresado.value === '' || numeroIngresado.value === '0' || numeroIngresado.value > max - 1) {
        alerta.style.display = 'flex';
        alertap.textContent = 'Ingrese un número válido';
        alertap.style.color = 'red';
        alerta.style.backgroundColor = 'white';
        alerta.focus();
        return;
    }
    if (numeroIngresado.value < numeroPensado) {
        numIngresado.textContent = numeroIngresado.value;
        correctoNoCorrecto.textContent = ', pero no es correcto';
        numeroPense.textContent = 'El número que pensé es';
        mayorMenor.textContent = 'Mayor';
        intentos--;
        intentosTexto.textContent = intentos;
    } else if (numeroIngresado.value > numeroPensado) {
        numIngresado.textContent = numeroIngresado.value;
        correctoNoCorrecto.textContent = ', pero no es correcto';
        numeroPense.textContent = 'El número que pensé es';
        mayorMenor.textContent = ' Menor';
        intentos--;
        intentosTexto.textContent = intentos;
    } else if (numeroIngresado.value == numeroPensado) {
        alerta.style.display = 'flex';
        numIngresado.textContent = numeroIngresado.value;
        correctoNoCorrecto.textContent = ', y !es correcto!';
        numeroPense.textContent = 'Ahora aumenta la dificultad.';
        mayorMenor.textContent = '';
        alertap.textContent = '¡Felicidades! Adivinaste el número.';
        alertap.style.color = 'rgb(47, 255, 89)';
        alerta.style.backgroundColor = 'rgb(47, 255, 89)';
        alerta.focus();
        ganadas++;
        textoGanadas.textContent = ganadas;
        minMax();
        return;
        }
    if (intentos === 0) {
        alerta.style.display = 'flex';
        alerta.style.backgroundColor = 'red';
        alertap.style.color = 'red';
        alertap.textContent = 'Perdiste, se te acabaron los intentos';
        alerta.focus();
        return;
    }
}

// Evento para cerrar o cambiar la alerta, y mantener el focus en el
// input de número
document.addEventListener('click', (event) => {
    numeroIngresado.focus();
    if (event.target === alerta && alertap.textContent === '¡Felicidades! Adivinaste el número.' && ganadas < 4) {
        alertap.textContent = 'Ahora aumenta la dificultad, intentemos del ' + min + ' al ' + (max - 1) + '.';
        return;
    } if (event.target === alerta && alertap.textContent === 'Ahora aumenta la dificultad, intentemos del' + min + 'al' + (max - 1) + '.') {
        alerta.style.display = 'none';
        return;
    }
    if (event.target === alerta && intentos > 0 && ganadas < 4) {
        alerta.style.display = 'none';
    } else if (event.target === alerta && alertap.textContent === '¡Felicidades! Adivinaste el número.' && ganadas === 4) {
        alertap.textContent = '¡Haz click en cualquier parte de la pantalla para reiniciar el juego!';
    } else if (event.target === alerta && alertap.textContent === '¡Haz click en cualquier parte de la pantalla para reiniciar el juego!') {
        location.reload(true);
    } else if (event.target === alerta && alertap.textContent === 'Perdiste, se te acabaron los intentos') {
        alertap.textContent = 'El número pensado era: ' + numeroPensado + '    ¡Haz click en cualquier parte de la pantalla para reiniciar el juego!.';
    } else if (event.target === alerta && alertap.textContent === 'El número pensado era: ' + numeroPensado + '    ¡Haz click en cualquier parte de la pantalla para reiniciar el juego!.') {
        location.reload(true);
    }
});

// Evento para que el input de número solo acepte números, enter, backspace
// y flechas de dirección, y si se presiona el enter cuando esta una alerta
// se tome como un click en la alerta
document.addEventListener('keydown', (event) => {
    const teclasPerm = '0123456789';
 
    if (teclasPerm.includes(event.key)) {
    } else if (event.key === 'Enter') {
        event.preventDefault();
        if (alerta.style.display === 'flex') {
            alerta.click();
        } else {
            btnComprobar.click();
        }
    } else if (
        event.key === 'Backspace' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        event.key === 'Delete') {

    } else {
        event.preventDefault();
    }
});