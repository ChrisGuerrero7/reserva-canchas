// Función de inicialización del calendario
function initCalendar() {
    console.log('Inicializando calendario...');
    
    // Get DOM elements
    const dateInput = document.getElementById('selectedDate');
    const prevDayBtn = document.getElementById('prevDay');
    const nextDayBtn = document.getElementById('nextDay');
    const courtSlots = document.querySelectorAll('.court-slot');

    if (!dateInput || !prevDayBtn || !nextDayBtn) {
        console.error('No se encontraron los elementos necesarios del calendario');
        return;
    }

    console.log('Elementos del calendario encontrados');

    // Set today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    
    dateInput.value = todayString;
    console.log('Fecha inicial establecida:', todayString);

    // Helper function to format date as YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Helper function to parse date from YYYY-MM-DD
    function parseDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    // Function to update date
    function updateDate(days) {
        const currentDate = parseDate(dateInput.value);
        currentDate.setDate(currentDate.getDate() + days);
        const newDate = formatDate(currentDate);
        dateInput.value = newDate;
        console.log('Nueva fecha:', newDate);
        loadReservations();
    }

    // Previous day button
    prevDayBtn.addEventListener('click', () => {
        console.log('Botón anterior clickeado');
        updateDate(-1);
    });

    // Next day button
    nextDayBtn.addEventListener('click', () => {
        console.log('Botón siguiente clickeado');
        updateDate(1);
    });

    // Date input change
    dateInput.addEventListener('change', function() {
        console.log('Fecha cambiada manualmente:', dateInput.value);
        loadReservations();
    });

    // Sample reservations data
    const reservations = {
        '2025-06-15': {
            1: {
                '19:00': 'Juan Pérez',
                '19:30': 'Juan Pérez'
            },
            2: {
                '21:00': 'María García',
                '21:30': 'María García',
                '22:00': 'María García',
                '22:30': 'María García'
            }
        },
        '2025-06-16': {
            1: {
                '10:00': 'Christhofer Guerrero',
                '10:30': 'Christhofer Guerrero'
            }
        }
    };

    // Load reservations for the selected date
    function loadReservations() {
        const selectedDate = dateInput.value;
        console.log('Cargando reservas para:', selectedDate);
        console.log('Reservas disponibles:', reservations);

        // Reset all slots to available
        courtSlots.forEach(slot => {
            slot.classList.remove('reserved');
            slot.classList.add('available');
            slot.textContent = '';
        });

        // Apply reservations for the selected date
        if (reservations[selectedDate]) {
            console.log('Reservas encontradas para la fecha:', selectedDate);
            Object.entries(reservations[selectedDate]).forEach(([court, times]) => {
                console.log(`Procesando reservas para cancha ${court}:`, times);
                Object.entries(times).forEach(([time, user]) => {
                    const selector = `.court-slot[data-court="${court}"][data-time="${time}"]`;
                    console.log('Buscando slot con selector:', selector);
                    const slot = document.querySelector(selector);
                    if (slot) {
                        slot.classList.remove('available');
                        slot.classList.add('reserved');
                        slot.textContent = user;
                        console.log(`Reserva aplicada: Cancha ${court}, Hora ${time}, Usuario ${user}`);
                    } else {
                        console.warn(`No se encontró el slot para cancha ${court}, hora ${time}`);
                        // Listar todos los slots disponibles para depuración
                        const allSlots = document.querySelectorAll('.court-slot');
                        console.log('Slots disponibles:', Array.from(allSlots).map(slot => ({
                            court: slot.dataset.court,
                            time: slot.dataset.time
                        })));
                    }
                });
            });
        } else {
            console.log('No hay reservas para la fecha:', selectedDate);
        }
    }

    // Court slot click handler
    courtSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            if (this.classList.contains('available')) {
                const court = this.dataset.court;
                const time = this.dataset.time;
                console.log(`Reservar cancha ${court} a las ${time}`);
            }
        });
    });

    // Initial load
    loadReservations();
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalendar);
} else {
    initCalendar();
} 