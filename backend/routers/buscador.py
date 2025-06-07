import csv
import os

def guardar_datos(data):
    archivo = "datos_busqueda.csv"
    existe = os.path.isfile(archivo)
    with open(archivo, mode='a', newline='') as f:
        escritor = csv.DictWriter(f, fieldnames=["deporte", "fecha", "hora", "correo"])
        if not existe:
            escritor.writeheader()
        escritor.writerow(data)
