// Variables globales para mantener las instancias de los gráficos
window.occupationChart1Instance = null;
window.occupationChart2Instance = null;
window.weeklyReservationsChartInstance = null;

// Función para inicializar la vista de inicio
function initHome() {
    console.log('Inicializando vista de inicio...');
    
    // Esperar un momento para asegurarnos de que el DOM esté completamente cargado
    setTimeout(() => {
        try {
            // Verificar que los elementos del DOM existan
            const occupationChart1 = document.getElementById('occupationChart1');
            const occupationChart2 = document.getElementById('occupationChart2');
            const weeklyReservationsChart = document.getElementById('weeklyReservationsChart');
            
            console.log('Elementos del DOM:', {
                occupationChart1: occupationChart1,
                occupationChart2: occupationChart2,
                weeklyReservationsChart: weeklyReservationsChart
            });
            
            if (!occupationChart1 || !occupationChart2 || !weeklyReservationsChart) {
                console.error('No se encontraron los elementos del canvas para los gráficos');
                return;
            }
            
            // Verificar que Chart.js esté disponible
            if (typeof Chart === 'undefined') {
                console.error('Chart.js no está disponible');
                return;
            }
            
            console.log('Chart.js está disponible');
            
            // Destruir instancias anteriores si existen
            if (window.occupationChart1Instance) window.occupationChart1Instance.destroy();
            if (window.occupationChart2Instance) window.occupationChart2Instance.destroy();
            if (window.weeklyReservationsChartInstance) window.weeklyReservationsChartInstance.destroy();
            
            // Inicializar gráficos de ocupación
            initOccupationCharts();
            
            // Inicializar gráfico de reservas semanales
            initWeeklyReservationsChart();
            
            // Cargar próximas reservas
            loadUpcomingReservations();
            
            console.log('Vista de inicio inicializada correctamente');
        } catch (error) {
            console.error('Error al inicializar la vista de inicio:', error);
        }
    }, 100);
}

// Función para inicializar los gráficos de ocupación
function initOccupationCharts() {
    console.log('Inicializando gráficos de ocupación...');
    
    try {
        // Configuración común para los gráficos de ocupación
        const chartConfig = {
            type: 'doughnut',
            options: {
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        };

        // Gráfico para Cancha 1
        const ctx1 = document.getElementById('occupationChart1').getContext('2d');
        window.occupationChart1Instance = new Chart(ctx1, {
            ...chartConfig,
            data: {
                labels: ['Ocupado', 'Disponible'],
                datasets: [{
                    data: [65, 35],
                    backgroundColor: ['#4a90e2', '#e9ecef']
                }]
            }
        });

        // Agregar el porcentaje al contenedor del gráfico
        const chart1Container = document.querySelector('.chart-container:first-child');
        const percentage1 = document.createElement('div');
        percentage1.className = 'chart-percentage';
        percentage1.textContent = '65%';
        chart1Container.appendChild(percentage1);

        // Gráfico para Cancha 2
        const ctx2 = document.getElementById('occupationChart2').getContext('2d');
        window.occupationChart2Instance = new Chart(ctx2, {
            ...chartConfig,
            data: {
                labels: ['Ocupado', 'Disponible'],
                datasets: [{
                    data: [75, 25],
                    backgroundColor: ['#4a90e2', '#e9ecef']
                }]
            }
        });

        // Agregar el porcentaje al contenedor del gráfico
        const chart2Container = document.querySelector('.chart-container:last-child');
        const percentage2 = document.createElement('div');
        percentage2.className = 'chart-percentage';
        percentage2.textContent = '75%';
        chart2Container.appendChild(percentage2);
        
        console.log('Gráficos de ocupación inicializados');
    } catch (error) {
        console.error('Error al inicializar los gráficos de ocupación:', error);
    }
}

// Función para inicializar el gráfico de reservas semanales
function initWeeklyReservationsChart() {
    console.log('Inicializando gráfico de reservas semanales...');
    
    try {
        const ctx = document.getElementById('weeklyReservationsChart').getContext('2d');
        
        // Obtener las fechas de la semana actual
        const today = new Date();
        const days = [];
        const labels = [];
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - today.getDay() + i);
            days.push(date);
            labels.push(date.toLocaleDateString('es-ES', { weekday: 'short' }));
        }

        window.weeklyReservationsChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Reservas',
                    data: [8, 12, 10, 15, 14, 9, 7],
                    backgroundColor: '#4a90e2'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Reservas: ${context.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 20, // Limitar la altura máxima
                        ticks: {
                            stepSize: 2
                        }
                    }
                },
                plugins: [{
                    afterDraw: function(chart) {
                        var ctx = chart.ctx;
                        ctx.font = 'bold 12px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillStyle = '#666';
                        
                        chart.data.datasets.forEach(function(dataset) {
                            for (var i = 0; i < dataset.data.length; i++) {
                                var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                                ctx.fillText(dataset.data[i], model.x, model.y - 5);
                            }
                        });
                    }
                }]
            }
        });
        
        console.log('Gráfico de reservas semanales inicializado');
    } catch (error) {
        console.error('Error al inicializar el gráfico de reservas semanales:', error);
    }
}

// Función para cargar las próximas reservas
function loadUpcomingReservations() {
    console.log('Cargando próximas reservas...');
    
    try {
        const tbody = document.getElementById('upcoming-reservations-list');
        if (!tbody) {
            console.error('No se encontró el elemento para la lista de reservas');
            return;
        }
        
        // Aquí se cargarían las reservas desde el backend
        // Por ahora usamos datos de ejemplo
        const upcomingReservations = [
            {
                user: 'Juan Pérez',
                startTime: '19:00',
                endTime: '20:00',
                date: '15/06/2025'
            },
            {
                user: 'María García',
                startTime: '21:00',
                endTime: '22:30',
                date: '15/06/2025'
            },
            {
                user: 'Christhofer Guerrero',
                startTime: '10:00',
                endTime: '11:00',
                date: '16/06/2025'
            }
        ];

        tbody.innerHTML = '';

        upcomingReservations.forEach(reservation => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${reservation.user}</td>
                <td>${reservation.startTime}</td>
                <td>${reservation.endTime}</td>
                <td>${reservation.date}</td>
            `;
            tbody.appendChild(tr);
        });
        
        console.log('Próximas reservas cargadas');
    } catch (error) {
        console.error('Error al cargar las próximas reservas:', error);
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHome);
} else {
    initHome();
} 
