# La Noche de Ana

Juego interactivo para la despedida de Ana y José con tres modos: *Cartas*, *Retos* y *Botón del Caos*. El modo Cartas reparte consignas por palo (picante, bebida, grupal, vergüenza, diversión y novia) y ahora el palo picante solo contiene retos de tono más íntimo/sexual. El modo Retos mezcla ideas de acciones, confesiones y cambios de prenda, y el Botón del Caos genera frases espontáneas.

## Cómo usarlo

1. Abrir `index.html` en cualquier navegador moderno (no necesita servidor).
2. En el menú inicial elegir un modo:
   * **Cartas**: selecciona un palo y toca el mazo; el botón “Otra carta” aparece para repetir el desafío. Hay un botón “Barajar de nuevo” que vuelve a llenar el mazo de ese palo o de todos.
   * **Retos**: pulsa “Nuevo reto” y se muestra una consigna aleatoria de la larga lista.
   * **Botón del Caos**: pulsa el botón grande y vibrará (si el dispositivo lo permite) mientras muestra la acción.

## Desarrollo

- El único script es `app.js`, que gestiona la navegación SPA y los tres modos.
- Los estilos están en `styles.css`, con gradients, tipografía Delius y animaciones suaves.
- No hay dependencias externas ni bundlers; basta con editar los archivos y recargar el navegador.

## Sugerencias para el repo

- Nombre sugerido: `la-noche-de-ana`.
- Inicia el repositorio con `git init`, crea el primer commit y añade un remoto en tu cuenta.
- Para desplegar, cualquier hosting de sitios estáticos (Vercel/Netlify) sirve: selecciona la carpeta y apunta a `index.html`.
