# Changelog

Todos los cambios notables en el proyecto INVOMEX serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2025-11-11

### 🎨 Refactorización Completa de UI/UX

#### Agregado
- **Componentes CSS reutilizables** en `Estilos.css`:
  - `.service-intro` - Contenedor de introducción centrado para páginas de servicios
  - `.service-list` - Lista de beneficios con checkmarks (✓) automáticos
  - `.service-list.with-icons` - Variante con iconos Font Awesome personalizados
  - `.service-icon` - Clase para iconos uniformes en listas
  - `.success-message` - Mensaje de éxito post-envío con animaciones
  - `.btn-success` - Botón para mensaje de confirmación
  - `.admin-card` - Tarjetas para login y contenido admin
  - `.admin-table` - Tabla profesional con header sticky
  - `.admin-actions` - Contenedor flex para acciones del panel
  - `.hidden` - Utilidad para ocultar elementos sin inline styles

- **Iconografía uniforme** en todas las páginas de servicios:
  - `automatizacion.html`: piggy-bank, chart-line, check-double, user-shield
  - `analisisdatos.html`: brain, coins, users, chart-line
  - `ciberseguridad.html`: shield-halved, file-shield, business-time, handshake
  - `desarrollo.html`: gears, trophy, layer-group, face-smile
  - `serviciosnube.html`: expand, money-bill-trend-up, cloud-sun, bolt

- **Botones estandarizados**: Todas las páginas usan `.btn .btn-primary` con icono `fa-paper-plane`

#### Cambiado
- **Eliminados ~500+ líneas de estilos inline** de todas las páginas HTML
- **admin.html**: Movidos estilos del bloque `<style>` a clases globales en `Estilos.css`
- **Formularios**: Removidos atributos `onsubmit` inline, delegando a `form-handler.js`
- **Mensajes de éxito**: Convertidos de HTML con inline styles a clase `.success-message`
- **Estructura HTML**: Eliminados `<div>` innecesarios y cierres duplicados de `<section>`

#### Mejorado
- **Consistencia visual**: Todas las páginas de servicios siguen el mismo patrón estructural
- **Mantenibilidad**: Cambios de estilo ahora se hacen en un solo lugar (Estilos.css)
- **Rendimiento**: Reducción de HTML inline mejora tiempo de carga y parsing
- **Accesibilidad**: Estructura semántica más clara sin divs redundantes

### 📝 Documentación

#### Agregado
- **README.md actualizado** con:
  - Arquitectura real del proyecto (Express + SQLite con `data.db`)
  - Documentación completa de componentes UI reutilizables
  - Flujo detallado de formularios con `form-handler.js`
  - Guía de instalación y ejecución actualizada
  - Sección de seguridad con recomendaciones de producción
  - Tabla de endpoints API con ejemplos
  - Troubleshooting específico

- **CHANGELOG.md** (este archivo) para seguimiento de versiones

#### Corregido
- Referencias a `contacts.db` cambiadas a `data.db` (nombre real del archivo)
- Credenciales de ejemplo actualizadas según `server.js`:
  - Usuario: `admin`
  - Token: `secret-auth-token-for-invomex-admin`

---

## [1.0.0] - 2025-11-10

### 🚀 Lanzamiento Inicial

#### Backend
- **Express 4.18.2** como servidor web
- **better-sqlite3 8.3.0** para persistencia de datos
- **Base de datos SQLite** (`data.db`) con tabla `contacts`
- **API REST** con endpoints:
  - `POST /api/login` - Autenticación básica
  - `POST /api/contacts` - Crear solicitud de contacto (público, rate limited)
  - `GET /api/contacts` - Listar contactos (protegido)
- **Rate limiting**: 30 requests/minuto por IP en endpoint público
- **Validación y sanitización** de inputs con límites de caracteres
- **Prepared statements** para prevenir SQL injection

#### Frontend
- **5 páginas de servicios**:
  - Automatización Industrial
  - Análisis de Datos
  - Ciberseguridad
  - Desarrollo de Software
  - Cloud Computing
- **Panel de administración** (`admin.html`):
  - Login con token persistence (sessionStorage)
  - Listado de contactos en tabla
  - Exportación a CSV
- **Formularios de contacto** integrados en cada página de servicio
- **SweetAlert2** para alertas y confirmaciones elegantes
- **Font Awesome 6.5.1** para iconografía

#### JavaScript Centralizado
- `form-handler.js` - Manejo unificado de envío de formularios
- `faq-handler.js` - Acordeones de preguntas frecuentes
- `animations.js` - Animaciones de entrada con Intersection Observer
- `init.js` - Inicialización y garantía de visibilidad
- `font-loader.js` - Carga optimizada de fuentes web
- `image-optimizer.js` - Lazy loading de imágenes

#### Optimizaciones
- **Imágenes responsive**:
  - Tool `image-builder.js` para generar variantes (480/768/1024/1600px)
  - Formatos WebP + JPG fallback
  - Implementación con `<picture>` y `srcset`
- **CSS moderno** con variables CSS (custom properties)
- **Lazy loading** de imágenes
- **Smooth scroll** nativo

#### Diseño
- **Paleta de colores** profesional con azules (#0d47a1, #2196f3) y verde (#00e676)
- **Tipografía** moderna (Inter, Poppins)
- **Layout responsive** con Flexbox y Grid
- **Animaciones suaves** con transiciones CSS

---

## [0.1.0] - 2025-11 (Pre-release)

### Prototipo Inicial
- Estructura HTML básica con 5 páginas
- Estilos CSS sin variables
- JavaScript inline en cada página
- Sin backend (formularios no funcionales)
- Imágenes en formato original sin optimizar

---

## Roadmap Futuro

### [1.2.0] - Próxima versión
- [ ] JWT con expiración de sesión
- [ ] Migracion de credenciales a `.env`
- [ ] Tests unitarios con Jest
- [ ] Emails transaccionales (SendGrid)
- [ ] Paginación en panel admin

### [2.0.0] - Versión mayor
- [ ] Migración a TypeScript
- [ ] Base de datos PostgreSQL
- [ ] Autenticación con OAuth2
- [ ] Dashboard con métricas
- [ ] PWA (Service Worker + manifest)
- [ ] Internacionalización (i18n)

---

## Tipos de Cambios

- `Agregado` - Nuevas funcionalidades
- `Cambiado` - Cambios en funcionalidad existente
- `Obsoleto` - Funcionalidades que serán removidas
- `Removido` - Funcionalidades eliminadas
- `Corregido` - Corrección de bugs
- `Seguridad` - Vulnerabilidades corregidas
- `Mejorado` - Optimizaciones sin cambio de funcionalidad

---

## Notas de Migración

### 1.0.0 → 1.1.0

**Sin breaking changes**. Todos los cambios son compatibles hacia atrás.

Si tienes estilos inline personalizados:
1. Revisa que no colisionen con las nuevas clases globales
2. Considera migrar a las clases reutilizables (`.service-intro`, `.service-list`, etc.)
3. Los IDs `#mensaje-exito` y `#formulario-contacto` siguen funcionando igual

**Acción requerida**:
- Ninguna si usas el código tal cual
- Si modificaste `admin.html`, verifica que los estilos inline no se hayan perdido

---

## Contribuciones

Para contribuir:
1. Lee el README.md actualizado
2. Mantén el formato de este CHANGELOG
3. Usa commits convencionales (feat:, fix:, docs:, style:, refactor:)
4. Añade entrada al CHANGELOG en tu PR

---

**Convención de versionado:**
- **MAJOR** (X.0.0): Cambios incompatibles de API
- **MINOR** (0.X.0): Nueva funcionalidad compatible
- **PATCH** (0.0.X): Correcciones y mejoras menores

---

Última actualización: 11 de noviembre de 2025
