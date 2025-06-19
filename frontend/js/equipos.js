// Array para almacenar los jugadores temporalmente
const jugadores = [];

// Elementos del DOM
const form = document.getElementById("form-jugador");
const tabla = document.getElementById("tabla-jugadores");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Capturar los valores del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const posicion = document.getElementById("posicion").value;
  const nivel = document.getElementById("nivel").value;
  const genero = document.getElementById("genero").value;

  // Validaciones básicas
  if (!nombre || !posicion || !nivel || !genero) {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Crear objeto jugador y agregar al array
  const jugador = { nombre, posicion, nivel, genero };
  jugadores.push(jugador);

  // Limpiar formulario
  form.reset();

  // Actualizar tabla visual
  renderizarTabla();
});

function renderizarTabla() {
  tabla.innerHTML = ""; // Limpiar tabla
  jugadores.forEach((j, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${j.nombre}</td>
      <td>${j.posicion}</td>
      <td>${j.nivel}</td>
      <td>${j.genero}</td>
    `;
    tabla.appendChild(row);
  });
}