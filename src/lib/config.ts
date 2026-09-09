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

/**
 * Descuentos por volumen aplicados al total de piezas de la cotización.
 * IMPORTANTE: revisa estos porcentajes antes de publicar el sitio.
 * Para desactivarlos por completo, deja el arreglo vacío: []
 */
export const descuentosPorVolumen = [
  { desde: 10, porcentaje: 0.05 },
  { desde: 20, porcentaje: 0.08 },
  { desde: 30, porcentaje: 0.12 },
] as const;

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
 * Mínimo de uniformes por equipo. Aplica solo al armador de paquetes: las
 * prendas sueltas del catálogo se piden por WhatsApp sin mínimo.
 */
export const minimoUniformes = 12;

/** Jugadores sugeridos al abrir el armador de paquetes. */
export const jugadoresPorDefecto = minimoUniformes;
