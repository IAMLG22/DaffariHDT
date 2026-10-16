/**
 * Configuración de Sanity. Los valores se leen de variables de entorno
 * (`.env.local` en tu ordenador y "Environment Variables" en Vercel).
 *
 * Mientras no haya `NEXT_PUBLIC_SANITY_PROJECT_ID`, la web funciona con el
 * contenido de `lib/content.ts` y `lib/capataces.ts`.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ""
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-01"

/** ¿Está la web conectada a Sanity? */
export const sanityConfigurado = projectId.length > 0
