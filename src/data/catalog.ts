import type {
  Categoria,
  GeneroModelo,
  Lamina,
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
    id: "casacas",
    nombre: "Casacas",
    descripcion:
      "Los 87 diseños del catálogo. Cualquiera se hace en corte caballero o dama, y con el acabado que elijas.",
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
  ayuda:
    "Las tallas exactas de cada jugador las tomamos al confirmar el pedido.",
  valores: [
    { id: "adulto", label: "Adulto" },
    { id: "juvenil", label: "Juvenil" },
  ],
};

/**
 * El nombre y el número del jugador van en DTF textil en las tres casacas del
 * armador. Bordarlos cuesta 100 pesos más por pieza, y eso es lo que hace el
 * `extra`: el motor de precios lo suma solo, así que el recargo aparece en la
 * tarjeta del paquete, en el resumen y en la cotización sin tener que repetirlo
 * en ningún lado.
 */
const marcado: Opcion = {
  id: "marcado",
  label: "Nombre y número",
  ayuda: "El del jugador, en la espalda. Bordarlos cuesta $100 más por casaca.",
  valores: [
    { id: "dtf", label: "En DTF textil" },
    { id: "bordado", label: "Bordados", extra: 100 },
  ],
};

/**
 * OJO: este link es de ejemplo y apunta a una búsqueda de Mercado Libre, no a
 * tu publicación. Sustitúyelo por la URL exacta del anuncio (la que sale al
 * abrir tu publicación), o borra la línea `mercadoLibre` del producto para que
 * el botón no aparezca.
 *
 * Lo llevan las cuatro casacas del catálogo, que son las que se venden por
 * pieza. Las tres del armador no: ahí se cotiza el equipo completo.
 */
const ML_EJEMPLO_CASACA =
  "https://listado.mercadolibre.com.mx/jersey-beisbol-personalizado";

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
    incluye: [
      "Nombre y número",
      "Logo del equipo y patrocinadores",
      "Colores libres",
    ],
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
    incluye: [
      "Twill en pecho y espalda",
      "Botonado completo",
      "Acabado con relieve",
    ],
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
    slug: "casaca-catalogo",
    soloEnArmador: true,
    nombre: "Casaca de catálogo",
    categoria: "casacas",
    precio: 350,
    color: "#1a1a1a",
    colorSecundario: "#c9a227",
    descripcion:
      "El diseño del catálogo tal como viene, sin el logo ni el nombre de tu equipo encima.",
    incluye: ["Diseño del catálogo sin modificar"],
    opciones: [marcado],
  },
  {
    slug: "casaca-logo-dtf",
    soloEnArmador: true,
    nombre: "Casaca personalizada, logo en DTF",
    categoria: "casacas",
    precio: 370,
    color: "#1a1a1a",
    colorSecundario: "#c9a227",
    descripcion:
      "Sobre el diseño del catálogo te ponemos el logo y el nombre de tu equipo en DTF textil.",
    incluye: ["Logo y nombre del equipo en DTF textil"],
    opciones: [marcado],
  },
  {
    slug: "casaca-logo-bordado",
    soloEnArmador: true,
    nombre: "Casaca personalizada, logo bordado",
    categoria: "casacas",
    precio: 450,
    color: "#1a1a1a",
    colorSecundario: "#c9a227",
    descripcion:
      "El logo y el nombre de tu equipo bordados sobre el diseño del catálogo. Es lo que mejor se ve de cerca y lo que más dura.",
    incluye: ["Logo y nombre del equipo bordados"],
    opciones: [marcado],
  },
  /*
    No es una prenda: es el renglón con el que el descuento del paquete completo
    llega a la cotización. Sin él, la tarjeta prometería $900 y el total diría
    $1,000. `esAjuste` lo saca del conteo de piezas y del catálogo.
  */
  {
    slug: "descuento-paquete-completo",
    soloEnArmador: true,
    esAjuste: true,
    nombre: "Descuento por paquete completo",
    categoria: "accesorios",
    precio: -100,
    color: "#1a1a1a",
    colorSecundario: "#c9a227",
    descripcion: "Se aplica al llevar casaca, pantalón y gorra juntos.",
    incluye: [],
    opciones: [],
  },
  {
    slug: "pantalon-clasico",
    nombre: "Pantalón corte caballero",
    categoria: "pantalones",
    precio: 400,
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
          {
            id: "negro",
            label: "Negro",
            foto: "/productos/pantalones/negro.jpg",
          },
          {
            id: "blanco",
            label: "Blanco",
            foto: "/productos/pantalones/blanco.jpg",
          },
          { id: "gris", label: "Gris", foto: "/productos/pantalones/gris.jpg" },
        ],
      },
      // Sin "Dama" a propósito: el corte de mujer es su propio producto.
      {
        id: "corte",
        label: "Corte",
        ayuda:
          "Las tallas exactas de cada jugador las tomamos al confirmar el pedido.",
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
    precio: 400,
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
          {
            id: "blanco",
            label: "Blanco",
            foto: "/productos/pantalones/mujer/blanco.jpg",
          },
          {
            id: "negro",
            label: "Negro",
            foto: "/productos/pantalones/mujer/negro.jpg",
          },
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
    precio: 250,
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
    precio: 250,
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
    descripcion:
      "Calcetas altas con puño de compresión, en el color exacto del uniforme.",
    incluye: ["Puño de compresión", "Color a juego"],
    opciones: [
      {
        id: "color",
        label: "Color",
        valores: [
          {
            id: "negras",
            label: "Negro",
            foto: "/productos/calcetas/negras.jpg",
          },
          {
            id: "blancas",
            label: "Blanco",
            foto: "/productos/calcetas/blancas.jpg",
          },
          { id: "rojas", label: "Rojo", foto: "/productos/calcetas/rojas.jpg" },
          {
            id: "azules",
            label: "Azul",
            foto: "/productos/calcetas/azules.jpg",
          },
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
    descripcion:
      "Cinturón elástico con hebilla metálica, en el color exacto del uniforme.",
    incluye: ["Hebilla metálica", "Color a juego"],
    opciones: [
      {
        id: "color",
        label: "Color",
        valores: [
          {
            id: "negro",
            label: "Negro",
            foto: "/productos/cinturon/negro.jpg",
          },
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
 * Los 87 diseños salen de las nueve láminas del catálogo impreso
 * impreso (public/productos/catalogo/). Cada uno se identifica por su código
 * —JH-001 a JH-098— y no por el equipo en el que se inspira: el código es lo
 * que el cliente cita al pedir y lo que el taller busca, y de paso el sitio no
 * anda vendiendo marcas ajenas.
 *
 * No llevan corte: por ahora los mismos diseños se hacen en caballero y en
 * dama, así que el corte se elige aparte (vive en el almacén, no en el modelo)
 * y de él sale el corte del pantalón del paquete. Si algún día hay diseños
 * exclusivos de un corte, aquí vuelve el campo y el paso 2 vuelve a filtrar.
 *
 * La numeración tiene huecos reales: no existen el JH-019 ni del JH-060 al
 * JH-069. No los inventes para "rellenar".
 *
 * Las fotos se recortaron de esas láminas. En las hojas 4 y 5 —JH-030 a
 * JH-049— la pastilla del código viene impresa sobre el jersey, así que esas
 * veinte se ven con el código encima; no es un error del recorte.
 */
export const modelos: ModeloUniforme[] = [
  /*
    Las bases lisas de la casaca personalizada. Van sin foto a propósito: no son
    prendas del catálogo sino el color de partida sobre el que se coloca el logo
    del equipo, así que las dibuja `ModeloArte` con estos tres tonos. Si algún
    día hay fotos reales de las bases, se les agrega `foto` y nada más.
  */
  {
    slug: "base-negro",
    nombre: "Negro",
    base: true,
    casacaSlug: "casaca-sublimada",
    colores: ["#1a1a1a", "#111111", "#f8fafc"],
  },
  {
    slug: "base-blanco",
    nombre: "Blanco",
    base: true,
    casacaSlug: "casaca-sublimada",
    colores: ["#ffffff", "#e8e8e8", "#1a1a1a"],
  },
  {
    slug: "base-gris",
    nombre: "Gris",
    base: true,
    casacaSlug: "casaca-sublimada",
    colores: ["#9ca3af", "#7c838d", "#1a1a1a"],
  },
  {
    slug: "base-azul-marino",
    nombre: "Azul marino",
    base: true,
    casacaSlug: "casaca-sublimada",
    colores: ["#1e3a8a", "#162c68", "#f8fafc"],
  },
  {
    slug: "base-rojo",
    nombre: "Rojo",
    base: true,
    casacaSlug: "casaca-sublimada",
    colores: ["#c8102e", "#9c0c24", "#f8fafc"],
  },

  {
    slug: "jh-001",
    nombre: "JH-001",
    color: "Blanco",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-001.webp",
  },
  {
    slug: "jh-002",
    nombre: "JH-002",
    color: "Blanco / Azul",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-002.webp",
  },
  {
    slug: "jh-003",
    nombre: "JH-003",
    color: "Blanco rayado / Azul",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-003.webp",
  },
  {
    slug: "jh-004",
    nombre: "JH-004",
    color: "Blanco rayado / Azul marino",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-004.webp",
  },
  {
    slug: "jh-005",
    nombre: "JH-005",
    color: "Blanco / Azul marino",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-005.webp",
  },
  {
    slug: "jh-006",
    nombre: "JH-006",
    color: "Blanco / Azul",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-006.webp",
  },
  {
    slug: "jh-007",
    nombre: "JH-007",
    color: "Blanco rayado / Dorado",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-007.webp",
  },
  {
    slug: "jh-008",
    nombre: "JH-008",
    color: "Blanco / Rojo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-008.webp",
  },
  {
    slug: "jh-009",
    nombre: "JH-009",
    color: "Blanco / Tricolor",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-009.webp",
  },
  {
    slug: "jh-010",
    nombre: "JH-010",
    color: "Blanco / Negro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-010.webp",
  },
  {
    slug: "jh-011",
    nombre: "JH-011",
    color: "Blanco / Azul marino",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-011.webp",
  },
  {
    slug: "jh-012",
    nombre: "JH-012",
    color: "Blanco / Azul",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-012.webp",
  },
  {
    slug: "jh-013",
    nombre: "JH-013",
    color: "Blanco rayado / Rojo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-013.webp",
  },
  {
    slug: "jh-014",
    nombre: "JH-014",
    color: "Blanco / Verde",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-014.webp",
  },
  {
    slug: "jh-015",
    nombre: "JH-015",
    color: "Blanco / Azul marino",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-015.webp",
  },
  {
    slug: "jh-016",
    nombre: "JH-016",
    color: "Blanco / Azul",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-016.webp",
  },
  {
    slug: "jh-017",
    nombre: "JH-017",
    color: "Blanco rayado / Negro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-017.webp",
  },
  {
    slug: "jh-018",
    nombre: "JH-018",
    color: "Blanco / Rojo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-018.webp",
  },
  {
    slug: "jh-020",
    nombre: "JH-020",
    color: "Negro / Verde",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-020.webp",
  },
  {
    slug: "jh-021",
    nombre: "JH-021",
    color: "Negro / Tricolor",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-021.webp",
  },
  {
    slug: "jh-022",
    nombre: "JH-022",
    color: "Negro / Blanco",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-022.webp",
  },
  {
    slug: "jh-023",
    nombre: "JH-023",
    color: "Negro / Rojo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-023.webp",
  },
  {
    slug: "jh-024",
    nombre: "JH-024",
    color: "Negro / Rojo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-024.webp",
  },
  {
    slug: "jh-025",
    nombre: "JH-025",
    color: "Negro / Blanco",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-025.webp",
  },
  {
    slug: "jh-026",
    nombre: "JH-026",
    color: "Negro / Blanco",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-026.webp",
  },
  {
    slug: "jh-027",
    nombre: "JH-027",
    color: "Negro / Dorado",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-027.webp",
  },
  {
    slug: "jh-028",
    nombre: "JH-028",
    color: "Negro / Blanco",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-028.webp",
  },
  {
    slug: "jh-029",
    nombre: "JH-029",
    color: "Negro / Amarillo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-029.webp",
  },
  {
    slug: "jh-030",
    nombre: "JH-030",
    color: "Negro / Rojo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-030.webp",
  },
  {
    slug: "jh-031",
    nombre: "JH-031",
    color: "Negro / Rojo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-031.webp",
  },
  {
    slug: "jh-032",
    nombre: "JH-032",
    color: "Negro / Naranja",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-032.webp",
  },
  {
    slug: "jh-033",
    nombre: "JH-033",
    color: "Negro / Blanco",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-033.webp",
  },
  {
    slug: "jh-034",
    nombre: "JH-034",
    color: "Negro / Blanco",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-034.webp",
  },
  {
    slug: "jh-035",
    nombre: "JH-035",
    color: "Negro / Rojo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-035.webp",
  },
  {
    slug: "jh-036",
    nombre: "JH-036",
    color: "Negro / Rojo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-036.webp",
  },
  {
    slug: "jh-037",
    nombre: "JH-037",
    color: "Negro / Blanco",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-037.webp",
  },
  {
    slug: "jh-038",
    nombre: "JH-038",
    color: "Negro / Azul",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-038.webp",
  },
  {
    slug: "jh-039",
    nombre: "JH-039",
    color: "Negro / Amarillo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-039.webp",
  },
  {
    slug: "jh-040",
    nombre: "JH-040",
    color: "Negro / Beis",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-040.webp",
  },
  {
    slug: "jh-041",
    nombre: "JH-041",
    color: "Rojo / Verde",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-041.webp",
  },
  {
    slug: "jh-042",
    nombre: "JH-042",
    color: "Rojo / Negro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-042.webp",
  },
  {
    slug: "jh-043",
    nombre: "JH-043",
    color: "Rojo / Blanco",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-043.webp",
  },
  {
    slug: "jh-044",
    nombre: "JH-044",
    color: "Rojo / Azul marino",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-044.webp",
  },
  {
    slug: "jh-045",
    nombre: "JH-045",
    color: "Rojo / Negro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-045.webp",
  },
  {
    slug: "jh-046",
    nombre: "JH-046",
    color: "Rojo / Negro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-046.webp",
  },
  {
    slug: "jh-047",
    nombre: "JH-047",
    color: "Rojo / Blanco",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-047.webp",
  },
  {
    slug: "jh-048",
    nombre: "JH-048",
    color: "Rojo / Verde",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-048.webp",
  },
  {
    slug: "jh-049",
    nombre: "JH-049",
    color: "Rojo / Blanco",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-049.webp",
  },
  {
    slug: "jh-050",
    nombre: "JH-050",
    color: "Rojo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-050.webp",
  },
  {
    slug: "jh-051",
    nombre: "JH-051",
    color: "Rojo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-051.webp",
  },
  {
    slug: "jh-052",
    nombre: "JH-052",
    color: "Azul marino",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-052.webp",
  },
  {
    slug: "jh-053",
    nombre: "JH-053",
    color: "Azul marino",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-053.webp",
  },
  {
    slug: "jh-054",
    nombre: "JH-054",
    color: "Azul marino",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-054.webp",
  },
  {
    slug: "jh-055",
    nombre: "JH-055",
    color: "Azul marino / Naranja",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-055.webp",
  },
  {
    slug: "jh-056",
    nombre: "JH-056",
    color: "Azul marino",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-056.webp",
  },
  {
    slug: "jh-057",
    nombre: "JH-057",
    color: "Azul marino / Blanco",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-057.webp",
  },
  {
    slug: "jh-058",
    nombre: "JH-058",
    color: "Azul marino",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-058.webp",
  },
  {
    slug: "jh-059",
    nombre: "JH-059",
    color: "Azul marino",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-059.webp",
  },
  {
    slug: "jh-070",
    nombre: "JH-070",
    color: "Verde / Rojo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-070.webp",
  },
  {
    slug: "jh-071",
    nombre: "JH-071",
    color: "Verde",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-071.webp",
  },
  {
    slug: "jh-072",
    nombre: "JH-072",
    color: "Crema / Verde",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-072.webp",
  },
  {
    slug: "jh-073",
    nombre: "JH-073",
    color: "Dorado / Verde",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-073.webp",
  },
  {
    slug: "jh-074",
    nombre: "JH-074",
    color: "Crema / Negro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-074.webp",
  },
  {
    slug: "jh-075",
    nombre: "JH-075",
    color: "Dorado / Negro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-075.webp",
  },
  {
    slug: "jh-076",
    nombre: "JH-076",
    color: "Crema / Negro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-076.webp",
  },
  {
    slug: "jh-077",
    nombre: "JH-077",
    color: "Crema / Rojo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-077.webp",
  },
  {
    slug: "jh-078",
    nombre: "JH-078",
    color: "Rojo / Dorado",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-078.webp",
  },
  {
    slug: "jh-079",
    nombre: "JH-079",
    color: "Verde / Amarillo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-079.webp",
  },
  {
    slug: "jh-080",
    nombre: "JH-080",
    color: "Rojo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-080.webp",
  },
  {
    slug: "jh-081",
    nombre: "JH-081",
    color: "Naranja",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-081.webp",
  },
  {
    slug: "jh-082",
    nombre: "JH-082",
    color: "Naranja / Azul marino",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-082.webp",
  },
  {
    slug: "jh-083",
    nombre: "JH-083",
    color: "Naranja",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-083.webp",
  },
  {
    slug: "jh-084",
    nombre: "JH-084",
    color: "Vino",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-084.webp",
  },
  {
    slug: "jh-085",
    nombre: "JH-085",
    color: "Vino / Amarillo",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-085.webp",
  },
  {
    slug: "jh-086",
    nombre: "JH-086",
    color: "Rosa",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-086.webp",
  },
  {
    slug: "jh-087",
    nombre: "JH-087",
    color: "Gris",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-087.webp",
  },
  {
    slug: "jh-088",
    nombre: "JH-088",
    color: "Rosa",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-088.webp",
  },
  {
    slug: "jh-089",
    nombre: "JH-089",
    color: "Azul claro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-089.webp",
  },
  {
    slug: "jh-090",
    nombre: "JH-090",
    color: "Azul claro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-090.webp",
  },
  {
    slug: "jh-091",
    nombre: "JH-091",
    color: "Azul claro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-091.webp",
  },
  {
    slug: "jh-092",
    nombre: "JH-092",
    color: "Gris oscuro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-092.webp",
  },
  {
    slug: "jh-093",
    nombre: "JH-093",
    color: "Gris oscuro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-093.webp",
  },
  {
    slug: "jh-094",
    nombre: "JH-094",
    color: "Gris rayado",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-094.webp",
  },
  {
    slug: "jh-095",
    nombre: "JH-095",
    color: "Beige / Negro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-095.webp",
  },
  {
    slug: "jh-096",
    nombre: "JH-096",
    color: "Negro",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-096.webp",
  },
  {
    slug: "jh-097",
    nombre: "JH-097",
    color: "Crema",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-097.webp",
  },
  {
    slug: "jh-098",
    nombre: "JH-098",
    color: "Azul marino",
    casacaSlug: "casaca-sublimada",
    foto: "/productos/modelos/JH-098.webp",
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
/**
 * Las tres casacas entre las que se elige en el armador, de la más económica a
 * la que más trabajo lleva. La diferencia es qué tanto se personaliza: el
 * diseño del catálogo tal cual, con el logo del equipo en DTF, o con el logo
 * bordado. El nombre y el número del jugador van en las tres (ver `marcado`).
 */
export const tecnicas: {
  slug: string;
  titulo: string;
  icono: "corona" | "mitades" | "pluma";
  color: "tinta" | "dorado";
  badge?: string;
}[] = [
  {
    slug: "casaca-catalogo",
    titulo: "De catálogo",
    icono: "pluma",
    color: "tinta",
  },
  {
    slug: "casaca-logo-dtf",
    titulo: "Logo en DTF",
    icono: "mitades",
    color: "dorado",
    badge: "El más pedido",
  },
  {
    slug: "casaca-logo-bordado",
    titulo: "Logo bordado",
    icono: "corona",
    color: "tinta",
  },
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
  return (
    getProducto(slug)?.opciones.find((o) => o.id === "color")?.valores ?? []
  );
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
   * Lo que va bajo el nombre en la tarjeta. En los modelos son sus colores
   * ("Negro / Rojo"): el nombre es el código y por sí solo no dice nada.
   */
  detalle?: string;
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
      filtro: "casacas",
      nombre: modelo.nombre,
      detalle: modelo.color,
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
export function muestraDelCatalogo(
  entradas: EntradaCatalogo[],
  tope: number,
): EntradaCatalogo[] {
  const porFiltro = categorias.map((c) =>
    entradas.filter((e) => e.filtro === c.id),
  );
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

/** Las bases lisas de la casaca personalizada. */
export const basesLisas = modelos.filter((m) => m.base);

/** Los 87 diseños del catálogo impreso, sin las bases lisas. */
export const disenosDeCatalogo = modelos.filter((m) => !m.base);

/**
 * Nombre legible del modelo, listo para el mensaje de WhatsApp: el código y
 * sus colores. El corte no sale de aquí —el diseño es el mismo en los dos— y
 * lo pone quien llama, que es el que sabe cuál eligió el cliente.
 */
export function nombreModelo(
  slug: string,
  corte?: GeneroModelo,
): string | null {
  const modelo = getModelo(slug);
  if (!modelo) return null;
  const partes = [modelo.nombre];
  if (modelo.color) partes.push(modelo.color);
  if (corte) partes.push(corte === "dama" ? "corte dama" : "corte caballero");
  return partes.join(" · ");
}

// --- Láminas del catálogo impreso -------------------------------------------

/**
 * Las nueve hojas tal como llegaron, con las coordenadas de cada casaca dentro
 * de cada una. Es lo que permite mostrar la lámina entera —sin cortarla— y aun
 * así dejar que el cliente señale una prenda concreta.
 *
 * El orden de las zonas es el de lectura: de izquierda a derecha y de arriba
 * abajo, que es como van los códigos en la hoja.
 */
export const laminas: Lamina[] = [
  {
    numero: 1,
    foto: "/productos/laminas/lamina-1.webp",
    zonas: [
      { slug: "jh-001", x: 0.6, y: 0.9, w: 18.8, h: 47.9 },
      { slug: "jh-002", x: 20.6, y: 0.9, w: 18.8, h: 47.9 },
      { slug: "jh-003", x: 40.6, y: 0.9, w: 18.9, h: 47.9 },
      { slug: "jh-004", x: 60.6, y: 0.9, w: 18.8, h: 47.9 },
      { slug: "jh-005", x: 80.6, y: 0.9, w: 18.8, h: 47.9 },
      { slug: "jh-006", x: 0.6, y: 50.6, w: 18.8, h: 48.5 },
      { slug: "jh-007", x: 20.6, y: 50.6, w: 18.8, h: 48.5 },
      { slug: "jh-008", x: 40.6, y: 50.6, w: 18.9, h: 48.5 },
      { slug: "jh-009", x: 60.6, y: 50.6, w: 18.8, h: 48.5 },
      { slug: "jh-010", x: 80.6, y: 50.6, w: 18.8, h: 48.5 },
    ],
  },
  {
    numero: 2,
    foto: "/productos/laminas/lamina-2.webp",
    zonas: [
      { slug: "jh-011", x: 0.6, y: 0.9, w: 18.8, h: 47.1 },
      { slug: "jh-012", x: 20.6, y: 0.9, w: 18.8, h: 47.1 },
      { slug: "jh-013", x: 40.6, y: 0.9, w: 18.9, h: 47.1 },
      { slug: "jh-014", x: 60.6, y: 0.9, w: 18.8, h: 47.1 },
      { slug: "jh-015", x: 80.6, y: 0.9, w: 18.8, h: 47.1 },
      { slug: "jh-016", x: 6.4, y: 49.7, w: 23.2, h: 49.4 },
      { slug: "jh-017", x: 38, y: 49.7, w: 23.8, h: 49.4 },
      { slug: "jh-018", x: 70.5, y: 49.7, w: 23.4, h: 49.4 },
    ],
  },
  {
    numero: 3,
    foto: "/productos/laminas/lamina-3.webp",
    zonas: [
      { slug: "jh-020", x: 0.6, y: 0.9, w: 18.8, h: 48.1 },
      { slug: "jh-021", x: 20.6, y: 0.9, w: 18.8, h: 48.1 },
      { slug: "jh-022", x: 40.6, y: 0.9, w: 18.9, h: 48.1 },
      { slug: "jh-023", x: 60.6, y: 0.9, w: 18.8, h: 48.1 },
      { slug: "jh-024", x: 80.6, y: 0.9, w: 18.8, h: 48.1 },
      { slug: "jh-025", x: 0.6, y: 50.8, w: 18.8, h: 48.3 },
      { slug: "jh-026", x: 20.6, y: 50.8, w: 18.8, h: 48.3 },
      { slug: "jh-027", x: 40.6, y: 50.8, w: 18.9, h: 48.3 },
      { slug: "jh-028", x: 60.6, y: 50.8, w: 18.8, h: 48.3 },
      { slug: "jh-029", x: 80.6, y: 50.8, w: 18.8, h: 48.3 },
    ],
  },
  {
    numero: 4,
    foto: "/productos/laminas/lamina-4.webp",
    zonas: [
      { slug: "jh-030", x: 0.6, y: 0.9, w: 18.8, h: 46.6 },
      { slug: "jh-031", x: 20.6, y: 0.9, w: 18.8, h: 46.6 },
      { slug: "jh-032", x: 40.6, y: 0.9, w: 18.9, h: 46.6 },
      { slug: "jh-033", x: 60.6, y: 0.9, w: 18.8, h: 46.6 },
      { slug: "jh-034", x: 80.6, y: 0.9, w: 18.8, h: 46.6 },
      { slug: "jh-035", x: 0.6, y: 49.2, w: 18.8, h: 49.9 },
      { slug: "jh-036", x: 20.6, y: 49.2, w: 18.8, h: 49.9 },
      { slug: "jh-037", x: 40.6, y: 49.2, w: 18.9, h: 49.9 },
      { slug: "jh-038", x: 60.6, y: 49.2, w: 18.8, h: 49.9 },
      { slug: "jh-039", x: 80.6, y: 49.2, w: 18.8, h: 49.9 },
    ],
  },
  {
    numero: 5,
    foto: "/productos/laminas/lamina-5.webp",
    zonas: [
      { slug: "jh-040", x: 0.4, y: 0.9, w: 21.1, h: 46.8 },
      { slug: "jh-041", x: 21.8, y: 0.9, w: 19.7, h: 46.8 },
      { slug: "jh-042", x: 41.6, y: 0.9, w: 19.1, h: 46.8 },
      { slug: "jh-043", x: 60.9, y: 0.9, w: 18.8, h: 46.8 },
      { slug: "jh-044", x: 80, y: 0.9, w: 19.8, h: 46.8 },
      { slug: "jh-045", x: 0.6, y: 49.4, w: 18.8, h: 49.7 },
      { slug: "jh-046", x: 20.6, y: 49.4, w: 18.8, h: 49.7 },
      { slug: "jh-047", x: 40.6, y: 49.4, w: 18.9, h: 49.7 },
      { slug: "jh-048", x: 60.6, y: 49.4, w: 18.8, h: 49.7 },
      { slug: "jh-049", x: 80.6, y: 49.4, w: 18.8, h: 49.7 },
    ],
  },
  {
    numero: 6,
    foto: "/productos/laminas/lamina-6.webp",
    zonas: [
      { slug: "jh-050", x: 0.5, y: 0.9, w: 20.1, h: 45.2 },
      { slug: "jh-051", x: 21.3, y: 0.9, w: 19.5, h: 45.2 },
      { slug: "jh-052", x: 41, y: 0.9, w: 19.3, h: 45.2 },
      { slug: "jh-053", x: 60.3, y: 0.9, w: 19.6, h: 45.2 },
      { slug: "jh-054", x: 80, y: 0.9, w: 19.6, h: 45.2 },
      { slug: "jh-055", x: 0.6, y: 47.9, w: 18.8, h: 51.3 },
      { slug: "jh-056", x: 20.6, y: 47.9, w: 18.8, h: 51.3 },
      { slug: "jh-057", x: 40.6, y: 47.9, w: 18.9, h: 51.3 },
      { slug: "jh-058", x: 60.6, y: 47.9, w: 18.8, h: 51.3 },
      { slug: "jh-059", x: 80.6, y: 47.9, w: 18.8, h: 51.3 },
    ],
  },
  {
    numero: 7,
    foto: "/productos/laminas/lamina-7.webp",
    zonas: [
      { slug: "jh-070", x: 0.4, y: 0.9, w: 19.5, h: 45.7 },
      { slug: "jh-071", x: 20.6, y: 0.9, w: 19.7, h: 45.7 },
      { slug: "jh-072", x: 40.5, y: 0.9, w: 19.7, h: 45.7 },
      { slug: "jh-073", x: 60.2, y: 0.9, w: 19.9, h: 45.7 },
      { slug: "jh-074", x: 80.3, y: 0.9, w: 19.5, h: 45.7 },
      { slug: "jh-075", x: 0.6, y: 48.3, w: 18.8, h: 50.8 },
      { slug: "jh-076", x: 20.6, y: 48.3, w: 18.8, h: 50.8 },
      { slug: "jh-077", x: 40.6, y: 48.3, w: 18.9, h: 50.8 },
      { slug: "jh-078", x: 60.6, y: 48.3, w: 18.8, h: 50.8 },
      { slug: "jh-079", x: 80.6, y: 48.3, w: 18.8, h: 50.8 },
    ],
  },
  {
    numero: 8,
    foto: "/productos/laminas/lamina-8.webp",
    zonas: [
      { slug: "jh-080", x: 0.5, y: 0.9, w: 19.9, h: 46 },
      { slug: "jh-081", x: 20.8, y: 0.9, w: 19.6, h: 46 },
      { slug: "jh-082", x: 40.6, y: 0.9, w: 19.1, h: 46 },
      { slug: "jh-083", x: 60.2, y: 0.9, w: 19.4, h: 46 },
      { slug: "jh-084", x: 80.4, y: 0.9, w: 19, h: 46 },
      { slug: "jh-085", x: 0.5, y: 48.6, w: 19.8, h: 50.5 },
      { slug: "jh-086", x: 20.9, y: 48.6, w: 19.3, h: 50.5 },
      { slug: "jh-087", x: 40.6, y: 48.6, w: 19.1, h: 50.5 },
      { slug: "jh-088", x: 60.2, y: 48.6, w: 19.3, h: 50.5 },
      { slug: "jh-089", x: 80.1, y: 48.6, w: 19.4, h: 50.5 },
    ],
  },
  {
    numero: 9,
    foto: "/productos/laminas/lamina-9.webp",
    zonas: [
      { slug: "jh-090", x: 0.6, y: 0.9, w: 19.7, h: 45.9 },
      { slug: "jh-091", x: 20.6, y: 0.9, w: 19.7, h: 45.9 },
      { slug: "jh-092", x: 40.4, y: 0.9, w: 19.5, h: 45.9 },
      { slug: "jh-093", x: 60.1, y: 0.9, w: 19.5, h: 45.9 },
      { slug: "jh-094", x: 79.8, y: 0.9, w: 19.5, h: 45.9 },
      { slug: "jh-095", x: 0.6, y: 48.5, w: 19.6, h: 50.6 },
      { slug: "jh-096", x: 20.6, y: 48.5, w: 19.6, h: 50.6 },
      { slug: "jh-097", x: 40.4, y: 48.5, w: 19.4, h: 50.6 },
      { slug: "jh-098", x: 60, y: 48.5, w: 19.6, h: 50.6 },
    ],
  },
];

// --- Paquetes armados ------------------------------------------------------

/**
 * Las cuatro combinaciones del diagrama de flujo que armó el cliente: la casaca
 * sola, con gorra, con pantalón, o las tres juntas.
 *
 * El precio de la casaca lo pone el paso anterior —de catálogo, logo en DTF o
 * logo bordado—, así que aquí los paquetes solo suman las piezas que llevan
 * encima. Gorra $250 y pantalón $400, iguales en todas las combinaciones.
 *
 * El paquete completo descuenta $100 por jugador. Es precio de conjunto, no
 * porcentaje: el cliente lo ve como "ahorra $100" y así lo manejan ellos.
 */
export const paquetes: Paquete[] = [
  {
    slug: "solo-casaca",
    nombre: "Solo casaca",
    icono: "casaca",
    color: "tinta",
    descripcion:
      "Nada más la casaca, con el nombre y el número de cada jugador.",
    items: [
      { productoSlug: "casaca-catalogo", porJugador: 1, segun: "tecnica" },
    ],
  },
  {
    slug: "casaca-gorra",
    nombre: "Casaca + gorra",
    icono: "pelota",
    color: "tinta",
    descripcion: "La casaca con la gorra a juego, que es como se sale a jugar.",
    items: [
      { productoSlug: "casaca-catalogo", porJugador: 1, segun: "tecnica" },
      {
        productoSlug: "gorra-bordada-6-paneles",
        porJugador: 1,
        segun: "gorra",
      },
    ],
  },
  {
    slug: "casaca-pantalon",
    nombre: "Casaca + pantalón",
    icono: "estrella",
    color: "tinta",
    descripcion: "El uniforme de campo: casaca y pantalón del mismo juego.",
    items: [
      { productoSlug: "casaca-catalogo", porJugador: 1, segun: "tecnica" },
      { productoSlug: "pantalon-clasico", porJugador: 1, segun: "pantalon" },
    ],
  },
  {
    slug: "completo",
    nombre: "Paquete completo",
    icono: "diamante",
    color: "dorado",
    descripcion:
      "Casaca, pantalón y gorra. Las tres juntas salen $100 más baratas.",
    badge: "Ahorra $100",
    destacado: true,
    items: [
      { productoSlug: "casaca-catalogo", porJugador: 1, segun: "tecnica" },
      { productoSlug: "pantalon-clasico", porJugador: 1, segun: "pantalon" },
      {
        productoSlug: "gorra-bordada-6-paneles",
        porJugador: 1,
        segun: "gorra",
      },
      { productoSlug: "descuento-paquete-completo", porJugador: 1 },
    ],
  },
];

// --- Índices ---------------------------------------------------------------

export const productosPorSlug = new Map(productos.map((p) => [p.slug, p]));

export function getProducto(slug: string): Producto | undefined {
  return productosPorSlug.get(slug);
}
