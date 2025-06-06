window.addEventListener("DOMContentLoaded", () => {
    const horaSelect = document.querySelector("select:last-of-type");
    for (let h = 6; h <= 22; h++) {
      horaSelect.innerHTML += `<option>${h.toString().padStart(2, "0")}:00</option>`;
      //horaSelect.innerHTML += `<option>${h.toString().padStart(2, "0")}:30</option>`;
    }
  
    // Asignar evento al botón de búsqueda
    document.getElementById("buscarBtn").addEventListener("click", buscar);
  });
  
  function buscar() {
    const ciudad = document.querySelector('input[type="text"]').value;
    const deporte = document.querySelector('select').value;
    const fecha = document.querySelector('input[type="date"]').value;
    const hora = document.querySelectorAll('select')[1].value;
  
    // Por ahora, solo mostrar los datos en consola
    console.log("Buscando cancha...");
    console.log("Ciudad:", ciudad);
    console.log("Deporte:", deporte);
    console.log("Fecha:", fecha);
    console.log("Hora:", hora);
  
    alert(`Buscando canchas para:\n📍 ${ciudad}\n🏅 ${deporte}\n📅 ${fecha}\n🕒 ${hora}`);
  }

// Toggle del menú en móviles
const toggleBtn = document.querySelector(".menu-toggle");
const navRight = document.querySelector(".nav-right");

toggleBtn.addEventListener("click", () => {
  navRight.classList.toggle("show");
});