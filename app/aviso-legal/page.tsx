import type { Metadata } from "next"
import Link from "next/link"
import { legal } from "@/lib/content"
import { Correo, Dato, PaginaLegal } from "@/components/site/legal"

export const metadata: Metadata = { title: "Aviso legal" }

export default function AvisoLegal() {
  return (
    <PaginaLegal titulo="Aviso legal">
      <h2>Titular del sitio web</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio
        Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:
      </p>
      <ul>
        <li>Titular: {legal.titular}</li>
        <li>
          NIF: <Dato valor={legal.nif} falta="NIF" />
        </li>
        <li>
          Domicilio social: <Dato valor={legal.domicilio} falta="Domicilio" />
        </li>
        <li>
          Inscripción: Registro de Asociaciones de Andalucía, n.º <Dato valor={legal.registro} falta="N.º de registro" />
        </li>
        <li>
          Correo electrónico: <Correo />
        </li>
        <li>Dominio: {legal.dominio}</li>
      </ul>

      <h2>Objeto</h2>
      <p>
        Este sitio web difunde la actividad de la asociación, sin ánimo de lucro, dedicada a la memoria, el oficio y la
        formación del hombre de trono, el capataz y el mayordomo en la Semana Santa de Málaga. También conserva, con
        fines de memoria histórica, las publicaciones del antiguo blog de la asociación.
      </p>

      <h2>Condiciones de uso</h2>
      <p>
        El acceso a la web es libre y gratuito. Quien la visita se compromete a hacer un uso adecuado de sus contenidos
        y a no emplearlos para actividades ilícitas o contrarias a la buena fe.
      </p>

      <h2>Propiedad intelectual e imágenes</h2>
      <p>
        Los textos, el diseño y el logotipo de la web pertenecen a la asociación o se usan con autorización. Las
        fotografías históricas proceden del archivo de la asociación y de las aportaciones de socios y amigos, y se
        publican con fines culturales y de memoria. Cuando consta, se indica la autoría.
      </p>
      <p>
        Si eres autor de alguna imagen o texto, o apareces en una fotografía, y no deseas que siga publicada, escríbenos
        a <Correo /> y la retiraremos o corregiremos la atribución lo antes posible. Más información en la{" "}
        <Link href="/privacidad">política de privacidad</Link>.
      </p>

      <h2>Enlaces externos</h2>
      <p>
        La web contiene enlaces a sitios de terceros (redes sociales, YouTube, publicaciones originales del blog
        antiguo). La asociación no se responsabiliza de sus contenidos ni de sus políticas de privacidad.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        La asociación procura que la información sea correcta y esté actualizada, pero no garantiza la ausencia de
        errores, en especial en las publicaciones históricas, que se conservan tal y como se escribieron en su fecha
        original.
      </p>

      <h2>Legislación aplicable</h2>
      <p>Este aviso legal se rige por la legislación española.</p>
    </PaginaLegal>
  )
}
