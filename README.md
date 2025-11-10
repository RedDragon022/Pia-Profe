# 🚀 INVOMEX - Sitio Web Corporativo

> Sitio web corporativo para INVOMEX con backend Node.js + Express y SQLite para gestión de contactos.

---

## 📋 Tabla de Contenidos

- [Información General](#información-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [API Endpoints](#api-endpoints)
- [Arquitectura y Tecnologías](#arquitectura-y-tecnologías)
- [Mejoras Implementadas](#mejoras-implementadas)
- [Roadmap de Mejoras Futuras](#roadmap-de-mejoras-futuras)
- [Troubleshooting](#troubleshooting)

---

## 📖 Información General

**Proyecto:** Sitio web corporativo de INVOMEX  
**Versión:** 1.0.0  
**Desarrolladores:** Equipo INVOMEX  
**Última actualización:** Noviembre 2025

### Contacto del Proyecto
- **Email:** contacto@invomex.com
- **Teléfono:** +52 81 2953 0145

---

## 📁 Estructura del Proyecto

```
Pia/
├── assets/                      # Recursos estáticos
│   ├── css/                     # Hojas de estilo adicionales
│   │   └── animations.css       # Animaciones personalizadas
│   ├── images/                  # Imágenes del sitio
│   │   └── casos-exito/         # Imágenes de casos de éxito
│   │       ├── analisis/        # Análisis de datos (3 imágenes + variantes)
│   │       ├── automatizacion/  # Automatización (3 imágenes + variantes)
│   │       ├── ciberseguridad/  # Ciberseguridad (3 imágenes + variantes)
│   │       ├── cloud/           # Cloud Computing (3 imágenes + variantes)
│   │       └── desarrollo/      # Desarrollo (3 imágenes + variantes)
│   └── js/                      # Scripts JavaScript
│       ├── animations.js        # Manejo de animaciones de entrada
│       ├── faq-handler.js       # Acordeones de FAQ (centralizado)
│       ├── form-handler.js      # Manejo de formularios (centralizado)
│       ├── form-validation.js   # Validación específica (desarrollo.html)
│       ├── font-loader.js       # Carga optimizada de fuentes
│       ├── image-optimizer.js   # Optimización de imágenes
│       ├── init.js              # Inicialización principal (garantiza visibilidad)
│       └── main.js              # Funcionalidad principal del sitio
│
├── tools/                       # Herramientas de desarrollo
│   ├── image-builder.js         # Generador de variantes responsive
│   └── README-image-builder.md  # Documentación del generador
│
├── *.html                       # Páginas HTML
│   ├── index.html               # Página principal
│   ├── admin.html               # Panel de administración (protegido)
│   ├── automatizacion.html      # Página de servicio
│   ├── analisisdatos.html       # Página de servicio
│   ├── ciberseguridad.html      # Página de servicio
│   ├── desarrollo.html          # Página de servicio
│   └── serviciosnube.html       # Página de servicio
│
├── Estilos.css                  # Hoja de estilos principal
├── server.js                    # Servidor Express + API
├── package.json                 # Dependencias y scripts
├── contacts.db                  # Base de datos SQLite (auto-generada)
├── README.md                    # Este archivo
└── IMPROVEMENTS_README.md       # Documentación de mejoras aplicadas

```

---

## 🔧 Instalación y Configuración

### Requisitos Previos
- **Node.js** v16 o superior
- **npm** v8 o superior
- **Git** (opcional, para clonar el repositorio)

### Pasos de Instalación

1. **Clonar o ubicar el proyecto**
```bash
cd "c:/Users/angel/OneDrive/Escritorio/Uni/6to semestre/Profesionalizacion/Pia/Pia"
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor**
```bash
npm start
# o para desarrollo con auto-reload:
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

### Variables de Entorno (Configuración)

El servidor usa las siguientes configuraciones en `server.js`:

- **Puerto:** `3000` (línea 10)
- **Usuario admin:** `admin` (línea 11)
- **Contraseña admin:** `password123` (línea 12)
- **Token de autenticación:** `invomex-secret-token-2025` (línea 13)

> ⚠️ **IMPORTANTE:** Cambiar estas credenciales antes de producción.

---

## 📜 Scripts Disponibles

### Desarrollo y Producción

```bash
# Iniciar servidor en modo producción
npm start

# Iniciar servidor en modo desarrollo (con nodemon)
npm run dev

# Generar variantes responsive de imágenes
npm run build:images
```

### Comandos Útiles

```bash
# Ver qué proceso usa el puerto 3000
netstat -ano | findstr :3000

# Detener proceso en puerto 3000 (Windows)
cmd //c "taskkill /PID [PID_NUMBER] /F"

# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json && npm install
```

---

## 🌐 API Endpoints

### Públicos

#### `POST /api/contacts`
Guarda una solicitud de contacto en la base de datos.

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "empresa": "Mi Empresa",
  "telefono": "+52 81 1234 5678",
  "servicio": "Ciberseguridad",
  "message": "Necesito más información"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "contact": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "empresa": "Mi Empresa",
    "telefono": "+52 81 1234 5678",
    "servicio": "Ciberseguridad",
    "message": "Necesito más información",
    "created_at": "2025-11-10 10:30:00"
  }
}
```

**Validaciones:**
- Todos los campos son obligatorios
- `name`: máx 200 caracteres
- `email`: formato válido, máx 200 caracteres
- `empresa`: máx 200 caracteres
- `telefono`: máx 50 caracteres
- `servicio`: máx 200 caracteres
- `message`: máx 2000 caracteres

**Rate Limiting:** 30 requests por minuto por IP

### Autenticados (requieren token)

#### `POST /api/login`
Autenticación para acceder al panel de administración.

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "invomex-secret-token-2025"
}
```

#### `GET /api/contacts`
Lista todos los contactos guardados (requiere autenticación).

**Headers:**
```
Authorization: invomex-secret-token-2025
```

**Response:**
```json
{
  "contacts": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "empresa": "Mi Empresa",
      "telefono": "+52 81 1234 5678",
      "servicio": "Ciberseguridad",
      "message": "Necesito más información",
      "created_at": "2025-11-10 10:30:00"
    }
  ]
}
```

---

## 🏗️ Arquitectura y Tecnologías

### Backend
- **Node.js** v20.10.0
- **Express** 4.18.2 - Framework web
- **better-sqlite3** 9.2.2 - Base de datos SQLite
- **express-rate-limit** 7.1.5 - Rate limiting

### Frontend
- **HTML5** con semántica moderna
- **CSS3** con variables CSS y Flexbox/Grid
- **JavaScript Vanilla** (ES6+)
- **SweetAlert2** - Modales y alertas
- **Font Awesome** 6.5.1 - Iconografía

### Optimizaciones
- **Sharp** 0.34.5 - Procesamiento de imágenes
- **Imágenes responsive** con `srcset` y `<picture>`
- **Lazy loading** de imágenes
- **Smooth scroll** nativo
- **Intersection Observer** para animaciones

---

## ✅ Mejoras Implementadas

### Refactorización del Frontend (Noviembre 2025)

#### 1. **Centralización de JavaScript**
- ✅ Creado `assets/js/form-handler.js` - Manejo unificado de formularios
- ✅ Creado `assets/js/faq-handler.js` - Manejo unificado de FAQs
- ✅ Creado `assets/js/init.js` - Inicialización y visibilidad garantizada
- ✅ **Resultado:** ~250 líneas de código duplicado eliminadas

#### 2. **Imágenes Responsive**
- ✅ Generadas 120 variantes (15 imágenes × 4 tamaños × 2 formatos)
- ✅ Tamaños: 480px, 768px, 1024px, 1600px
- ✅ Formatos: WebP (moderno) + JPG (fallback)
- ✅ Implementado `<picture>` con `srcset` y `sizes`

#### 3. **Autenticación y Seguridad**
- ✅ Sistema de login para panel admin
- ✅ Token-based authentication
- ✅ Rate limiting (30 req/min)
- ✅ Validación y sanitización de inputs
- ✅ Protección contra SQL injection (prepared statements)

#### 4. **Mejoras de UI/UX**
- ✅ Overlay de servicios simplificado (solo botón, sin texto)
- ✅ Datos de contacto centrados
- ✅ Animaciones suaves de entrada
- ✅ Navegación sticky con auto-hide
- ✅ Smooth scroll a secciones

---

## 🚀 Roadmap de Mejoras Futuras

### Alta Prioridad
- [ ] **Sistema de Caché**
  - Implementar Redis para cachear respuestas API
  - Cache de imágenes con CDN
  
- [ ] **Testing**
  - Unit tests para API endpoints (Jest)
  - Integration tests para formularios
  - E2E tests con Playwright

- [ ] **Deployment**
  - Configurar CI/CD (GitHub Actions)
  - Dockerizar la aplicación
  - Deploy en AWS/Vercel/Railway

### Media Prioridad
- [ ] **Panel de Administración Mejorado**
  - Dashboard con estadísticas
  - Filtros y búsqueda de contactos
  - Exportar a Excel/PDF además de CSV
  - Soft delete de contactos
  
- [ ] **Emails Automatizados**
  - Confirmación automática al usuario
  - Notificación al equipo de ventas
  - Integración con SendGrid/Mailgun

- [ ] **Analytics**
  - Google Analytics 4
  - Heatmaps con Hotjar
  - Tracking de conversiones

- [ ] **SEO Avanzado**
  - Sitemap.xml automático
  - Robots.txt
  - Open Graph optimizado
  - Schema.org más completo

### Baja Prioridad
- [ ] **Internacionalización (i18n)**
  - Soporte para inglés
  - Selector de idioma
  
- [ ] **Accesibilidad (a11y)**
  - Audit completo WCAG 2.1
  - Navegación por teclado mejorada
  - Screen reader optimization

- [ ] **PWA (Progressive Web App)**
  - Service Worker para offline
  - Instalable en dispositivos móviles
  - Push notifications

---

## 🐛 Troubleshooting

### Problema: Puerto 3000 en uso

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solución:**
```bash
# 1. Encontrar el PID del proceso
netstat -ano | findstr :3000

# 2. Detener el proceso (Windows)
cmd //c "taskkill /PID [PID_NUMBER] /F"

# 3. Reiniciar servidor
npm start
```

### Problema: Página en blanco

**Posibles causas:**
1. JavaScript no se carga
2. Rutas incorrectas
3. Servidor no está corriendo

**Solución:**
1. Abrir consola del navegador (F12)
2. Verificar errores 404 en Network tab
3. Comprobar que `init.js` se carga primero
4. Verificar que el servidor está en `http://localhost:3000`

### Problema: Imágenes no cargan

**Solución:**
```bash
# Regenerar variantes de imágenes
npm run build:images

# Verificar estructura de carpetas
ls assets/images/casos-exito/*/
```

### Problema: Formulario no envía

**Verificar:**
1. Consola del navegador (errores JS)
2. Network tab (request/response)
3. Que todos los campos requeridos estén llenos
4. Rate limit no excedido (30 req/min)

---

## 📞 Soporte

Para preguntas o problemas:
- **Email:** contacto@invomex.com
- **Teléfono:** +52 81 2953 0145
- **Documentación adicional:** Ver `IMPROVEMENTS_README.md`

---

## 📄 Licencia

© 2025 INVOMEX. Todos los derechos reservados.
