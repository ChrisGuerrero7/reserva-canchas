from fastapi import FastAPI
from backend.routers import buscador
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# Habilitar CORS para frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(buscador.router)