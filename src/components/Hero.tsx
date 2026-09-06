import { HeroFigura } from "@/components/HeroFigura";
import { IconoFlechaAbajo, IconoWhatsApp } from "@/components/iconos";
import { minimoUniformes, negocio } from "@/lib/config";
import { linkWhatsApp } from "@/lib/quote";

const datos = [
  { valor: `Desde ${minimoUniformes}`, texto: "uniformes por equipo" },
  { valor: negocio.tiempoEntrega.replace(" hábiles", ""), texto: "días de producción" },
  { valor: "100%", texto: "personalizable" },
];

export function Hero() {
  return (
    /*
      En escritorio el hero ocupa la pantalla completa menos el encabezado
      (que mide h-20 = 5rem y va sticky), y el contenido se centra en vertical.
      En móvil se queda con su alto natural: forzar 100vh ahí dejaría el texto
      apretado y la barra del navegador falsea la medida.
    */
    <section
      id="inicio"
      className="trama-hero relative overflow-hidden lg:flex lg:min-h-[calc(100svh-5rem)] lg:items-center"
    >
      {/*
        El halo se queda del lado izquierdo, detrás del texto: en escritorio
        alcanza como mucho la mitad de la columna del titular y nunca llega a
        la foto. Va antes que el contenido en el DOM y el contenido lleva
        `relative`, que es lo que lo deja pintado encima.
      */}
      <div
        aria-hidden="true"
        className="resplandor-hero pointer-events-none absolute -left-32 -top-20 h-96 w-96 rounded-full lg:-left-56 lg:top-1/2 lg:h-[40rem] lg:w-[40rem] lg:-translate-y-1/2"
      />

      {/*
        En móvil es una columna con tres bloques (texto, foto, datos) para que la
        foto quede justo después de los botones. En escritorio pasa a dos
        columnas y la foto ocupa toda la derecha.
      */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pb-16 pt-14 lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-x-12 lg:gap-y-8 lg:pb-24 lg:pt-16">
        <div className="text-center lg:col-start-1 lg:row-start-1 lg:text-left">
          <p className="etiqueta text-base text-tinta sm:text-lg">Bienvenido a {negocio.nombre}</p>
          <h1 className="titulo mt-4 text-5xl sm:text-6xl lg:text-7xl">
            Es el momento de
            <span className="text-dorado"> llevar tu estilo al campo</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-tenue lg:mx-0">
            Hacemos el jersey de tu equipo favorito en su diseño original, o{" "}
            <strong className="font-semibold text-tinta">
              lo personalizamos por completo con el nombre y los colores del tuyo
            </strong>
            . Arma tu paquete, mira el precio estimado y mándanoslo en un mensaje.
          </p>

          <div className="mx-auto mt-8 grid w-fit grid-cols-1 gap-3 sm:grid-cols-2 lg:mx-0">
            <a
              href="#paquetes"
              className="rounded-xl bg-tinta px-6 py-3.5 text-center font-semibold text-white transition-colors hover:bg-black"
            >
              Armemos un paquete
            </a>
            <a
              href={linkWhatsApp(
                `¡Hola ${negocio.nombre}! Quiero información sobre uniformes personalizados.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-dorado px-6 py-3.5 font-semibold text-tinta transition-colors hover:bg-dorado-hover"
            >
              <IconoWhatsApp />
              Escríbenos
            </a>
          </div>
        </div>

        <HeroFigura />

        <div className="text-center lg:col-start-1 lg:row-start-2 lg:text-left">
          <dl className="mx-auto grid max-w-lg grid-cols-3 gap-4 border-t border-linea pt-6 lg:mx-0">
            {datos.map((dato) => (
              <div key={dato.texto}>
                <dt className="titulo text-2xl">{dato.valor}</dt>
                <dd className="text-xs text-tenue">{dato.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/*
        Aviso de que la página sigue hacia abajo. Solo en escritorio: en móvil
        el hero no llena la pantalla y ya se ve el corte de la siguiente
        sección.
      */}
      <a
        href="#paquetes"
        aria-label="Ver los paquetes"
        className="animar-desliza absolute inset-x-0 bottom-7 mx-auto hidden h-10 w-10 place-items-center rounded-full bg-dorado text-tinta transition-colors hover:bg-dorado-hover lg:grid"
      >
        <IconoFlechaAbajo className="h-3.5 w-3.5" />
      </a>
    </section>
  );
}
