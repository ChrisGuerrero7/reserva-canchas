from fastapi import APIRouter, Form
from utils.save_to_csv import guardar_en_csv

router = APIRouter()

@router.post("/api/buscar")
async def buscar(request: Request):
    data = await request.json()
    guardar_en_csv(data)
    return {"mensaje": "Datos guardados exitosamente"}
