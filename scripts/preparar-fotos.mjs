// Prepara las fotografías de la carpeta Fotos/ (capturas y escaneos aportados
// por la asociación) para la web: recorta los márgenes blancos de los
// escaneos, unifica el virado sepia y genera miniaturas para la galería.
// Ejecutar: node scripts/preparar-fotos.mjs
import sharp from "sharp"
import { mkdirSync } from "node:fs"

const SRC = "Fotos"
const OUT = "public/images/fotos"
mkdirSync(OUT, { recursive: true })

const tone = (img) =>
  img.normalise().modulate({ saturation: 0 }).tint({ r: 190, g: 160, b: 120 })

const cap = (n) => `Captura de pantalla 2026-10-15 a las ${n}.png`
const wa = (n) => `WhatsApp Image ${n}.jpeg`

// [salida, origen, margen a recortar en %: un número para los cuatro lados
// (escaneos con borde blanco) o [arriba, derecha, abajo, izquierda]]
const jobs = [
  // Horizontales: Hero de escritorio y secciones anchas
  ["cuadrilla-varal", cap("10.33.09"), 0],
  ["cuadrilla-1970", cap("10.30.15"), 2],
  ["trono-tunicas-blancas", cap("10.28.03"), 2],
  ["virgen-calle", cap("10.28.20"), 1],
  ["domingo-ramos", cap("10.29.03"), 1],
  ["tronos-noche", cap("10.28.28"), 1],
  ["trono-alameda", wa("2026-05-18 at 17.19.07"), 3],
  ["cristo-noche", wa("2026-10-15 at 12.37.36"), 1],
  ["trono-capilla", wa("2026-10-15 at 12.37.47"), 1],
  ["trono-plaza", wa("2026-10-15 at 12.38.54"), 1],
  // Verticales: Hero móvil y fotos de retrato. Las capturas 10.34.37, 10.34.44,
  // 10.35.06, 10.35.14 y 10.35.22 ya están en public/images/historia
  // (hombres-de-trono-retrato, pareja-procesion, trono-palio, procesion-calle y
  // capataces-malagueta) a mayor resolución, así que no se duplican aquí.
  ["crucificado-noche", cap("10.27.24"), 0],
  ["palio-cuadrilla", cap("10.28.11"), 1],
  // Arriba trae un pliegue del papel que, bajo la cabecera, parecería una línea.
  ["palio-nazareno-noche", cap("10.28.37"), [14, 0, 0, 0]],
  ["palio-arco", wa("2026-05-18 at 18.41.59"), 2],
  ["trono-balcon", wa("2026-10-15 at 12.40.42"), 2],
  ["virgen-nazarenos-noche", wa("2026-10-15 at 12.41.56"), 2],
]

for (const [name, file, margen] of jobs) {
  const src = sharp(`${SRC}/${file}`).flatten({ background: "#fff" })
  const { width, height } = await src.metadata()
  const [arriba, derecha, abajo, izquierda] = Array.isArray(margen) ? margen : [margen, margen, margen, margen]
  const top = Math.round((height * arriba) / 100)
  const left = Math.round((width * izquierda) / 100)
  const base = await src
    .extract({
      left,
      top,
      width: width - left - Math.round((width * derecha) / 100),
      height: height - top - Math.round((height * abajo) / 100),
    })
    .toBuffer()
  const vertical = height > width
  await tone(sharp(base).resize({ width: vertical ? 1200 : 2000, withoutEnlargement: true, kernel: "lanczos3" }))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT}/${name}.jpg`)
  await tone(sharp(base).resize({ width: 160, height: 100, fit: "cover" }))
    .jpeg({ quality: 70 })
    .toFile(`${OUT}/${name}-thumb.jpg`)
  console.log("ok", name)
}

// Recortes verticales dirigidos para el móvil: encuadran el motivo en 4:5 en
// vez de dejar que el navegador recorte por el centro una foto apaisada.
// [salida, origen, recorte en px del original, ampliación]
const recortes = [
  // Antonio Daffari mandando la cuadrilla, sin el rótulo de la web antigua.
  ["daffari-mando-vertical", cap("10.34.57"), { left: 836, top: 0, width: 444, height: 555 }, 2],
  // El trono de la Pollinica con sus hombres de trono, sin las fachadas laterales.
  ["domingo-ramos-vertical", cap("10.29.03"), { left: 319, top: 10, width: 811, height: 1014 }, 1],
]

for (const [name, file, box, escala] of recortes) {
  const base = await sharp(`${SRC}/${file}`).flatten({ background: "#fff" }).extract(box).toBuffer()
  await tone(sharp(base).resize({ width: Math.round(box.width * escala), kernel: "lanczos3" }))
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`${OUT}/${name}.jpg`)
  console.log("ok", name)
}
