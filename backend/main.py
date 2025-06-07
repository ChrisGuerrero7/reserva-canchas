from fastapi import FastAPI
from routers import buscador
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

# ✅ RUTA para guardar los datos enviados desde el frontend
@app.post("/api/buscar")
async def buscar(request: Request):
    data = await request.json()
    guardar_datos(data)
    return {"mensaje": "Datos guardados exitosamente"}