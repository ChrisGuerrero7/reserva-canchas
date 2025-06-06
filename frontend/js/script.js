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
    
      const response = await fetch("http://localhost:8000/api/buscar", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData
      });
    
      const data = await response.json();
      alert(data.mensaje);  // Muestra confirmación
    });
  });

// Toggle del menú en móviles
const toggleBtn = document.querySelector(".menu-toggle");
const navRight = document.querySelector(".nav-right");

toggleBtn.addEventListener("click", () => {
  navRight.classList.toggle("show");
});

