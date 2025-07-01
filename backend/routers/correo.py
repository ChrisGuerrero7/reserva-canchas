import smtplib
import os
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

def enviar_correo(destinatario):
    remitente = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASS")

    asunto = "¡Gracias por tu interés en SportX!"
    mensaje = """
    Hola,

    ¡Gracias por registrarte en SportX! 🏟️⚽

    Estamos trabajando con entusiasmo en nuestra plataforma para que pronto puedas reservar canchas deportivas de forma rápida, fácil y sin complicaciones.

    Tu interés significa mucho para nosotros.
    Serás de los primeros en enterarte cuando lancemos la plataforma oficialmente, y además recibirás novedades y descuentos exclusivos por ser parte de los primeros.

    ¡Prepárate para una nueva forma de vivir el deporte!

    Atentamente,
    El equipo de SportX
    """

    msg = MIMEText(mensaje)
    msg['Subject'] = asunto
    msg['From'] = remitente
    msg['To'] = destinatario

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as servidor:
            servidor.login(remitente, password)
            servidor.send_message(msg)
            print(f"✅ Correo enviado a {destinatario}")
    except Exception as e:
        print("❌ Error al enviar correo:", e)

def enviar_equipos_admin(jugadores, equipo_a, equipo_b):
    remitente = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASS")
    destinatario = os.getenv("ADMIN_EMAIL") or remitente

    asunto = "Equipos armados desde SportX"
    jugadores_str = ', '.join([j['nombre'] for j in jugadores])
    equipo_a_str = '\n'.join([f"- {j['nombre']} (Nivel: {j['nivel']}, Posición: {j['posicion']}, Género: {j['genero']})" for j in equipo_a])
    equipo_b_str = '\n'.join([f"- {j['nombre']} (Nivel: {j['nivel']}, Posición: {j['posicion']}, Género: {j['genero']})" for j in equipo_b])
    mensaje = (
        "Se ha formado una nueva lista de equipos desde la web:\n\n"
        f"Jugadores registrados:\n{jugadores_str}\n\n"
        f"Equipo A:\n{equipo_a_str}\n\n"
        f"Equipo B:\n{equipo_b_str}\n"
    )

    msg = MIMEText(mensaje)
    msg['Subject'] = asunto
    msg['From'] = remitente
    msg['To'] = destinatario

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as servidor:
            servidor.login(remitente, password)
            servidor.send_message(msg)
            print(f"✅ Correo de equipos enviado a {destinatario}")
    except Exception as e:
        print("❌ Error al enviar correo de equipos:", e)