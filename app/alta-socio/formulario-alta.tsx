"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react"
import { cn } from "@/lib/utils"

const PASOS = [
  { titulo: "Datos personales", corto: "Personales" },
  { titulo: "Vinculación cofrade", corto: "Vinculación" },
  { titulo: "Contacto y cuota", corto: "Contacto" },
] as const

const campo =
  "peer w-full border-0 border-b border-input bg-transparent px-0 pt-6 pb-2 text-base text-incienso outline-none transition-colors placeholder:text-transparent focus:border-burdeos user-invalid:border-destructive"
const etiqueta =
  "pointer-events-none absolute top-6 left-0 origin-left text-sm text-muted-foreground transition-all duration-200 peer-focus:top-0 peer-focus:text-[0.68rem] peer-focus:tracking-[0.18em] peer-focus:text-burdeos peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.68rem] peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:uppercase"

function Campo({
  name,
  label,
  required,
  type = "text",
  autoComplete,
  className,
  ...rest
}: {
  name: string
  label: string
  required?: boolean
  type?: string
  autoComplete?: string
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `alta-${name}`
  return (
    <div className={cn("relative", className)}>
      <input id={id} name={name} type={type} required={required} autoComplete={autoComplete} placeholder=" " className={campo} {...rest} />
      <label htmlFor={id} className={etiqueta}>
        {label}
        {required && <span className="text-burdeos"> *</span>}
      </label>
    </div>
  )
}

function Opcion({ name, value, titulo, texto, required, defaultChecked }: { name: string; value: string; titulo: string; texto?: string; required?: boolean; defaultChecked?: boolean }) {
  return (
    <label className="group relative flex cursor-pointer gap-4 border border-border bg-white p-5 transition-colors hover:border-oro/70 has-[:checked]:border-burdeos has-[:checked]:bg-burdeos/[0.03] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-oro">
      <input type="radio" name={name} value={value} required={required} defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-input transition-colors peer-checked:border-burdeos peer-checked:bg-burdeos">
        <span className="size-1.5 rounded-full bg-pergamino" />
      </span>
      <span>
        <span className="block font-serif text-xl leading-tight text-incienso">{titulo}</span>
        {texto && <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{texto}</span>}
      </span>
    </label>
  )
}

export function FormularioAlta({ email }: { email: string }) {
  const [paso, setPaso] = React.useState(0)
  const [enviado, setEnviado] = React.useState<null | { nombre: string; mailto: string }>(null)
  const formRef = React.useRef<HTMLFormElement>(null)
  const pasosRef = React.useRef<(HTMLFieldSetElement | null)[]>([])
  const cabeceraRef = React.useRef<HTMLDivElement>(null)

  /** Valida sólo los campos del paso visible. */
  const validarPaso = (i: number) => {
    const fs = pasosRef.current[i]
    if (!fs) return true
    const campos = Array.from(fs.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"))
    const invalido = campos.find((c) => !c.checkValidity())
    if (invalido) {
      invalido.reportValidity()
      return false
    }
    return true
  }

  /** Un campo oculto no puede mostrar su aviso: primero se muestra su paso. */
  const mostrarErrores = (p: number) => {
    if (p !== paso) {
      setPaso(p)
      window.setTimeout(() => validarPaso(p), 60)
    }
  }

  const irA = (i: number) => {
    if (i > paso) {
      for (let p = paso; p < i; p++) {
        if (!validarPaso(p)) {
          mostrarErrores(p)
          return
        }
      }
    }
    setPaso(i)
    cabeceraRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    for (let p = 0; p < PASOS.length; p++) {
      if (!validarPaso(p)) {
        mostrarErrores(p)
        return
      }
    }
    const fd = new FormData(e.currentTarget)
    const v = (k: string) => String(fd.get(k) ?? "").trim()
    const lineas = [
      "SOLICITUD DE ALTA DE SOCIO — Asociación Daffari",
      "",
      "— Datos personales —",
      `Nombre: ${v("nombre")} ${v("apellidos")}`,
      `DNI: ${v("dni") || "—"}`,
      `Fecha de nacimiento: ${v("nacimiento") || "—"}`,
      `Localidad: ${v("localidad") || "—"}`,
      "",
      "— Vinculación cofrade —",
      `Perfil: ${v("perfil")}`,
      `Hermandad(es): ${v("hermandades") || "—"}`,
      `Años bajo el varal: ${v("anios") || "—"}`,
      `Tronos y puestos: ${v("tronos") || "—"}`,
      "",
      "— Contacto y cuota —",
      `Email: ${v("email")}`,
      `Teléfono: ${v("telefono")}`,
      `Dirección: ${v("direccion") || "—"}`,
      `Modalidad: ${v("modalidad")}`,
      `Comentarios: ${v("comentarios") || "—"}`,
      "",
      "Acepto la política de privacidad.",
    ]
    const mailto = `mailto:${email}?subject=${encodeURIComponent(`Alta de socio: ${v("nombre")} ${v("apellidos")}`)}&body=${encodeURIComponent(lineas.join("\n"))}`
    // PENDIENTE: sustituir por el envío a un backend / servicio de formularios.
    window.location.assign(mailto)
    setEnviado({ nombre: v("nombre"), mailto })
  }

  if (enviado) {
    return (
      <div className="border border-oro/50 bg-white p-10 text-center sm:p-16">
        <span className="mx-auto flex size-16 items-center justify-center border border-oro text-oro">
          <Check className="size-7" />
        </span>
        <h2 className="mt-8 font-serif text-4xl text-incienso">Gracias, {enviado.nombre}</h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
          Se ha abierto tu programa de correo con la solicitud ya redactada para{" "}
          <strong className="text-incienso">{email}</strong>. Sólo tienes que enviarla. La Secretaría se pondrá en contacto contigo.
        </p>
        <a href={enviado.mailto} className="mt-8 inline-block text-xs font-semibold tracking-[0.2em] text-burdeos uppercase underline underline-offset-4 hover:text-oro">
          ¿No se abrió? Pulsa aquí
        </a>
      </div>
    )
  }

  return (
    <div ref={cabeceraRef} className="scroll-mt-28">
      {/* Indicador de pasos */}
      <ol className="grid grid-cols-3 border-b border-border">
        {PASOS.map((p, i) => (
          <li key={p.titulo}>
            <button
              type="button"
              onClick={() => irA(i)}
              aria-current={paso === i ? "step" : undefined}
              className={cn(
                "group relative flex w-full flex-col items-start gap-1 pb-5 text-left transition-colors",
                "after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:origin-left after:transition-transform after:duration-500",
                paso >= i ? "after:scale-x-100 after:bg-burdeos" : "after:scale-x-0 after:bg-burdeos",
              )}
            >
              <span className={cn("font-display text-sm tracking-[0.2em]", paso >= i ? "text-oro" : "text-muted-foreground")}>
                {paso > i ? "✓" : `0${i + 1}`}
              </span>
              <span className={cn("font-serif text-lg leading-tight sm:text-xl", paso === i ? "text-incienso" : "text-muted-foreground")}>
                <span className="sm:hidden">{p.corto}</span>
                <span className="hidden sm:inline">{p.titulo}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-12">
        {/* Paso 1 */}
        <fieldset ref={(el) => { pasosRef.current[0] = el }} hidden={paso !== 0} className="animate-in fade-in slide-in-from-right-4 duration-500">
          <legend className="font-serif text-3xl text-incienso">Datos personales</legend>
          <p className="mt-2 text-sm text-muted-foreground">Los campos marcados con * son obligatorios.</p>
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            <Campo name="nombre" label="Nombre" required autoComplete="given-name" />
            <Campo name="apellidos" label="Apellidos" required autoComplete="family-name" />
            <Campo name="dni" label="DNI / NIE" autoComplete="off" pattern="[0-9XYZxyz][0-9]{7}[A-Za-z]" title="Formato: 12345678A" />
            <div className="relative">
              <input id="alta-nacimiento" name="nacimiento" type="date" className={cn(campo, "placeholder:text-muted-foreground")} />
              <label htmlFor="alta-nacimiento" className="absolute top-0 left-0 text-[0.68rem] tracking-[0.18em] text-muted-foreground uppercase">
                Fecha de nacimiento
              </label>
            </div>
            <Campo name="localidad" label="Localidad" autoComplete="address-level2" className="sm:col-span-2" defaultValue="Málaga" />
          </div>
        </fieldset>

        {/* Paso 2 */}
        <fieldset ref={(el) => { pasosRef.current[1] = el }} hidden={paso !== 1} className="animate-in fade-in slide-in-from-right-4 duration-500">
          <legend className="font-serif text-3xl text-incienso">Vinculación cofrade y con los tronos</legend>
          <p className="mt-2 text-sm text-muted-foreground">¿Cuál es tu relación con el varal? <span className="text-burdeos">*</span></p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Opcion name="perfil" value="Hombre de trono" titulo="Hombre de trono" texto="Llevas o has llevado un trono." required />
            <Opcion name="perfil" value="Capataz" titulo="Capataz" texto="Mandas o has mandado en un trono." />
            <Opcion name="perfil" value="Mayordomo" titulo="Mayordomo" texto="De trono o de procesión." />
            <Opcion name="perfil" value="Simpatizante" titulo="Simpatizante" texto="Amante de la Semana Santa de Málaga." />
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            <Campo name="hermandades" label="Hermandad(es) a las que perteneces" className="sm:col-span-2" />
            <div className="relative">
              <select id="alta-anios" name="anios" defaultValue="" className={cn(campo, "appearance-none")}>
                <option value="">Selecciona…</option>
                <option>Menos de 5 años</option>
                <option>De 5 a 15 años</option>
                <option>De 15 a 30 años</option>
                <option>Más de 30 años</option>
                <option>No he llevado trono</option>
              </select>
              <label htmlFor="alta-anios" className="absolute top-0 left-0 text-[0.68rem] tracking-[0.18em] text-muted-foreground uppercase">
                Años bajo el varal
              </label>
            </div>
            <div className="relative sm:col-span-2">
              <textarea id="alta-tronos" name="tronos" rows={3} placeholder=" " className={cn(campo, "resize-none")} />
              <label htmlFor="alta-tronos" className={etiqueta}>Tronos y puestos (varal, cola, capataz…)</label>
            </div>
          </div>
        </fieldset>

        {/* Paso 3 */}
        <fieldset ref={(el) => { pasosRef.current[2] = el }} hidden={paso !== 2} className="animate-in fade-in slide-in-from-right-4 duration-500">
          <legend className="font-serif text-3xl text-incienso">Contacto y cuota</legend>
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            <Campo name="email" label="Correo electrónico" type="email" required autoComplete="email" />
            <Campo name="telefono" label="Teléfono" type="tel" required autoComplete="tel" pattern="[+0-9 ]{9,15}" title="Introduce un teléfono válido" />
            <Campo name="direccion" label="Dirección postal" autoComplete="street-address" className="sm:col-span-2" />
          </div>
          <p className="mt-10 text-sm text-muted-foreground">Modalidad de socio <span className="text-burdeos">*</span></p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Opcion name="modalidad" value="Socio de número" titulo="Socio de número" texto="Cuota anual ordinaria fijada por la Asamblea General." required defaultChecked />
            <Opcion name="modalidad" value="Socio protector" titulo="Socio protector" texto="Aportación voluntaria superior para sostener los proyectos." />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Tesorería te comunicará el importe vigente y la forma de pago una vez aprobada el alta. No se solicitan datos bancarios en este formulario.
          </p>
          <div className="relative mt-10">
            <textarea id="alta-comentarios" name="comentarios" rows={3} placeholder=" " className={cn(campo, "resize-none")} />
            <label htmlFor="alta-comentarios" className={etiqueta}>Comentarios (opcional)</label>
          </div>
          <label className="mt-10 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-tinta">
            <input type="checkbox" name="privacidad" required className="mt-1 size-4 shrink-0 accent-burdeos" />
            <span>
              He leído la{" "}
              <a href="/privacidad" target="_blank" className="text-burdeos underline underline-offset-4 hover:text-oro">
                política de privacidad
              </a>{" "}
              y acepto que mis datos sean tratados por la Asociación Cultural Daffari con la única finalidad de gestionar mi alta como socio. <span className="text-burdeos">*</span>
            </span>
          </label>
        </fieldset>

        {/* Navegación */}
        <div className="mt-14 flex items-center justify-between gap-4 border-t border-border pt-8">
          <button
            type="button"
            onClick={() => irA(paso - 1)}
            disabled={paso === 0}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-tinta uppercase transition-colors hover:text-burdeos disabled:invisible"
          >
            <ArrowLeft className="size-4" /> Anterior
          </button>
          {paso < PASOS.length - 1 ? (
            <button
              type="button"
              onClick={() => irA(paso + 1)}
              className="inline-flex items-center gap-3 bg-incienso px-8 py-4 text-xs font-semibold tracking-[0.22em] text-pergamino uppercase transition-colors hover:bg-burdeos"
            >
              Continuar <ArrowRight className="size-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center gap-3 bg-burdeos px-8 py-4 text-xs font-semibold tracking-[0.22em] text-pergamino uppercase transition-colors hover:bg-oro hover:text-incienso"
            >
              Enviar solicitud <Send className="size-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
