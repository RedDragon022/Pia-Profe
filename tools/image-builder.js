/*
  tools/image-builder.js
  - Busca recursivamente imágenes (jpg/jpeg/png/webp) en assets/images/casos-exito/
  - Para cada imagen original (sin sufijo -{w}), genera versiones en los anchos:
      [480, 768, 1024, 1600]
    tanto en WebP como en JPG (fallback).
  - Evita procesar archivos ya generados (contienen -{numero} antes de la extensión).
  - Requiere: npm i sharp
  - Ejecutar: node tools/image-builder.js
*/

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..', 'assets', 'images', 'casos-exito');
const SIZES = [480, 768, 1024, 1600];
const QUALITY_WEBP = 75;
const QUALITY_JPEG = 80;

async function walk(dir) {
  let entries = await fs.readdir(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await walk(res));
    } else {
      files.push(res);
    }
  }
  return files;
}

function isOriginal(file) {
  // Ignore files that already have -{number} before extension, e.g. name-768.webp
  const base = path.basename(file);
  return !/[-_]\d{2,4}\.(jpe?g|png|webp)$/i.test(base);
}

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;
  if (!isOriginal(file)) return;

  const dir = path.dirname(file);
  const name = path.basename(file, ext);
  console.log('Procesando:', path.relative(ROOT, file));

  // Read once to a buffer
  const buffer = await fs.readFile(file);
  for (const w of SIZES) {
    const outWebp = path.join(dir, `${name}-${w}.webp`);
    const outJpg = path.join(dir, `${name}-${w}.jpg`);
    try {
      await sharp(buffer)
        .resize({ width: w })
        .webp({ quality: QUALITY_WEBP })
        .toFile(outWebp);
      // Create JPG fallback
      await sharp(buffer)
        .resize({ width: w })
        .jpeg({ quality: QUALITY_JPEG })
        .toFile(outJpg);
      console.log('  ->', path.relative(ROOT, outWebp), path.relative(ROOT, outJpg));
    } catch (err) {
      console.error('Error procesando', file, '->', err.message);
    }
  }
}

(async () => {
  try {
    const all = await walk(ROOT);
    const originals = all.filter(f => isOriginal(f) && /\.(jpe?g|png|webp)$/i.test(f));
    console.log('Archivos encontrados:', originals.length);
    for (const f of originals) {
      await processFile(f);
    }
    console.log('Procesamiento completado.');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
