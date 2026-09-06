import { IconoEnlaceExterno, IconoTienda } from "@/components/iconos";

/**
 * Atajo a la publicación del producto en Mercado Libre, para quien busca una
 * sola pieza en lugar del uniforme del equipo.
 */
export function AvisoMercadoLibre({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-3 rounded-xl border border-linea bg-arena px-4 py-3 transition-colors hover:border-tinta"
    >
      <span className="flex items-center gap-3">
        {/*
          El chip va en tinta y no en el amarillo de Mercado Libre (--color-meli)
          porque chocaba con el dorado de acento. Para regresarlo a la marca de
          ML: bg-meli text-tinta.
        */}
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-tinta text-white">
          <IconoTienda className="h-4 w-4" />
        </span>
        <span className="text-sm leading-tight">
          <span className="font-semibold">Disponible en línea</span>
          <br />
          <span className="text-xs text-tenue">Cómprala directo desde Mercado Libre</span>
        </span>
      </span>
      <IconoEnlaceExterno className="h-3.5 w-3.5 shrink-0 text-tenue" />
    </a>
  );
}
