export type CategoriaId = "casacas" | "gorras" | "pantalones" | "accesorios";

export type Categoria = {
  id: CategoriaId;
  nombre: string;
  /** Renglón de apoyo bajo el filtro. Opcional: si falta, no se dibuja nada. */
  descripcion?: string;
};

export type OpcionValor = {
  id: string;
  label: string;
  /** Foto de esta variante. Si existe, el producto la muestra al elegirla. */
  foto?: string;
  /** Se suma al precio base de la pieza. Puede ser 0 o negativo. */
  extra?: number;
  nota?: string;
};

export type Opcion = {
  id: string;
  label: string;
  ayuda?: string;
  valores: OpcionValor[];
};

export type Producto = {
  slug: string;
  nombre: string;
  categoria: CategoriaId;
  /** Precio por pieza en MXN, sin extras. */
  precio: number;
  descripcion: string;
  /**
   * No se lista en "Prenda por prenda" porque se elige en el paso 2 del
   * armador. Sí aparece en el catálogo completo.
   */
  soloEnArmador?: boolean;
  /** Colores usados por la ilustración de respaldo cuando no hay foto. */
  color: string;
  colorSecundario: string;
  /** Ruta de la foto en /public (opcional). Si existe, sustituye a la ilustración. */
  foto?: string;
  /**
   * Link a la publicación de este producto en Mercado Libre, para quien quiera
   * comprar una sola pieza. Si se deja vacío, el botón no aparece.
   */
  mercadoLibre?: string;
  destacado?: boolean;
  incluye: string[];
  opciones: Opcion[];
};

/** Cómo se dibuja la vista previa del modelo. */
export type PatronModelo = "solido" | "rayas" | "degradado" | "bloques";

/**
 * Modelo (o "corrida") de uniforme: el estilo de diseño que el equipo quiere,
 * antes de entrar al detalle de prendas.
 */
/** Con qué corte se ofrece el modelo. Es el filtro del paso 1. */
export type GeneroModelo = "caballero" | "dama";

export type ModeloUniforme = {
  slug: string;
  nombre: string;
  descripcion: string;
  genero: GeneroModelo;
  /**
   * Con qué casaca del catálogo se agrupa este modelo en "Prenda por prenda".
   * Ya NO decide el precio del paquete: eso lo define la técnica del paso 3,
   * porque cualquier modelo se puede producir con cualquier acabado.
   */
  casacaSlug: string;
  /** Foto del modelo. Si existe, se usa en vez de la ilustración. */
  foto?: string;
  /** Ilustración de respaldo cuando no hay foto. */
  patron?: PatronModelo;
  /** [principal, secundario, detalle] para esa ilustración. */
  colores?: [string, string, string];
};

export type PaqueteItem = {
  /** Producto con el que se cotiza si el cliente no eligió modelo. */
  productoSlug: string;
  /**
   * Qué decisión del armador manda sobre esta pieza: la casaca toma su precio
   * de la técnica del paso 3 y la gorra del tipo del paso 4. El resto de las
   * piezas son fijas.
   */
  segun?: "tecnica" | "gorra";
  /** Piezas de este producto por jugador. */
  porJugador: number;
  /** Opciones preseleccionadas: { opcionId: valorId } */
  opciones?: Record<string, string>;
};

export type Paquete = {
  slug: string;
  nombre: string;
  descripcion: string;
  /** Icono del encabezado de la tarjeta. */
  icono: "pelota" | "estrella" | "diamante";
  /** Color del encabezado. Cada paquete tiene el suyo. */
  color: "tinta" | "dorado";
  badge?: string;
  destacado?: boolean;
  items: PaqueteItem[];
};

export type DescuentoVolumen = {
  /** Piezas totales necesarias para alcanzar este nivel. */
  desde: number;
  /** Porcentaje de descuento, 0.05 = 5%. */
  porcentaje: number;
};

/** Una fila de la lista de jugadores: para quién se produce cada pieza. */
export type JugadorRoster = {
  nombre: string;
  numero: string;
  talla: string;
};

/** Una línea de la cotización que arma el cliente. */

export type LineaCotizacion = {
  /** Identificador estable: slug + opciones elegidas. */
  id: string;
  productoSlug: string;
  opciones: Record<string, string>;
  cantidad: number;
};
