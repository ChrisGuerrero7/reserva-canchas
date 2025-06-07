window.addEventListener("DOMContentLoaded", () => {
    const horaSelect = document.querySelector("select:last-of-type");
    for (let h = 6; h <= 22; h++) {
      horaSelect.innerHTML += `<option>${h.toString().padStart(2, "0")}:00</option>`;
      //horaSelect.innerHTML += `<option>${h.toString().padStart(2, "0")}:30</option>`;
    }
  
    // Asignar evento al botón de búsqueda
    document.getElementById("buscarBtn").addEventListener("click", async function(e) {
      e.preventDefault();
    
      const fecha = document.getElementById("fecha").value;
      const ubicacion = document.getElementById("ubicacion").value;
      const tipo_cancha = document.getElementById("tipo-cancha").value;
      const hora = document.getElementById("hora").value;
    
      const formData = new URLSearchParams();
      formData.append("fecha", fecha);
      formData.append("ubicacion", ubicacion);
      formData.append("tipo_cancha", tipo_cancha);
      formData.append("hora", hora);
    
      try {
        const response = await fetch("https://fastapi-backend-ivik.onrender.com/api/buscar", {
          method: "POST",
          body: formData // ¡Sin headers! El navegador los gestiona automáticamente
        });
    
        const result = await response.json();
        alert(result.mensaje);
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Ocurrió un error al enviar los datos.");
      }
  });

// Toggle del menú en móviles
const toggleBtn = document.querySelector(".menu-toggle");
const navRight = document.querySelector(".nav-right");

toggleBtn.addEventListener("click", () => {
  navRight.classList.toggle("show");
});
});

