| `jerseys/bordado/`  | Jerseys bordados                                                  |
| `jerseys/sublimado/`| Jerseys sublimados                                                |
| `jerseys/drifit/`   | Jerseys dry-fit                                                   |
| `jerseys/dama/`     | Jerseys corte dama                                                |
# JerseyHub

Catálogo web de jerseys, gorras y pantalones personalizados de béisbol y softbol.

No es una tienda en línea: el cliente arma el paquete de su equipo, ve el precio estimado y al
tocar **"Me interesa"** se abre WhatsApp con la cotización ya escrita.

Construido con Next.js 16 (App Router), React 19 y Tailwind CSS 4.

## Correr el proyecto

```bash
npm install
npm run dev
```

Abre http://localhost:3000

Otros comandos: `npm run build` (build de producción), `npm start` (servir el build), `npm run lint`.

## Qué se edita y dónde

Todo el contenido del sitio vive en dos archivos. No hace falta tocar los componentes.

### `src/lib/config.ts` — datos del negocio

Nombre, ciudad, **número de WhatsApp**, Instagram, tiempo de entrega, anticipo y los
**descuentos por volumen**.

```ts
whatsapp: "5216679472498",   // formato internacional, solo dígitos (52 + 1 + número)
```

Los descuentos por volumen son un ejemplo y **hay que revisarlos antes de publicar**:

```ts
export const descuentosPorVolumen = [
  { desde: 10, porcentaje: 0.05 },  // 10+ piezas → 5%
  { desde: 20, porcentaje: 0.08 },
  { desde: 30, porcentaje: 0.12 },
] as const;
```

Para quitarlos por completo, deja el arreglo vacío: `export const descuentosPorVolumen = [] as const;`

### `src/data/catalog.ts` — productos, opciones y paquetes

Los precios del catálogo son **de ejemplo**. Cada producto se ve así:

```ts
{
  slug: "jersey-sublimado-full",        // identificador único, no lo repitas
  nombre: "Jersey sublimado full color",
  categoria: "jerseys",                  // jerseys | pantalones | gorras | accesorios
  precio: 450,                           // precio por pieza, MXN
  minimo: 6,                             // piezas mínimas de este artículo
  destacado: true,                       // muestra la etiqueta "Popular"
  color: "#1d4ed8",                      // colores de la ilustración de respaldo
  colorSecundario: "#f8fafc",
  descripcion: "…",
  incluye: ["Diseño digital incluido", "Nombre y número"],
  opciones: [ /* ver abajo */ ],
}
```

Cada opción suma o resta al precio base con `extra`:

```ts
{
  id: "cuello",
  label: "Cuello",
  valores: [
    { id: "v", label: "V" },                              // sin extra = precio base
    { id: "botonado", label: "Botonado completo", extra: 70 },  // +$70 por pieza
    { id: "ninguna", label: "Sin nombre", extra: -30 },         // −$30 por pieza
  ],
}
```

El **primer valor de cada opción es el que viene seleccionado** y el que se usa para calcular
el precio "desde" de la tarjeta.

Los paquetes (`paquetes`) son combinaciones de productos por jugador; su precio se calcula solo
a partir de los productos que los componen:

```ts
{
  slug: "equipo-completo",
  nombre: "Paquete Equipo Completo",
  descripcion: "…",
  badge: "El más pedido",
  destacado: true,                       // le pone borde dorado y botón negro
  items: [
    { productoSlug: "jersey-sublimado-full", porJugador: 1 },
    { productoSlug: "gorra-sublimada-5-paneles", porJugador: 1 },
  ],
}
```

### Modelos de uniforme

El paso 1 del armador es elegir el **modelo**, y la elección viaja en el mensaje de WhatsApp.
Los modelos viven en el mismo `src/data/catalog.ts`:

```ts
{
  slug: "dodgers",
  nombre: "Dodgers",
  descripcion: "Blanco con letra script azul y número a contraste.",
  foto: "/productos/jerseys/dodgers-01.avif",
}
```

Si un modelo no tiene `foto`, se dibuja una ilustración de respaldo a partir de `patron`
("solido" | "rayas" | "degradado" | "bloques") y `colores` ([principal, secundario, detalle]).

**Son modelos de ejemplo**: cámbialos por los estilos que ustedes manejan, o por los nombres de
las corridas que ya han hecho. Además de la lista, el sitio siempre ofrece la opción "Diseño
nuevo" para quien quiere partir de cero.

Elegir modelo es opcional: si el cliente no escoge ninguno, la cotización sale igual y el
diseño se define por WhatsApp.

## Fotos

Viven en `public/productos/`, organizadas por tipo (ver `public/productos/README.txt`):

| Carpeta             | Para qué se usa                                                   |
| ------------------- | ----------------------------------------------------------------- |
| `jerseys/bordado/`   | Jerseys con twill bordado                                        |
| `jerseys/sublimado/` | Jerseys sublimados                                               |
| `jerseys/drifit/`    | Jerseys dry-fit                                                  |
| `jerseys/dama/`      | Jerseys de corte dama                                            |
| `gorras/`           | Foto principal de cada producto de gorra                          |
| `pantalones/`       | Variantes de color del pantalón clásico                           |
| `pantalones/mujer/` | Variantes de color del pantalón corte dama                        |
| `calcetas/`         | Variantes de color de las calcetas                                |
| `cinturon/`         | Variantes de color del cinturón                                   |

Hay tres lugares donde puede ir una foto:

```ts
// 1. Producto completo
{ slug: "gorra-bordada-6-paneles", foto: "/productos/gorras/yankees-01.jpg", … }

// 2. Valor de una opción — la foto cambia al elegir esa variante
{ id: "rojo", label: "Rojo", foto: "/productos/cinturon/rojo.jpg" }

// 3. Modelo de uniforme
{ slug: "dodgers", nombre: "Dodgers", foto: "/productos/jerseys/dodgers-01.avif" }
```

Las cuatro carpetas de `jerseys/` alimentan dos cosas a la vez: la foto de cada producto tipo
jersey y los modelos del paso 1. Un mismo archivo se puede usar en los dos lados.

Todo pasa por `src/components/ProductoImagen.tsx`, que muestra la foto si existe y si no dibuja
la ilustración de respaldo, así que **nunca se rompe una tarjeta por falta de imagen**.

> Si mueves o renombras un archivo hay que actualizar la ruta en `src/data/catalog.ts` (y en
> `src/components/Hero.tsx` si esa foto está en la vitrina del inicio). No hay búsqueda
> automática de archivos: una ruta que ya no existe deja el hueco en blanco.

Formato: cuadradas de preferencia (1000×1000), recortadas sobre fondo blanco. Se muestran con
`object-contain`, así que no se recorta la prenda aunque la proporción no sea exacta. Sirven jpg,
webp y avif.

> Las fotos que hay ahora son **de ejemplo** y vienen de tiendas (Nike, New Era). Antes de
> publicar hay que reemplazarlas por fotos propias de tu producción.

## Mercado Libre

Los productos que también se venden por pieza en Mercado Libre llevan un campo `mercadoLibre`
en `src/data/catalog.ts` con el link directo a la publicación:

```ts
{
  slug: "gorra-sublimada-5-paneles",
  mercadoLibre: "https://articulo.mercadolibre.com.mx/MLM-123456789-…",
  …
}
```

Cuando ese campo existe, la tarjeta del catálogo muestra el aviso *"También por pieza en Mercado
Libre"* y dentro del producto aparece el bloque que lleva a la publicación. Si borras la
línea, el botón desaparece de ese producto.

> Los tres links que vienen ahora (`ML_EJEMPLO_*` al inicio del archivo) son **de ejemplo**:
> apuntan a búsquedas de Mercado Libre, no a tus publicaciones. Reemplázalos por la URL exacta
> de cada anuncio.

También hay un `mercadoLibre` en `src/lib/config.ts` para el link de tu tienda; en cuanto lo
llenes aparece el botón en el pie de página.

## Logo

Está en `public/logo.jpeg` y se muestra con el componente `src/components/Logo.tsx`
(encabezado y pie de página). Como el archivo es negro sobre fondo blanco, la clase `.logo`
usa `mix-blend-multiply` para que ese blanco desaparezca sobre las superficies claras del sitio.

Sobre las bandas negras se usa `<Logo invertido />`, que aplica `.logo-invertido`
(`invert` + `mix-blend-screen`): el mismo archivo se pinta en blanco sin necesidad de una
segunda imagen.

Si consigues una versión en SVG o PNG con fondo transparente, cambia la ruta dentro de
`Logo.tsx` y ya. El ícono de la pestaña del navegador es aparte: `src/app/icon.svg`.

## Paleta

El tema es claro y neutro, tomado del logo (tinta negra sobre papel), con **tres bandas negras
que enmarcan la página**: el encabezado, el hero y el pie de página. El catálogo y todo el
contenido intermedio van en claro para que las fotos de producto se integren.

Los tokens están en `src/app/globals.css`, en el bloque `@theme`:

```css
--color-hueso:  #f4f2ee;   /* fondo de la página */
--color-papel:  #ffffff;   /* tarjetas */
--color-arena:  #ebe8e1;   /* campos de texto, pies de tarjeta */
--color-linea:  #ddd9d0;   /* bordes */
--color-tinta:  #17161a;   /* texto y botones principales */
--color-tenue:  #6f6b63;   /* texto secundario */

--color-oro:       #d9a441;  /* acento en rellenos: insignias, chips */
--color-oro-texto: #8a6212;  /* el mismo dorado, legible como texto */
```

El dorado tiene dos tonos a propósito: `oro` es para rellenos (siempre con texto tinta encima),
y `oro-texto` es la versión oscurecida que sí se lee sobre fondo claro. **Nunca uses `oro` para
texto chico**, no alcanza el contraste.

Dónde aparece el acento: etiquetas de sección, la segunda línea del título del hero, las
insignias "Popular" y "El más pedido", las palomitas de los paquetes, los números de "Cómo
funciona", el borde del paquete destacado, el descuento por volumen y el hover de las tarjetas.

Aparte del dorado, el único color del sitio es el verde de WhatsApp. El resto lo ponen los
productos.

## Iconos

Se usa [Font Awesome](https://fontawesome.com/search?o=r&m=free) (paquetes free-solid y
free-brands). Todos los iconos del sitio se declaran en un solo archivo,
`src/components/iconos.tsx`: para cambiar uno, importa otro icono ahí y el cambio se aplica en
toda la página.

## Cómo funciona la cotización

- El paquete que arma el cliente se guarda en `localStorage` (`jerseyhub.cotizacion.v1`), así que
  no se pierde si cierra la pestaña.
- Agregar algo **no** abre el panel: la confirmación es la barra fija de abajo, que muestra
  miniaturas de lo que llevas, las piezas, el total y los botones "Vaciar" y "Ver mi paquete".
  Eso está a propósito en `agregar` / `agregarPaquete` (`src/components/CotizacionProvider.tsx`);
  si prefieres que el panel se abra solo, ahí se agrega `setPanelAbierto(true)`.
- `src/lib/quote.ts` calcula precios unitarios, subtotales, descuento por volumen y arma el texto
  del mensaje de WhatsApp.
- El botón "Me interesa" abre `https://wa.me/<número>?text=<cotización>`; el cliente todavía tiene
  que darle enviar en WhatsApp, así que nada se manda sin que él lo apruebe.

## Publicar

El sitio es estático (`npm run build` genera todo prerenderizado). Sirve cualquier hosting de
Next.js; lo más directo es [Vercel](https://vercel.com): conectas el repo de GitHub y listo.

## Antes de publicar, revisa

- [ ] Número de WhatsApp en `src/lib/config.ts`
- [ ] Precios reales de todos los productos y sus opciones
- [ ] Mínimos por artículo
- [ ] Porcentajes de descuento por volumen (o quitarlos)
- [ ] Tiempo de entrega y anticipo
- [ ] **Links reales de Mercado Libre** (los actuales son de ejemplo)
- [ ] **Fotos propias** en `public/productos/` (las actuales son de tiendas, solo de muestra)
- [ ] Textos de preguntas frecuentes en `src/components/PreguntasFrecuentes.tsx`
