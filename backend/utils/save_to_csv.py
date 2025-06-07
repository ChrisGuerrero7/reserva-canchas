import csv
import os
from datetime import datetime

FILE_PATH = "backend/database/datos.csv"

def guardar_en_csv(datos: dict):
    archivo_existe = os.path.isfile(FILE_PATH)

    with open(FILE_PATH, mode='a', newline='', encoding='utf-8') as archivo:
        escritor = csv.writer(archivo)
        # Agrega la fecha actual para rastreo
        escritor.writerow([
            datetime.now().isoformat(),
            datos.get("deporte", ""),
            datos.get("fecha", ""),
            datos.get("hora", ""),
            datos.get("email", "")
        ])