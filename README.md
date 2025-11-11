# 🚀 INVOMEX – Plataforma Corporativa

Sitio web corporativo con frontend optimizado y backend ligero en Express + SQLite para la gestión de solicitudes de contacto.

---

## 📋 Tabla de Contenidos

- [Resumen](#resumen)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [API](#api)
- [Flujo de Formularios](#flujo-de-formularios)
- [Componentes UI Reutilizables](#componentes-ui-reutilizables)
- [Panel de Administración](#panel-de-administración)
- [Buenas Prácticas y Seguridad](#buenas-prácticas-y-seguridad)
- [Roadmap](#roadmap)
- [Troubleshooting](#troubleshooting)
- [Licencia](#licencia)

---

## 🧩 Resumen

| Aspecto | Detalle |
|---------|---------|
| Backend | Node.js + Express + better-sqlite3 |
| BD | SQLite (archivo `data.db`) |
| Frontend | HTML5, CSS (variables), JS vanilla |
| Imágenes | Responsive (`<picture>` + `srcset`) + WebP/JPG |
| Autenticación | Token estático (solo demo) |
| Rate Limiting | 30 req/min por IP en `/api/contacts` |
| Estado | Refactor UI + limpieza de estilos completada |

> Última actualización: Noviembre 2025.

---

## 🏗️ Arquitectura

```
Cliente (HTML/CSS/JS) --> /api/... (Express) --> SQLite (better-sqlite3)
```

Características clave:
- Servido como sitio estático + API en el mismo proceso.
- Conexión síncrona a SQLite (rápida para bajo volumen).
- Capa de validación y sanitización antes de escribir en BD.
- Rate limiting simple en memoria.

---

## 📁 Estructura del Proyecto

```
assets/
  css/animations.css
  images/casos-exito/... (variantes 480/768/1024/1600 en webp/jpg)
  js/
    form-handler.js        # Envío y validación de formularios
    faq-handler.js         # Acordeón para FAQs
    animations.js          # Intersección y animaciones de entrada
    form-validation.js     # Validaciones extra (solo desarrollo.html si aplica)
    image-optimizer.js     # Carga/optimización defer
    font-loader.js         # Carga controlada de fuentes
    init.js                # Inicialización general
    main.js                # Código legacy/misceláneo
Estilos.css                # Hoja de estilos principal (tokens y componentes)
server.js                  # API y servidor estático
tools/image-builder.js     # Genera variantes responsive
README.md                  # Este documento
```

---

## ⚙️ Instalación

```bash
git clone <repo>   # (opcional si no está local)
cd Pia
npm install
```

### Requisitos
- Node.js >= 16
- Sharp requiere dependencias nativas (si falla: reinstalar o usar WSL).

---

## ▶️ Ejecución

```bash
# Modo producción
npm start

# Modo desarrollo (auto-reload con nodemon)
npm run dev

# Generar variantes de imágenes responsive
npm run build:images
```

Acceso: http://localhost:3000

---

## 🌐 API

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/api/login` | No | Obtiene token (demo) |
| POST | `/api/contacts` | No | Crea contacto (rate limited) |
| GET | `/api/contacts` | Sí | Lista contactos |

### Login
```json
POST /api/login
{ "username": "admin", "password": "password123" }
```
Respuesta exitosa:
```json
{ "success": true, "token": "secret-auth-token-for-invomex-admin" }
```

### Crear contacto
```json
POST /api/contacts
{
  "name": "Nombre",
  "email": "correo@dominio.com",
  "empresa": "Opcional",
  "telefono": "+52 ...",
  "servicio": "Ciberseguridad",
  "message": "Detalle de la solicitud"
}
```
Validaciones: formato email, límites de longitud, campos obligatorios (name, email). Rate limit: 30/min/IP.

### Listar contactos
```
GET /api/contacts
Authorization: secret-auth-token-for-invomex-admin
```

---

## 🔄 Flujo de Formularios

1. Usuario completa campos en cualquier página de servicio.
2. `form-handler.js` intercepta `submit`, recolecta valores (soporta nombres alternos: `nombre`/`name`, `mensaje`/`message`, etc.).
3. Envía `fetch POST /api/contacts` con JSON.
4. Backend valida y persiste en SQLite.
5. Muestra `success-message` y SweetAlert.
6. Redirige a `index.html`.

Errores: se renderizan con SweetAlert (o `alert()` fallback). Form permanece visible si falla.

---

## 🧱 Componentes UI Reutilizables

| Clase | Uso | Notas |
|-------|-----|-------|
| `.service-intro` | Bloque de introducción centrado | Max-width 800px, texto descriptivo |
| `.service-list` | Lista de beneficios con check ✓ | Usa pseudo-elemento ::before |
| `.service-list.with-icons` | Variante lista con iconos | Desactiva check y muestra `<span.service-icon>` |
| `.service-icon` | Ícono alineado en listas | Usa Font Awesome |
| `.success-message` | Mensaje post envío oculto | Se muestra tras submit exitoso |
| `.btn`, `.btn-primary`, `.btn-secondary` | Botones base y variantes | Animaciones hover, gradientes |
| `.admin-card` | Panel o formulario admin | Fondo claro + sombra |
| `.admin-table` | Tabla de contactos | Cabecera sticky, filas resaltadas |
| `.hidden` | Ocultar nodos | Útil para toggles JS |

### Ejemplo Lista con Iconos
```html
<ul class="service-list with-icons">
  <li>
    <span class="service-icon"><i class="fas fa-chart-line"></i></span>
    <div>
      <strong>Aumento de Productividad:</strong> Automatización continua sin fatiga.
    </div>
  </li>
</ul>
```

### Mensaje de éxito
```html
<div id="mensaje-exito" class="success-message">
  <h2>¡Solicitud Enviada!</h2>
  <p>Gracias por su interés. Responderemos en 24 horas.</p>
  <button class="btn-success" onclick="location.href='index.html'">Volver</button>
</div>
```

---

## 🛠️ Panel de Administración

Ubicado en `admin.html`.

Funciones:
- Login simple (usuario/contraseña hardcode).
- Persistencia de token en `sessionStorage`.
- Listado de contactos en tabla (`admin-table`).
- Exportación CSV.

Mejoras potenciales:
- Paginación, filtros, búsqueda.
- Timestamps con zona horaria configurable.
- Roles y expiración de sesión.

---

## 🔐 Buenas Prácticas y Seguridad

| Área | Estado actual | Recomendación |
|------|---------------|---------------|
| Credenciales | Hardcode en `server.js` | Usar `.env` + dotenv |
| Token | Estático | Generar JWT con expiración |
| Rate limiting | In-memory | Persistir en Redis si hay múltiples instancias |
| Validación | Manual básica | Añadir librería (zod/joi) |
| DB | SQLite local | Migrar a Postgres/MySQL en producción |
| Logs | `console.log` | Integrar Winston / Pino |

### Ejemplo variables de entorno (recomendado)
```
PORT=3000
ADMIN_USER=admin
ADMIN_PASS=hashed_password
AUTH_TOKEN_SECRET=una_llave_ultra_secreta
```

---

## 🗺️ Roadmap

Prioridad Alta:
- JWT + refresco de sesión.
- Test unitarios (Jest) para `/api/contacts` y `/api/login`.
- Docker + CI/CD.

Prioridad Media:
- Emails transaccionales (SendGrid / Mailgun).
- Búsqueda y filtros en panel.
- Métricas de conversión.

Prioridad Baja:
- i18n (ES/EN).
- PWA (offline + install prompt).
- Accesibilidad (atributos `aria-*`, foco visual consistente).

---

## 🧪 Troubleshooting

### Puerto en uso
```bash
netstat -ano | findstr :3000
cmd //c "taskkill /PID <PID> /F"
npm start
```

### Formulario no envía
1. Revisar consola (errores JS).
2. Ver HTTP 429 (rate limit superado).
3. Validar formato email.
4. Verificar que `form-handler.js` está cargado.

### Imágenes no aparecen
```bash
npm run build:images
```
Ver rutas bajo `assets/images/casos-exito/<servicio>/`.

### Token inválido en admin
1. Limpiar `sessionStorage`.
2. Re-loguear.
3. Confirmar que header `Authorization` se envía.

---

## 📄 Licencia

MIT (código) – Contenido e imágenes © 2025 INVOMEX.

---

## 📝 Notas Finales

Este README describe el estado refactorizado: estilos centralizados, formularios unificados y componentes reutilizables. Para mejoras adicionales consulta el roadmap y crea issues internos. Evita publicar el token y credenciales en producción.

---

¿Necesitas ampliar algo? Crea una sección nueva y mantén este archivo como fuente única de verdad.
