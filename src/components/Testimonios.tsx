import { IconoComillas } from "@/components/iconos";
import { testimonios } from "@/data/testimonios";

export function Testimonios() {
  if (testimonios.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {testimonios.map((testimonio) => (
        <figure key={testimonio.nombre} className="tarjeta flex flex-col p-6">
          <IconoComillas className="h-6 w-6 text-tinta/20" />
          <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-tenue">
            {testimonio.texto}
          </blockquote>
          <figcaption className="mt-5 border-t border-linea pt-4">
            <p className="titulo text-lg leading-none">{testimonio.nombre}</p>
            <p className="mt-1 text-xs text-tenue">{testimonio.equipo}</p>
            <p className="mt-2 text-xs font-medium text-tinta">{testimonio.pedido}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
