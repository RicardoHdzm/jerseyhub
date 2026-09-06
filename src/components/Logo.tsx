import Image from "next/image";

import { negocio } from "@/lib/config";

/**
 * El archivo del logo viene en negro sobre fondo blanco. La clase `logo`
 * (mix-blend-multiply, definida en globals.css) hace que ese blanco desaparezca
 * sobre las superficies claras del sitio, así que no hace falta recortarlo.
 *
 * Si algún día se sustituye por un PNG o SVG con fondo transparente, basta con
 * cambiar la ruta de abajo.
 */
export function Logo({
  className = "h-11 w-auto",
  prioridad = false,
  invertido = false,
}: {
  className?: string;
  prioridad?: boolean;
  /** Úsalo sobre fondo negro: pinta el logo en blanco. */
  invertido?: boolean;
}) {
  return (
    <Image
      src="/logo.jpeg"
      alt={negocio.nombre}
      width={744}
      height={457}
      priority={prioridad}
      className={`${invertido ? "logo-invertido" : "logo"} ${className}`}
    />
  );
}
