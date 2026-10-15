// Prepara las fotografías históricas de la web antigua (public/images/legado)
// para la nueva web: recorta los rótulos incrustados de los banners, unifica
// el virado sepia y genera miniaturas. Ejecutar: node scripts/prepare-images.mjs
import sharp from "sharp"
import { mkdirSync } from "node:fs"

const SRC = "public/images/legado"
const OUT = "public/images/historia"
mkdirSync(OUT, { recursive: true })

const tone = (img) =>
  img.normalise().modulate({ saturation: 0 }).tint({ r: 190, g: 160, b: 120 })

const jobs = [
  // [salida, origen, recorte (left, top, width, height) | null]
  ["pollinica-1920", "fondo.jpg", null],
  ["hombres-de-trono", "lasoci.jpg", { left: 0, top: 0, width: 640, height: 288 }],
  ["cuadrilla", "JUNTA.jpg", { left: 0, top: 0, width: 640, height: 288 }],
  ["capataces", "CAPATACES.jpg", { left: 0, top: 0, width: 640, height: 288 }],
  ["daffari-mando", "vidaup1.jpg", { left: 0, top: 0, width: 670, height: 300 }],
  ["procesion-calle", "Daffari-15.jpg", null],
  ["trono-palio", "Daffari-08.jpg", null],
  ["hombres-de-trono-retrato", "Daffari-12.jpg", null],
  ["pareja-procesion", "Daffari-10.jpg", null],
  ["capataces-malagueta", "Daffari-16.jpg", null],
]

for (const [name, file, crop] of jobs) {
  let img = sharp(`${SRC}/${file}`)
  if (crop) img = img.extract(crop)
  const meta = await img.clone().toBuffer({ resolveWithObject: true })
  const w = meta.info.width
  // Upscale suave para que el shader del Hero no muestre pixelado duro.
  const target = Math.max(w * 2, 1280)
  await tone(sharp(meta.data).resize({ width: target, kernel: "lanczos3" }))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT}/${name}.jpg`)
  await tone(sharp(meta.data).resize({ width: 160, height: 100, fit: "cover" }))
    .jpeg({ quality: 70 })
    .toFile(`${OUT}/${name}-thumb.jpg`)
  console.log("ok", name)
}

// Emblema: logotipo caligráfico en oro sobre transparente (para fondos oscuros)
await sharp(`${SRC}/logoblanco.png`).toFile(`public/images/logo-daffari-blanco.png`)
