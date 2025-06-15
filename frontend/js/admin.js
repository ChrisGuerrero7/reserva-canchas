const contenido = document.getElementById("contenido-admin");
const menuItems = document.querySelectorAll(".sidebar nav ul li");
const loginButton = document.getElementById("loginButton");

// Maneja el cambio de vistas
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const vista = item.getAttribute("data-view");
    loadView(vista);
  });
});

// Maneja el click en el botón de perfil
loginButton.addEventListener("click", () => {
  menuItems.forEach(i => i.classList.remove("active"));
  loadView("perfil");
});

// Función para limpiar los gráficos existentes
function cleanupCharts() {
    // Destruir instancias de gráficos si existen
    if (window.occupationChart1Instance) {
        window.occupationChart1Instance.destroy();
        window.occupationChart1Instance = null;
    }
    if (window.occupationChart2Instance) {
        window.occupationChart2Instance.destroy();
        window.occupationChart2Instance = null;
    }
    if (window.weeklyReservationsChartInstance) {
        window.weeklyReservationsChartInstance.destroy();
        window.weeklyReservationsChartInstance = null;
    }
}

// Función para cargar el contenido de la vista
async function loadView(view) {
    try {
        console.log(`Cargando vista: ${view}`);
        
        // Limpiar gráficos existentes antes de cargar nueva vista
        cleanupCharts();
        
        // Cargar el HTML de la vista
        const response = await fetch(`./js/views/${view}.html`);
        if (!response.ok) throw new Error('Error al cargar la vista');
        const html = await response.text();
        
        // Actualizar el contenido
        const contenido = document.getElementById('contenido-admin');
        contenido.innerHTML = html;
        
        // Remover cualquier script existente
        const existingScript = document.querySelector('script[data-view]');
        if (existingScript) {
            existingScript.remove();
        }
        
        // Cargar el script correspondiente
        if (view === 'home') {
            console.log('Cargando script de home...');
            const script = document.createElement('script');
            script.src = './js/home.js';
            script.setAttribute('data-view', view);
            script.onload = () => {
                console.log('Script de home cargado');
                // Forzar la inicialización
                if (typeof initHome === 'function') {
                    initHome();
                } else {
                    console.error('La función initHome no está disponible');
                }
            };
            script.onerror = (error) => {
                console.error('Error al cargar el script de home:', error);
            };
            document.body.appendChild(script);
        } else if (view === 'calendario') {
            console.log('Cargando script de calendario...');
            const script = document.createElement('script');
            script.src = './js/calendario.js';
            script.setAttribute('data-view', view);
            script.onload = () => {
                console.log('Script de calendario cargado');
                // Forzar la inicialización
                if (typeof initCalendar === 'function') {
                    initCalendar();
                } else {
                    console.error('La función initCalendar no está disponible');
                }
            };
            script.onerror = (error) => {
                console.error('Error al cargar el script de calendario:', error);
            };
            document.body.appendChild(script);
        } else if (view === 'perfil') {
            console.log('Cargando vista de perfil...');
            // No necesitamos cargar ningún script adicional para el perfil
        }
        
        // Actualizar la navegación
        document.querySelectorAll('.sidebar nav li').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.view === view) {
                item.classList.add('active');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('contenido-admin').innerHTML = '<p>Error al cargar la vista</p>';
    }
}

// Event listeners para la navegación
document.querySelectorAll('.sidebar nav li').forEach(item => {
    item.addEventListener('click', () => {
        const view = item.dataset.view;
        loadView(view);
    });
});

// Event listener para el botón de perfil
document.getElementById('loginButton').addEventListener('click', () => {
    loadView('perfil');
});

// Cargar la vista inicial (home)
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando aplicación...');
    loadView('home');
});