"use client"

import * as React from "react"

/**
 * Cuerpo de una entrada del Archivo Histórico. Los vídeos de YouTube llegan
 * como marcadores (`.video-externo`) y sólo se conectan con YouTube, en modo
 * youtube-nocookie, cuando el visitante pulsa «Reproducir». Así la web no
 * instala cookies de terceros sin consentimiento.
 */
export function ArchivoCuerpo({ html }: { html: string }) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const onClick = (ev: MouseEvent) => {
      const boton = (ev.target as HTMLElement).closest<HTMLButtonElement>(".video-externo button")
      const caja = boton?.closest<HTMLElement>(".video-externo")
      const id = caja?.dataset.video
      if (!caja || !id) return
      const iframe = document.createElement("iframe")
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&autoplay=1`
      iframe.title = "Vídeo de YouTube"
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen"
      iframe.allowFullscreen = true
      caja.replaceWith(iframe)
    }
    el.addEventListener("click", onClick)
    return () => el.removeEventListener("click", onClick)
  }, [])

  return <div ref={ref} className="archivo-html" dangerouslySetInnerHTML={{ __html: html }} />
}
