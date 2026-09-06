import { IconoUbicacion } from "@/components/iconos";
import { negocio } from "@/lib/config";

/**
 * El par del aviso de Mercado Libre: aquella dice dónde comprarla en línea y
 * esta dice que la prenda también está físicamente en el local.
 *
 * A diferencia de la otra no es un enlace: no hay a dónde mandar al cliente
 * todavía. Si algún día hay una dirección o un mapa, aquí es donde va.
 */
export function AvisoSucursal() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-linea bg-arena px-4 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-tinta text-white">
        <IconoUbicacion className="h-4 w-4" />
      </span>
      <span className="text-sm leading-tight">
        <span className="font-semibold">Disponible en sucursal</span>
        <br />
        <span className="text-xs text-tenue">Pásala a ver a nuestro local en {negocio.ciudad}</span>
      </span>
    </div>
  );
}
