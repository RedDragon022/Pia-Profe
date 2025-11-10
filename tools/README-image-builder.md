Image builder

Uso rápido:
1. Instala dependencias:
   npm install sharp

2. Ejecuta el script (creará variantes en 480/768/1024/1600 en WebP y JPG):
   node tools/image-builder.js

Notas:
- El script procesa archivos en assets/images/casos-exito/ recursivamente.
- Evita procesar archivos que ya contienen un sufijo -{ancho} antes de la extensión.
- Si sharp falla en Windows por dependencias nativas, instala las dependencias que sharp indique o usa ImageMagick/cwebp alternativas.
