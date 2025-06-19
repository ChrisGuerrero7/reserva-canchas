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

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navRight = document.querySelector('.nav-right');

// Toggle menu on button click
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navRight.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navRight.contains(e.target)) {
        navRight.classList.remove('active');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navRight.classList.remove('active');
    }
});

// Mostrar placeholder personalizado en el campo de fecha solo en móvil
window.addEventListener('DOMContentLoaded', function() {
  var fechaInput = document.getElementById('fecha');
  var fechaLabel = document.querySelector('.fecha-label');
  if (fechaInput && fechaLabel && window.innerWidth <= 768) {
    // Mostrar el label si el campo está vacío
    function toggleLabel() {
      if (fechaInput.value) {
        fechaLabel.style.opacity = '0';
        fechaLabel.style.visibility = 'hidden';
      } else {
        fechaLabel.style.opacity = '1';
        fechaLabel.style.visibility = 'visible';
      }
    }
    fechaInput.addEventListener('input', toggleLabel);
    toggleLabel();
  }
});

