// ===== Datos del quiz =====
const preguntas = [
  { texto: "¿Cuántos municipios tiene el Quindío?", respuesta: 12 },
  { texto: "¿Capital de Estados Unidos?", respuesta: "washington dc" },
  { texto: "¿Cuánto es 9 x 5?", respuesta: 45 },
  { texto: "¿Cuánto es 90 / 3?", respuesta: 30 },
  { texto: "¿Cuánto es 90 + 60?", respuesta: 150 },
  { texto: "¿Cuánto es 75 - 30?", respuesta: 45 },
  { texto: "¿Cuánto es 4³?", respuesta: 64 },
  { texto: "¿Promedio de 6,5,4,9,23?", respuesta: 9.4 },
  { texto: "¿Raíz cuadrada de 20?", respuesta: Math.sqrt(20) },
  { texto: "¿Año de la independencia de Colombia?", respuesta: 1810 }
];

let indice = 0;
let puntaje = 0;

// ===== Utilidades =====
function normalizarTexto(s) {
  return (s || "")
    .toString()
    .trim()
    .toLowerCase()
    // quitar tildes
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    // colapsar espacios múltiples
    .replace(/\s+/g, " ");
}

// ===== UI =====
function mostrarPregunta() {
  const total = preguntas.length;
  const { texto } = preguntas[indice];

  document.getElementById("pregunta").innerText = `(${indice + 1}/${total}) ${texto}`;
  document.getElementById("puntaje").innerText = `Puntaje: ${puntaje}/${total}`;
  document.getElementById("resultado").innerText = "";
  const input = document.getElementById("respuesta");
  input.value = "";
  input.focus();
}

function terminarJuego() {
  const total = preguntas.length;
  const mensaje = `🎉 Juego terminado. Puntaje final: ${puntaje}/${total}`;
  document.getElementById("pregunta").innerText = mensaje;
  document.getElementById("resultado").innerText = "";
  document.getElementById("puntaje").innerText = `Puntaje: ${puntaje}/${total}`;
}
//===== Reiniciar juego =====
function reiniciar() {
    indice = 0;
    puntaje = 0;
    document.getElementById("resultado").innerText = "";
    document.getElementById("respuesta").value = "";
    mostrarPregunta();
}
window.reiniciar = reiniciar;

// ===== Lógica =====
function verificar() {
  const inputRaw = document.getElementById("respuesta").value;
  const correcta = preguntas[indice].respuesta;

  // Validación
  let esCorrecta = false;

  if (typeof correcta === "number") {
    // Intento de convertir la entrada a número
    const valor = parseFloat(inputRaw.replace(",", ".")); // permitir coma decimal
    if (!Number.isNaN(valor)) {
      // margen de tolerancia para decimales
      esCorrecta = Math.abs(valor - correcta) < 0.01;
    }
  } else {
    // Comparación de texto estricta pero normalizada
    const entrada = normalizarTexto(inputRaw);
    const esperado = normalizarTexto(correcta);
    esCorrecta = entrada === esperado;
    // Extra: aceptar "washington d.c." también
    if (!esCorrecta && esperado === "washington dc") {
      esCorrecta = entrada === "washington d.c." || entrada === "washington";
    }
  }

  document.getElementById("resultado").innerText =
    esCorrecta ? "✅ Correcto" : "❌ Incorrecto";

  if (esCorrecta) puntaje++;

  indice++;

  if (indice < preguntas.length) {
    // pequeña pausa para que se lea el resultado
    setTimeout(mostrarPregunta, 700);
  } else {
    setTimeout(terminarJuego, 700);
  }
}

// Permitir Enter para enviar
document.getElementById("respuesta").addEventListener("keydown", (e) => {
  if (e.key === "Enter") verificar();
});

// Inicio
mostrarPregunta();

// Si usas onclick="verificar()" en el botón del HTML:
window.verificar = verificar;