import csv
import os

def guardar_datos(data):
    # Ruta: sube un nivel y entra a la carpeta "data"
    ruta_base = os.path.dirname(__file__)  # Carpeta actual (routers/)
    ruta_data = os.path.abspath(os.path.join(ruta_base, "..", "data"))  # ../data
    os.makedirs(ruta_data, exist_ok=True)

    ruta_archivo = os.path.join(ruta_data, "datos_busqueda.csv")
    campos = ["fecha", "hora", "ubicacion", "tipo_cancha", "correo"]

    # Verifica si el archivo no existe o está vacío
    necesita_cabecera = not os.path.exists(ruta_archivo) or os.stat(ruta_archivo).st_size == 0

    with open(ruta_archivo, mode="a", newline='', encoding="utf-8") as archivo:
        escritor = csv.DictWriter(archivo, fieldnames=campos)
        if necesita_cabecera:
            escritor.writeheader()  # ✅ solo si es nuevo o está vacío
        escritor.writerow(data)