// Array para almacenar los jugadores temporalmente
const jugadores = [];

// Elementos del DOM
const form = document.getElementById("form-jugador");
const tabla = document.getElementById("tabla-jugadores");
const btnFormar = document.getElementById("formar-equipos");

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
// Lógica para armar equipos equilibrados
function formarEquipos() {
    if (jugadores.length < 2) {
        alert("Agrega al menos dos jugadores para formar equipos.");
        return;
    }

    // Agrupar jugadores por posición
    const posiciones = ['arquero', 'defensa', 'medio', 'delantero', 'libre'];
    const porPosicion = {};
    posiciones.forEach(pos => {
        porPosicion[pos] = jugadores.filter(j => j.posicion === pos)
            .sort((a, b) => b.nivel - a.nivel); // Ordenar por nivel descendente
    });

    const equipoA = [];
    const equipoB = [];
    let sumaA = 0, sumaB = 0;

    // Repartir por posición alternando entre equipos
    posiciones.forEach(pos => {
        const lista = porPosicion[pos];
        lista.forEach((jugador, idx) => {
            // Alternar, pero si sumaA < sumaB, priorizar A
            if (equipoA.length < equipoB.length) {
                equipoA.push(jugador);
                sumaA += parseInt(jugador.nivel);
            } else if (equipoB.length < equipoA.length) {
                equipoB.push(jugador);
                sumaB += parseInt(jugador.nivel);
            } else {
                if (sumaA <= sumaB) {
                    equipoA.push(jugador);
                    sumaA += parseInt(jugador.nivel);
                } else {
                    equipoB.push(jugador);
                    sumaB += parseInt(jugador.nivel);
                }
            }
        });
    });

    // Si la diferencia de jugadores es mayor a 1, mover uno al otro equipo
    while (Math.abs(equipoA.length - equipoB.length) > 1) {
        if (equipoA.length > equipoB.length) {
            const mover = equipoA.pop();
            equipoB.push(mover);
            sumaA -= parseInt(mover.nivel);
            sumaB += parseInt(mover.nivel);
        } else {
            const mover = equipoB.pop();
            equipoA.push(mover);
            sumaB -= parseInt(mover.nivel);
            sumaA += parseInt(mover.nivel);
        }
    }

    // Si hay un jugador extra, va al equipo de menor nivel total
    if (equipoA.length > equipoB.length) {
        // Ya está bien
    } else if (equipoB.length > equipoA.length) {
        // Ya está bien
    }

    mostrarEquipos(equipoA, equipoB);
}
function mostrarEquipos(a, b) {
    // Eliminar resultados anteriores si existen
    const anterior = document.getElementById("resultado-equipos");
    if (anterior) anterior.remove();
  
    const resultado = document.createElement("div");
    resultado.id = "resultado-equipos";
    resultado.style.marginTop = "2rem";
    resultado.style.background = "#1e2a38";
    resultado.style.padding = "1rem";
    resultado.style.borderRadius = "10px";
    resultado.innerHTML = `
      <h2>Equipos formados</h2>
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr>
            <th style="padding: 0.5rem; border-bottom: 1px solid #444;">Equipo A</th>
            <th style="padding: 0.5rem; border-bottom: 1px solid #444;">Equipo B</th>
          </tr>
        </thead>
        <tbody>
          ${crearFilasTabla(a, b)}
        </tbody>
      </table>
    `;
    document.querySelector(".container").appendChild(resultado);
}
  
function crearFilasTabla(a, b) {
    const maxLen = Math.max(a.length, b.length);
    let filas = "";
  
    for (let i = 0; i < maxLen; i++) {
      const jugadorA = a[i] ? `${a[i].nombre} (${a[i].nivel})` : "";
      const jugadorB = b[i] ? `${b[i].nombre} (${b[i].nivel})` : "";
      filas += `
        <tr>
          <td style="padding: 0.5rem; border-bottom: 1px solid #333;">${jugadorA}</td>
          <td style="padding: 0.5rem; border-bottom: 1px solid #333;">${jugadorB}</td>
        </tr>
      `;
    }
  
    return filas;
  }
  
  // Botón para formar equipos
  btnFormar.addEventListener("click", formarEquipos);