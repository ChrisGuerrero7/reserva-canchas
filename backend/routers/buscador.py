import csv
import os


def guardar_datos(data):
    ruta_carpeta = "./data"
    ruta_archivo = os.path.join(ruta_carpeta, "datos_busqueda.csv")
    os.makedirs(ruta_carpeta, exist_ok=True)

    campos = ["fecha", "hora", "ubicacion", "tipo_cancha"]
    archivo_existe = os.path.isfile(ruta_archivo)

    with open(ruta_archivo, mode='a', newline='', encoding='utf-8') as archivo:
        escritor = csv.DictWriter(archivo, fieldnames=campos)
        if not archivo_existe:
            escritor.writeheader()
        escritor.writerow(data)
