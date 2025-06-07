import csv
import os

def guardar_datos(data):
    archivo = "datos_busqueda.csv"
    existe = os.path.isfile(archivo)
    columnas = ["fecha", "hora", "ubicacion", "tipo_cancha"]
    with open(archivo, mode='a', newline='') as f:
        escritor = csv.DictWriter(f, fieldnames=columnas)
        if not existe:
            escritor.writeheader()
        escritor.writerow(data)
