import Image from "next/image";

import { ProductoArte } from "@/components/ProductoArte";
import type { Producto } from "@/lib/types";

/**
 * Muestra la foto del producto y, si todavía no tiene, la ilustración de
 * respaldo. Va posicionada en absoluto, así que el contenedor debe ser
 * `relative` y definir el alto (normalmente con una clase `aspect-*`).
 */
export function ProductoImagen({
  producto,
  foto,
  sizes = "(min-width: 1024px) 280px, 50vw",
  oscuro = false,
}: {
  producto: Producto;
  /** Foto de la variante elegida; si no se pasa, se usa la del producto. */
  foto?: string;
  sizes?: string;
  /** Para las tarjetas sobre fondo negro (solo afecta a la ilustración). */
  oscuro?: boolean;
}) {
  const src = foto ?? producto.foto;

  if (!src) return <ProductoArte producto={producto} oscuro={oscuro} />;

  // Las fotos de producto vienen recortadas sobre blanco: `contain` sobre fondo
  // blanco evita cortar la prenda sin importar la proporción del contenedor.
  return (
    <div className="absolute inset-0 bg-white">
      <Image
        src={src}
        alt={producto.nombre}
        fill
        sizes={sizes}
        className="object-contain p-2"
      />
    </div>
  );
}
