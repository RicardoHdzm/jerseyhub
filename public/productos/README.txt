Fotos del catálogo. Se referencian desde src/data/catalog.ts con rutas que
empiezan en /productos/...

Cómo está organizado:

  jerseys/bordado/    Jerseys con twill bordado.
  jerseys/sublimado/  Jerseys sublimados.
  jerseys/drifit/     Jerseys dry-fit de línea económica.
  jerseys/dama/       Jerseys de corte dama.

                      Estas cuatro alimentan dos cosas: la `foto` de cada
                      producto tipo jersey y los MODELOS de uniforme del paso 1
                      del armador (arreglo `modelos`). Un mismo archivo puede
                      usarse en los dos lados.

  gorras/             Foto principal de cada producto de gorra.

  pantalones/         Variantes de color del pantalón clásico: blanco, gris, negro.
  pantalones/mujer/   Variantes de color del pantalón corte dama: blanco, negro.
  calcetas/           Variantes de color de las calcetas: negras, blancas,
                      rojas, azules, verdes.
  cinturon/           Variantes de color del cinturón: negro, rojo, azul.

                      Estas cuatro van como `foto` dentro de cada valor de la
                      opción "Color"; la imagen cambia al elegir el color.

OJO: si mueves o renombras un archivo, hay que actualizar la ruta en
src/data/catalog.ts (y en src/components/Hero.tsx si esa foto está en la
vitrina del inicio). No hay búsqueda automática de archivos.

Formato: cuadrada de preferencia (1000x1000), recortada sobre fondo blanco.
El sitio las muestra con object-contain, así que no se recorta la prenda aunque
la proporción no sea exacta. Sirven jpg, webp y avif.

Si un producto o modelo no tiene foto, el sitio dibuja una ilustración de
respaldo con los colores que trae en el catálogo. No se rompe nada.
