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