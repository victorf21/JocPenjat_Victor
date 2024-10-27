const inpuObj = document.getElementById("paraulaSecreta");
const inpuButton = document.getElementById("comencarPartida");
const imgObj = document.getElementById("imagen");
const tituloPalabra = document.getElementById("tituloPalabra");
const puntuacionActualElem = document.getElementById("puntuacionActual");
const totalPartidesElem = document.getElementById("totalPartides");
const partidesGuanyadesElem = document.getElementById("partidesGuanyades");
const partidaMesPuntsElem = document.getElementById("partidaMesPunts");

//Variables
let paraulaSecreta;
let contlletraFallada = 0;
let paraulaActual = [];
const maxIntentos = 10; 
let puntuacionActual = 0; 
let totalPartides = 0; 
let partidesGuanyades = 0; 
let puntuacionMaxima = 0; 
let puntuacionConsecutiva = 0; 

//Función para comenzar la partida
function comencarPartida() {
    paraulaSecreta = inpuObj.value.toUpperCase();
    if (paraulaSecreta && paraulaSecreta.length > 3) {
        paraulaActual = Array(paraulaSecreta.length).fill("_");
        actualizarPalabraMostrada();
        resetearEstilos(); 
        contlletraFallada = 0; //Reiniciar contador de errores
        puntuacionActual = 0; //Reiniciar puntuación
        puntuacionConsecutiva = 0; //Reiniciar contador de aciertos consecutivos
        puntuacionActualElem.textContent =  puntuacionActual;
        inpuObj.disabled = true;
        inpuButton.disabled = true;
        habilitarBoto();
    } else {
        alert("Introduce una palabra de más de 4 letras");
    }
}

//Función para mostrar u ocultar la palabra secreta
function mostrarParaula() {
    if (inpuObj.type === "password") {
        inpuObj.type = "text";
    } else {
        inpuObj.type = "password";
    }
}

//Función que se ejecuta al seleccionar una letra
function jugarLletra(obj) {
    let lletraJugada = obj.textContent.toUpperCase();

    obj.disabled = true; // Deshabilitar el botón
    obj.style.color = "red"; 
    obj.style.border = "1px solid red"; 

    //Si la letra no está en la palabra, incrementa errores
    if (!paraulaSecreta.includes(lletraJugada)) {
        contlletraFallada++;
        puntuacionActual = Math.max(0, puntuacionActual - 1); //Restar un punto
        imgObj.src = "imatges/penjat_" + contlletraFallada + ".jpg";
        puntuacionActualElem.textContent = puntuacionActual; 

        //Verifica si alcanzó el límite de errores
        if (contlletraFallada >= maxIntentos) {
            mostrarDerrota(); 
            imgObj.src = "imatges/penjat_0.jpg";
        }
    } else {
        let count = 0; 
        for (let i = 0; i < paraulaSecreta.length; i++) {
            if (paraulaSecreta[i] === lletraJugada) {
                count++;
            }
        }
        revelarPalabra(lletraJugada, count); //Revela letra correcta y cuenta
    }
}

//Función para revelar las letras correctas en la palabra
function revelarPalabra(letra, count) {
    for (let i = 0; i < paraulaSecreta.length; i++) {
        if (paraulaSecreta[i] === letra) {
            paraulaActual[i] = letra;
        }
    }
    actualizarPalabraMostrada();

    //Actualizar puntuación
    puntuacionConsecutiva++;
    puntuacionActual += puntuacionConsecutiva * count; //Sumar puntos basados en aciertos
    puntuacionActualElem.textContent = puntuacionActual; //Actualiza la puntuación

    //Verifica si el jugador ha ganado
    if (!paraulaActual.includes("_")) {
        mostrarVictoria(); //Llamada a la función de victoria
        imgObj.src = "imatges/penjat_0.jpg"; 
    }
}

//Función para actualizar la palabra mostrada en el HTML
function actualizarPalabraMostrada() {
    tituloPalabra.textContent = paraulaActual.join(" ");
}

//Función para mostrar el resultado de victoria
function mostrarVictoria() {
    tituloPalabra.style.backgroundColor = "green"; 
    totalPartides++; // Incrementa total de partidas
    partidesGuanyades++; // Incrementa partidas ganadas
    if (puntuacionActual > puntuacionMaxima) {
        puntuacionMaxima = puntuacionActual;
        partidaMesPuntsElem.textContent = new Date().toLocaleString() + " - " + puntuacionMaxima + " punts"; 
    }
    totalPartidesElem.textContent = totalPartides; 
    partidesGuanyadesElem.textContent = partidesGuanyades;

    finalizarPartida();
}

//Función para mostrar el resultado de derrota
function mostrarDerrota() {
    tituloPalabra.textContent = paraulaSecreta; // Muestra la palabra
    tituloPalabra.style.backgroundColor = "red"; // Cambia el fondo a rojo
    totalPartides++; // Incrementa total de partidas
    totalPartidesElem.textContent = totalPartides; // Actualiza total de partidas
    partidesGuanyadesElem.textContent = partidesGuanyades;
    // Actualiza partidas ganadas y porcentaje
    finalizarPartida();
}


//Función para finalizar la partida
function finalizarPartida() {
    deshabilitarBoto();
    inpuObj.disabled = false; // Habilita el formulario
    inpuButton.disabled = false; // Habilita el botón de comenzar partida

}

//Función para habilitar los botones de las letras
function habilitarBoto() {
    for (let i = 1; i <= 26; i++) {
        let literal = "boto_" + i; 
        const boto = document.getElementById(literal);
        if (boto) {
            boto.disabled = false; // Habilita el botón
            boto.style.color = "black"; 
            boto.style.border = "1px solid black"; 
        }
    }
}

//Función para deshabilitar los botones de las letras
function deshabilitarBoto() {
    for (let i = 1; i <= 26; i++) {
        let literal = "boto_" + i; 
        const boto = document.getElementById(literal);
        if (boto) {
            boto.disabled = true; // Deshabilita el botón
            boto.style.color = "red"; // Texto en rojo
            boto.style.border = "1px solid red"; // Borde rojo
            
        }
    }
}

//Función para resetear el fondo del título
function resetearEstilos() {
    tituloPalabra.style.backgroundColor = ""; 
}

deshabilitarBoto();
