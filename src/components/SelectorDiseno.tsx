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
      "La diseñamos desde cero con el logo y los colores de tu equipo. Te mandamos el boceto sin costo y lo ajustamos hasta que quede.",
  },
  {
    id: "catalogo" as const,
    icono: IconoCuadricula,
    titulo: "Del catálogo",
    descripcion:
      "Escoge uno de los 87 diseños que ya manejamos. Igual le ponemos el nombre de tu equipo y el número de cada jugador.",
  },
];

/**
 * El paso de la casaca: primero de dónde sale el diseño y, solo si es del
 * catálogo, las láminas para señalar cuál.
 *
 * El tablero se despliega aquí dentro en vez de ser su propio paso porque sin
 * haber elegido "del catálogo" no hay nada que señalar, y nueve láminas
 * desplegadas sin venir a cuento son mucha página de por medio.
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

      {origenDiseno === "catalogo" && (
        <div className="mt-6">
          <TableroLaminas />
        </div>
      )}
    </>
  );
}
