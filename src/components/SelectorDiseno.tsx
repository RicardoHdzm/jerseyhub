"use client";

import { useCotizacion } from "@/components/CotizacionProvider";
import { TableroLaminas } from "@/components/TableroLaminas";
import { IconoCheck, IconoCuadricula, IconoPluma } from "@/components/iconos";

const opciones = [
  {
    id: "personalizado" as const,
    icono: IconoPluma,
    titulo: "Personalizada",
    descripcion:
      "Partimos de un diseño del catálogo y le bordamos el nombre de tu equipo, más el número de cada jugador.",
  },
  {
    id: "catalogo" as const,
    icono: IconoCuadricula,
    titulo: "Tal cual",
    descripcion:
      "El diseño del catálogo como viene, sin modificaciones. Es la opción más económica.",
  },
];

/**
 * El paso de la casaca: si lleva el nombre del equipo bordado o va tal cual, y
 * de cuál diseño del catálogo se parte.
 *
 * Las dos opciones necesitan modelo: la personalizada también sale de un diseño
 * de las láminas, lo que cambia es que se le borda el nombre del equipo encima.
 * Por eso el tablero aparece en cuanto se elige cualquiera de las dos, y no
 * antes: desplegar nueve láminas sin venir a cuento es mucha página de por
 * medio.
 */
export function SelectorDiseno() {
  const { origenDiseno, setOrigenDiseno } = useCotizacion();

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {opciones.map(({ id, icono: Icono, titulo, descripcion }) => {
          const activo = origenDiseno === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setOrigenDiseno(id)}
              aria-pressed={activo}
              className={`tarjeta relative flex items-start gap-4 p-5 text-left transition-colors ${
                activo ? "border-dorado" : "hover:border-dorado"
              }`}
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                  activo ? "bg-dorado text-tinta" : "bg-arena text-tinta"
                }`}
              >
                <Icono className="h-4 w-4" />
              </span>
              <span>
                <span className="titulo block text-xl leading-none">
                  {titulo}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-tenue">
                  {descripcion}
                </span>
              </span>
              {activo && (
                <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-dorado text-tinta">
                  <IconoCheck className="h-3 w-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {origenDiseno !== "" && (
        <div className="mt-6">
          <TableroLaminas />
        </div>
      )}
    </>
  );
}
