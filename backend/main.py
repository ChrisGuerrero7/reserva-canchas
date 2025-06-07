from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
from routers import buscador
from routers.buscador import guardar_datos
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# Lista de orígenes permitidos (agrega tu frontend aquí)
origins = [
    "https://frontend-web-9tyd.onrender.com",  # reemplaza con la URL real
    "http://localhost:5500",             # útil para pruebas locales
]

# Habilitar CORS para frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # Orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],              # Métodos permitidos (GET, POST, etc.)
    allow_headers=["*"],              # Headers permitidos
)

@app.post("/api/buscar")
async def buscar_cancha(
    fecha: str = Form(...),
    ubicacion: str = Form(...),
    tipo_cancha: str = Form(...),
    hora: str = Form(...)
):
    data = {
        "fecha": fecha,
        "ubicacion": ubicacion,
        "tipo_cancha": tipo_cancha,
        "hora": hora
    }
    guardar_datos(data)
    return {"mensaje": "Datos guardados correctamente"}