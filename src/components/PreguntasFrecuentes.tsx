import { IconoMas } from "@/components/iconos";
import { minimosUniformes, negocio } from "@/lib/config";

const preguntas = [
  {
    q: "¿Hacen el diseño original de mi equipo favorito o lo pueden cambiar?",
    a: "Las dos cosas. Te hacemos la casaca tal cual el diseño original del equipo, o la personalizamos por completo: le cambiamos los colores, le ponemos el nombre de tu equipo y hasta quitamos el logo original y ponemos el tuyo. Tú dices hasta dónde.",
  },
  {
    q: "¿Los precios de la página son finales?",
    a: "Son precios estimados para que te des una idea del costo del uniforme completo. El precio final lo confirmamos cuando nos escribes y definimos diseño, telas y cantidades exactas. No incluye envío.",
  },
  {
    q: "¿Hay pedido mínimo?",
    a: `Depende de la casaca: con un diseño del catálogo tal como viene son ${minimosUniformes.catalogo} uniformes, y si le ponemos el logo o el nombre de tu equipo son ${minimosUniformes.personalizada}. Las prendas sueltas del catálogo no tienen mínimo: puedes pedir una sola casaca o una gorra, escríbenos y te cotizamos.`,
  },
  {
    q: "¿Hacen descuento por cantidad?",
    a: "El paquete completo ya trae $100 de descuento por jugador frente a pedir las piezas por separado. Si tu pedido es grande, escríbenos con el número de uniformes y lo vemos.",
  },
  {
    q: "¿El diseño tiene costo?",
    a: "No. Te mandamos el boceto digital sin costo y lo ajustamos las veces necesarias antes de producir. Solo necesitamos tu logo (de preferencia en vector o PNG en alta) y los colores del equipo.",
  },
  {
    q: "¿Cuánto tardan en entregar?",
    a: `${negocio.tiempoEntrega} a partir de que apruebas el diseño y das el ${negocio.anticipo} de anticipo. En temporada alta de torneos puede alargarse, siempre te avisamos antes.`,
  },
  {
    q: "¿Cómo toman las tallas?",
    a: "Te compartimos la tabla de medidas y una lista para que anotes nombre, número y talla de cada jugador. También podemos mandarte muestras de talla si estás en Culiacán.",
  },
  {
    q: "¿Puedo comprar solo una pieza?",
    a: "Sí. Varios productos de venta individual están publicados en Mercado Libre; en el catálogo verás el aviso y el botón para ir directo a la publicación. Los uniformes con diseño propio sí son por equipo, pero si necesitas reponer una pieza de un diseño que ya produjimos, escríbenos y lo resolvemos.",
  },
  {
    q: "¿Cómo se paga?",
    a: `${negocio.anticipo} de anticipo para arrancar producción y el resto contra entrega. Aceptamos transferencia y efectivo.`,
  },
];

export function PreguntasFrecuentes() {
  return (
    <div className="space-y-3">
      {preguntas.map((item) => (
        <details
          key={item.q}
          /*
            Acordeón nativo: al compartir el mismo `name`, el navegador cierra
            la pregunta que estaba abierta al abrirse otra. Sin estado ni JS.
          */
          name="pregunta-frecuente"
          className="tarjeta sube group px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            {item.q}
            <IconoMas className="h-3 w-3 shrink-0 text-tenue transition-transform group-open:rotate-45" />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-tenue">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
