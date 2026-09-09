import { IconoComillas, IconoEstrella } from "@/components/iconos";
import { testimonios } from "@/data/testimonios";

/**
 * Las estrellas van en negro y no en dorado: la tarjeta es blanca y el dorado
 * sobre blanco se queda en 2.4:1, por debajo del 3:1 que pide una forma que
 * carga información. En negro se leen y siguen siendo la estrella de la marca.
 */
function Calificacion({ estrellas }: { estrellas: number }) {
  return (
    <span
      className="flex items-center gap-1"
      aria-label={`${estrellas} de 5 estrellas`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <IconoEstrella
          key={i}
          className={`h-3.5 w-3.5 ${i < estrellas ? "text-tinta" : "text-tinta/15"}`}
        />
      ))}
    </span>
  );
}

export function Testimonios() {
  if (testimonios.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {testimonios.map((testimonio) => (
        <figure
          key={testimonio.nombre}
          className="tarjeta sube flex flex-col p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <Calificacion estrellas={testimonio.calificacion ?? 5} />
            <IconoComillas className="h-6 w-6 shrink-0 text-tinta/20" />
          </div>
          <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-tenue">
            {testimonio.texto}
          </blockquote>
          <figcaption className="mt-5 border-t border-linea pt-4">
            <p className="titulo text-lg leading-none">{testimonio.nombre}</p>
            <p className="mt-1 text-xs text-tenue">{testimonio.equipo}</p>
            <p className="mt-2 text-xs font-medium text-tinta">
              {testimonio.pedido}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
