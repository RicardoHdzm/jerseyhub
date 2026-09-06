"use client";

import { useEffect, useRef } from "react";

import { useCotizacion } from "@/components/CotizacionProvider";
import { ProductoImagen } from "@/components/ProductoImagen";
import { IconoCerrar, IconoMas, IconoMenos, IconoWhatsApp } from "@/components/iconos";
import { ListaJugadores } from "@/components/ListaJugadores";
import { getModelo, nombreModelo, tituloTecnica } from "@/data/catalog";
import { negocio } from "@/lib/config";
import { linkWhatsApp, mensajeWhatsApp, precioMXN } from "@/lib/quote";

function Stepper({ valor, onCambio }: { valor: number; onCambio: (n: number) => void }) {
  return (
    <div className="flex items-center rounded-lg border border-linea bg-arena">
      <button
        type="button"
        onClick={() => onCambio(valor - 1)}
        aria-label="Quitar una pieza"
        className="h-8 w-8 text-lg leading-none text-tenue transition-colors hover:text-tinta"
      >
        <IconoMenos className="h-2.5 w-2.5" />
      </button>
      <input
        type="number"
        min={0}
        value={valor}
        onChange={(e) => onCambio(Number(e.target.value))}
        aria-label="Cantidad"
        className="w-12 bg-transparent text-center text-sm font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onCambio(valor + 1)}
        aria-label="Agregar una pieza"
        className="h-8 w-8 text-lg leading-none text-tenue transition-colors hover:text-tinta"
      >
        <IconoMas className="h-2.5 w-2.5" />
      </button>
    </div>
  );
}

export function PanelCotizacion() {
  const {
    panelAbierto,
    cerrarPanel,
    resumen,
    equipo,
    setEquipo,
    jugadores,
    setJugadores,
    nota,
    setNota,
    modelo,
    tecnica,
    roster,
    cambiarCantidad,
    quitar,
    limpiar,
  } = useCotizacion();

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelAbierto) return;
    const alPresionar = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrarPanel();
    };
    window.addEventListener("keydown", alPresionar);
    return () => window.removeEventListener("keydown", alPresionar);
  }, [panelAbierto, cerrarPanel]);

  // El foco va aparte y depende solo de `panelAbierto`: si viviera en el efecto
  // de arriba, cualquier re-render lo movería del campo que el cliente está
  // escribiendo de vuelta al panel.
  useEffect(() => {
    if (panelAbierto) panelRef.current?.focus();
  }, [panelAbierto]);

  const vacio = resumen.lineas.length === 0;
  const modeloElegido = nombreModelo(modelo);
  const disenoElegido = modelo ? getModelo(modelo) : undefined;
  const tecnicaElegida = tecnica ? tituloTecnica(tecnica) : null;
  const mensaje = mensajeWhatsApp(resumen, {
    equipo,
    jugadores,
    modelo: modeloElegido,
    tecnica: tecnicaElegida,
    roster,
    nota,
  });
  const porJugador = jugadores > 0 ? resumen.total / jugadores : 0;

  return (
    <div
      className={`fixed inset-0 z-50 ${panelAbierto ? "" : "pointer-events-none"}`}
      aria-hidden={!panelAbierto}
    >
      <div
        onClick={cerrarPanel}
        className={`absolute inset-0 bg-black/70 transition-opacity duration-200 ${
          panelAbierto ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mi paquete"
        tabIndex={-1}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-linea bg-papel shadow-2xl outline-none transition-transform duration-300 ease-out ${
          panelAbierto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-linea px-5 py-4">
          <div>
            <h2 className="titulo text-2xl">Mi paquete</h2>
            <p className="text-xs text-tenue">
              {resumen.piezas} {resumen.piezas === 1 ? "pieza" : "piezas"}
            </p>
          </div>
          <button
            type="button"
            onClick={cerrarPanel}
            aria-label="Cerrar"
            className="grid h-9 w-9 place-items-center rounded-full border border-linea text-tenue transition-colors hover:text-tinta"
          >
            <IconoCerrar className="h-3.5 w-3.5" />
          </button>
        </div>

        {vacio ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <p className="titulo text-xl text-tenue">Todavía no agregas nada</p>
            <p className="text-sm text-tenue">
              Elige un paquete armado o agrega prendas sueltas del catálogo para ver el precio
              estimado de tu equipo.
            </p>
            <button
              type="button"
              onClick={cerrarPanel}
              className="mt-2 rounded-full bg-tinta px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
            >
              Ver el catálogo
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-tenue">Equipo</span>
                  <input
                    value={equipo}
                    onChange={(e) => setEquipo(e.target.value)}
                    placeholder="Ej. Tomateros"
                    className="w-full rounded-lg border border-linea bg-arena px-3 py-2 text-sm outline-none focus:border-tinta"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-tenue">Jugadores</span>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={jugadores}
                    onChange={(e) => setJugadores(Number(e.target.value))}
                    className="w-full rounded-lg border border-linea bg-arena px-3 py-2 text-sm outline-none focus:border-tinta [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </label>
              </div>

              {modeloElegido && (
                <p className="mt-3 rounded-lg border border-linea bg-arena px-3 py-2 text-xs text-tenue">
                  Modelo de uniforme:{" "}
                  <span className="font-semibold text-tinta">{modeloElegido}</span>
                </p>
              )}

              <ul className="mt-5 space-y-3">
                {resumen.lineas.map((l) => {
                  /*
                    La casaca del paquete se cotiza por acabado, y esos productos
                    no tienen foto propia: la que le toca es la del modelo de
                    referencia, que es el diseño que se va a producir. Su nombre
                    también va en el renglón, porque "Casaca bordado completo"
                    solo dice la técnica.
                  */
                  const esCasaca = l.producto.categoria === "casacas";
                  const foto = esCasaca ? disenoElegido?.foto : l.foto;
                  const detalle = esCasaca && disenoElegido ? [disenoElegido.nombre] : l.detalle;

                  return (
                    <li key={l.linea.id} className="tarjeta flex gap-3 p-3">
                      <div
                        className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg ${
                          esCasaca ? "bg-white" : "bg-arena"
                        }`}
                      >
                        <ProductoImagen producto={l.producto} foto={foto} sizes="64px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold leading-tight">{l.producto.nombre}</p>
                          <button
                            type="button"
                            onClick={() => quitar(l.linea.id)}
                            aria-label={`Quitar ${l.producto.nombre}`}
                            className="text-xs text-tenue transition-colors hover:text-tinta"
                          >
                            Quitar
                          </button>
                        </div>
                        {detalle.length > 0 && (
                          <p className="mt-0.5 text-xs text-tenue">{detalle.join(" · ")}</p>
                        )}
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <Stepper
                            valor={l.linea.cantidad}
                            onCambio={(n) => cambiarCantidad(l.linea.id, n)}
                          />
                          <div className="text-right">
                            <p className="text-sm font-bold">{precioMXN(l.subtotal)}</p>
                            <p className="text-[11px] text-tenue">{precioMXN(l.unitario)} c/u</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <ListaJugadores />

              <label className="mt-4 block">
                <span className="mb-1 block text-xs font-medium text-tenue">
                  Notas para el diseño (opcional)
                </span>
                <textarea
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  rows={3}
                  placeholder="Colores, logo, patrocinadores, fecha del torneo…"
                  className="w-full resize-none rounded-lg border border-linea bg-arena px-3 py-2 text-sm outline-none focus:border-tinta"
                />
              </label>

              <button
                type="button"
                onClick={limpiar}
                className="mt-3 text-xs text-tenue underline underline-offset-4 transition-colors hover:text-tinta"
              >
                Vaciar el paquete
              </button>
            </div>

            <div className="border-t border-linea bg-arena px-5 py-4">
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between text-tenue">
                  <dt>Subtotal ({resumen.piezas} piezas)</dt>
                  <dd>{precioMXN(resumen.subtotal)}</dd>
                </div>
                {resumen.descuentoMonto > 0 && (
                  <div className="flex justify-between text-tinta">
                    <dt>
                      Descuento por volumen ({Math.round(resumen.descuentoPorcentaje * 100)}%)
                    </dt>
                    <dd>&minus;{precioMXN(resumen.descuentoMonto)}</dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between border-t border-linea pt-2">
                  <dt className="titulo text-lg">Total estimado</dt>
                  <dd className="titulo text-2xl">{precioMXN(resumen.total)}</dd>
                </div>
                {jugadores > 0 && (
                  <div className="flex justify-between text-xs text-tenue">
                    <dt>Por jugador ({jugadores})</dt>
                    <dd>{precioMXN(porJugador)}</dd>
                  </div>
                )}
              </dl>

              {resumen.siguienteNivel && (
                <p className="mt-3 rounded-lg border border-linea bg-arena px-3 py-2 text-xs text-tenue">
                  Agrega {resumen.siguienteNivel.faltan}{" "}
                  {resumen.siguienteNivel.faltan === 1 ? "pieza" : "piezas"} más y el descuento sube
                  a {Math.round(resumen.siguienteNivel.porcentaje * 100)}%.
                </p>
              )}

              <a
                href={linkWhatsApp(mensaje)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-dorado px-4 py-3.5 text-[15px] font-semibold text-tinta transition-colors hover:bg-dorado-hover"
              >
                <IconoWhatsApp />
                Me interesa — mandar mi cotización
              </a>
              <p className="mt-2 text-center text-[11px] leading-relaxed text-tenue">
                Precio estimado, sin envío. Lo confirmamos junto con el diseño. Producción de{" "}
                {negocio.tiempoEntrega}.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
