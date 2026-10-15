import type { Metadata } from "next"
import Link from "next/link"
import { legal } from "@/lib/content"
import { Correo, Dato, PaginaLegal } from "@/components/site/legal"

export const metadata: Metadata = { title: "Política de privacidad" }

export default function Privacidad() {
  return (
    <PaginaLegal titulo="Política de privacidad">
      <p>
        Esta política explica cómo trata la asociación los datos personales, conforme al Reglamento (UE) 2016/679
        (RGPD) y a la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales
        (LOPDGDD).
      </p>

      <h2>Responsable del tratamiento</h2>
      <ul>
        <li>{legal.titular}</li>
        <li>
          NIF: <Dato valor={legal.nif} falta="NIF" />
        </li>
        <li>
          Domicilio: <Dato valor={legal.domicilio} falta="Domicilio" />
        </li>
        <li>
          Contacto: <Correo />
        </li>
      </ul>

      <h2>Qué datos tratamos y para qué</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Tratamiento</th>
              <th>Datos</th>
              <th>Base legal</th>
              <th>Conservación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Solicitudes de alta de socio</td>
              <td>
                Nombre, apellidos, DNI (opcional), fecha de nacimiento, localidad, vinculación cofrade, correo, teléfono
                y dirección
              </td>
              <td>Consentimiento y relación asociativa (art. 6.1.a y 6.1.b RGPD)</td>
              <td>Mientras se mantenga la condición de socio y, después, el tiempo exigido por la ley</td>
            </tr>
            <tr>
              <td>Consultas por correo electrónico</td>
              <td>Los datos que nos envíes</td>
              <td>Consentimiento (art. 6.1.a RGPD)</td>
              <td>El tiempo necesario para responder</td>
            </tr>
            <tr>
              <td>Archivo Histórico y fotografías</td>
              <td>Imagen y nombre de personas que aparecen en publicaciones y fotografías históricas</td>
              <td>
                Interés legítimo en la conservación de la memoria cultural de la Semana Santa de Málaga (art. 6.1.f
                RGPD)
              </td>
              <td>Indefinida, con fines de memoria, salvo que la persona se oponga</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Formulario de alta de socio</h3>
      <p>
        El formulario no guarda datos en la web: al enviarlo se abre tu programa de correo con la solicitud redactada,
        y eres tú quien la envía a <Correo />. No se piden datos bancarios. Tesorería te comunicará la forma de pago
        una vez aprobada el alta.
      </p>

      <h3>Menores de edad</h3>
      <p>
        Los menores de 14 años necesitan el consentimiento de sus padres o tutores para solicitar el alta o para que se
        publique su imagen. La asociación no publica imágenes de menores identificables sin esa autorización. Si
        detectas alguna, escríbenos y la retiraremos de inmediato.
      </p>

      <h2>Fotografías y Archivo Histórico</h2>
      <p>
        La web conserva las publicaciones del blog que la asociación mantuvo entre 2010 y 2014 y fotografías históricas
        de la Semana Santa de Málaga. Muchas recogen actos públicos, como procesiones, tallajes o jornadas, en los que
        aparecen hombres de trono, capataces y público.
      </p>
      <p>
        Si apareces en alguna imagen o publicación y quieres que se retire, se pixele tu rostro o se elimine tu nombre,
        escribe a <Correo /> indicando el enlace. Atenderemos la solicitud en el menor plazo posible, y siempre dentro
        del mes que marca la ley. Lo mismo pueden hacer los familiares o herederos de personas fallecidas.
      </p>

      <h2>Destinatarios</h2>
      <p>
        No cedemos datos a terceros salvo obligación legal. El proveedor de alojamiento web y el de correo electrónico
        actúan como encargados del tratamiento. Los vídeos del Archivo Histórico se alojan en YouTube y solo se cargan
        si pulsas en ellos (ver la <Link href="/cookies">política de cookies</Link>).
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación del
        tratamiento y portabilidad, así como retirar tu consentimiento. Para ello, escribe a <Correo /> indicando qué
        derecho quieres ejercer.
      </p>
      <p>
        Si consideras que no hemos atendido correctamente tu solicitud, puedes presentar una reclamación ante la Agencia
        Española de Protección de Datos (
        <a href="https://www.aepd.es" target="_blank" rel="noreferrer">
          www.aepd.es
        </a>
        ).
      </p>
    </PaginaLegal>
  )
}
