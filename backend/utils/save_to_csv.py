import csv
import os

FILE_PATH = "backend/database/datos.csv"

def guardar_en_csv(datos: dict):
    archivo_existe = os.path.isfile(FILE_PATH)

    with open(FILE_PATH, mode='a', newline='', encoding='utf-8') as archivo:
        escritor = csv.DictWriter(archivo, fieldnames=datos.keys())
        if not archivo_existe:
            escritor.writeheader()
        escritor.writerow(datos)