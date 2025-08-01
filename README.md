# 📦 Gestión de Solicitudes con React, Node.js y Docker

Este proyecto es una aplicación web fullstack construida con **React (frontend)**, **Node.js/Express (backend)** y **MongoDB** como base de datos. Toda la arquitectura está contenida y lista para ejecutarse con **Docker**.

## 🚀 Requisitos

- Tener instalados:
  - [Docker](https://www.docker.com/)
  - [Docker Compose](https://docs.docker.com/compose/)

## ⚙️ Instrucciones para iniciar el proyecto

Desde la **raíz del proyecto**, ejecuta:
```bash
docker-compose up --build
```

Para detener todos los servicios:
```bash
docker-compose down
```

## 🌐 Acceso desde el navegador
Una vez iniciado, puedes acceder a las siguientes URLs:

🖥️ Frontend: http://localhost:3000
🛠️ Backend (API): http://localhost:5000

## 🧩 Base de Datos
El proyecto usa MongoDB como base de datos.
Ya está configurado en Docker, por lo que no se necesitan scripts adicionales.
No necesitas instalar MongoDB localmente.


## 📁 Estructura del Proyecto
├── backend/             # Servidor Express (Node.js)
├── frontend/            # Aplicación React
├── docker-compose.yml   # Orquestador de contenedores
└── README.md            # Este archivo


## Depuracion
```bash
docker-compose down -v --remove-orphans
docker system prune -f
```