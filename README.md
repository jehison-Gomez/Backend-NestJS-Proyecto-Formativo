# Sistema de Gestión de Materiales SENA
## Backend — Instrucciones para ejecutar

---

## Requisitos previos

Asegurate de tener instalado en tu computador:

| Herramienta | Como verificar |
|---|---|
| Node.js (version 18 o superior) | `node --version` |
| npm | `npm --version` |
| Docker Desktop | `docker --version` |

---

## PASO 1 — Iniciar la base de datos

La base de datos es PostgreSQL y corre con Docker.

Abre una terminal en esta carpeta y ejecuta:

```bash
docker-compose up -d
```

Verifica que este corriendo:

```bash
docker ps
```

Debes ver el contenedor **proyecto-sena** con estado **Up**.

---

## PASO 2 — Instalar dependencias

Solo la primera vez que ejecutes el proyecto:

```bash
npm install
```

---

## PASO 3 — Iniciar el servidor

```bash
npm run start:dev
```

Cuando el backend este listo veras este mensaje en consola:

```
[NestApplication] Application is running on: http://[::1]:3000
```

El backend queda disponible en: **http://localhost:3000**

---

## Variables de entorno

El archivo `.env` ya esta configurado con los siguientes valores:

```
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=admin123
DB_NAME=proyecto_sena
JWT_SECRET=supersecretkey_dev_2024
```

---

## Comandos disponibles

| Comando | Descripcion |
|---|---|
| `npm run start:dev` | Inicia en modo desarrollo con recarga automatica |
| `npm run start` | Inicia sin recarga automatica |
| `npm run build` | Compila el proyecto TypeScript |
| `npm run start:prod` | Ejecuta la version compilada |

---

## Solucion de problemas

**Error de conexion a la base de datos:**
```
Error: connect ECONNREFUSED 127.0.0.1:5433
```
Solucion: ejecuta primero `docker-compose up -d` y espera unos segundos.

**Para detener la base de datos:**
```bash
docker-compose down
```
