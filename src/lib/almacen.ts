import { jugadoresPorDefecto } from "@/lib/config";
import type { JugadorRoster, LineaCotizacion } from "@/lib/types";

/**
 * La cotización vive en localStorage y se lee con useSyncExternalStore, para que
 * el HTML del servidor y el del navegador coincidan sin renders en cascada.
 */

const CLAVE = "jerseyhub.cotizacion.v1";

export type EstadoCotizacion = {
  jugadores: number;
  /** Slug del modelo de uniforme elegido, o "" si todavía no elige. */
  modelo: string;
  /** Slug del producto de gorra elegido, o "" si todavía no elige. */
  gorra: string;
  /** Nombres, números y tallas. Opcional: se puede cotizar sin llenarla. */
  roster: JugadorRoster[];
  equipo: string;
  nota: string;
  lineas: LineaCotizacion[];
};

export const COTIZACION_VACIA: EstadoCotizacion = {
  jugadores: jugadoresPorDefecto,
  modelo: "",
  gorra: "",
  roster: [],
  equipo: "",
  nota: "",
  lineas: [],
};

const oyentes = new Set<() => void>();

// El snapshot tiene que ser referencialmente estable mientras el contenido no
// cambie, así que cacheamos el objeto junto con el texto del que salió.
let textoEnCache: string | null = null;
let estadoEnCache: EstadoCotizacion = COTIZACION_VACIA;

function leerTexto(): string | null {
  try {
    return window.localStorage.getItem(CLAVE);
  } catch {
    return null;
  }
}

function interpretar(texto: string | null): EstadoCotizacion {
  if (!texto) return COTIZACION_VACIA;
  try {
    const guardado = JSON.parse(texto) as Partial<EstadoCotizacion>;
    return {
      jugadores: guardado.jugadores ?? COTIZACION_VACIA.jugadores,
      modelo: guardado.modelo ?? "",
      gorra: guardado.gorra ?? "",
      roster: Array.isArray(guardado.roster) ? guardado.roster : [],
      equipo: guardado.equipo ?? "",
      nota: guardado.nota ?? "",
      lineas: Array.isArray(guardado.lineas) ? guardado.lineas : [],
    };
  } catch {
    return COTIZACION_VACIA;
  }
}

export function suscribirse(alCambiar: () => void): () => void {
  oyentes.add(alCambiar);
  // Mantiene sincronizadas dos pestañas abiertas del mismo catálogo.
  window.addEventListener("storage", alCambiar);
  return () => {
    oyentes.delete(alCambiar);
    window.removeEventListener("storage", alCambiar);
  };
}

export function leerCotizacion(): EstadoCotizacion {
  const texto = leerTexto();
  if (texto !== textoEnCache) {
    textoEnCache = texto;
    estadoEnCache = interpretar(texto);
  }
  return estadoEnCache;
}

/** En el servidor siempre partimos de una cotización vacía. */
export function leerCotizacionEnServidor(): EstadoCotizacion {
  return COTIZACION_VACIA;
}

export function guardarCotizacion(nuevo: EstadoCotizacion): void {
  const texto = JSON.stringify(nuevo);
  textoEnCache = texto;
  estadoEnCache = nuevo;
  try {
    window.localStorage.setItem(CLAVE, texto);
  } catch {
    // Sin persistencia la cotización sigue viva en memoria durante la visita.
  }
  for (const oyente of oyentes) oyente();
}
