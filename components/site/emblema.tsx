import { useId } from "react"

/**
 * Sello de la asociación: orla circular con la leyenda y, en el centro, el
 * martillo del capataz cruzado sobre un varal. Usa `currentColor`.
 */
export function Emblema({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "")
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Emblema de la Asociación Daffari">
      <defs>
        <path id={`orla-${id}`} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.7" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.7" />
      <text fill="currentColor" fontSize="13" letterSpacing="3.2" style={{ fontFamily: "var(--font-cinzel), serif" }}>
        <textPath href={`#orla-${id}`} startOffset="0">
          ASOCIACIÓN DAFFARI · HOMBRES DE TRONO · MÁLAGA ·
        </textPath>
      </text>
      {/* varal */}
      <rect x="62" y="96" width="76" height="8" rx="1" fill="currentColor" opacity="0.85" transform="rotate(-35 100 100)" />
      {/* martillo */}
      <g transform="rotate(35 100 100)" fill="currentColor">
        <rect x="97" y="72" width="6" height="58" rx="1.5" />
        <rect x="84" y="64" width="32" height="13" rx="2.5" />
        <circle cx="100" cy="133" r="4" />
      </g>
      <text x="100" y="152" textAnchor="middle" fill="currentColor" fontSize="10" letterSpacing="3" style={{ fontFamily: "var(--font-cinzel), serif" }}>
        MMXIV
      </text>
    </svg>
  )
}
