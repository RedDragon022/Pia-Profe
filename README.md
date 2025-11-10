# INVOMEX - Backend ligero (Express + SQLite)

Este repositorio contiene un servidor sencillo en Node.js + Express que sirve los archivos estáticos (las páginas HTML existentes) y expone una API para almacenar solicitudes de contacto en una base de datos SQLite.

Endpoints principales:

- POST /api/contacts  -> guardar una solicitud de contacto (payload JSON)
- GET  /api/contacts  -> listar las solicitudes guardadas

Campos guardados (en `contacts`):
- id, name, email, empresa, telefono, servicio, message, created_at

Instalación y uso (Windows / bash):

1. Instalar dependencias

```bash
cd "c:/Users/angel/OneDrive/Escritorio/Uni/6to semestre/Profesionalizacion/Pia/Pia"
npm install
```

2. Iniciar el servidor

```bash
npm run dev   # si quieres nodemon (dev)
# o
npm start
```

3. Abrir en el navegador

Visita http://localhost:3000 y usa los formularios de los servicios. Al enviar, los datos se guardarán en `data.db` en la misma carpeta.

Páginas útiles:
- `/admin.html` — página local para listar y exportar los contactos recibidos (no está protegida; añadir protección antes de exponerla públicamente).

Notas de verificación rápida:

- Si quieres ver los registros, puedes hacer una petición GET a `/api/contacts` (por ejemplo con curl o desde el navegador):

```bash
curl http://localhost:3000/api/contacts
```

- El archivo SQLite `data.db` se crea automáticamente la primera vez que arranca el servidor.

Seguridad y mejoras sugeridas:

- Añadir validación más completa en el backend (longitudes, formatos, sanitización).
- Proteger el endpoint con algún tipo de rate-limit o captcha si se publica en internet.
- Añadir pruebas unitarias y migraciones para esquemas más complejos.

Seguridad aplicada en el backend:
- Validación básica y recorte de longitudes de los campos.
- Verificación mínima del formato de email.
- Rate limiter en memoria (30 solicitudes por minuto por IP) para reducir abuso.

Si quieres, puedo ejecutar una prueba local rápida aquí (levantar el servidor y hacer un POST de ejemplo) o añadir un endpoint para exportar CSV.

## Regenerar variantes de imágenes (responsive)

El proyecto incluye un script que genera variantes responsivas (.webp y .jpg) para las imágenes en `assets/images/casos-exito/`.

Para regenerarlas localmente:

```bash
# instala dependencias (si no lo has hecho)
npm install

# genera las variantes (480/768/1024/1600)
npm run build:images
```

El script está en `tools/image-builder.js`. También hay documentación más detallada en `tools/README-image-builder.md`.
# Pia_Profe
