"use client";

import { useCotizacion } from "@/components/CotizacionProvider";
import { ProductoImagen } from "@/components/ProductoImagen";
import { IconoBote, IconoFlecha, IconoWhatsApp } from "@/components/iconos";
import { negocio } from "@/lib/config";
import { linkWhatsApp, precioMXN } from "@/lib/quote";

/** Cuántas miniaturas caben antes de resumir el resto con un "+N". */
const MAX_MINIATURAS = 4;

export function BarraCotizacion() {
  const { resumen, abrirPanel, panelAbierto, limpiar } = useCotizacion();

  if (panelAbierto) return null;

  // Sin nada seleccionado dejamos solo un acceso directo a WhatsApp.
  if (resumen.piezas === 0) {
    return (
      <a
        href={linkWhatsApp(
          `¡Hola ${negocio.nombre}! Tengo una duda sobre los uniformes.`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        className="fixed bottom-5 right-5 z-30 grid h-16 w-16 place-items-center rounded-full bg-dorado text-tinta shadow-lg shadow-black/25 transition-transform hover:scale-105"
      >
        <IconoWhatsApp className="h-9 w-9" />
      </a>
    );
  }

  const visibles = resumen.lineas.slice(0, MAX_MINIATURAS);
  const restantes = resumen.lineas.length - visibles.length;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-linea bg-papel/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-3 px-5 py-3">
        <ul className="hidden shrink-0 items-center sm:flex">
          {visibles.map((l, indice) => (
            <li
              key={l.linea.id}
              title={`${l.linea.cantidad}× ${l.producto.nombre}`}
              className={`relative h-11 w-11 overflow-hidden rounded-lg border border-linea bg-arena ${
                indice > 0 ? "-ml-3" : ""
              }`}
            >
              <ProductoImagen producto={l.producto} sizes="44px" />
            </li>
          ))}
          {restantes > 0 && (
            <li className="-ml-3 grid h-11 w-11 place-items-center rounded-lg border border-linea bg-arena text-xs font-bold text-tenue">
              +{restantes}
            </li>
          )}
        </ul>

        <div className="min-w-0">
          <p className="text-xs text-tenue">
            {resumen.piezas} {resumen.piezas === 1 ? "pieza" : "piezas"} ·{" "}
            {resumen.lineas.length}{" "}
            {resumen.lineas.length === 1 ? "artículo" : "artículos"}
            {resumen.descuentoMonto > 0 &&
              ` · ${Math.round(resumen.descuentoPorcentaje * 100)}% de descuento`}
          </p>
          <p className="titulo text-2xl leading-none">
            {precioMXN(resumen.total)}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={abrirPanel}
            className="flex items-center gap-2 rounded-xl bg-tinta px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black sm:px-7"
          >
            <span>Ver mi paquete</span>
            <IconoFlecha className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={limpiar}
            className="flex items-center gap-2 rounded-xl border border-linea px-3 py-3 text-sm font-semibold text-tenue transition-colors hover:border-tinta hover:text-tinta sm:px-4"
          >
            <IconoBote className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Vaciar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
