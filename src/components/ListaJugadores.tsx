"use client";

import { useCotizacion } from "@/components/CotizacionProvider";
import { IconoCerrar, IconoMas } from "@/components/iconos";
import { tallas } from "@/lib/config";

const FILA_VACIA = { nombre: "", numero: "", talla: "" };

/**
 * Captura de nombres, números y tallas. Es opcional: si el cliente no la llena,
 * la cotización sale igual y los datos se piden por WhatsApp. Cuando sí la
 * llena, la lista viaja dentro del mismo mensaje y ahorra toda esa ida y vuelta.
 */
export function ListaJugadores() {
  const { roster, setRoster, jugadores } = useCotizacion();

  const cambiar = (indice: number, campo: keyof typeof FILA_VACIA, valor: string) => {
    setRoster(roster.map((fila, i) => (i === indice ? { ...fila, [campo]: valor } : fila)));
  };

  const agregarFila = () => setRoster([...roster, { ...FILA_VACIA }]);
  const quitarFila = (indice: number) => setRoster(roster.filter((_, i) => i !== indice));
  const completarHasta = () =>
    setRoster([
      ...roster,
      ...Array.from({ length: jugadores - roster.length }, () => ({ ...FILA_VACIA })),
    ]);

  const faltan = jugadores - roster.length;

  return (
    <div className="mt-4">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-medium text-tenue">Lista de jugadores (opcional)</span>
        {roster.length > 0 && (
          <span className="text-[11px] text-tenue">
            {roster.length} de {jugadores}
          </span>
        )}
      </div>

      {roster.length === 0 ? (
        <div className="mt-2 rounded-lg border border-dashed border-linea px-3 py-3">
          <p className="text-xs leading-relaxed text-tenue">
            Captura aquí nombres, números y tallas y viajan dentro del mismo mensaje de WhatsApp. Si
            prefieres, los pasamos por chat.
          </p>
          <button
            type="button"
            onClick={completarHasta}
            className="mt-2 flex items-center gap-2 rounded-lg border border-linea bg-arena px-3 py-2 text-xs font-semibold transition-colors hover:border-dorado"
          >
            <IconoMas className="h-3 w-3" />
            Capturar los {jugadores} jugadores
          </button>
        </div>
      ) : (
        <>
          <ul className="mt-2 space-y-2">
            {roster.map((fila, indice) => (
              <li key={indice} className="flex items-center gap-2">
                <input
                  value={fila.numero}
                  onChange={(e) => cambiar(indice, "numero", e.target.value)}
                  placeholder="#"
                  aria-label={`Número del jugador ${indice + 1}`}
                  className="w-12 rounded-lg border border-linea bg-arena px-2 py-2 text-center text-sm outline-none focus:border-tinta"
                />
                <input
                  value={fila.nombre}
                  onChange={(e) => cambiar(indice, "nombre", e.target.value)}
                  placeholder="Nombre"
                  aria-label={`Nombre del jugador ${indice + 1}`}
                  className="min-w-0 flex-1 rounded-lg border border-linea bg-arena px-3 py-2 text-sm outline-none focus:border-tinta"
                />
                <select
                  value={fila.talla}
                  onChange={(e) => cambiar(indice, "talla", e.target.value)}
                  aria-label={`Talla del jugador ${indice + 1}`}
                  className="rounded-lg border border-linea bg-arena px-2 py-2 text-sm outline-none focus:border-tinta"
                >
                  <option value="">Talla</option>
                  {tallas.map((talla) => (
                    <option key={talla} value={talla}>
                      {talla}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => quitarFila(indice)}
                  aria-label={`Quitar jugador ${indice + 1}`}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-tenue transition-colors hover:text-tinta"
                >
                  <IconoCerrar className="h-3 w-3" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={agregarFila}
              className="flex items-center gap-2 rounded-lg border border-linea px-3 py-2 text-xs font-semibold transition-colors hover:border-dorado"
            >
              <IconoMas className="h-3 w-3" />
              Agregar jugador
            </button>
            {faltan > 0 && (
              <button
                type="button"
                onClick={completarHasta}
                className="rounded-lg px-3 py-2 text-xs font-semibold text-tinta underline underline-offset-4"
              >
                Completar los {faltan} que faltan
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
