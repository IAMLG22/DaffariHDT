import type { Metadata } from "next"
import { Correo, PaginaLegal } from "@/components/site/legal"

export const metadata: Metadata = { title: "Política de cookies" }

export default function Cookies() {
  return (
    <PaginaLegal titulo="Política de cookies">
      <h2>¿Usa cookies esta web?</h2>
      <p>
        No. Esta web no instala cookies propias ni de terceros cuando la visitas. No usamos herramientas de analítica,
        publicidad ni seguimiento, y las tipografías se sirven desde nuestro propio servidor. Por eso no te mostramos
        ningún aviso de consentimiento al entrar.
      </p>

      <h2>Vídeos de YouTube</h2>
      <p>
        Algunas entradas del Archivo Histórico incluyen vídeos alojados en YouTube (Google). Para proteger tu
        privacidad, no se cargan automáticamente: en su lugar ves un recuadro con el botón «Reproducir en YouTube». Solo
        si lo pulsas se conecta con YouTube, en su modo de privacidad mejorada (youtube-nocookie.com). A partir de ese
        momento, Google puede guardar información en tu navegador según su propia política:
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Cuándo</th>
              <th>Finalidad</th>
              <th>Más información</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>YouTube (Google Ireland Ltd.)</td>
              <td>Solo al pulsar «Reproducir en YouTube»</td>
              <td>Reproducir el vídeo y recordar tus preferencias del reproductor</td>
              <td>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                  Política de privacidad de Google
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Enlaces a redes sociales</h2>
      <p>
        Los iconos de redes sociales son enlaces normales: no cargan nada de esas plataformas hasta que haces clic y sales
        de nuestra web.
      </p>

      <h2>Cómo gestionar las cookies</h2>
      <p>
        Puedes borrar o bloquear las cookies desde la configuración de tu navegador (Chrome, Firefox, Safari, Edge…). Si
        en el futuro la web incorporara cookies que requieran tu consentimiento, actualizaremos esta política y te lo
        pediremos antes de instalarlas.
      </p>
      <p>
        Para cualquier duda, escríbenos a <Correo />.
      </p>
    </PaginaLegal>
  )
}
