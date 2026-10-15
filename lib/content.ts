/**
 * Contenido de la web. Todo lo que procede de la web antigua (daffari.es) está
 * migrado literalmente; lo marcado con `// PENDIENTE` es estructura de ejemplo
 * que la Junta debe completar con datos reales antes de publicar.
 */

export const site = {
  nombre: "Asociación Daffari",
  nombreCompleto: "Asociación Cultural Daffari — Hombres de Trono",
  email: "info@daffari.es",
  ciudad: "Málaga",
  fundacion: 2014,
  origen: 2009,
  redes: {
    // PENDIENTE: cuenta oficial de Instagram de la asociación
    instagram: "https://www.instagram.com/",
    twitter: "https://twitter.com/DaffariHdT",
    facebook: "https://www.facebook.com/pages/Daffari-hombres-de-trono/107413182670680",
  },
}

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/antonio-daffari", label: "Antonio Daffari" },
  { href: "/capataces-ilustres", label: "Capataces Ilustres" },
  {
    href: "/blog",
    label: "Blog",
    children: [
      { href: "/blog", label: "Blog Actual", hint: "Nueva etapa: opinión y crónica" },
      { href: "/blog?etapa=archivo", label: "Archivo Histórico", hint: "Hemeroteca del blog antiguo" },
    ],
  },
  { href: "/noticias", label: "Noticias" },
] as const

// ---------------------------------------------------------------- Hero
export const heroFotos = [
  { src: "/images/historia/pollinica-1920.jpg", thumb: "/images/historia/pollinica-1920-thumb.jpg", alt: "Trono de la Pollinica a su paso por el centro de Málaga, primeras décadas del siglo XX" },
  { src: "/images/historia/hombres-de-trono.jpg", thumb: "/images/historia/hombres-de-trono-thumb.jpg", alt: "Hombres de trono y nazarenos ante un trono procesional" },
  { src: "/images/historia/daffari-mando.jpg", thumb: "/images/historia/daffari-mando-thumb.jpg", alt: "Un capataz manda la cuadrilla entre palmas el Domingo de Ramos" },
  { src: "/images/historia/cuadrilla.jpg", thumb: "/images/historia/cuadrilla-thumb.jpg", alt: "Cuadrilla de hombres de trono con su capataz junto a la campana" },
  { src: "/images/historia/capataces.jpg", thumb: "/images/historia/capataces-thumb.jpg", alt: "Capataces y hombres de trono con el martillo junto al trono" },
]

// ---------------------------------------------------------------- Asociación
export const asociacion = {
  intro:
    "Se dice que Málaga tiene rota la línea del tiempo en muchos aspectos culturales. En el caso de la Semana Santa y especialmente de los capataces también sucede así. En Málaga, con la crisis de décadas pasadas para rellenar tronos y la transición hacia la figura de los hermanos hombres de trono, la imagen del capataz ha pasado de ser vital a, en muchos casos, estar denostada y servir como premio a los hermanos por su trabajo o implicación en una Cofradía.",
  parrafos: [
    "Por esta razón y por el hecho en sí de recuperar la figura de alguien al que tanto le deben los hombres de trono de nuestra ciudad, un grupo de cofrades nos unimos para formar una asociación cultural con ganas de trabajar dentro y fuera del varal y recuperar su sello. Así nace la “Asociación Cultural Daffari Hombres de Trono”. Nuestra asociación ha conseguido por sus propios medios dar a conocer y recuperar la filosofía y figura de Don Antonio a la hora de llevar un trono.",
    "Al fin y al cabo, nuestra historia no quiere más que ser la continuación de la de Don Antonio: la de un malagueño más. Un caballero que, de no ser por un grupo de personas, quedaría en la memoria de muy pocos y que, con el paso de los años, acabaría siendo dueño del olvido colectivo en el que estamos sumidos en nuestra ciudad.",
  ],
  cita: "Es importante saber de dónde venimos y quiénes nos han llevado hasta aquí para poder defender con criterio e incluso para poder querer de verdad a tu tierra.",
  valores: [
    { titulo: "Historia", numeral: "I", texto: "Recuperar la memoria de los capataces y hombres de trono que dieron forma a la Semana Santa de Málaga." },
    { titulo: "Tradición", numeral: "II", texto: "Custodiar el paso malagueño y la manera de llevar un trono con formalidad y honradez, como enseñó Don Antonio." },
    { titulo: "Hermandad", numeral: "III", texto: "Ser punto de encuentro de hombres de trono, capataces y mayordomos de Málaga y su provincia." },
    { titulo: "Cultura", numeral: "IV", texto: "Charlas, coloquios, tertulias y el Vía Crucis de hombres de trono para formar y divulgar." },
  ],
  hitos: [
    { valor: "2009", etiqueta: "Primitivos orígenes" },
    { valor: "2014", etiqueta: "Fundación como asociación" },
    { valor: "Única", etiqueta: "Asociación de hombres de trono, capataces y mayordomos en Málaga" },
  ],
}

// ---------------------------------------------------------------- Junta
export const junta = {
  cargos: [
    { cargo: "Presidente", nombre: "José Antonio Luque Fernández", destacado: true },
    { cargo: "Vicepresidente", nombre: "Carlos García Torres" },
    { cargo: "Secretario", nombre: "Juan Apolinario Flores" },
    { cargo: "Tesorero", nombre: "Francisco Chavet Romero" },
    { cargo: "Fiscal", nombre: "Manuel Santiago Velasco" },
    { cargo: "Vocal", nombre: "Juan García Torres" },
  ],
  consejeros: [
    "Alejandro García Torres",
    "Joaquín Pérez García",
    "Juan Fernando Sánchez Rodríguez",
    "Hugo Pérez Jurado",
    "Gonzalo León Rivas",
    "Enrique Sánchez Peláez",
    "José María Alarcón Pascual",
  ],
}

// ---------------------------------------------------------------- Noticias
export type Noticia = {
  slug: string
  categoria: "Comunicado oficial" | "Mesa redonda" | "Actos culturales" | "Agenda anual"
  fecha: string // ISO
  fechaTexto?: string // si la fecha exacta no se conoce
  titular: string
  extracto: string
  imagen?: string
  creditoImagen?: string
  cuerpo: string[]
}

export const noticias: Noticia[] = [
  {
    slug: "jose-antonio-luque-elegido-nuevo-presidente-de-daffari",
    categoria: "Comunicado oficial",
    fecha: "2022-12-06",
    titular: "José Antonio Luque elegido nuevo presidente de Daffari",
    extracto:
      "La asociación de hombres de trono de la capital ha designado al que será su nuevo presidente durante cuatro años tras el mandato de Juan García Torres.",
    imagen: "/images/legado/presidente-luque.jpg",
    creditoImagen: "Foto: LM Gómez Pozo",
    cuerpo: [
      "La Asociación Cultural de Hombres de Trono Antonio Daffari ha celebrado su cabildo electoral según indicaban sus estatutos y en el que se ha elegido al nuevo presidente de la entidad.",
      "El hasta la fecha presidente, Juan García Torres, ostentaba el cargo tras un mandato de ocho años desde la fundación de la asociación en 2014 y en esta ocasión no revalidaba para dar paso a nuevos equipos que siguieran la estela positiva y de crecimiento que ha vivido la asociación desde su nacimiento.",
      "En esta ocasión era una única candidatura la que se presentaba a las elecciones para regir los designios de la asociación y era encabezada por el hasta ahora vocal de la entidad, José Antonio Luque Fernández. La asamblea general extraordinaria de elecciones tenía lugar el pasado 6 de diciembre y en ella se refrendaba por mayoría absoluta al nuevo equipo de gobierno.",
      "Luque, de 38 años, es segundo Teniente Hermano Mayor de la Sacramental del Rocío y experimentado capataz, mayordomo y hombre de trono de diferentes tronos de corporaciones nazarenas de la capital.",
      "Con la llegada de Luque a la presidencia de Daffari se inicia una nueva etapa de renovación en la que irá acompañado de una renovada junta directiva conformada por Carlos García Torres como vicepresidente, Juan Apolinario Flores como secretario, Francisco Chavet como tesorero y Manuel Santiago como fiscal.",
      "Daffari Hombres de Trono es en la actualidad la única asociación que representa a los hombres de trono, capataces y mayordomos en Málaga y fue fundada como asociación hace ocho años, teniendo sus primitivos orígenes en el año 2009.",
      "Entre sus hitos más destacados se encuentran los encuentros anuales que celebra la asociación en los que se presentan charlas y coloquios formativos, tertulias en torno a la figura del hombre de trono, la entrega anual de su galardón a un reconocido perfil del ámbito de los tronos, la voz y el martillo, así como la celebración del Vía Crucis de hombres de trono durante la Cuaresma.",
      "La nueva junta directiva trabaja ya en nuevas actividades y proyectos a desarrollar entre los que destacan la creación de una sede física de la asociación que se convierta en punto de encuentro de hombres de trono, capataces y mayordomos en Málaga y su provincia.",
    ],
  },
  {
    slug: "mesa-redonda-capataces-del-rocio-en-andalucia",
    categoria: "Mesa redonda",
    fecha: "2014-10-27",
    titular: "Mesa redonda: «Capataces del Rocío en Andalucía»",
    extracto:
      "En la Casa Hermandad del Rocío, en el barrio de la Victoria, con Manuel del Pozo, Carlos Iruela y Francisco Cornejo. Modera Antonio Márquez.",
    imagen: "/images/legado/SEGUNDA-REUNION-2015.jpg",
    cuerpo: [
      "El lunes 27 de octubre a las 20.30 horas, en el salón de actos de la Casa Hermandad del Rocío, en el malagueño barrio de la Victoria, tendrá lugar una mesa redonda organizada por la Comisión del Trono de la Virgen del Rocío con el título de «Capataces del Rocío en Andalucía».",
      "En dicha mesa redonda tendremos el placer de escuchar las vivencias del capataz general del trono de María Santísima del Rocío, Manuel del Pozo García. Como invitados especiales vendrán desde la ciudad de Sevilla Carlos Iruela Rojas, capataz de la Virgen del Rocío de la Hermandad de Redención, y Francisco Cornejo Romero, capataz de la Virgen del Rocío de Vélez-Málaga.",
      "La mesa redonda será moderada por Antonio Márquez. La asistencia es totalmente abierta a cualquier persona que así lo desee.",
    ],
  },
  {
    slug: "via-crucis-de-hombres-de-trono",
    categoria: "Agenda anual",
    fecha: "2026-03-01",
    fechaTexto: "Cuaresma",
    titular: "Vía Crucis de Hombres de Trono",
    extracto:
      "Cada Cuaresma la asociación convoca a hombres de trono, capataces y mayordomos de la ciudad a rezar juntos el Vía Crucis.",
    imagen: "/images/historia/procesion-calle.jpg",
    cuerpo: [
      "Entre las citas fijas de la asociación figura la celebración del Vía Crucis de hombres de trono durante la Cuaresma, abierto a todos los que alguna vez se han puesto bajo un varal.",
      // PENDIENTE: fecha, templo y recorrido de la próxima edición.
    ],
  },
  {
    slug: "galardon-la-voz-y-el-martillo",
    categoria: "Actos culturales",
    fecha: "2026-01-15",
    fechaTexto: "Anual",
    titular: "Galardón «La voz y el martillo»",
    extracto:
      "La asociación entrega cada año su galardón a un reconocido perfil del ámbito de los tronos de Málaga.",
    imagen: "/images/historia/capataces-malagueta.jpg",
    cuerpo: [
      "Daffari Hombres de Trono tiene, entre sus objetivos, el de reconocer y alabar la figura de los capataces que acompañan, guían y son mirada para cientos de hombres de trono de nuestra ciudad. Por eso se fija en los estatutos la entrega de una estatuilla cada año.",
      // PENDIENTE: galardonado de la edición en curso.
    ],
  },
  {
    slug: "encuentro-anual-de-hombres-de-trono",
    categoria: "Actos culturales",
    fecha: "2025-10-01",
    fechaTexto: "Anual",
    titular: "Encuentro anual: charlas, coloquios y tertulias",
    extracto:
      "Los encuentros anuales reúnen charlas y coloquios formativos y tertulias en torno a la figura del hombre de trono.",
    imagen: "/images/historia/trono-palio.jpg",
    cuerpo: [
      "Los encuentros anuales de la asociación presentan charlas y coloquios formativos y tertulias en torno a la figura del hombre de trono, el capataz y el mayordomo.",
      // PENDIENTE: programa del próximo encuentro.
    ],
  },
]

export const noticiasOrdenadas = [...noticias].sort((a, b) => {
  // Las noticias con fecha real van primero; la agenda anual al final.
  const agendaA = a.fechaTexto ? 1 : 0
  const agendaB = b.fechaTexto ? 1 : 0
  if (agendaA !== agendaB) return agendaA - agendaB
  return b.fecha.localeCompare(a.fecha)
})

// ---------------------------------------------------------------- Blog
export type Entrada = {
  slug: string
  titulo: string
  fecha: string // ISO
  autor: string
  seccion: string
  extracto: string
  imagen?: string
  cuerpo: string[]
  lectura?: number
}

/** Blog actual (nueva etapa). Vacío hasta las primeras publicaciones. */
export const blogActual: Entrada[] = []

// El Archivo Histórico (blog antiguo) está en lib/archivo.ts.

// ---------------------------------------------------------------- Antonio Daffari
export const daffari = {
  vida: { nace: "1883", muere: "19 de febrero de 1960" },
  cronologia: [
    { anio: "1883", texto: "Nace en Barcelona de manera circunstancial; se cría en Málaga desde temprana edad." },
    { anio: "1912", texto: "Comienza a mandar en el trono de la Pollinica, cofradía que había ayudado a reorganizar." },
    { anio: "1925", texto: "Participa en la fundación de la Hermandad del Prendimiento en Santo Domingo." },
    { anio: "1931", texto: "Rescata la cabeza del Señor del Huerto durante el asalto a los Santos Mártires." },
    { anio: "1960", texto: "Muere en Málaga el 19 de febrero." },
  ],
  secciones: [
    {
      titulo: null as string | null,
      parrafos: [
        "La historia de la Semana Santa de Málaga está construida por personajes que, con el paso del tiempo, han dejado muestra clara de sus logros y trabajo en pos de unos valores e intereses que han enriquecido sobremanera nuestro patrimonio social y cultural.",
        "Por lo general, esta historia cofradiera se ha labrado gracias a escritores, periodistas, escultores y artistas de diferentes ramas que, junto con los grandes mecenas de los últimos siglos, han conseguido que Málaga sea uno de los referentes de este arte religioso popular.",
        "Nuestra ciudad destaca por, entre otras peculiaridades, tener una memoria selectiva y en algunos casos ser algo olvidadiza. En este sentido nos encontramos en el año 2012 hablando de alguien que, para muchos cofrades, se trata de un completo desconocido. De alguien con un estilo peculiar. Con una forma de trabajar envidiable y que marcó un antes y un después en el mundo de los hombres de trono. Muchas de las cosas que aquí van a aparecer, de haber sucedido a día de hoy, serían objeto de duras críticas por ser ataques y pérdida de identidad malacitana. Por suerte, la historia acaba dando un espaldarazo a la verdad.",
        "Les hablo de Don Antonio Daffari, capataz de tronos.",
      ],
    },
    {
      titulo: "Su vida",
      parrafos: [
        "Antonio José Arcadio Daffari Hidalgo nace en Barcelona de manera circunstancial en el año 1883, criándose en Málaga desde temprana edad. Su familia, natural de Asti —localidad italiana de la región del Piamonte—, recala en Málaga al ser contratada en origen por el propietario de un gran café situado en calle Santa Lucía con el cargo de maestros heladeros, profesión de la que vivió su familia toda la vida. Su abuelo, Giuseppe D´affari, y su padre, José Daffari, se hacen populares en Málaga debido al éxito de sus helados. Este éxito lleva consigo que la familia Daffari viva cómodamente, sin llegar a ser ricos, pero pudiendo permitirse dar una buena educación a sus hijos.",
        "Conforme pasan los años, Antonio Daffari va despegándose poco a poco de la tradición heladera familiar y desliza sus sentidos hacia las dos artes que coparían su vida: los caballos y la Semana Santa. Desde joven se arrima al mundo de los caballos y la talabartería, consiguiendo ser maestro guarnicionero de las caballerías de la plaza de toros de La Malagueta. Este oficio, del que vivía fundamentalmente, se complementaba con su propio taller situado en la calle García Briz. Durante toda su vida vive en una casa en la malagueña calle San Telmo por la que pasarán decenas de hombres de trono en innumerables ocasiones y que aún hoy es recordada por muchos malagueños anónimos.",
        "Es tal la calidad de sus trabajos que, curiosamente, llega a ser el encargado de confeccionar los uniformes de la guardia romana que cada año sacaba la Hermandad del Santo Traslado en nuestra ciudad.",
      ],
    },
    {
      titulo: "Antonio Daffari y la Semana Santa",
      parrafos: [
        "La vida de Daffari gira en torno a las Cofradías de Málaga. Pero, si bien su labor más destacada transcurre entre varales y hombres de trono, cabe destacar que no sólo fue ahí donde pudo plantar las semillas que germinarían con nuestras tradiciones, sino que también lo hizo en el entorno global de las mismas, participando en la creación y reorganización de muchas de las Hermandades.",
        "Antonio Daffari conformó junto con el Padre Ponce y Paco Triviño el grupo de malagueños que reorganizó la desaparecida Cofradía de La Pollinica en la primera década del siglo XX. Su papel en dicha Hermandad fue tan destacado que pasó toda su vida ligado a ella y mandó en su trono hasta sus últimos días. Es en esta misma Cofradía y gracias al apoyo de Paco Triviño donde Daffari comienza a mandar en los tronos malagueños en el año 1912, pudiendo afirmarse que es aquí donde nace el cambio sustancial que vivirá la Semana Santa de Málaga desde el punto de vista del hombre de trono.",
        "Junto con la reorganización de la Pollinica, Antonio participa años después, en 1925, en la fundación de la Hermandad del Prendimiento en la iglesia conventual de Santo Domingo, donde va consagrando su figura como pieza clave del desarrollo de nuestra historia cofrade. Es en esta fundación, en torno a los comerciantes y contratistas del mercado de Atarazanas, donde sale a la luz la figura fundamental de su mujer, María Herrero. María era una mujer con un carácter significativo. Seria y muy formal, supo transmitir esos valores a su esposo.",
        "Un dato característico de María Herrero, propietaria de una carnicería en Puerta Nueva, es que fue la primera mujer con permiso público para poder acceder a los mataderos municipales de Málaga, situación que no se había permitido hasta esa época. Este sistema de vida y la forma de educar a sus hijos convierten en el futuro a la hija de la pareja en alguien fundamental para Antonio en el engranaje de la contratación en los tronos.",
        "Si bien Daffari participa en diversas actuaciones de entidad, hay una que destaca por su valía y honradez personal. Una mañana de mayo de 1931, un grupo de rateros y saqueadores descontrolados toman la iglesia de los Santos Mártires provocando numerosos destrozos. Durante el saqueo, la talla de Nuestro Padre Jesús en la Oración en el Huerto es desmembrada y la cabeza arrancada y lanzada a una pira que poco después sería pasto de las llamas. Antonio, que tenía su casa muy cerca, se acerca y recoge hábilmente la cabeza del Señor, ocultándola bajo un paño. Durante años, en su humilde casa de la calle San Telmo, Antonio guarda la cabeza de la talla que, gracias a su valentía y cariño hacia la Semana Santa, sigue a día de hoy en su parroquia recibiendo culto de los fieles malagueños.",
      ],
    },
    {
      titulo: "Daffari, capataz de tronos",
      cita: "La receta de su éxito es sencilla y se fundamenta en dos elementos: formalidad y honradez.",
      parrafos: [
        "La tarea de mandar en los tronos ha sido siempre fundamental para poder sacar a la calle las imágenes en Semana Santa. El papel de capataz cobra importancia conforme la Semana Santa evoluciona, el tamaño de los tronos aumenta y encontrar y controlar a gente para que cargue se vuelve especialmente difícil. Es aquí donde Antonio Daffari consigue un papel relevante en toda la ciudad.",
        "Esta labor consistía en la búsqueda de hombres para cargar los pesados tronos, medirlos, contratarlos, que cumplieran su trabajo y pagarles lo acordado. En principio no presentaba demasiada dificultad, pero en realidad suponía un esfuerzo importante, puesto que debía conseguir que personas de especiales características supieran comportarse acordes con el ambiente de seriedad y respeto que mandaba la procesión.",
        "Antonio, a diferencia de los demás capataces, montaba sus cuadrillas contando con hombres de diversa índole y profesiones sin depender exclusivamente de porteadores venidos del puerto, como era habitual. Esta característica, junto con su formalidad y especial sensibilidad, hacía que el resultado de su trabajo fuera un poco más lejos que el de los demás. Antonio y su gente no acarreaban tronos: los llevaban de manera que ellos pasaran desapercibidos, canalizando toda la atención hacia las imágenes. Eran cuidadosos, correctos y muy formales en la calle. Ese era su sello.",
        "Una de sus peculiaridades era que todas las tareas de reclutar las cuadrillas, su tallaje, el reparto de túnicas y los pagos se realizaban en su propia casa con la colaboración y el trabajo directo de su hija Encarna. Es destacable este hecho puesto que incluso a día de hoy es impensable en nuestra ciudad que una mujer participe en el simple tallaje o reparto de puestos en una de nuestras Cofradías.",
      ],
      citaFinal: "Si los hombres me respetan a mí, también respetarán a mi hija.",
      parrafosFinal: [
        "Está documentado que Daffari mandó y llevó los tronos de Pollinica, donde permaneció prácticamente hasta su último año de vida, la Virgen del Amparo, el Huerto y la Concepción, el Cautivo y la Trinidad, Gitanos, las Penas, el Rescate, Sentencia y el Rosario, el Rocío, la Sangre y Consolación, la Buena Muerte y la Soledad, el Santo Suplicio, los Milagros y la Amargura, la Piedad, la Soledad del Sepulcro, el Resucitado, la Divina Pastora, María Auxiliadora, el Carmen del Perchel así como la patrona de Málaga, la Virgen de la Victoria.",
        "A esta lista hay que sumarle algunos tronos más, cuya confirmación no es oficial aunque sí de palabra de varios capataces que tuvieron la suerte de trabajar bajo el mando de Don Antonio.",
      ],
    },
    {
      titulo: "Un estilo que deja huella",
      parrafos: [
        "El que Antonio Daffari no procediera del puerto y que su nivel social y económico fuese superior al de sus compañeros hizo desde un principio que sus preocupaciones y ganas de cambiar fueran en una línea muy distinta al resto. Desde sus inicios en el mundo del varal, Antonio quiso replantear la manera de llevar los tronos en Málaga y lo consiguió.",
        "Al hacerse cargo del trono de la Pollinica, Antonio se encontró con hombres que trabajaban con horquillas y correas y que caminaban al paso. Tras muchas horas de pruebas, consultas y cálculos, Daffari planteó una nueva forma de «andar los tronos» en Málaga. Desde un principio apostó por dar al trono una cadencia y una serenidad en el paso para conseguir que desde fuera se viera un andar más elegante y menos forzado.",
        "Con el tiempo, todos los tronos en Málaga mandados por él o por otros capataces adoptaron esta medida, que con los años se pasó a llamar paso marinero o paso malagueño. En definitiva, algo distinto, innovador y moderno que nace de alguien que era capataz. Un puesto para gente ruda pero que Antonio sabía manejar de la manera más exquisita.",
        "Ante este tipo de personas se suele crear un mito que poco a poco va convirtiéndose en leyenda. En su caso no ha sido así del todo. Su trabajo ha servido para que muchos de sus discípulos continúen con la saga de buenos capataces pero, salvo excepciones, nadie ha llegado a su nivel.",
      ],
      cita: "Con Antonio Daffari fueron siempre los mejores.",
      parrafosFinal: [
        "A su lado estuvo un gran capataz de cola como fue Juan Ceja, o también Antonio Bros, dos de los capataces más significativos de nuestra historia. Pero si alguien ha sabido asimilar la visión de la forma de trabajar en el trono ese ha sido Manuel Sánchez, más conocido en el mundo cofrade como «Bigote Pana». Manuel fue la mano derecha de Daffari durante muchos años y estuvo a su lado como capataz y como «encargado», figura ya desaparecida que consistía en llevar el mando de un trono en ausencia del capataz.",
        "Al ser Daffari el mejor capataz que tenía la ciudad, eran muchas las cofradías que querían contratarlo. Se daba el caso de que en un mismo día varias Hermandades llevaran cuadrillas mandadas por él; entonces delegaba uno de los tronos en Bigote Pana. Durante la noche, Antonio solía pasar de trono a trono controlando cómo trabajaban sus hombres.",
        "Daffari era un capataz distinto. Él y sus cuadrillas iban perfectamente vestidos, con la túnica planchada y bien peinados. Hay un detalle que se escapa de nuestra memoria pero que siempre es bueno conocer: Antonio Daffari salía de capataz en infinidad de tronos vestido con traje y corbata negra. Antonio era malagueño, defendía a Málaga y tenía un estilo propio.",
        "Tengamos siempre en cuenta este dato antes de lanzarnos al aventurado abismo de la crítica y la comparación en defensa de un estilo malagueño.",
        "Antonio Daffari murió en Málaga el día 19 de febrero de 1960.",
      ],
    },
  ],
}

// ---------------------------------------------------------------- utilidades
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

/** "2014-10-27" → "27 de octubre de 2014"; "2014" → "2014". */
export function formatearFecha(iso: string) {
  const [y, m, d] = iso.split("-")
  if (!m) return y
  if (!d) return `${MESES[Number(m) - 1]} de ${y}`
  return `${Number(d)} de ${MESES[Number(m) - 1]} de ${y}`
}
