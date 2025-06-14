const contenido = document.getElementById("contenido-admin");
const menuItems = document.querySelectorAll(".sidebar nav ul li");
const loginButton = document.getElementById("loginButton");

// Maneja el cambio de vistas
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const vista = item.getAttribute("data-view");
    cargarVista(vista);
  });
});

// Maneja el click en el botón de perfil
loginButton.addEventListener("click", () => {
  menuItems.forEach(i => i.classList.remove("active"));
  cargarVista("perfil");
});

// Carga el HTML de cada sección dinámicamente
function cargarVista(vista) {
  // Primero removemos cualquier script anterior
  const oldScript = document.querySelector(`script[data-view="${vista}"]`);
  if (oldScript) {
    oldScript.remove();
  }

  fetch(`./js/views/${vista}.html`)
    .then(res => res.text())
    .then(html => {
      contenido.innerHTML = html;

      // Solo cargamos el script si es una vista que lo necesita
      if (vista === 'calendario') {
        // Esperamos a que el DOM se actualice
        setTimeout(() => {
          const script = document.createElement('script');
          script.src = './js/calendario.js';
          script.setAttribute('data-view', vista);
          script.onload = () => {
            console.log('Script de calendario cargado');
            // Forzamos la inicialización del calendario
            const event = new Event('DOMContentLoaded');
            document.dispatchEvent(event);
          };
          document.body.appendChild(script);
        }, 100);
      }
    })
    .catch(err => {
      console.error(`Error al cargar la vista ${vista}:`, err);
      contenido.innerHTML = `<div class="error">Error al cargar la vista</div>`;
    });
}

// Cargar la vista inicial al iniciar
cargarVista("home");