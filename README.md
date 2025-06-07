# 🏟️ Sistema de Reserva de Canchas Deportivas

Este proyecto permite a los usuarios buscar canchas deportivas disponibles y reservarlas fácilmente mediante un buscador interactivo. Está desarrollado con tecnologías web modernas:

- **Frontend**: HTML, CSS y JavaScript
- **Backend**: Python con FastAPI

---

## 🚀 Funcionalidades

- Buscador de canchas por deporte, fecha y hora.
- Interfaz responsiva adaptada a dispositivos móviles.
- Navegación clara con un diseño visual atractivo.
- Envío de datos del formulario al backend.
- Almacenamiento de reservas en archivo `.csv`.
- Página detallada de la cancha con mapa, descripción e imágenes.

## 🧱 Estructura del proyecto

/cancha-reservas  
│  
├── backend/  
│   ├── main.py                      # Archivo principal de FastAPI  
│   ├── routers/                     # Rutas organizadas por módulo  
│   │   └── buscador.py  
│   ├── database/                    # Conexión a la BD (ej: csv)  
│   │   └── datos.csv  
│   └── utils/                       # Funciones auxiliares (ej: validación, envío de correo)  
│       └── save_to_csv.py  
│  
├── frontend/  
│   ├── index.html                   # Página principal con buscador  
│   ├── css/  
│   │   └── style.css                # Estilos globales  
│   ├── js/  
│   │   └── script.js                   # Lógica de búsqueda y navegación  
│   └── assets/                      # Imágenes, íconos, logos  
│       └── futbol.png  
│  
├── .gitignore  
├── README.md  
└── requirements.txt                # Dependencias del backend (FastAPI, etc)  