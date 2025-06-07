import csv
import os

# Ruta absoluta al archivo CSV
archivo = os.path.join(os.path.dirname(__file__), "data", "datos_busqueda.csv")

def guardar_datos(data):
    existe = os.path.isfile(archivo)
    columnas = ["fecha", "hora", "ubicacion", "tipo_cancha"]
    with open(archivo, mode='a', newline='') as f:
        escritor = csv.DictWriter(f, fieldnames=columnas)
        if not existe:
            escritor.writeheader()
        escritor.writerow(data)
