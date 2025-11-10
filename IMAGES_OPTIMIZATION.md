Instrucciones para Paso A — Renombrar y optimizar `impacto global.jpg`

Resumen
-------
Queremos renombrar el fichero local `impacto global.jpg` a `impacto-global.jpg`, y generar versiones optimizadas (JPG comprimido y WebP) en varios anchos para usar `srcset`.

Comandos (Bash, Windows WSL o Git Bash):

1) Renombrar el archivo (simple):

```bash
mv "impacto global.jpg" impacto-global.jpg
```

2) Generar versiones JPEG optimizadas (usando ImageMagick `magick` o `convert`):

```bash
# 1200px ancho
magick impacto-global.jpg -strip -resize 1200x -quality 80 impacto-global-1200.jpg
# 800px ancho
magick impacto-global.jpg -strip -resize 800x -quality 80 impacto-global-800.jpg
# 400px ancho
magick impacto-global.jpg -strip -resize 400x -quality 80 impacto-global-400.jpg
```

Si tu entorno tiene `convert` en lugar de `magick` (ImageMagick v6): reemplaza `magick` por `convert`.

3) Generar WebP (usando cwebp o ImageMagick si soporta webp):

```bash
# Con cwebp (mejor control de calidad)
cwebp -q 80 impacto-global-1200.jpg -o impacto-global-1200.webp
cwebp -q 80 impacto-global-800.jpg -o impacto-global-800.webp
cwebp -q 80 impacto-global-400.jpg -o impacto-global-400.webp

# Alternativa con ImageMagick (si soporta webp):
magick impacto-global-1200.jpg impacto-global-1200.webp
```

4) Ejemplo de marcado HTML (usar `picture` con `srcset` para WebP y fallback JPG):

```html
<picture>
  <source srcset="impacto-global-1200.webp 1200w, impacto-global-800.webp 800w, impacto-global-400.webp 400w" type="image/webp">
  <source srcset="impacto-global-1200.jpg 1200w, impacto-global-800.jpg 800w, impacto-global-400.jpg 400w" type="image/jpeg">
  <img src="impacto-global-400.jpg" alt="Impacto global INVOMEX" loading="lazy">
</picture>
```

Notas y recomendaciones
----------------------
- Coloca las versiones generadas en la misma carpeta donde esté referenciada la imagen (en este proyecto, la raíz del sitio donde está `index.html`) o en `assets/images/` y actualiza las rutas.
- Ajusta `-quality` para JPG/WebP según balance entre calidad y peso (70-85 suele ser un buen rango).
- Para procesar muchas imágenes, usa scripts o herramientas como `sharp` (Node.js) o pipelines en tu CI.
- Si no tienes ImageMagick ni cwebp instalados, puedes instalar `libwebp`/`cwebp` o usar `npm install -g sharp-cli` y usar `sharp` para convertir/resize.

Ejemplo con `sharp-cli` (Node):

```bash
npx sharp-cli resize impacto-global.jpg --width 1200 --quality 80 -o impacto-global-1200.jpg
npx sharp-cli to-webp impacto-global-1200.jpg -q 80 -o impacto-global-1200.webp
```

Si quieres, puedo ejecutar comandos de renombrado aquí (si confirman que está bien renombrar el archivo localmente desde `impacto global.jpg` a `impacto-global.jpg`) o puedo solo dejar las instrucciones para que ejecutes localmente. Si confirmas, hago la llamada para renombrar el archivo y crear versiones (si hay herramientas disponibles).