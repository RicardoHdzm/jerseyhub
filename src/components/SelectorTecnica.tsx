"use client";

import { useCotizacion } from "@/components/CotizacionProvider";
import {
  IconoCheck,
  IconoEmblema,
  IconoEstrella,
  IconoEtiqueta,
  IconoImpresora,
} from "@/components/iconos";
import { getProducto, tecnicas } from "@/data/catalog";
import { precioMXN } from "@/lib/quote";

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
  etiqueta: IconoEtiqueta,
  impresora: IconoImpresora,
  emblema: IconoEmblema,
};

export function SelectorTecnica() {
  const { tecnica, setTecnica } = useCotizacion();

  return (
    <>
      {/*
        Tres filas compartidas por las tres tarjetas —encabezado, ficha y
        precio— con `subgrid`: así cada una termina a la misma altura aunque una
        descripción ocupe dos líneas y otra tres. Sin esto cada tarjeta corta
        donde le toca y los renglones de abajo quedan escalonados.
      */}
      <div className="grid gap-4 pt-3 sm:grid-cols-3 sm:grid-rows-[auto_1fr_auto]">
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
              className={`tarjeta sube relative flex flex-col text-left transition-colors sm:row-span-3 sm:grid sm:grid-rows-subgrid ${
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
                Los 15px del redondeo son los 16 de la tarjeta menos el borde,
                lo mismo que en las tarjetas de paquete.
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
                La ficha es paralela en las tres: los mismos renglones, en el
                mismo orden, para que se lea en horizontal y se vea de un golpe
                qué cambia de una a la siguiente.
              */}
              <ul className="flex-1 space-y-2 p-4 text-sm">
                {producto.incluye.map((detalle) => (
                  <li key={detalle} className="flex items-start gap-2">
                    <IconoCheck className="mt-0.5 h-4 w-4 shrink-0 text-tinta" />
                    <span>{detalle}</span>
                  </li>
                ))}
              </ul>

              {/*
                "Desde" y no el precio a secas: bordar el nombre y el número
                suma $100 por casaca, así que este es el piso y no el final.
              */}
              <div className="flex items-baseline gap-2 border-t border-linea px-4 py-3">
                <span className="text-xs text-tenue">Desde</span>
                <span className="titulo text-2xl leading-none">
                  {precioMXN(producto.precio)}
                </span>
                <span className="text-xs text-tenue">por casaca</span>
              </div>

              {activo && (
                <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-dorado text-tinta ring-2 ring-white/70">
                  <IconoCheck className="h-3 w-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <MarcadoDelJugador />
    </>
  );
}

/*
  El nombre y el número del jugador van aparte de las tres tarjetas porque
  aplican a las tres por igual: bordarlos cuesta 100 pesos más sea cual sea la
  casaca. Meterlo dentro de cada tarjeta habría repetido la misma fila tres
  veces y sugerido que es una decisión distinta en cada una.
*/
const marcados = [
  { id: "dtf" as const, label: "En DTF textil", nota: "Incluido" },
  { id: "bordado" as const, label: "Bordados", nota: "+$100 por casaca" },
];

function MarcadoDelJugador() {
  const { marcado, setMarcado } = useCotizacion();

  return (
    <div className="mt-5">
      <p className="etiqueta text-[11px] text-white/60">
        Nombre y número del jugador
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-3 lg:justify-start">
        {marcados.map((opcion) => {
          const activo = marcado === opcion.id;
          return (
            <button
              key={opcion.id}
              type="button"
              onClick={() => setMarcado(opcion.id)}
              aria-pressed={activo}
              className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left transition-colors ${
                activo
                  ? "border-dorado bg-dorado/10"
                  : "border-white/20 hover:border-white/50"
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                  activo ? "bg-dorado text-tinta" : "ring-1 ring-white/30"
                }`}
              >
                {activo && <IconoCheck className="h-2.5 w-2.5" />}
              </span>
              <span>
                <span className="block text-sm font-semibold">
                  {opcion.label}
                </span>
                <span className="block text-xs text-white/60">
                  {opcion.nota}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
