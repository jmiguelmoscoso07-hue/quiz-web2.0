const preguntas = [
    { texto: "¿Cuántos municipios tiene el Quindío?", respuesta: 12 },
    { texto: "¿Capital de Estados Unidos?", respuesta: "washington dc" },
    { texto: "¿Cuánto es 9 x 5?", respuesta: 45 },
    { texto: "¿Cuánto es 90 / 3?", respuesta: 30 },
    { texto: "¿Cuánto es 90 + 60?", respuesta: 150 },
    { texto: "¿Cuánto es 75 - 30?", respuesta: 45 },
    { texto: "¿Cuánto es 4³?", respuesta: 64 },
    { texto: "¿Promedio de 6,5,4,9,23?", respuesta: 9.4 },
    { texto: "¿Raíz cuadrada de 20?", respuesta: Math.sqrt(20) }
];

let indice = 0;
let puntaje = 0;

function mostrarPregunta() {
    document.getElementById("pregunta").innerText = preguntas[indice].texto;
    document.getElementById("puntaje").innerText = `Puntaje: ${puntaje}/9`;
}

function verificar() {
    const input = document.getElementById("respuesta").value.trim().toLowerCase();
    const correcta = preguntas[indice].respuesta;
    let esCorrecta = false;

    if (typeof correcta === "number") {
        esCorrecta = Math.abs(parseFloat(input) - correcta) < 0.01;
    } else {
        esCorrecta = input.includes(correcta);
    }

    document.getElementById("resultado").innerText =
        esCorrecta ? "✅ Correcto" : `❌ Incorrecto`;

    if (esCorrecta) puntaje++;

    document.getElementById("respuesta").value = "";
    indice++;

    if (indice < preguntas.length) {
        mostrarPregunta();
    } else {
        document.getElementById("pregunta").innerText =
            `🎉 Juego terminado. Puntaje final: ${puntaje}/9`;
    }
}

mostrarPregunta();
