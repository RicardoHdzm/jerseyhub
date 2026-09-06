import type { Categoria, ModeloUniforme, Opcion, Paquete, Producto } from "@/lib/types";

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
  },
  {
    id: "pantalones",
    nombre: "Pantalones",
    descripcion: "Corte adulto, dama o juvenil, recto o knicker, en tela con recuperación.",
  },
  {
    id: "gorras",
    nombre: "Gorras",
    descripcion: "De algodón o en tela dry-fit, con el logo de tu equipo bordado al frente.",
  },
  {
    id: "accesorios",
    nombre: "Accesorios",
    descripcion: "Calcetas y cinturones a juego, lo que termina de amarrar el uniforme.",
  },
];

// --- Opciones reutilizables ------------------------------------------------

const corte: Opcion = {
  id: "corte",
  label: "Corte",
  ayuda: "Las tallas exactas de cada jugador las tomamos por WhatsApp.",
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
 */
const ML_EJEMPLO_GORRA = "https://listado.mercadolibre.com.mx/gorra-beisbol-personalizada";

// --- Productos -------------------------------------------------------------

export const productos: Producto[] = [
  {
    slug: "casaca-sublimada",
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
    nombre: "Casaca bordada",
    foto: "/productos/jerseys/bordado/dodgers-01.avif",
    categoria: "casacas",
    precio: 580,
    destacado: true,
    color: "#1e3a8a",
    colorSecundario: "#f8fafc",
    descripcion:
      "Nombre, número y logo aplicados en twill bordado sobre la tela, no sublimados. Es el acabado con relieve y el más resistente al uso y a los lavados.",
    incluye: ["Twill bordado en pecho y espalda", "Botonado completo", "Acabado con relieve"],
    opciones: [
      corte,
      {
        id: "alcance",
        label: "Qué va bordado",
        valores: [
          { id: "completo", label: "Logo, nombre y número" },
          { id: "logo-numero", label: "Logo y número", extra: -60 },
          { id: "solo-logo", label: "Solo el logo del pecho", extra: -110 },
        ],
      },
    ],
  },
  {
    slug: "casaca-drifit",
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
    nombre: "Casaca corte dama",
    foto: "/productos/jerseys/dama/angels-01.avif",
    categoria: "casacas",
    precio: 470,
    color: "#7c3aed",
    colorSecundario: "#f5f3ff",
    descripcion:
      "Corte entallado con costados en malla y largo pensado para softbol. Sublimado full color.",
    incluye: ["Corte entallado", "Costados en malla", "Nombre y número"],
    opciones: [
      {
        id: "cuello",
        label: "Cuello",
        valores: [
          { id: "v", label: "V" },
          { id: "redondo", label: "Redondo" },
          { id: "botonado", label: "Botonado completo", extra: 70 },
        ],
      },
    ],
  },
  {
    slug: "pantalon-clasico",
    nombre: "Pantalón clásico liso",
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
        ayuda: "Las tallas exactas de cada jugador las tomamos por WhatsApp.",
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
    incluye: ["Tela transpirable", "Paneles perforados", "Logo bordado al frente"],
    opciones: [
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
    mercadoLibre: ML_EJEMPLO_GORRA,
    foto: "/productos/gorras/tela/gorra-algodon.jpg",
    nombre: "Gorra de algodón",
    categoria: "gorras",
    precio: 260,
    color: "#0f172a",
    colorSecundario: "#facc15",
    descripcion:
      "Algodón estructurado con logo bordado en alta densidad. El acabado más duradero para uso diario.",
    incluye: ["Logo bordado al frente", "Estructura rígida"],
    opciones: [
      {
        id: "bordado",
        label: "Bordados",
        valores: [
          { id: "frente", label: "Solo frente" },
          { id: "frente-lado", label: "Frente + lateral", extra: 45 },
          { id: "completo", label: "Frente + lateral + trasero", extra: 75 },
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
          { id: "azules", label: "Azul", foto: "/productos/calcetas/azules.jpg" },
          { id: "blancas", label: "Blanco", foto: "/productos/calcetas/blancas.jpg" },
          { id: "rojas", label: "Rojo", foto: "/productos/calcetas/rojas.jpg" },
          { id: "verdes", label: "Verde", foto: "/productos/calcetas/verdes.jpg" },
        ],
      },
      {
        id: "largo",
        label: "Largo",
        valores: [
          { id: "alta", label: "Alta (bajo rodilla)" },
          { id: "media", label: "Media pantorrilla" },
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
export function tipoDeModelo(modelo: ModeloUniforme): string {
  const nombre = getProducto(modelo.casacaSlug)?.nombre ?? "";
  const sinPrefijo = nombre.replace(/^Casaca\s+/i, "");
  return sinPrefijo.charAt(0).toUpperCase() + sinPrefijo.slice(1);
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
      { productoSlug: "casaca-sublimada", porJugador: 1, segun: "modelo" },
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
      { productoSlug: "casaca-sublimada", porJugador: 1, segun: "modelo" },
      { productoSlug: "pantalon-clasico", porJugador: 1 },
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
      { productoSlug: "casaca-sublimada", porJugador: 1, segun: "modelo" },
      { productoSlug: "pantalon-clasico", porJugador: 1 },
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
