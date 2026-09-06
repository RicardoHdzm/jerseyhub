import { getModelo, getProducto, paquetes, piezaConColor } from "@/data/catalog";
import { descuentosPorVolumen, negocio } from "@/lib/config";
import type {
  JugadorRoster,
  LineaCotizacion,
  Paquete,
  PaqueteItem,
  PiezaConColor,
  Producto,
} from "@/lib/types";

/** Formato de moneda determinista (evita diferencias entre servidor y navegador). */
export function precioMXN(valor: number): string {
  const entero = Math.round(valor);
  const signo = entero < 0 ? "-" : "";
  const digitos = Math.abs(entero)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${signo}$${digitos}`;
}

/** Opciones preseleccionadas de un producto: el primer valor de cada opción. */
export function opcionesPorDefecto(producto: Producto): Record<string, string> {
  const seleccion: Record<string, string> = {};
  for (const opcion of producto.opciones) {
    if (opcion.valores.length > 0) seleccion[opcion.id] = opcion.valores[0].id;
  }
  return seleccion;
}

/** Precio de una pieza con los extras de las opciones elegidas. */
export function precioUnitario(producto: Producto, opciones: Record<string, string>): number {
  let precio = producto.precio;
  for (const opcion of producto.opciones) {
    const valor = opcion.valores.find((v) => v.id === opciones[opcion.id]);
    if (valor?.extra) precio += valor.extra;
  }
  return precio;
}

/** Etiquetas legibles de las opciones elegidas, en el orden del catálogo. */
export function etiquetasOpciones(producto: Producto, opciones: Record<string, string>): string[] {
  return producto.opciones
    .map((opcion) => {
      const valor = opcion.valores.find((v) => v.id === opciones[opcion.id]);
      return valor ? `${opcion.label}: ${valor.label}` : null;
    })
    .filter((texto): texto is string => texto !== null);
}

/** Identificador estable de una línea: mismo producto con distintas opciones son líneas distintas. */
export function idLinea(productoSlug: string, opciones: Record<string, string>): string {
  const partes = Object.keys(opciones)
    .sort()
    .map((clave) => `${clave}:${opciones[clave]}`);
  return [productoSlug, ...partes].join("|");
}

export type LineaResuelta = {
  linea: LineaCotizacion;
  producto: Producto;
  unitario: number;
  subtotal: number;
  detalle: string[];
};

export type Resumen = {
  lineas: LineaResuelta[];
  piezas: number;
  subtotal: number;
  descuentoPorcentaje: number;
  descuentoMonto: number;
  total: number;
  /** Piezas que faltan para el siguiente nivel de descuento, si existe. */
  siguienteNivel: { faltan: number; porcentaje: number } | null;
};

export function descuentoPara(piezas: number): number {
  let porcentaje = 0;
  for (const nivel of descuentosPorVolumen) {
    if (piezas >= nivel.desde) porcentaje = Math.max(porcentaje, nivel.porcentaje);
  }
  return porcentaje;
}

function siguienteNivelDescuento(piezas: number) {
  const pendientes = descuentosPorVolumen
    .filter((nivel) => piezas < nivel.desde)
    .sort((a, b) => a.desde - b.desde);
  const nivel = pendientes[0];
  return nivel ? { faltan: nivel.desde - piezas, porcentaje: nivel.porcentaje } : null;
}

export function calcularResumen(lineas: LineaCotizacion[]): Resumen {
  const resueltas: LineaResuelta[] = [];

  for (const linea of lineas) {
    const producto = getProducto(linea.productoSlug);
    if (!producto) continue;
    const unitario = precioUnitario(producto, linea.opciones);
    resueltas.push({
      linea,
      producto,
      unitario,
      subtotal: unitario * linea.cantidad,
      detalle: etiquetasOpciones(producto, linea.opciones),
    });
  }

  const piezas = resueltas.reduce((suma, l) => suma + l.linea.cantidad, 0);
  const subtotal = resueltas.reduce((suma, l) => suma + l.subtotal, 0);
  const descuentoPorcentaje = descuentoPara(piezas);
  const descuentoMonto = Math.round(subtotal * descuentoPorcentaje);

  return {
    lineas: resueltas,
    piezas,
    subtotal,
    descuentoPorcentaje,
    descuentoMonto,
    total: subtotal - descuentoMonto,
    siguienteNivel: siguienteNivelDescuento(piezas),
  };
}

/** Lo que el cliente lleva elegido en el armador y que afecta a los paquetes. */
export type SeleccionArmador = {
  /** Slug del modelo de referencia del paso 2. Es diseño, no precio. */
  modelo?: string;
  /** Slug de la técnica de la casaca del paso 3. De aquí sale su precio. */
  tecnica?: string;
  /** Slug del producto de gorra del paso 4. */
  gorra?: string;
  /** Color elegido para cada pieza, por id de valor del producto. */
  colores?: Partial<Record<PiezaConColor, string>>;
};

/**
 * Las opciones con las que se cotiza una pieza: las del propio producto, luego
 * las que fija el paquete y encima el color que eligió el cliente.
 *
 * El color se valida contra el producto antes de aplicarlo. Sin eso, un color
 * que existe en una pieza pero no en la que quedó seleccionada —gris de
 * caballero cuando el corte pasó a dama— entraría como un valor inexistente y
 * el precio y la etiqueta saldrían mal.
 */
function opcionesDeItem(
  producto: Producto,
  item: PaqueteItem,
  seleccion: SeleccionArmador,
): Record<string, string> {
  const opciones = { ...opcionesPorDefecto(producto), ...(item.opciones ?? {}) };
  const pieza = piezaConColor(producto.slug);
  const elegido = pieza ? seleccion.colores?.[pieza] : undefined;
  const existe = producto.opciones.some(
    (o) => o.id === "color" && o.valores.some((v) => v.id === elegido),
  );
  if (elegido && existe) opciones.color = elegido;
  return opciones;
}

/**
 * Qué producto cotiza cada pieza del paquete. Las piezas marcadas con `segun`
 * toman su producto de lo que el cliente eligió en el armador; si todavía no
 * eligió, se quedan con el producto por defecto del propio paquete.
 */
export function productoDeItem(
  item: PaqueteItem,
  seleccion: SeleccionArmador = {},
): Producto | undefined {
  if (item.segun === "tecnica" && seleccion.tecnica) {
    const casaca = getProducto(seleccion.tecnica);
    if (casaca) return casaca;
  }
  if (item.segun === "pantalon") {
    const dama = seleccion.modelo && getModelo(seleccion.modelo)?.genero === "dama";
    const pantalon = getProducto(dama ? "pantalon-dama" : "pantalon-clasico");
    if (pantalon) return pantalon;
  }
  if (item.segun === "gorra" && seleccion.gorra) {
    const gorra = getProducto(seleccion.gorra);
    if (gorra) return gorra;
  }
  return getProducto(item.productoSlug);
}

/** Precio por jugador de un paquete, ya con lo elegido en el armador aplicado. */
export function precioPaquete(paquete: Paquete, seleccion: SeleccionArmador = {}): number {
  return paquete.items.reduce((suma, item) => {
    const producto = productoDeItem(item, seleccion);
    if (!producto) return suma;
    return (
      suma + precioUnitario(producto, opcionesDeItem(producto, item, seleccion)) * item.porJugador
    );
  }, 0);
}

/** Convierte un paquete en líneas de cotización para el número de jugadores dado. */
export function paqueteALineas(
  paquete: Paquete,
  jugadores: number,
  seleccion: SeleccionArmador = {},
): LineaCotizacion[] {
  return paquete.items.map((item) => {
    const producto = productoDeItem(item, seleccion);
    const slug = producto?.slug ?? item.productoSlug;
    const opciones = producto ? opcionesDeItem(producto, item, seleccion) : (item.opciones ?? {});
    return {
      id: idLinea(slug, opciones),
      productoSlug: slug,
      opciones,
      cantidad: item.porJugador * jugadores,
    };
  });
}

export function getPaquete(slug: string): Paquete | undefined {
  return paquetes.find((p) => p.slug === slug);
}

// --- WhatsApp --------------------------------------------------------------

export type DatosContacto = {
  equipo?: string;
  jugadores?: number;
  /** Nombre legible del modelo de referencia, no el slug. */
  modelo?: string | null;
  /** Nombre legible de la técnica de la casaca, no el slug. */
  tecnica?: string | null;
  /** Lista de jugadores; las filas sin nombre ni número se ignoran. */
  roster?: JugadorRoster[];
  nota?: string;
};

/** Mensaje que se abre precargado en WhatsApp con la cotización armada. */
export function mensajeWhatsApp(resumen: Resumen, datos: DatosContacto = {}): string {
  const lineas: string[] = [
    `¡Hola ${negocio.nombre}! Me interesa esta cotización que armé en su página:`,
    "",
  ];

  if (datos.equipo?.trim()) lineas.push(`*Equipo:* ${datos.equipo.trim()}`);
  if (datos.jugadores) lineas.push(`*Jugadores:* ${datos.jugadores}`);
  if (datos.modelo) lineas.push(`*Modelo de referencia:* ${datos.modelo}`);
  if (datos.tecnica) lineas.push(`*Acabado de la casaca:* ${datos.tecnica}`);
  if (datos.equipo?.trim() || datos.jugadores || datos.modelo || datos.tecnica) lineas.push("");

  for (const l of resumen.lineas) {
    lineas.push(`• ${l.linea.cantidad}x ${l.producto.nombre}`);
    if (l.detalle.length > 0) lineas.push(`   ${l.detalle.join(" · ")}`);
    lineas.push(`   ${precioMXN(l.unitario)} c/u — ${precioMXN(l.subtotal)}`);
  }

  lineas.push("");
  lineas.push(`*Piezas totales:* ${resumen.piezas}`);
  lineas.push(`*Subtotal:* ${precioMXN(resumen.subtotal)}`);
  if (resumen.descuentoMonto > 0) {
    const pct = Math.round(resumen.descuentoPorcentaje * 100);
    lineas.push(`*Descuento por volumen (${pct}%):* -${precioMXN(resumen.descuentoMonto)}`);
  }
  lineas.push(`*Total estimado:* ${precioMXN(resumen.total)} ${negocio.moneda}`);

  const roster = (datos.roster ?? []).filter((j) => j.nombre.trim() || j.numero.trim());
  if (roster.length > 0) {
    lineas.push("");
    lineas.push(`*Lista de jugadores (${roster.length}):*`);
    for (const jugador of roster) {
      const partes = [
        jugador.numero.trim() && `#${jugador.numero.trim()}`,
        jugador.nombre.trim(),
        jugador.talla.trim(),
      ];
      lineas.push(`   ${partes.filter(Boolean).join(" · ")}`);
    }
  }

  if (datos.nota?.trim()) {
    lineas.push("");
    lineas.push(`*Notas:* ${datos.nota.trim()}`);
  }

  lineas.push("");
  lineas.push("¿Me confirman disponibilidad y tiempos de entrega?");

  return lineas.join("\n");
}

export function linkWhatsApp(texto: string): string {
  return `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(texto)}`;
}
