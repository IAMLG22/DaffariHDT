// Reduce las imágenes del Archivo Histórico (máx. 1400 px, JPEG/PNG optimizados) sin cambiar sus rutas.
import sharp from "sharp"
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
const DIR = "public/images/archivo"
let antes = 0, despues = 0
for (const f of readdirSync(DIR)) {
  if (f.endsWith(".gif")) continue
  const ruta = `${DIR}/${f}`
  const buf = readFileSync(ruta)
  antes += buf.length
  let img = sharp(buf, { failOn: "none" }).rotate().resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
  img = f.endsWith(".png") ? img.png({ compressionLevel: 9, palette: true }) : img.jpeg({ quality: 78, mozjpeg: true })
  try {
    const out = await img.toBuffer()
    if (out.length < buf.length) { writeFileSync(ruta, out); despues += out.length } else despues += buf.length
  } catch { despues += buf.length }
}
console.log(`${(antes / 1e6).toFixed(1)} MB → ${(despues / 1e6).toFixed(1)} MB`)
