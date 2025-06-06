from fastapi import APIRouter, Form
from backend.utils.save_to_csv import guardar_en_csv

router = APIRouter()

@router.post("/api/buscar")
async def buscar_cancha(
    fecha: str = Form(...),
    ubicacion: str = Form(...),
    tipo_cancha: str = Form(...),
    hora: str = Form(...)
):
    datos = {
        "fecha": fecha,
        "ubicacion": ubicacion,
        "tipo_cancha": tipo_cancha,
        "hora": hora
    }

    guardar_en_csv(datos)
    return {"mensaje": "Datos guardados correctamente"}