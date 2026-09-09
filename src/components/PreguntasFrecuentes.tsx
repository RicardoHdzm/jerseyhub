import { IconoMas } from "@/components/iconos";
import { descuentosPorVolumen, minimoUniformes, negocio } from "@/lib/config";

const nivelMasAlto = [...descuentosPorVolumen].sort(
  (a, b) => b.porcentaje - a.porcentaje,
)[0];
const nivelMasBajo = [...descuentosPorVolumen].sort(
  (a, b) => a.desde - b.desde,
)[0];

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
    a: `Para uniformes de equipo el mínimo es de ${minimoUniformes}. Las prendas sueltas del catálogo no tienen mínimo: puedes pedir una sola casaca o una gorra, escríbenos y te cotizamos.`,
  },
  {
    q: "¿Hacen descuento por cantidad?",
    a: nivelMasBajo
      ? `Sí. A partir de ${nivelMasBajo.desde} piezas se aplica descuento automático, y llega hasta ${Math.round(
          nivelMasAlto.porcentaje * 100,
        )}% en pedidos grandes. La página ya te lo calcula mientras armas el paquete.`
      : "Escríbenos con el volumen de tu pedido y te cotizamos.",
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
          className="tarjeta group px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
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
