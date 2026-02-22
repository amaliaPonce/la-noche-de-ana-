# La Noche de Ana

Juego SPA creado con Vue y Vite para la despedida de soltera de Ana. Ofrece tres modos:

- **Cartas**: selecciona un palo y toca el mazo para sacar consignas de confesiones, posturas grupales o desafíos de tono más íntimo en el palo *picante*.
- **Retos**: pulsa *Nuevo reto* para obtener acciones que mezclan baile, confesiones y juegos con prendas.
- **Botón del Caos**: un botón que genera una acción espontánea con vibración y animación.

**Demo:** [la-noche-de-ana.vercel.app](https://la-noche-de-ana.vercel.app)

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
4. Para previsualizar el build:
   ```bash
   npm run preview
   ```

## Estructura del proyecto

- `src/App.vue` — layout principal, navegación entre modos
- `src/components/` — HomePanel, CartasPanel, RetosPanel, ChaosPanel
- `src/data/` — cartas.js, retos.js, chaos.js, misiones.js (contenido del juego)
- `src/styles.css` — variables globales y estilos compartidos
- `vite.config.js` — configuración con base relativa (`base: './'`)

## Despliegue

La app es estática: publica el contenido de `dist/` en cualquier hosting (Vercel, Netlify, GitHub Pages). Con Vercel, conecta el repo y usa `npm run build`. El favicon del corazón está incluido en `index.html`.
