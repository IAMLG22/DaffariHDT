/**
 * Capataces Ilustres: homenajeados con la estatuilla de la asociación.
 * Datos del blog antiguo (Archivo Histórico), de Instagram y de prensa/blogs
 * cofrades. Cada afirmación lleva su fuente en `fuentes`.
 *
 * PENDIENTE: ediciones 2015–2025 y año del homenaje a Fernando Baena Reina.
 */

import type { PortableTextBlock } from "next-sanity"

export type Fuente = { texto: string; href: string }

export type Homenajeado = {
  slug: string
  /** Año del homenaje; `null` si aún no se ha confirmado. */
  anio: number | null
  nombre: string
  /** Una línea bajo el nombre. */
  lema: string
  parrafos: string[]
  /** Texto con formato cuando viene del panel (Sanity). */
  texto?: PortableTextBlock[]
  cita?: { texto: string; autor: string }
  imagen?: { src: string; alt: string; pie?: string; vertical?: boolean }
  /** Foto del bloque en la cuadrícula; si falta se usa la estatuilla. */
  foto?: { src: string; posicion?: string }
  fuentes: Fuente[]
}

export const estatuilla = {
  imagen: "/images/capataces/estatuilla.jpg",
  parrafos: [
    "Desde 2011, la asociación entrega cada año una estatuilla de barro con la figura de un hombre de trono bajo el varal como «reconocimiento y homenaje a toda una vida bajo un varal».",
    "El homenaje se celebró durante años junto a la presentación del cartel de Semana Santa de la asociación, en la Casa Hermandad del Monte Calvario y Rocío, en el barrio de la Victoria. Hoy forma parte de los actos oficiales de Cuaresma, junto al Vía Crucis de los Hombres de Trono.",
  ],
}

export const homenajeados: Homenajeado[] = [
  {
    slug: "julian-gonzalez",
    anio: 2011,
    nombre: "D. Julián González",
    lema: "Primer homenajeado de la asociación",
    parrafos: [
      "Recibió la primera estatuilla el 12 de marzo de 2011, en el acto de presentación del primer cartel de la entonces Tertulia Cofrade Antonio Daffari, celebrado en la Casa Hermandad del Monte Calvario y Rocío (calle Circo, barrio de la Victoria).",
      "Hombre de trono, fotógrafo y devoto de la Virgen del Rocío, formó parte de la cuadrilla de Daffari que llevó a la Virgen del Carmen Coronada en el Rosario perchelero de 2010.",
      "Falleció apenas unas semanas después del homenaje, en abril de 2011. La asociación lo despidió como «un gran hombre, gran cofrade, hombre de trono, maravilloso padre, gran fotógrafo, un hombre humilde, tranquilo, sensato, inteligente».",
    ],
    cita: {
      texto:
        "Que esa estatuilla de barro que hace pocas semanas recibió siga siendo un nexo de unión entre todos los hombres de trono y cofrades malagueños.",
      autor: "Daffari Hombres de Trono, abril de 2011",
    },
    fuentes: [
      { texto: "Presentación del cartel y homenaje (marzo de 2011)", href: "/blog/archivo/2011-03-presentacion-del-cartel" },
      { texto: "«Julián, un gran hombre. D.E.P.» (abril de 2011)", href: "/blog/archivo/2011-04-julian-un-gran-hombre-dep" },
      { texto: "Rosario perchelero de la Virgen del Carmen (noviembre de 2010)", href: "/blog/archivo/2010-11-rosario-perchelero-de-la-virgen-del" },
    ],
  },
  {
    slug: "ricardo-aguilar-leon",
    anio: 2012,
    nombre: "D. Ricardo Aguilar León",
    lema: "Homenaje a una vida bajo el varal",
    parrafos: [
      "Recibió la estatuilla el 10 de marzo de 2012 en el salón de actos de la Cofradía del Rocío, en el barrio de la Victoria, durante la presentación del cartel de Semana Santa 2012 de la asociación.",
      "El cofrade Paco Jiménez Valverde hizo la introducción del cartel y dedicó unas palabras al homenajeado, «como reconocimiento y homenaje a una vida bajo un varal». La asociación difundió además un vídeo homenaje en su honor.",
    ],
    fuentes: [
      { texto: "Presentación del cartel 2012 y homenaje (marzo de 2012)", href: "/blog/archivo/2012-03-la-tertulia-cofrade-antonio-daffari" },
      { texto: "Vídeo homenaje a Ricardo Aguilar León (marzo de 2012)", href: "/blog/archivo/2012-03-video-homenaje-ricardo-aguilar-leon" },
      { texto: "«Cartel Tertulia Daffari», blog de Francisco Luis Jiménez Valverde", href: "https://franciscoluisjimenezvalverde.blogspot.com/2012/03/cartel-tertulia-daffari.html" },
    ],
  },
  {
    slug: "enrique-vega-medina",
    anio: 2013,
    nombre: "D. Enrique Vega Medina",
    lema: "Reconocimiento a toda una vida bajo un varal",
    foto: { src: "/images/capataces/enrique-vega-medina.jpg", posicion: "50% 30%" },
    parrafos: [
      "Su nombre se dio a conocer con un vídeo el 2 de marzo de 2013, en la presentación del cartel de la asociación en la Casa Hermandad del Rocío.",
      "Hombre de trono y capataz, antiguos compañeros de varal lo recuerdan en el blog entre los hombres de los tronos de antaño; en 2018 dirigía la maniobra del trono de la Virgen de Nueva Esperanza. En noviembre de 2013 participó en la V Jornada «Frente a la Tribuna», «¿Cómo andan los tronos en Málaga?», celebrada en la Sala Capitular de la Archicofradía del Huerto, donde narró su experiencia de otras décadas y los momentos históricos de los que fue protagonista.",
      "Es padre de Enrique Vega López, homenajeado en 2026, que creció bajo los tronos «con la escuela de su padre».",
    ],
    imagen: {
      src: "/images/archivo/3375b2c11778646b.jpg",
      alt: "Mesa de la V Jornada Frente a la Tribuna, noviembre de 2013",
      pie: "V Jornada «Frente a la Tribuna» (2013). De izquierda a derecha: Rafael Damián, Enrique Vega Medina, Pepe Prado, Enrique Vega (hijo) y Juan Antonio García.",
    },
    fuentes: [
      { texto: "Vídeo homenaje a Enrique Vega (marzo de 2013)", href: "/blog/archivo/2013-03-video-homenaje-enrique-vega" },
      { texto: "«¿Cómo andan los tronos en Málaga?» (diciembre de 2013)", href: "/blog/archivo/2013-12-como-andan-los-tronos-en-malaga" },
      { texto: "«Julio Torres, capataz y hombre de trono» (octubre de 2013)", href: "/blog/archivo/2013-10-julio-torres-capataz-y-hombre-de-trono" },
      { texto: "Presentación de Enrique Vega (hijo) en el pregón de Verdad y Sagrario (2018)", href: "http://verdadysagrario.blogspot.com/2018/02/presentacion-de-enrique-vega-en-pregon.html" },
    ],
  },
  {
    slug: "antonio-bros-fernandez",
    anio: 2014,
    nombre: "D. Antonio Bros Fernández",
    lema: "Capataz por herencia y cofrade de corazón",
    foto: { src: "/images/archivo/1dbcd1099890db5e.png", posicion: "50% 45%" },
    parrafos: [
      "Fue homenajeado el 22 de marzo de 2014 en la Casa Hermandad del Rocío, en la presentación de la cuarta edición del cartel de la asociación, con fotografía de Francisco José Pérez Segovia.",
      "La asociación lo presentó como «cofrade de Cautivo y Sepulcro entre otras hermandades, capataz por herencia y cofrade de corazón». Su apellido está unido a la historia del mando en Málaga: la biografía de Antonio Daffari cita a Antonio Bros entre los capataces más significativos que trabajaron a su lado.",
    ],
    imagen: {
      src: "/images/archivo/1dbcd1099890db5e.png",
      alt: "Cartel de Semana Santa 2014 de Daffari Hombres de Trono",
      pie: "Cartel Daffari 2014, presentado en el acto de su homenaje.",
      vertical: true,
    },
    fuentes: [
      { texto: "Cartel Daffari Hombres de Trono 2014 (marzo de 2014)", href: "/blog/archivo/2014-03-cartel-daffari-hombres-de-trono-2014" },
      { texto: "Antonio Daffari, capataz de tronos", href: "/antonio-daffari" },
    ],
  },
  {
    slug: "fernando-baena-reina",
    anio: null, // PENDIENTE: confirmar el año del homenaje
    nombre: "D. Fernando Baena Reina",
    lema: "Homenajeado por la Asociación Cultural Daffari",
    foto: { src: "/images/capataces/fernando-baena-reina.jpg", posicion: "50% 30%" },
    parrafos: ["Distinguido con la estatuilla de la asociación como reconocimiento a su trayectoria bajo los varales malagueños."],
    imagen: {
      src: "/images/capataces/fernando-baena-reina.jpg",
      alt: "Cartel del homenaje a D. Fernando Baena Reina",
      vertical: true,
    },
    fuentes: [{ texto: "Instagram de la asociación (@daffarihdt)", href: "https://www.instagram.com/daffarihdt/" }],
  },
  {
    slug: "enrique-vega-lopez",
    anio: 2026,
    nombre: "D. Enrique Vega López",
    lema: "Una trayectoria al servicio de los hombres de trono",
    foto: { src: "/images/capataces/enrique-vega-lopez-2026.jpg", posicion: "20% 35%" },
    parrafos: [
      "La asociación lo anunció como Homenajeado 2026 el Miércoles de Ceniza, 18 de febrero, como «reconocimiento por una trayectoria al servicio de los hombres de trono, las cofradías, Málaga y su Semana Santa». El homenaje se celebró el 13 de marzo, el mismo día del Solemne Vía Crucis de los Hombres de Trono en la Iglesia de San Juan.",
      "Hijo de Enrique Vega Medina, homenajeado en 2013, creció bajo los tronos de los años ochenta y noventa y ha sido capataz de la Virgen de la Paz y de Dolores y Esperanza; en 2018 mandaba también en Dolores Coronada, Humildad y Paciencia y el Nazareno del Perdón.",
      "Ha sido pregonero de Humildad y Paciencia, del Puerto de la Torre y, en 2018, de la Hermandad de la Verdad y Sagrario. En la jornada «¿Cómo andan los tronos en Málaga?» (2013) habló de las tallas, los ensambles y la cadena de mando.",
    ],
    imagen: {
      src: "/images/capataces/enrique-vega-lopez-2026.jpg",
      alt: "Cartel oficial: D. Enrique Vega López, homenajeado 2026",
      vertical: true,
    },
    fuentes: [
      { texto: "Comunicado oficial «Homenajeado 2026» (Instagram, 18-02-2026)", href: "https://www.instagram.com/daffarihdt/p/DU6RYoQjH15/" },
      { texto: "Actos oficiales Daffari 2026 (Instagram, 06-02-2026)", href: "https://www.instagram.com/daffarihdt/p/DUaPkRFDIVa/" },
      { texto: "Presentación de Enrique Vega en el pregón de Verdad y Sagrario (2018)", href: "http://verdadysagrario.blogspot.com/2018/02/presentacion-de-enrique-vega-en-pregon.html" },
      { texto: "«¿Cómo andan los tronos en Málaga?» (diciembre de 2013)", href: "/blog/archivo/2013-12-como-andan-los-tronos-en-malaga" },
    ],
  },
]
