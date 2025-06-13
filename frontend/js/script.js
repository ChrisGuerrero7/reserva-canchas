window.addEventListener("DOMContentLoaded", () => {
    const horaSelect = document.querySelector("select:last-of-type");
    for (let h = 6; h <= 22; h++) {
      horaSelect.innerHTML += `<option>${h.toString().padStart(2, "0")}:00</option>`;
      //horaSelect.innerHTML += `<option>${h.toString().padStart(2, "0")}:30</option>`;
    }
    document.getElementById("buscarBtn").addEventListener("click", (e) => {
      e.preventDefault();
      // Mostrar el modal
      document.getElementById("emailModal").style.display = "flex";
    });
    // Asignar evento al botón de búsqueda
    document.getElementById("registrarBtn").addEventListener("click", async function(e) {
      e.preventDefault();
    
      const fecha = document.getElementById("fecha").value;
      const ubicacion = document.getElementById("ubicacion").value;
      const tipo_cancha = document.getElementById("tipo-cancha").value;
      const hora = document.getElementById("hora").value;
      const correo = document.getElementById("correo").value;
    
      const formData = new FormData();
      formData.append("fecha", fecha);
      formData.append("ubicacion", ubicacion);
      formData.append("tipo_cancha", tipo_cancha);
      formData.append("hora", hora);
      formData.append("correo", correo);
    
      try {
        //const response = await fetch("https://fastapi-backend-ivik.onrender.com/api/buscar", {
          const backendURL = window.location.hostname.includes("localhost")
          ? "http://127.0.0.1:8000/api/buscar"    // Local
          : "https://fastapi-backend-ivik.onrender.com/api/buscar"; // Producción
        
          // Y úsalo en fetch
          const response = await fetch(backendURL, {
            method: "POST",
            body: formData
          });
    
        const result = await response.json();
        alert(result.mensaje || result.error);
        document.getElementById("emailModal").style.display = "none";
      } catch (error) {
        console.error("Error al hacer fetch:", error);
        alert("No se pudo conectar con el backend.");
      }
      });
  });

// Toggle del menú en móviles
const toggleBtn = document.querySelector(".menu-toggle");
const navRight = document.querySelector(".nav-right");

toggleBtn.addEventListener("click", () => {
  navRight.classList.toggle("show");
});

// Mostrar placeholder personalizado en el campo de fecha solo en móvil
window.addEventListener('DOMContentLoaded', function() {
  var fechaInput = document.getElementById('fecha');
  if (fechaInput && window.innerWidth <= 768) {
    fechaInput.setAttribute('placeholder', 'Elige tu fecha');
    fechaInput.classList.add('placeholder-visible');
    // Para navegadores que no muestran placeholder en date, mostrar texto gris si está vacío
    fechaInput.addEventListener('input', function() {
      if (fechaInput.value) {
        fechaInput.classList.remove('placeholder-visible');
      } else {
        fechaInput.classList.add('placeholder-visible');
      }
    });
  }
});

