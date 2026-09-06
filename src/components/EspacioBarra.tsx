"use client";

import { useCotizacion } from "@/components/CotizacionProvider";

/**
 * Reserva el alto de la barra fija de cotización al final del pie de página,
 * pero solo mientras esa barra existe. Así no queda un hueco negro de más
 * cuando el cliente todavía no ha agregado nada.
 */
export function EspacioBarra() {
  const { resumen, panelAbierto } = useCotizacion();

  if (panelAbierto || resumen.piezas === 0) return null;

  return <div aria-hidden="true" className="h-20" />;
}
