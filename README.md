# La Noche de Ana

Juego SPA creado con Vue y Vite para la despedida de Ana y José. Ofrece tres modos:

- **Cartas**: seleccionas un palo y tocas el mazo para sacar consignas que giran alrededor de confesiones, posturas grupales o desafíos de tono más íntimo en el palo *picante*.
- **Retos**: pulsa *Nuevo reto* para obtener acciones que mezclan baile, confesiones y juegos con prendas.
- **Botón del Caos**: un botón grande que genera una acción espontánea con vibración y animación.

## Desarrollo local

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Arranca el entorno de desarrollo (hot reload):
   ```bash
   npm run dev
   ```
3. Para construir una versión lista para producción:
   ```bash
   npm run build
   ```
4. Si quieres previsualizar ese build:
   ```bash
   npm run preview
   ```

## Estructura relevante

- `src/App.vue`: todo el layout, los modos y la lógica de cartas/retos/caos.
- `src/styles.css`: variables globales y reset básico.
- `vite.config.js`: configuración mínima para servir la app con base relativa (`base: './'`).

## Despliegue

La app es estática: basta con publicar el contenido de `dist/` en cualquier hosting (Vercel, Netlify, GitHub Pages). Si usas Vercel, conecta el repo y apunta al comando `npm run build`. Para activar el favicon del corazón la app ya lo incluye en `index.html`.
