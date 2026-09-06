"use client";

import { useState, type ReactNode } from "react";

import type { PaqueteItem } from "@/lib/types";

import { useCotizacion } from "@/components/CotizacionProvider";
import { SelectorColor } from "@/components/SelectorColor";
import { SelectorGorra } from "@/components/SelectorGorra";
import { SelectorModelo } from "@/components/SelectorModelo";
import { SelectorTecnica } from "@/components/SelectorTecnica";
import {
  IconoCerrar,
  IconoCheck,
  IconoDiamante,
  IconoEstrella,
  IconoMas,
  IconoMenos,
  IconoPelota,
} from "@/components/iconos";
import { getModelo, getProducto, nombreModelo, paquetes, tituloTecnica } from "@/data/catalog";
import { minimoUniformes } from "@/lib/config";
import { descuentoPara, precioMXN, precioPaquete, productoDeItem } from "@/lib/quote";

const encabezados = {
  tinta: { fondo: "bg-tinta", texto: "text-white", icono: "text-white", detalle: "text-white/70" },
  dorado: {
    fondo: "bg-dorado",
    texto: "text-tinta",
    icono: "text-tinta",
    detalle: "text-tinta/75",
  },
};

/**
 * Todas las piezas que aparecen en algún paquete, ordenadas por el paquete más
 * completo. Las tres tarjetas listan estas mismas filas y tachan en gris las
 * que su paquete no trae: así quedan del mismo alto (antes el básico, con dos
 * piezas, dejaba un hueco muerto arriba del precio) y de paso se ve de un
 * vistazo qué se gana al subir de paquete.
 */
const piezasDeTodos: { clave: string; item: PaqueteItem }[] = (() => {
  const vistas = new Map<string, PaqueteItem>();
  for (const paquete of [...paquetes].sort((a, b) => b.items.length - a.items.length)) {
    for (const item of paquete.items) {
      const clave = item.segun ?? item.productoSlug;
      if (!vistas.has(clave)) vistas.set(clave, item);
    }
  }
  return [...vistas].map(([clave, item]) => ({ clave, item }));
})();

const iconosPaquete = {
  pelota: IconoPelota,
  estrella: IconoEstrella,
  diamante: IconoDiamante,
};

/**
 * Un paso del armador. Da por hecho que va sobre la banda negra: el número en
 * dorado y el detalle en blanco tenue solo funcionan ahí.
 */
function Paso({
  numero,
  titulo,
  detalle,
  children,
}: {
  numero: number;
  titulo: string;
  detalle?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-8 first:mt-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="titulo text-2xl text-dorado-claro">{numero}.</span>
        <h3 className="titulo text-2xl">{titulo}</h3>
        {detalle && <span className="text-sm text-white/60">{detalle}</span>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/**
 * El contador de jugadores del paso 1.
 *
 * Mientras se escribe, el campo guarda su propio texto en `borrador` y no pasa
 * por el recorte del mínimo y el máximo. Si recortara en cada tecla sería
 * imposible teclear un número: al borrar el 12 el valor rebota al mínimo, el
 * dígito nuevo se pega detrás y el 12X resultante se recorta a 60. El recorte
 * se aplica al salir del campo, que es cuando ya hay un número completo.
 */
function ContadorJugadores() {
  const { jugadores, setJugadores } = useCotizacion();
  const [borrador, setBorrador] = useState<string | null>(null);

  // Con `borrador` en null el campo muestra el valor de la cotización; en
  // cuanto se escribe, muestra lo tecleado. Así no hace falta un efecto que
  // sincronice los dos.
  const confirmar = () => {
    if (borrador !== null) setJugadores(Number(borrador));
    setBorrador(null);
  };

  const ajustar = (delta: number) => {
    setBorrador(null);
    setJugadores(jugadores + delta);
  };

  return (
    <div className="flex w-fit items-center rounded-lg border border-white/20 bg-white/5 text-white">
      <button
        type="button"
        onClick={() => ajustar(-1)}
        aria-label="Un jugador menos"
        className="h-9 w-9 text-lg text-white/60 transition-colors hover:text-dorado"
      >
        <IconoMenos className="h-3 w-3" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={minimoUniformes}
        max={60}
        value={borrador ?? jugadores}
        onChange={(e) => setBorrador(e.target.value)}
        onBlur={confirmar}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        aria-label="Número de jugadores"
        className="w-14 bg-transparent text-center font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => ajustar(1)}
        aria-label="Un jugador más"
        className="h-9 w-9 text-lg text-white/60 transition-colors hover:text-dorado"
      >
        <IconoMas className="h-3 w-3" />
      </button>
    </div>
  );
}

export function Paquetes() {
  const { jugadores, agregarPaquete, modelo, tecnica, gorra, colores } = useCotizacion();
  const modeloElegido = nombreModelo(modelo);
  const tecnicaElegida = tecnica ? tituloTecnica(tecnica) : undefined;
  const gorraElegida = gorra ? getProducto(gorra)?.nombre : undefined;
  const seleccion = { modelo, tecnica, gorra, colores };

  /*
    De qué producto salen los colores de cada paso. La gorra y el pantalón
    cambian con lo que se eligió antes —el tipo de gorra y el corte del modelo
    de referencia—, así que los círculos tienen que preguntarle al producto que
    quedó seleccionado, no a uno fijo.
  */
  const gorraSlug = gorra || "gorra-bordada-6-paneles";
  const damaElegida = modelo ? getModelo(modelo)?.genero === "dama" : false;
  const pantalonSlug = damaElegida ? "pantalon-dama" : "pantalon-clasico";
  const pantalonNombre = getProducto(pantalonSlug)?.nombre ?? "";

  return (
    <>
      <Paso numero={1} titulo="¿Cuántos jugadores son?">
        <ContadorJugadores />
      </Paso>

      <Paso
        numero={2}
        titulo="Elige el modelo de referencia"
        detalle={
          modeloElegido
            ? `Elegiste: ${modeloElegido}`
            : "Cualquiera se puede producir con cualquier acabado"
        }
      >
        <SelectorModelo />
      </Paso>

      <Paso
        numero={3}
        titulo="Elige el acabado de la casaca"
        detalle={tecnicaElegida ? `Elegiste: ${tecnicaElegida}` : "Bordado, mixto o DTF textil"}
      >
        <SelectorTecnica />
      </Paso>

      <Paso
        numero={4}
        titulo="Elige la gorra"
        detalle={gorraElegida ? `Elegiste: ${gorraElegida}` : "Algodón o dry-fit"}
      >
        <SelectorGorra />
        <div className="mt-5">
          <p className="etiqueta text-[11px] text-white/60">Color de la gorra</p>
          <div className="mt-3">
            <SelectorColor pieza="gorra" productoSlug={gorraSlug} />
          </div>
        </div>
      </Paso>

      {/*
        Del 5 al 7 son piezas que no traen todos los paquetes. Se muestran
        siempre porque el paquete se escoge hasta el final: aquí todavía no se
        sabe cuáles van a aplicar, y esconderlas obligaría a devolverse.
      */}
      <Paso
        numero={5}
        titulo="Elige el color del pantalón"
        detalle={`${pantalonNombre} · solo aplica si tu paquete lo incluye`}
      >
        <SelectorColor pieza="pantalon" productoSlug={pantalonSlug} />
      </Paso>

      <Paso
        numero={6}
        titulo="Elige el color de las calcetas"
        detalle="Solo aplica si tu paquete las incluye"
      >
        <SelectorColor pieza="calcetas" productoSlug="calcetas-sublimadas" />
      </Paso>

      <Paso
        numero={7}
        titulo="Elige el color del cinturón"
        detalle="Solo aplica si tu paquete lo incluye"
      >
        <SelectorColor pieza="cinturon" productoSlug="cinturon-beisbol" />
      </Paso>

      <Paso
        numero={8}
        titulo="Escoge tu paquete"
        detalle={`Precios calculados para ${jugadores} ${jugadores === 1 ? "jugador" : "jugadores"}`}
      >
        <div className="grid gap-4 pt-3 md:grid-cols-2 lg:grid-cols-3">
          {paquetes.map((paquete) => {
            const porJugador = precioPaquete(paquete, seleccion);
            const piezasPorJugador = paquete.items.reduce((s, i) => s + i.porJugador, 0);
            const piezas = piezasPorJugador * jugadores;
            const total = porJugador * jugadores * (1 - descuentoPara(piezas));
            const Icono = iconosPaquete[paquete.icono];
            const cabecera = encabezados[paquete.color];
            const incluidas = new Map(
              paquete.items.map((item) => [item.segun ?? item.productoSlug, item]),
            );

            return (
              <article
                key={paquete.slug}
                className={`tarjeta relative flex flex-col transition-colors ${
                  paquete.destacado ? "border-dorado" : "hover:border-dorado"
                }`}
              >
                {/*
                  El badge va dentro de la tarjeta, en la esquina superior
                  izquierda del encabezado de color.
                */}
                {paquete.badge && (
                  <span className="absolute left-3 top-3 z-10 whitespace-nowrap rounded-full bg-tinta px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                    {paquete.badge}
                  </span>
                )}

                {/*
                  Sin foto: la tarjeta se sostiene con el encabezado de color, el
                  precio grande y la lista de piezas. Antes se repetía la misma
                  imagen de casaca en los tres paquetes y no aportaba nada.
                */}
                <div
                  className={`rounded-t-[15px] px-5 pb-5 pt-8 text-center ${cabecera.fondo} ${cabecera.texto}`}
                >
                  <Icono className={`mx-auto h-14 w-14 ${cabecera.icono}`} />
                  <h3 className="titulo mt-4 text-3xl leading-none">{paquete.nombre}</h3>
                  <p className={`mt-2 text-sm leading-snug ${cabecera.detalle}`}>
                    {paquete.descripcion}
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="etiqueta text-[11px] text-tenue">
                    {piezasPorJugador} piezas por jugador
                  </p>
                  <ul className="mt-3 space-y-1.5 pb-5 text-sm">
                    {piezasDeTodos.map(({ clave, item: referencia }) => {
                      const item = incluidas.get(clave);
                      const producto = productoDeItem(item ?? referencia, seleccion);
                      if (!producto) return null;
                      // Las piezas que dependen del armador se nombran en
                      // genérico: el paquete no elige la técnica, la elige el
                      // cliente en los pasos 1 y 2.
                      const etiqueta =
                        clave === "modelo"
                          ? "Casaca"
                          : clave === "gorra"
                            ? "Gorra"
                            : producto.nombre;
                      return (
                        <li
                          key={clave}
                          className={`flex items-start gap-2 ${item ? "" : "text-tenue/60"}`}
                        >
                          {item ? (
                            <IconoCheck className="mt-0.5 h-4 w-4 shrink-0 text-tinta" />
                          ) : (
                            <IconoCerrar className="mt-0.5 h-4 w-4 shrink-0 text-linea" />
                          )}
                          <span>
                            {item && item.porJugador > 1 && `${item.porJugador}× `}
                            {etiqueta}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-auto border-t border-linea pt-5">
                    <div className="flex items-baseline gap-2">
                      <p className="titulo text-4xl leading-none">{precioMXN(porJugador)}</p>
                      <p className="text-xs text-tenue">por jugador</p>
                    </div>
                    <p className="mt-2 text-sm">
                      <span className="font-semibold">{precioMXN(total)}</span>
                      <span className="text-tenue"> el equipo · {piezas} piezas</span>
                    </p>

                    <button
                      type="button"
                      onClick={() => agregarPaquete(paquete, jugadores, seleccion)}
                      className={`mt-4 w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition-colors ${
                        paquete.destacado
                          ? "bg-tinta text-white hover:bg-black"
                          : "border border-tinta text-tinta hover:bg-tinta hover:text-white"
                      }`}
                    >
                      Armar para {jugadores} {jugadores === 1 ? "jugador" : "jugadores"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/*
          Una sola vez debajo de las tarjetas: aplica igual a los tres paquetes.
        */}
        <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-white">
          <IconoCheck className="h-4 w-4 shrink-0" />
          <span>
            <strong className="font-semibold">Diseño 100% personalizable</strong> en la casaca y la
            gorra: colores, logo, nombre y número.
          </span>
        </p>
      </Paso>
    </>
  );
}
