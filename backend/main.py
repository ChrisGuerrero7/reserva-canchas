from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse
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
async def buscar(
    fecha: str = Form(...),
    ubicacion: str = Form(...),
    tipo_cancha: str = Form(...),
    hora: str = Form(...)
):
    try:
        # Simula guardado de datos
        print("Recibido:", fecha, ubicacion, tipo_cancha, hora)
        return JSONResponse(content={"mensaje": "Datos recibidos correctamente"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)