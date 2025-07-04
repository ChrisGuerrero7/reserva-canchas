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
    // Eliminar modal anterior si existe
    const modalAnterior = document.getElementById("modal-equipos");
    if (modalAnterior) modalAnterior.remove();
  
    // Crear el modal
    const modal = document.createElement("div");
    modal.id = "modal-equipos";
    modal.className = "modal-overlay";
    
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    
    // Calcular totales de nivel
    const totalA = a.reduce((sum, jugador) => sum + parseInt(jugador.nivel), 0);
    const totalB = b.reduce((sum, jugador) => sum + parseInt(jugador.nivel), 0);

    // Detectar si es móvil
    const isMobile = window.innerWidth <= 768;

    let equiposHTML = "";
    if (isMobile) {
      equiposHTML = `
        <div class="equipo-card">
          <div class="equipo-header">Equipo A <span class="equipo-total">Total: ${totalA}</span></div>
          <ul class="equipo-lista">
            ${a.map(j => `<li>${j.nombre} <span class='nivel'>(${j.nivel})</span></li>`).join("")}
          </ul>
        </div>
        <div class="equipo-card">
          <div class="equipo-header">Equipo B <span class="equipo-total">Total: ${totalB}</span></div>
          <ul class="equipo-lista">
            ${b.map(j => `<li>${j.nombre} <span class='nivel'>(${j.nivel})</span></li>`).join("")}
          </ul>
        </div>
      `;
    } else {
      equiposHTML = `
        <div class="equipos-info">
          <div class="equipo-stats">
            <span class="equipo-nombre">Equipo A</span>
            <span class="equipo-total">Total: ${totalA}</span>
          </div>
          <div class="equipo-stats">
            <span class="equipo-nombre">Equipo B</span>
            <span class="equipo-total">Total: ${totalB}</span>
          </div>
        </div>
        <table class="equipos-table">
          <tbody>
            ${crearFilasTabla(a, b)}
          </tbody>
        </table>
      `;
    }
    
    modalContent.innerHTML = `
      <div class="modal-header">
        <h2>Equipos Formados</h2>
        <button class="close-btn" onclick="cerrarModal()">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        ${equiposHTML}
      </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Mostrar modal con animación
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);

    // Enviar equipos al backend
    fetch("https://fastapi-backend-ivik.onrender.com/api/enviar-equipos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jugadores: jugadores,
            equipoA: a,
            equipoB: b
        })
    })
    .then(res => res.json())
    .then(data => {
        // Opcional: mostrar notificación de éxito o error
        if (data.mensaje) {
            console.log("Equipos enviados al backend");
        } else {
            console.error("Error al enviar equipos:", data.error);
        }
    })
    .catch(err => {
        console.error("Error de red al enviar equipos:", err);
    });
}
  
function crearFilasTabla(a, b) {
    const maxLen = Math.max(a.length, b.length);
    let filas = "";
  
    for (let i = 0; i < maxLen; i++) {
      const jugadorA = a[i] ? `${a[i].nombre}` : "";
      const jugadorB = b[i] ? `${b[i].nombre}` : "";
      filas += `
        <tr>
          <td style="padding: 0.5rem; border-bottom: 1px solid #333; text-align: center;">${jugadorA}</td>
          <td style="padding: 0.5rem; border-bottom: 1px solid #333; text-align: center;">${jugadorB}</td>
        </tr>
      `;
    }
  
    return filas;
  }
  
  // Botón para formar equipos
  btnFormar.addEventListener("click", formarEquipos);

function cerrarModal() {
    const modal = document.getElementById("modal-equipos");
    if (modal) {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function guardarEquipos() {
    // Aquí puedes agregar la lógica para guardar los equipos
    alert("Equipos guardados exitosamente!");
    cerrarModal();
}

// Cerrar modal al hacer click fuera de él
document.addEventListener("click", (e) => {
    const modal = document.getElementById("modal-equipos");
    if (modal && e.target === modal) {
        cerrarModal();
    }
});