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
    
    modalContent.innerHTML = `
      <div class="modal-header">
        <h2>Equipos Formados</h2>
        <button class="close-btn" onclick="cerrarModal()">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <div class="modal-body">
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
      </div>
      
      <div class="modal-footer">
        <form id="form-correo-equipo" class="form-correo-equipo" autocomplete="off" style="margin-top:0;">
          <label for="correo-equipo" style="display:block; color:var(--texto-secundario); margin-bottom:0.5rem; text-align:left;">¿Quieres recibir tu equipo por correo? Ingresa tu email.</label>
          <div style="display:flex; gap:0.5rem;">
            <input type="email" id="correo-equipo" name="correo-equipo" placeholder="Tu correo electrónico" required style="flex:1; padding:0.5rem; border-radius:5px; border:1px solid var(--borde);">
            <button type="submit" class="btn-guardar-correo" style="background:var(--verde); color:white; border:none; border-radius:5px; padding:0 1.2rem; font-weight:bold; cursor:pointer;">Guardar</button>
          </div>
        </form>
      </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Mostrar modal con animación
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);

    // Manejar envío del formulario de correo
    const formCorreo = modal.querySelector('#form-correo-equipo');
    formCorreo.addEventListener('submit', function(e) {
      e.preventDefault();
      const correo = modal.querySelector('#correo-equipo').value.trim();
      if (!correo) {
        alert('Por favor ingresa un correo válido.');
        return;
      }
      // Aquí puedes agregar la lógica para guardar el equipo y el correo
      alert('¡Equipo guardado y enviado a ' + correo + '!');
      cerrarModal();
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