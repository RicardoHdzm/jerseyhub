import type {
  Categoria,
  ModeloUniforme,
  FiltroCatalogo,
  Opcion,
  OpcionValor,
  Paquete,
  PiezaConColor,
  Producto,
} from "@/lib/types";

/**
 * CATÁLOGO DE EJEMPLO — reemplaza nombres, precios y textos por los reales.
 * Los precios son por pieza, en MXN, y los "extra" de cada opción se suman al precio base.
 * Las fotos van en /public/productos/ (ver el README de esa carpeta para saber
 * qué subcarpeta alimenta cada parte del sitio).
 */

export const categorias: Categoria[] = [
  {
    id: "caballero",
    nombre: "Caballero",
  },
  {
    id: "dama",
    nombre: "Dama",
  },
  {
    id: "pantalones",
    nombre: "Pantalones",
  },
  {
    id: "gorras",
    nombre: "Gorras",
  },
  {
    id: "accesorios",
    nombre: "Accesorios",
  },
];

// --- Opciones reutilizables ------------------------------------------------

const corte: Opcion = {
  id: "corte",
  label: "Corte",
  ayuda: "Las tallas exactas de cada jugador las tomamos al confirmar el pedido.",
  valores: [
    { id: "adulto", label: "Adulto" },
    { id: "juvenil", label: "Juvenil" },
  ],
};

/**
 * OJO: este link es de ejemplo y apunta a una búsqueda de Mercado Libre, no a
 * tu publicación. Sustitúyelo por la URL exacta del anuncio (la que sale al
 * abrir tu publicación), o borra la línea `mercadoLibre` del producto para que
 * el botón no aparezca.
 *
 * Lo llevan las cuatro casacas del catálogo, que son las que se venden por
 * pieza. Los tres acabados del armador no: ahí se cotiza el equipo completo.
 */
const ML_EJEMPLO_CASACA = "https://listado.mercadolibre.com.mx/jersey-beisbol-personalizado";

// --- Productos -------------------------------------------------------------

export const productos: Producto[] = [
  {
    slug: "casaca-sublimada",
    mercadoLibre: ML_EJEMPLO_CASACA,
    disponibleEnSucursal: true,
    nombre: "Casaca sublimada",
    foto: "/productos/jerseys/sublimado/whitesox-01.avif",
    categoria: "casacas",
    precio: 450,
    color: "#1a1a1a",
    colorSecundario: "#f8fafc",
    descripcion:
      "Sublimación de borde a borde en tela dry-fit ligera. Diseño libre: degradados, patrones y logos sin costo extra por color.",
    incluye: ["Nombre y número", "Logo del equipo y patrocinadores", "Colores libres"],
    // El tipo de cuello solo se elige en el corte dama; aquí va cuello V fijo.
    opciones: [corte],
  },
  {
    slug: "casaca-bordada",
    mercadoLibre: ML_EJEMPLO_CASACA,
    disponibleEnSucursal: true,
    nombre: "Casaca bordada",
    foto: "/productos/jerseys/bordado/dodgers-01.avif",
    categoria: "casacas",
    precio: 580,
    destacado: true,
    color: "#1e3a8a",
    colorSecundario: "#f8fafc",
    descripcion:
      "Nombre, número y logo aplicados en twill sobre la tela, no sublimados. Es el acabado con relieve y el más resistente al uso y a los lavados.",
    incluye: ["Twill en pecho y espalda", "Botonado completo", "Acabado con relieve"],
    opciones: [corte],
  },
  {
    slug: "casaca-drifit",
    mercadoLibre: ML_EJEMPLO_CASACA,
    disponibleEnSucursal: true,
    nombre: "Casaca dry-fit",
    foto: "/productos/jerseys/drifit/braves-01.avif",
    categoria: "casacas",
    precio: 380,
    color: "#dc2626",
    colorSecundario: "#fef2f2",
    descripcion:
      "La opción de entrada para ligas y torneos: sublimado completo en tela dry-fit estándar, cuello V y manga corta.",
    incluye: ["Nombre y número", "Tela ligera y fresca", "Precio de entrada"],
    opciones: [corte],
  },
  {
    slug: "casaca-dama",
    mercadoLibre: ML_EJEMPLO_CASACA,
    disponibleEnSucursal: true,
    nombre: "Casaca corte dama",
    foto: "/productos/jerseys/dama/angels-01.avif",
    categoria: "casacas",
    precio: 470,
    color: "#7c3aed",
    colorSecundario: "#f5f3ff",
    descripcion:
      "Corte entallado con costados en malla y largo pensado para softbol. Sublimado full color.",
    incluye: ["Corte entallado", "Cuello V", "Costados en malla"],
    opciones: [],
  },
  /*
    Las tres técnicas con las que se decora la casaca del paquete. Son productos
    y no una lista aparte porque toda la cotización —líneas, totales, mensaje de
    WhatsApp— se resuelve buscando por `productoSlug`: si la técnica no fuera un
    producto, al recalcular el resumen no habría de dónde sacar su precio.

    Van con `soloEnArmador` porque en "Prenda por prenda" ya están las casacas
    sueltas; estas existen nada más para ponerle precio al paquete de equipo.

    El precio no se muestra en el paso 3 a propósito: el cliente elige acabado,
    no precio, y el costo aparece ya sumado en la tarjeta del paquete.
  */
  {
    slug: "casaca-bordado-completo",
    soloEnArmador: true,
    nombre: "Casaca bordado completo",
    categoria: "casacas",
    precio: 550,
    color: "#1a1a1a",
    colorSecundario: "#c9a227",
    descripcion: "El acabado más duradero y el que mejor se ve de cerca.",
    incluye: ["Logo bordado al frente", "Nombre y número bordados"],
    opciones: [],
  },
  {
    slug: "casaca-mixta",
    soloEnArmador: true,
    nombre: "Casaca mixta",
    categoria: "casacas",
    precio: 450,
    color: "#1a1a1a",
    colorSecundario: "#c9a227",
    descripcion: "El punto medio entre presencia y costo.",
    incluye: ["Logo bordado al frente", "Nombre y número en DTF textil"],
    opciones: [],
  },
  {
    slug: "casaca-dtf",
    soloEnArmador: true,
    nombre: "Casaca DTF textil",
    categoria: "casacas",
    precio: 350,
    color: "#1a1a1a",
    colorSecundario: "#c9a227",
    descripcion: "La opción más ligera y la de entrada para ligas y torneos.",
    incluye: ["Logo al frente en DTF textil", "Nombre y número en DTF textil"],
    opciones: [],
  },
  {
    slug: "pantalon-clasico",
    nombre: "Pantalón corte caballero",
    categoria: "pantalones",
    precio: 340,
    destacado: true,
    color: "#c9d0d8",
    colorSecundario: "#6b7684",
    foto: "/productos/pantalones/negro.jpg",
    descripcion:
      "El liso de siempre, con pretina elástica y refuerzo en rodillas. Combina con cualquier casaca del catálogo.",
    incluye: ["Pretina elástica", "Refuerzo en rodillas", "Bolsas laterales"],
    opciones: [
      {
        id: "color",
        label: "Color",
        valores: [
          { id: "negro", label: "Negro", foto: "/productos/pantalones/negro.jpg" },
          { id: "blanco", label: "Blanco", foto: "/productos/pantalones/blanco.jpg" },
          { id: "gris", label: "Gris", foto: "/productos/pantalones/gris.jpg" },
        ],
      },
      // Sin "Dama" a propósito: el corte de mujer es su propio producto.
      {
        id: "corte",
        label: "Corte",
        ayuda: "Las tallas exactas de cada jugador las tomamos al confirmar el pedido.",
        valores: [
          { id: "adulto", label: "Adulto" },
          { id: "juvenil", label: "Juvenil" },
        ],
      },
      {
        id: "largo",
        label: "Largo",
        valores: [
          { id: "recto", label: "Recto" },
          { id: "knicker", label: "Knicker" },
        ],
      },
    ],
  },
  {
    slug: "pantalon-dama",
    nombre: "Pantalón corte dama",
    categoria: "pantalones",
    precio: 350,
    color: "#c9d0d8",
    colorSecundario: "#6b7684",
    foto: "/productos/pantalones/mujer/blanco.jpg",
    descripcion:
      "Corte entallado con tiro y largo pensados para softbol femenil, en la misma tela con recuperación.",
    incluye: ["Corte entallado", "Pretina elástica", "Refuerzo en rodillas"],
    opciones: [
      {
        id: "color",
        label: "Color",
        valores: [
          { id: "blanco", label: "Blanco", foto: "/productos/pantalones/mujer/blanco.jpg" },
          { id: "negro", label: "Negro", foto: "/productos/pantalones/mujer/negro.jpg" },
        ],
      },
      {
        id: "largo",
        label: "Largo",
        valores: [
          { id: "recto", label: "Recto" },
          { id: "knicker", label: "Knicker" },
        ],
      },
    ],
  },
  {
    slug: "gorra-drifit",
    nombre: "Gorra dry-fit",
    foto: "/productos/gorras/drifit/gorra-negra.jpg",
    categoria: "gorras",
    precio: 240,
    color: "#1a1a1a",
    colorSecundario: "#f8fafc",
    descripcion:
      "Tela dry-fit con paneles perforados: mucho más fresca que la de algodón. La que piden los equipos que entrenan al rayo del sol.",
    incluye: ["Tela transpirable", "Paneles perforados", "Logo al frente"],
    opciones: [
      {
        id: "color",
        label: "Color",
        valores: [
          { id: "negro", label: "Negro" },
          { id: "blanco", label: "Blanco" },
          { id: "azul", label: "Azul" },
          { id: "rojo", label: "Rojo" },
        ],
      },
      {
        id: "visera",
        label: "Visera",
        valores: [
          { id: "curva", label: "Curva" },
          { id: "plana", label: "Plana" },
        ],
      },
      {
        id: "ajuste",
        label: "Ajuste",
        valores: [
          { id: "snapback", label: "Snapback" },
          { id: "cerrada", label: "Cerrada por talla", extra: 20 },
        ],
      },
    ],
  },
  {
    slug: "gorra-bordada-6-paneles",
    foto: "/productos/gorras/tela/gorra-algodon.jpg",
    nombre: "Gorra de algodón",
    categoria: "gorras",
    precio: 260,
    color: "#0f172a",
    colorSecundario: "#facc15",
    descripcion:
      "Algodón estructurado con el logo aplicado en alta densidad. El acabado más duradero para uso diario.",
    incluye: ["Logo al frente", "Estructura rígida"],
    opciones: [
      {
        id: "color",
        label: "Color",
        valores: [
          { id: "negro", label: "Negro" },
          { id: "blanco", label: "Blanco" },
          { id: "azul", label: "Azul" },
          { id: "rojo", label: "Rojo" },
        ],
      },
      {
        id: "visera",
        label: "Visera",
        valores: [
          { id: "curva", label: "Curva" },
          { id: "plana", label: "Plana" },
        ],
      },
    ],
  },
  {
    slug: "calcetas-sublimadas",
    nombre: "Calcetas",
    categoria: "accesorios",
    precio: 130,
    color: "#1d4ed8",
    colorSecundario: "#f8fafc",
    foto: "/productos/calcetas/negras.jpg",
    descripcion: "Calcetas altas con puño de compresión, en el color exacto del uniforme.",
    incluye: ["Puño de compresión", "Color a juego"],
    opciones: [
      {
        id: "color",
        label: "Color",
        valores: [
          { id: "negras", label: "Negro", foto: "/productos/calcetas/negras.jpg" },
          { id: "blancas", label: "Blanco", foto: "/productos/calcetas/blancas.jpg" },
          { id: "rojas", label: "Rojo", foto: "/productos/calcetas/rojas.jpg" },
          { id: "azules", label: "Azul", foto: "/productos/calcetas/azules.jpg" },
        ],
      },
    ],
  },
  {
    slug: "cinturon-beisbol",
    nombre: "Cinturón",
    categoria: "accesorios",
    precio: 110,
    color: "#1a1a1a",
    colorSecundario: "#cbd5e1",
    foto: "/productos/cinturon/negro.jpg",
    descripcion: "Cinturón elástico con hebilla metálica, en el color exacto del uniforme.",
    incluye: ["Hebilla metálica", "Color a juego"],
    opciones: [
      {
        id: "color",
        label: "Color",
        valores: [
          { id: "negro", label: "Negro", foto: "/productos/cinturon/negro.jpg" },
          { id: "blanco", label: "Blanco" },
          { id: "rojo", label: "Rojo", foto: "/productos/cinturon/rojo.jpg" },
          { id: "azul", label: "Azul", foto: "/productos/cinturon/azul.jpg" },
        ],
      },
    ],
  },
];

// --- Modelos de uniforme ---------------------------------------------------

/**
 * MODELOS DE EJEMPLO. Son los estilos de diseño que el cliente elige antes de
 * armar el paquete; cámbialos por los que ustedes manejan.
 *
 * `genero` es el filtro del paso 1 ("Caballero" / "Dama"). Si un modelo existe
 * en los dos cortes, va dos veces con slug distinto y su propia foto.
 */
/**
 * Los modelos van con nombre clave, no con el del equipo de MLB en el que se
 * inspiran: la casaca se produce con el diseño que el cliente pida, pero el
 * catálogo no puede andar vendiendo marcas ajenas. El nombre describe lo que se
 * ve en la foto para que cliente y taller se entiendan por WhatsApp.
 *
 * Un nombre puede repetirse entre caballero y dama cuando el diseño es el mismo
 * (el slider filtra por corte, así que nunca se ven juntos); dentro de un mismo
 * corte tienen que ser únicos.
 */
export const modelos: ModeloUniforme[] = [
  {
    slug: "clasico",
    nombre: "Clásico",
    destacado: true,
    descripcion: "Blanco con letra script azul y número a contraste.",
    genero: "caballero",
    casacaSlug: "casaca-bordada",
    foto: "/productos/jerseys/bordado/dodgers-01.avif",
  },
  {
    slug: "clasico-alterno",
    nombre: "Clásico alterno",
    descripcion: "El mismo modelo en azul marino con script blanco.",
    genero: "caballero",
    casacaSlug: "casaca-bordada",
    foto: "/productos/jerseys/bordado/dodgers-02.avif",
  },
  {
    slug: "franja-roja",
    nombre: "Franja roja",
    descripcion: "Blanco con script rojo y vivos del mismo tono al frente.",
    genero: "caballero",
    casacaSlug: "casaca-bordada",
    foto: "/productos/jerseys/bordado/redsox-01.avif",
  },
  {
    slug: "royal",
    nombre: "Royal",
    descripcion: "Azul rey liso con logo redondo al pecho.",
    genero: "caballero",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/jerseys/sublimado/cubs-01.avif",
  },
  {
    slug: "azabache",
    nombre: "Azabache",
    descripcion: "Negro con letra blanca, la opción más sobria.",
    genero: "caballero",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/jerseys/sublimado/whitesox-01.avif",
  },
  {
    slug: "retro",
    nombre: "Retro",
    descripcion: "Crema con hombros verdes y detalles naranjas, aire de época.",
    genero: "caballero",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/jerseys/sublimado/orioles-01.avif",
  },
  {
    slug: "purpura",
    nombre: "Púrpura",
    descripcion: "Morado con plata, distinto sin dejar de ser clásico.",
    genero: "caballero",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/jerseys/sublimado/rookies-01.avif",
  },
  {
    slug: "tricolor",
    nombre: "Tricolor",
    descripcion: "Blanco con marino y rojo, corte tradicional.",
    genero: "caballero",
    casacaSlug: "casaca-drifit",
    foto: "/productos/jerseys/drifit/braves-01.avif",
  },
  {
    slug: "rayado",
    nombre: "Rayado",
    descripcion: "Blanco con raya fina y vivos naranjas.",
    genero: "caballero",
    casacaSlug: "casaca-drifit",
    foto: "/productos/jerseys/drifit/mets-01.avif",
  },
  {
    slug: "clasico-dama",
    nombre: "Clásico",
    destacado: true,
    descripcion: "El script azul sobre blanco, en corte entallado.",
    genero: "dama",
    casacaSlug: "casaca-dama",
    foto: "/productos/jerseys/dama/dodgers-01.avif",
  },
  {
    slug: "clasico-alterno-dama",
    nombre: "Clásico alterno",
    descripcion: "El mismo modelo en azul, en corte entallado.",
    genero: "dama",
    casacaSlug: "casaca-dama",
    foto: "/productos/jerseys/dama/dodgers-02.avif",
  },
  {
    slug: "franja-roja-dama",
    nombre: "Franja roja",
    descripcion: "Blanco con script y vivos rojos, muy usado en softbol femenil.",
    genero: "dama",
    casacaSlug: "casaca-dama",
    foto: "/productos/jerseys/dama/angels-01.avif",
  },
  {
    slug: "retro-dama",
    nombre: "Retro",
    descripcion: "Crema con script naranja y vivos negros.",
    genero: "dama",
    casacaSlug: "casaca-dama",
    foto: "/productos/jerseys/dama/giants-02.avif",
  },
  {
    slug: "carmesi-dama",
    nombre: "Carmesí",
    descripcion: "Rojo completo con vivos marinos.",
    genero: "dama",
    casacaSlug: "casaca-dama",
    foto: "/productos/jerseys/sublimado/braves-01.avif",
  },
  {
    slug: "electrico-dama",
    nombre: "Eléctrico",
    descripcion: "Azul rey con naranja, muy visible en el diamante.",
    genero: "dama",
    casacaSlug: "casaca-dama",
    foto: "/productos/jerseys/sublimado/mets-01.avif",
  },
  {
    slug: "electrico-alterno-dama",
    nombre: "Eléctrico alterno",
    descripcion: "La versión negra del mismo modelo.",
    genero: "dama",
    casacaSlug: "casaca-dama",
    foto: "/productos/jerseys/sublimado/mets-02.avif",
  },
  {
    slug: "solar-dama",
    nombre: "Solar",
    descripcion: "Naranja completo con vivos negros.",
    genero: "dama",
    casacaSlug: "casaca-dama",
    foto: "/productos/jerseys/sublimado/orioles-02.avif",
  },
];

export function getModelo(slug: string): ModeloUniforme | undefined {
  return modelos.find((m) => m.slug === slug);
}

/**
 * Etiqueta corta del tipo de casaca con la que se produce un modelo, para el
 * badge del paso 1. Sale del nombre del producto, así que si renombras una
 * casaca la etiqueta se actualiza sola.
 */
/**
 * Las tres técnicas del paso 3, en el orden en que se ofrecen: de la más
 * completa a la de entrada. El `titulo` es la etiqueta corta que se muestra en
 * el armador; el nombre largo del producto ("Casaca bordado completo") es el
 * que aparece en las líneas de la cotización, donde tiene que leerse como
 * prenda y no como acabado suelto.
 */
export const tecnicas: {
  slug: string;
  titulo: string;
  icono: "corona" | "mitades" | "pluma";
  color: "tinta" | "dorado";
  badge?: string;
}[] = [
  { slug: "casaca-bordado-completo", titulo: "Bordado completo", icono: "corona", color: "tinta" },
  {
    slug: "casaca-mixta",
    titulo: "Mixto",
    icono: "mitades",
    color: "dorado",
    badge: "El más pedido",
  },
  { slug: "casaca-dtf", titulo: "DTF textil completo", icono: "pluma", color: "tinta" },
];

/** Etiqueta corta de una técnica, o null si el slug ya no existe. */
export function tituloTecnica(slug: string): string | null {
  return tecnicas.find((t) => t.slug === slug)?.titulo ?? null;
}

/**
 * El color con el que se pinta cada círculo del armador, por id de valor. Las
 * calcetas usan el plural ("negras") y el resto el singular ("negro"), así que
 * el mapa cubre las dos formas.
 */
export const muestrasDeColor: Record<string, string> = {
  negro: "#1a1a1a",
  negras: "#1a1a1a",
  blanco: "#ffffff",
  blancas: "#ffffff",
  gris: "#9ca3af",
  azul: "#1e3a8a",
  azules: "#1e3a8a",
  rojo: "#c8102e",
  rojas: "#c8102e",
  verde: "#15803d",
  verdes: "#15803d",
};

/**
 * A qué pieza del armador pertenece cada producto. El color se guarda por pieza
 * y no por producto: así, si el cliente cambia de gorra de algodón a dry-fit o
 * el pantalón pasa a corte dama, el color elegido se conserva.
 */
const piezaPorProducto: Record<string, PiezaConColor> = {
  "gorra-bordada-6-paneles": "gorra",
  "gorra-drifit": "gorra",
  "pantalon-clasico": "pantalon",
  "pantalon-dama": "pantalon",
  "calcetas-sublimadas": "calcetas",
  "cinturon-beisbol": "cinturon",
};

export function piezaConColor(slug: string): PiezaConColor | undefined {
  return piezaPorProducto[slug];
}

/** Los colores que ofrece un producto, o vacío si no tiene opción de color. */
export function coloresDe(slug: string): OpcionValor[] {
  return getProducto(slug)?.opciones.find((o) => o.id === "color")?.valores ?? [];
}

/**
 * Una tarjeta de "Prenda por prenda". Puede ser un producto suelto —pantalón,
 * gorra, calcetas, cinturón— o un modelo de casaca. En el segundo caso la
 * tarjeta muestra el diseño (foto y nombre del modelo) pero cotiza y abre el
 * producto de casaca con el que se produce.
 */
export type EntradaCatalogo = {
  id: string;
  filtro: FiltroCatalogo;
  nombre: string;
  foto?: string;
  producto: Producto;
  modelo?: ModeloUniforme;
  /** El color concreto, cuando la tarjeta es una variante de color. */
  variante?: OpcionValor;
  /**
   * Si lleva la insignia de Popular. Va en la entrada y no se lee del
   * producto porque una prenda con tres colores son tres tarjetas: la
   * insignia se pone en la primera y no tres veces seguidas.
   */
  destacado?: boolean;
};

/**
 * Las tarjetas del catálogo, en el orden en que se muestran.
 *
 * Los productos de casaca no entran por su cuenta: en su lugar van los modelos,
 * que es lo que el cliente reconoce. Los tres acabados del armador tampoco,
 * porque son solo para ponerle precio al paquete.
 */
export function entradasDelCatalogo(): EntradaCatalogo[] {
  const deModelos: EntradaCatalogo[] = [];
  for (const modelo of modelos) {
    const producto = getProducto(modelo.casacaSlug);
    if (!producto) continue;
    deModelos.push({
      id: modelo.slug,
      filtro: modelo.genero,
      nombre: modelo.nombre,
      foto: modelo.foto,
      producto,
      modelo,
      destacado: modelo.destacado,
    });
  }

  const deProductos: EntradaCatalogo[] = [];
  for (const producto of productos) {
    if (producto.soloEnArmador || producto.categoria === "casacas") continue;
    const filtro = producto.categoria as FiltroCatalogo;

    /*
      Un color es una tarjeta propia solo si tiene su propia foto. Sin ese
      filtro, el cinturón blanco —que todavía no tiene foto— saldría con la
      imagen del negro y la tarjeta mentiría. Las gorras caen solas en el caso
      de abajo: tienen colores, pero una sola foto.
    */
    const conFoto = coloresDe(producto.slug).filter((v) => v.foto);
    if (conFoto.length > 0) {
      conFoto.forEach((variante, i) => {
        deProductos.push({
          id: `${producto.slug}-${variante.id}`,
          filtro,
          nombre: producto.nombre,
          foto: variante.foto,
          producto,
          variante,
          destacado: producto.destacado && i === 0,
        });
      });
      continue;
    }

    deProductos.push({
      id: producto.slug,
      filtro,
      nombre: producto.nombre,
      foto: producto.foto,
      producto,
      destacado: producto.destacado,
    });
  }

  return [...deModelos, ...deProductos];
}

/**
 * La muestra que se ve sin abrir el catálogo completo.
 *
 * Va tomando una entrada de cada filtro por turnos hasta llenar el tope. Si
 * simplemente se cortaran las primeras 12, las 17 casacas se comerían la
 * cuadrícula y parecería que no se venden pantalones ni gorras.
 */
export function muestraDelCatalogo(entradas: EntradaCatalogo[], tope: number): EntradaCatalogo[] {
  const porFiltro = categorias.map((c) => entradas.filter((e) => e.filtro === c.id));
  const elegidas = new Set<EntradaCatalogo>();

  for (let vuelta = 0; elegidas.size < tope; vuelta++) {
    if (!porFiltro.some((grupo) => grupo[vuelta])) break;
    for (const grupo of porFiltro) {
      if (grupo[vuelta] && elegidas.size < tope) elegidas.add(grupo[vuelta]);
    }
  }

  // Se devuelven en el orden original para que la cuadrícula quede agrupada.
  return entradas.filter((e) => elegidas.has(e));
}

/** Nombre legible del modelo, listo para el mensaje de WhatsApp. */
export function nombreModelo(slug: string): string | null {
  const modelo = getModelo(slug);
  if (!modelo) return null;
  return `${modelo.nombre} (${modelo.genero === "dama" ? "dama" : "caballero"})`;
}

// --- Paquetes armados ------------------------------------------------------

export const paquetes: Paquete[] = [
  {
    slug: "basico",
    nombre: "Paquete Básico",
    icono: "pelota",
    color: "tinta",
    descripcion: "Lo mínimo para salir al diamante con imagen de equipo: casaca y gorra a juego.",
    items: [
      { productoSlug: "casaca-mixta", porJugador: 1, segun: "tecnica" },
      { productoSlug: "gorra-bordada-6-paneles", porJugador: 1, segun: "gorra" },
    ],
  },
  {
    slug: "estrella",
    nombre: "Paquete Estrella",
    icono: "estrella",
    color: "dorado",
    descripcion: "El uniforme de juego completo: casaca, pantalón a juego y gorra.",
    badge: "El más pedido",
    destacado: true,
    items: [
      { productoSlug: "casaca-mixta", porJugador: 1, segun: "tecnica" },
      { productoSlug: "pantalon-clasico", porJugador: 1, segun: "pantalon" },
      { productoSlug: "gorra-bordada-6-paneles", porJugador: 1, segun: "gorra" },
    ],
  },
  {
    slug: "diamante",
    nombre: "Paquete Diamante",
    icono: "diamante",
    color: "tinta",
    descripcion:
      "El uniforme completo más los accesorios que amarran el look: calcetas y cinturón a juego.",
    items: [
      { productoSlug: "casaca-mixta", porJugador: 1, segun: "tecnica" },
      { productoSlug: "pantalon-clasico", porJugador: 1, segun: "pantalon" },
      { productoSlug: "gorra-bordada-6-paneles", porJugador: 1, segun: "gorra" },
      { productoSlug: "calcetas-sublimadas", porJugador: 1 },
      { productoSlug: "cinturon-beisbol", porJugador: 1 },
    ],
  },
];

// --- Índices ---------------------------------------------------------------

export const productosPorSlug = new Map(productos.map((p) => [p.slug, p]));

export function getProducto(slug: string): Producto | undefined {
  return productosPorSlug.get(slug);
}
