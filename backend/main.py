from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse, FileResponse
from routers.buscador import guardar_datos
from routers.correo import enviar_correo
from fastapi.middleware.cors import CORSMiddleware
import csv
import os

# Ruta absoluta al archivo CSV
ruta_base = os.path.dirname(__file__)               
csv_path = os.path.join(ruta_base, "data", "datos_busqueda.csv")

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
    hora: str = Form(...),
    correo: str = Form(...)
):
    try:
        data = {
            "fecha": fecha,
            "ubicacion": ubicacion,
            "tipo_cancha": tipo_cancha,
            "hora": hora,
            "correo": correo
        }
        print("Recibido:", data)

        guardar_datos(data)  # ✅ Guarda en el archivo CSV

        enviar_correo(correo)

        return JSONResponse(content={"mensaje": "Datos recibidos correctamente"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/api/ver-datos")
def ver_datos_csv():
    if not os.path.exists(csv_path):
        print(csv_path)
        return JSONResponse(content={"mensaje": "Archivo no encontrado"}, status_code=404)
    
    with open(csv_path, newline='') as f:
        lector = csv.DictReader(f)
        datos = list(lector)

    return {"datos": datos}

@app.get("/api/descargar-csv")
def descargar_csv():
    if os.path.exists(csv_path):
        return FileResponse(csv_path, media_type='text/csv', filename="datos_busqueda.csv")
    else:
        return JSONResponse(content={"error": "Archivo no encontrado"}, status_code=404)