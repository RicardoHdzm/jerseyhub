"use client";

import type { ReactNode } from "react";

import type { PaqueteItem } from "@/lib/types";

import { useCotizacion } from "@/components/CotizacionProvider";
import { SelectorGorra } from "@/components/SelectorGorra";
import { SelectorModelo } from "@/components/SelectorModelo";
import {
  IconoCerrar,
  IconoCheck,
  IconoDiamante,
  IconoEstrella,
  IconoMas,
  IconoMenos,
  IconoPelota,
} from "@/components/iconos";
import { getProducto, nombreModelo, paquetes } from "@/data/catalog";
import { descuentoPara, precioMXN, precioPaquete, productoDeItem } from "@/lib/quote";

const encabezados = {
  tinta: { fondo: "bg-tinta", texto: "text-white", icono: "text-white", detalle: "text-white/70" },
  dorado: {
    fondo: "bg-dorado",
    texto: "text-tinta",
    icono: "text-tinta",
    detalle: "text-tinta/75",
  },
};

/**
 * Todas las piezas que aparecen en algún paquete, ordenadas por el paquete más
 * completo. Las tres tarjetas listan estas mismas filas y tachan en gris las
 * que su paquete no trae: así quedan del mismo alto (antes el básico, con dos
 * piezas, dejaba un hueco muerto arriba del precio) y de paso se ve de un
 * vistazo qué se gana al subir de paquete.
 */
const piezasDeTodos: { clave: string; item: PaqueteItem }[] = (() => {
  const vistas = new Map<string, PaqueteItem>();
  for (const paquete of [...paquetes].sort((a, b) => b.items.length - a.items.length)) {
    for (const item of paquete.items) {
      const clave = item.segun ?? item.productoSlug;
      if (!vistas.has(clave)) vistas.set(clave, item);
    }
  }
  return [...vistas].map(([clave, item]) => ({ clave, item }));
})();

const iconosPaquete = {
  pelota: IconoPelota,
  estrella: IconoEstrella,
  diamante: IconoDiamante,
};

/**
 * Un paso del armador. Da por hecho que va sobre la banda negra: el número en
 * dorado y el detalle en blanco tenue solo funcionan ahí.
 */
function Paso({
  numero,
  titulo,
  detalle,
  children,
}: {
  numero: number;
  titulo: string;
  detalle?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-8 first:mt-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="titulo text-2xl text-dorado-claro">{numero}.</span>
        <h3 className="titulo text-2xl">{titulo}</h3>
        {detalle && <span className="text-sm text-white/60">{detalle}</span>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Paquetes() {
  const { jugadores, setJugadores, agregarPaquete, modelo, gorra } = useCotizacion();
  const modeloElegido = nombreModelo(modelo);
  const gorraElegida = gorra ? getProducto(gorra)?.nombre : undefined;
  const seleccion = { modelo, gorra };

  return (
    <>
      <Paso numero={1} titulo="¿Cuántos jugadores son?">
        <div className="flex w-fit items-center rounded-lg border border-white/20 bg-white/5 text-white">
          <button
            type="button"
            onClick={() => setJugadores(jugadores - 1)}
            aria-label="Un jugador menos"
            className="h-9 w-9 text-lg text-white/60 transition-colors hover:text-dorado"
          >
            <IconoMenos className="h-3 w-3" />
          </button>
          <input
            type="number"
            min={1}
            max={60}
            value={jugadores}
            onChange={(e) => setJugadores(Number(e.target.value))}
            aria-label="Número de jugadores"
            className="w-14 bg-transparent text-center font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => setJugadores(jugadores + 1)}
            aria-label="Un jugador más"
            className="h-9 w-9 text-lg text-white/60 transition-colors hover:text-dorado"
          >
            <IconoMas className="h-3 w-3" />
          </button>
        </div>
      </Paso>

      <Paso
        numero={2}
        titulo="Elige el modelo de uniforme"
        detalle={
          modeloElegido ? `Elegiste: ${modeloElegido}` : "Opcional, lo puedes definir por WhatsApp"
        }
      >
        <SelectorModelo />
      </Paso>

      <Paso
        numero={3}
        titulo="Elige el tipo de gorra"
        detalle={gorraElegida ? `Elegiste: ${gorraElegida}` : "Algodón o dry-fit"}
      >
        <SelectorGorra />
      </Paso>

      <Paso
        numero={4}
        titulo="Escoge tu paquete"
        detalle={`Precios calculados para ${jugadores} ${jugadores === 1 ? "jugador" : "jugadores"}`}
      >
        <div className="grid gap-4 pt-3 md:grid-cols-2 lg:grid-cols-3">
          {paquetes.map((paquete) => {
            const porJugador = precioPaquete(paquete, seleccion);
            const piezasPorJugador = paquete.items.reduce((s, i) => s + i.porJugador, 0);
            const piezas = piezasPorJugador * jugadores;
            const total = porJugador * jugadores * (1 - descuentoPara(piezas));
            const Icono = iconosPaquete[paquete.icono];
            const cabecera = encabezados[paquete.color];
            const incluidas = new Map(
              paquete.items.map((item) => [item.segun ?? item.productoSlug, item]),
            );

            return (
              <article
                key={paquete.slug}
                className={`tarjeta relative flex flex-col transition-colors ${
                  paquete.destacado ? "border-dorado" : "hover:border-dorado"
                }`}
              >
                {/*
                  El badge va dentro de la tarjeta, en la esquina superior
                  izquierda del encabezado de color.
                */}
                {paquete.badge && (
                  <span className="absolute left-3 top-3 z-10 whitespace-nowrap rounded-full bg-tinta px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                    {paquete.badge}
                  </span>
                )}

                {/*
                  Sin foto: la tarjeta se sostiene con el encabezado de color, el
                  precio grande y la lista de piezas. Antes se repetía la misma
                  imagen de casaca en los tres paquetes y no aportaba nada.
                */}
                <div
                  className={`rounded-t-[15px] px-5 pb-5 pt-8 text-center ${cabecera.fondo} ${cabecera.texto}`}
                >
                  <Icono className={`mx-auto h-14 w-14 ${cabecera.icono}`} />
                  <h3 className="titulo mt-4 text-3xl leading-none">{paquete.nombre}</h3>
                  <p className={`mt-2 text-sm leading-snug ${cabecera.detalle}`}>
                    {paquete.descripcion}
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="etiqueta text-[11px] text-tenue">
                    {piezasPorJugador} piezas por jugador
                  </p>
                  <ul className="mt-3 space-y-1.5 pb-5 text-sm">
                    {piezasDeTodos.map(({ clave, item: referencia }) => {
                      const item = incluidas.get(clave);
                      const producto = productoDeItem(item ?? referencia, seleccion);
                      if (!producto) return null;
                      // Las piezas que dependen del armador se nombran en
                      // genérico: el paquete no elige la técnica, la elige el
                      // cliente en los pasos 1 y 2.
                      const etiqueta =
                        clave === "modelo"
                          ? "Casaca"
                          : clave === "gorra"
                            ? "Gorra"
                            : producto.nombre;
                      return (
                        <li
                          key={clave}
                          className={`flex items-start gap-2 ${item ? "" : "text-tenue/60"}`}
                        >
                          {item ? (
                            <IconoCheck className="mt-0.5 h-4 w-4 shrink-0 text-tinta" />
                          ) : (
                            <IconoCerrar className="mt-0.5 h-4 w-4 shrink-0 text-linea" />
                          )}
                          <span>
                            {item && item.porJugador > 1 && `${item.porJugador}× `}
                            {etiqueta}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-auto border-t border-linea pt-5">
                    <div className="flex items-baseline gap-2">
                      <p className="titulo text-4xl leading-none">{precioMXN(porJugador)}</p>
                      <p className="text-xs text-tenue">por jugador</p>
                    </div>
                    <p className="mt-2 text-sm">
                      <span className="font-semibold">{precioMXN(total)}</span>
                      <span className="text-tenue"> el equipo · {piezas} piezas</span>
                    </p>

                    <button
                      type="button"
                      onClick={() => agregarPaquete(paquete, jugadores, seleccion)}
                      className={`mt-4 w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition-colors ${
                        paquete.destacado
                          ? "bg-tinta text-white hover:bg-black"
                          : "border border-tinta text-tinta hover:bg-tinta hover:text-white"
                      }`}
                    >
                      Armar para {jugadores} {jugadores === 1 ? "jugador" : "jugadores"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/*
          Una sola vez debajo de las tarjetas: aplica igual a los tres paquetes.
        */}
        <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-white">
          <IconoCheck className="h-4 w-4 shrink-0" />
          <span>
            <strong className="font-semibold">Diseño 100% personalizable</strong> en la casaca y la
            gorra: colores, logo, nombre y número.
          </span>
        </p>
      </Paso>
    </>
  );
}
