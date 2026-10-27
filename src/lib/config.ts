/**
 * Configuración del negocio.
 * Todo lo editable a mano (contacto, textos, políticas) vive aquí.
 */

export const negocio = {
  nombre: "JerseyHub",
  tagline: "Uniformes personalizados de béisbol y softbol",
  /**
   * Dominio del sitio, sin diagonal al final. De aquí sale la URL canónica y
   * la ruta absoluta de la imagen de vista previa: si cambia el dominio, esto
   * es lo único que hay que tocar.
   */
  sitio: "https://jersey-hub.com",
  ciudad: "Culiacán, Sinaloa",
  /** Número de WhatsApp en formato internacional, solo dígitos. */
  whatsapp: "5216679472498",
  whatsappVisible: "667 947 2498",
  instagram: "https://www.instagram.com/jerseyhub.cln/",
  instagramHandle: "@jerseyhub.cln",
  facebook: "https://www.facebook.com/Casacasjerseyhubcln",
  /* OJO: el usuario de TikTok lo deduje del de Instagram, porque "Jersey
     hub.cln" trae un espacio y TikTok no los permite. Verifica que el link
     abra el perfil correcto. */
  tiktok: "https://www.tiktok.com/@jerseyhub.cln",
  facebookHandle: "Casacas Jersey Hub",
  /**
   * Link a la tienda oficial en Mercado Libre. Si se deja vacío, el sitio
   * simplemente no muestra el enlace a la tienda (los links por producto van
   * en src/data/catalog.ts, campo `mercadoLibre`).
   */
  mercadoLibre: "",
  correo: "",
  moneda: "MXN",
  /** Días hábiles de producción una vez aprobado el diseño. */
  tiempoEntrega: "10 a 15 días hábiles",
  /** Anticipo que se solicita para arrancar producción. */
  anticipo: "50%",
} as const;

/** Tallas que ofrecen, para la lista de jugadores. */
export const tallas = [
  "CH",
  "M",
  "G",
  "XG",
  "XXG",
  "6",
  "8",
  "10",
  "12",
  "14",
  "16",
] as const;

/**
 * Mínimo de uniformes por equipo, según el tipo de casaca. Personalizar el
 * logo lleva preparación de arte y por eso pide más piezas que tomar un diseño
 * del catálogo tal como está.
 *
 * Aplica solo al armador de paquetes: las prendas sueltas del catálogo se
 * piden por WhatsApp sin mínimo.
 */
export const minimosUniformes = {
  catalogo: 12,
  personalizada: 20,
} as const;

/** El más bajo de los dos: el mínimo para entrar al armador. */
export const minimoUniformes = Math.min(
  minimosUniformes.catalogo,
  minimosUniformes.personalizada,
);

/** El más alto, para los textos que hablan de los dos casos. */
export const minimoPersonalizada = minimosUniformes.personalizada;

/** Jugadores sugeridos al abrir el armador de paquetes. */
export const jugadoresPorDefecto = minimosUniformes.catalogo;
