# Asociación Daffari — Hombres de Trono

Nueva web de la Asociación Cultural Daffari (Málaga). Next.js 16 (App Router) + Tailwind CSS 4 + shadcn/ui (Base UI) + TypeScript.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Estructura

| Ruta | Contenido |
| --- | --- |
| `/` | Hero (MorphGallery) → La Asociación → Junta de Gobierno → avances |
| `/antonio-daffari` | Reportaje histórico con foto fija, capitulares y citas |
| `/capataces-ilustres` | Sección pendiente de contenido |
| `/noticias`, `/noticias/[slug]` | Última noticia destacada + grid de 3 columnas |
| `/blog`, `/blog?etapa=archivo` | Blog Actual (vacío) / Archivo Histórico: las 272 entradas y 7 páginas del blog antiguo, con buscador y filtro por año |
| `/blog/archivo/[slug]` | Entrada del blog antiguo con su fecha original |
| `/alta-socio` | Formulario en 3 pasos (de momento se envía por correo con `mailto:`) |

- **Contenido:** todo está en `lib/content.ts`. Lo marcado con `// PENDIENTE` es contenido de ejemplo que hay que sustituir por datos reales.
- **Blog antiguo:** `node scripts/migrar-blog-antiguo.mjs` vuelve a descargar daffarihombresdetrono.blogspot.com en `lib/archivo-blog.json` y `public/images/archivo/`. Después, `node scripts/comprimir-archivo.mjs` optimiza las imágenes.
- **Hero:** `components/ui/morph-gallery.tsx` es el componente de 21st.dev, con la lógica original y los estilos adaptados a la paleta.
  Las fotos tienen que servirse desde el mismo dominio o con CORS para que funcione el efecto WebGL.
- **Fotos históricas:** las originales de daffari.es están en `public/images/legado/`.
  `node scripts/prepare-images.mjs` genera las versiones en sepia y sin rótulos en `public/images/historia/`.
- **Paleta y tipografías:** los tokens están en `app/globals.css` (`pergamino`, `incienso`, `burdeos`, `nazareno`, `oro`) y las fuentes son Cinzel, Cormorant Garamond y Plus Jakarta Sans.
