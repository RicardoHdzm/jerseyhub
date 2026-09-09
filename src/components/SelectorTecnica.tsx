"use client";

import { useCotizacion } from "@/components/CotizacionProvider";
import {
  IconoCheck,
  IconoCorona,
  IconoEstrella,
  IconoMitades,
  IconoPluma,
} from "@/components/iconos";
import { getProducto, tecnicas } from "@/data/catalog";

/*
  Las tarjetas repiten el formato de los paquetes —encabezado de color con
  icono, nombre, descripción y ficha debajo— pero en chico: aquí no hay precio
  ni botón, porque la tarjeta ES el botón y el costo se ve ya sumado abajo.
*/
const encabezados = {
  tinta: { fondo: "bg-tinta", texto: "text-white", detalle: "text-white/70" },
  dorado: { fondo: "bg-dorado", texto: "text-tinta", detalle: "text-tinta/75" },
};

const iconos = {
  corona: IconoCorona,
  mitades: IconoMitades,
  pluma: IconoPluma,
};

export function SelectorTecnica() {
  const { tecnica, setTecnica } = useCotizacion();

  return (
    <div className="grid gap-4 pt-3 sm:grid-cols-3">
      {tecnicas.map(({ slug, titulo, icono, color, badge }) => {
        const producto = getProducto(slug);
        if (!producto) return null;
        const activo = tecnica === slug;
        const Icono = iconos[icono];
        const cabecera = encabezados[color];

        return (
          <button
            key={slug}
            type="button"
            onClick={() => setTecnica(slug)}
            aria-pressed={activo}
            className={`tarjeta sube relative flex flex-col text-left transition-colors ${
              activo ? "border-dorado" : "hover:border-dorado"
            }`}
          >
            {badge && (
              <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-tinta px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                <IconoEstrella className="h-2.5 w-2.5 text-dorado-claro" />
                {badge}
              </span>
            )}

            {/*
              Los 15px del redondeo son los 16 de la tarjeta menos el borde, lo
              mismo que en las tarjetas de paquete.
            */}
            <div
              className={`rounded-t-[15px] px-4 pb-4 pt-7 text-center ${cabecera.fondo} ${cabecera.texto}`}
            >
              <Icono className="mx-auto h-9 w-9" />
              <p className="titulo mt-3 text-2xl leading-none">{titulo}</p>
              <p className={`mt-2 text-xs leading-snug ${cabecera.detalle}`}>
                {producto.descripcion}
              </p>
            </div>

            {/*
              La ficha es paralela en los tres: los mismos renglones, en el
              mismo orden, para que se lea en horizontal y se vea de un golpe
              qué cambia de un acabado al siguiente. Sin precio a propósito.
            */}
            <ul className="flex-1 space-y-2 p-4 text-sm">
              {producto.incluye.map((detalle) => (
                <li key={detalle} className="flex items-start gap-2">
                  <IconoCheck className="mt-0.5 h-4 w-4 shrink-0 text-tinta" />
                  <span>{detalle}</span>
                </li>
              ))}
            </ul>

            {activo && (
              <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-dorado text-tinta ring-2 ring-white/70">
                <IconoCheck className="h-3 w-3" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
