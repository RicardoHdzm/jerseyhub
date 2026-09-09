"use client";

import { useCotizacion } from "@/components/CotizacionProvider";
import { IconoCheck } from "@/components/iconos";
import { coloresDe, muestrasDeColor } from "@/data/catalog";
import type { PiezaConColor } from "@/lib/types";

/**
 * Los colores de una pieza, como círculos.
 *
 * Recibe el slug del producto que quedó seleccionado —la gorra que se eligió,
 * el pantalón del corte que toca— y ofrece los colores que ese producto sí
 * tiene. Por eso el gris desaparece solo cuando el corte pasa a dama: no está
 * en el catálogo de ese pantalón.
 */
export function SelectorColor({
  pieza,
  productoSlug,
}: {
  pieza: PiezaConColor;
  productoSlug: string;
}) {
  const { colores, setColor } = useCotizacion();
  const valores = coloresDe(productoSlug);
  if (valores.length === 0) return null;

  // Sin elección previa se marca el primero, que es el que cotiza por defecto.
  const elegido = valores.some((v) => v.id === colores[pieza])
    ? colores[pieza]
    : valores[0].id;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
      {valores.map((valor) => {
        const activo = valor.id === elegido;
        const muestra = muestrasDeColor[valor.id] ?? "#9ca3af";

        return (
          <button
            key={valor.id}
            type="button"
            onClick={() => setColor(pieza, valor.id)}
            aria-pressed={activo}
            title={valor.label}
            className="group flex flex-col items-center gap-1.5"
          >
            {/*
              El anillo va separado del círculo con `ring-offset` para que se
              lea también en el blanco, donde un borde pegado se perdería
              contra el propio color de la muestra.
            */}
            <span
              style={{ backgroundColor: muestra }}
              className={`grid h-9 w-9 place-items-center rounded-full ring-offset-2 ring-offset-tinta transition-all ${
                activo
                  ? "ring-2 ring-dorado"
                  : "ring-1 ring-white/25 group-hover:ring-white/60"
              }`}
            >
              {activo && (
                <IconoCheck
                  className={`h-3 w-3 ${valor.id.startsWith("blanc") ? "text-tinta" : "text-white"}`}
                />
              )}
            </span>
            <span
              className={`text-xs ${activo ? "text-white" : "text-white/50"}`}
            >
              {valor.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
