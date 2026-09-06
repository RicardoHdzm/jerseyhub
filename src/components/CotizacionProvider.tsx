"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { minimoUniformes } from "@/lib/config";
import {
  guardarCotizacion,
  leerCotizacion,
  leerCotizacionEnServidor,
  suscribirse,
  type EstadoCotizacion,
} from "@/lib/almacen";
import { calcularResumen, paqueteALineas, type Resumen, type SeleccionArmador } from "@/lib/quote";
import type { JugadorRoster, Paquete, PiezaConColor } from "@/lib/types";

type Contexto = EstadoCotizacion & {
  resumen: Resumen;
  panelAbierto: boolean;
  abrirPanel: () => void;
  cerrarPanel: () => void;
  setJugadores: (n: number) => void;
  /** Vuelve a pasar el mismo slug para deseleccionar. */
  setModelo: (slug: string) => void;
  /** Vuelve a pasar el mismo slug para deseleccionar. */
  setTecnica: (slug: string) => void;
  setGorra: (slug: string) => void;
  setColor: (pieza: PiezaConColor, valor: string) => void;
  setEquipo: (v: string) => void;
  setNota: (v: string) => void;
  setRoster: (filas: JugadorRoster[]) => void;
  agregarPaquete: (paquete: Paquete, jugadores: number, seleccion?: SeleccionArmador) => void;
  cambiarCantidad: (id: string, cantidad: number) => void;
  quitar: (id: string) => void;
  limpiar: () => void;
};

const CotizacionContext = createContext<Contexto | null>(null);

export function CotizacionProvider({ children }: { children: ReactNode }) {
  const estado = useSyncExternalStore(suscribirse, leerCotizacion, leerCotizacionEnServidor);
  const [panelAbierto, setPanelAbierto] = useState(false);

  // Bloquea el scroll del fondo mientras el panel está abierto.
  useEffect(() => {
    if (!panelAbierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previo;
    };
  }, [panelAbierto]);

  const actualizar = useCallback((cambio: (actual: EstadoCotizacion) => EstadoCotizacion) => {
    guardarCotizacion(cambio(leerCotizacion()));
  }, []);

  const agregarPaquete = useCallback(
    (paquete: Paquete, jugadores: number, seleccion?: SeleccionArmador) => {
      const nuevas = paqueteALineas(paquete, jugadores, seleccion);
      actualizar((actual) => {
        const lineas = [...actual.lineas];
        for (const nueva of nuevas) {
          const indice = lineas.findIndex((l) => l.id === nueva.id);
          if (indice >= 0) {
            lineas[indice] = {
              ...lineas[indice],
              cantidad: lineas[indice].cantidad + nueva.cantidad,
            };
          } else {
            lineas.push(nueva);
          }
        }
        return { ...actual, jugadores, lineas };
      });
    },
    [actualizar],
  );

  const cambiarCantidad = useCallback(
    (id: string, cantidad: number) => {
      actualizar((actual) => ({
        ...actual,
        lineas:
          cantidad <= 0
            ? actual.lineas.filter((l) => l.id !== id)
            : actual.lineas.map((l) => (l.id === id ? { ...l, cantidad } : l)),
      }));
    },
    [actualizar],
  );

  const quitar = useCallback(
    (id: string) => {
      actualizar((actual) => ({ ...actual, lineas: actual.lineas.filter((l) => l.id !== id) }));
    },
    [actualizar],
  );

  const limpiar = useCallback(() => {
    actualizar((actual) => ({ ...actual, lineas: [] }));
    setPanelAbierto(false);
  }, [actualizar]);

  const resumen = useMemo(() => calcularResumen(estado.lineas), [estado.lineas]);

  /*
    Todas las funciones van con useCallback y el contexto con useMemo a
    propósito: si se recrearan en cada render, cualquier efecto que las tenga
    en su lista de dependencias se volvería a ejecutar con cada tecla que
    escribe el cliente. Eso ya rompió una vez los campos del panel, que perdían
    el foco letra por letra.
  */
  const abrirPanel = useCallback(() => setPanelAbierto(true), []);
  const cerrarPanel = useCallback(() => setPanelAbierto(false), []);

  // Los paquetes son para equipo: no baja del mínimo de uniformes.
  const setJugadores = useCallback(
    (n: number) =>
      actualizar((a) => ({
        ...a,
        jugadores: Math.max(minimoUniformes, Math.min(60, n || minimoUniformes)),
      })),
    [actualizar],
  );

  const setModelo = useCallback(
    (slug: string) => actualizar((a) => ({ ...a, modelo: a.modelo === slug ? "" : slug })),
    [actualizar],
  );

  const setTecnica = useCallback(
    (slug: string) => actualizar((a) => ({ ...a, tecnica: a.tecnica === slug ? "" : slug })),
    [actualizar],
  );

  const setGorra = useCallback(
    (slug: string) => actualizar((a) => ({ ...a, gorra: slug })),
    [actualizar],
  );

  const setColor = useCallback(
    (pieza: PiezaConColor, valor: string) =>
      actualizar((a) => ({ ...a, colores: { ...a.colores, [pieza]: valor } })),
    [actualizar],
  );

  const setEquipo = useCallback(
    (v: string) => actualizar((a) => ({ ...a, equipo: v })),
    [actualizar],
  );

  const setNota = useCallback((v: string) => actualizar((a) => ({ ...a, nota: v })), [actualizar]);

  const setRoster = useCallback(
    (filas: JugadorRoster[]) => actualizar((a) => ({ ...a, roster: filas })),
    [actualizar],
  );

  const valor: Contexto = useMemo(
    () => ({
      ...estado,
      resumen,
      panelAbierto,
      abrirPanel,
      cerrarPanel,
      setJugadores,
      setModelo,
      setTecnica,
      setGorra,
      setColor,
      setEquipo,
      setNota,
      setRoster,
      agregarPaquete,
      cambiarCantidad,
      quitar,
      limpiar,
    }),
    [
      estado,
      resumen,
      panelAbierto,
      abrirPanel,
      cerrarPanel,
      setJugadores,
      setModelo,
      setTecnica,
      setGorra,
      setColor,
      setEquipo,
      setNota,
      setRoster,
      agregarPaquete,
      cambiarCantidad,
      quitar,
      limpiar,
    ],
  );

  return <CotizacionContext.Provider value={valor}>{children}</CotizacionContext.Provider>;
}

export function useCotizacion(): Contexto {
  const contexto = useContext(CotizacionContext);
  if (!contexto) {
    throw new Error("useCotizacion debe usarse dentro de <CotizacionProvider>");
  }
  return contexto;
}
