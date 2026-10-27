import Image from "next/image";

import type { ZonaLamina } from "@/lib/types";

/**
 * Muestra un pedazo de una lámina sin recortar el archivo.
 *
 * El truco es una caja con `overflow: hidden` y, dentro, la lámina entera
 * ampliada y corrida hasta que la zona pedida quede encuadrada. Si la zona
 * ocupa el 18.8% del ancho, la lámina se escala al 532% (100/18.8) y se
 * desplaza hacia la izquierda lo que midan las zonas que quedan antes.
 *
 * Importa que sea así y no un recorte: el arte es el que mandó el cliente, sin
 * cortar, y una misma lámina sirve para sus diez prendas en vez de diez
 * archivos sueltos.
 */
export function RegionLamina({
  foto,
  zona,
  alt,
  sizes = "200px",
  className = "",
}: {
  foto: string;
  zona: ZonaLamina;
  alt: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${zona.w * 1536} / ${zona.h * 1024}` }}
    >
      <Image
        src={foto}
        alt={alt}
        width={1536}
        height={1024}
        sizes={sizes}
        style={{
          position: "absolute",
          maxWidth: "none",
          width: `${(100 / zona.w) * 100}%`,
          height: `${(100 / zona.h) * 100}%`,
          left: `${(-zona.x / zona.w) * 100}%`,
          top: `${(-zona.y / zona.h) * 100}%`,
        }}
      />
    </div>
  );
}
