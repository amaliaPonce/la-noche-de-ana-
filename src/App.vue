<template>
  <div class="app-shell">
    <header class="app-header">
      <p class="app-subtitle">despedida de Ana</p>
    </header>

    <main class="screen-wrapper">
      <section v-if="currentMode === 'home'" class="panel home-panel">
          <div class="home-content">
            <h1 class="app-title">La Noche de Ana</h1>
            <p class="app-body">Elige Cartas, Retos o el Botón del Caos.</p>
            <p class="home-note">aqui una frase para ana.</p>
            <div class="mode-grid">
              <button v-for="mode in modeButtons" :key="mode.value" type="button" class="mode-btn" :class="mode.value" @click="setMode(mode.value)">
                {{ mode.label }}
              </button>
            </div>
        </div>
        <div class="decorative-svgs home-decor" aria-hidden="true">
          <img
            v-for="shape in decorativeSvgShapes"
            :key="shape.id"
            :src="shape.src"
            :class="['decorative-svg', shape.variant]"
            :style="shape.style"
            alt=""
            role="presentation"
          />
        </div>
      </section>

      <section v-else-if="currentMode === 'cartas'" class="panel">
        <button type="button" class="back-btn" @click="setMode('home')">← Volver</button>
        <div class="panel-header panel-header--cartas">
          <div class="panel-header__title-row">
            <h2>Cartas</h2>
          </div>
        </div>
        <div class="palos-grid">
          <button v-for="palo in palos" :key="palo.value" type="button" class="palo-btn" :class="{ selected: selectedPalo === palo.value }" @click="handlePaloSelect(palo.value)">
            <span class="palo-name">{{ palo.label }}</span>
            <span class="palo-note">{{ palo.note }}</span>
          </button>
        </div>
        <div class="deck-wrapper">
          <div class="deck" :class="{ 'deck--inactive': !selectedPalo }" @click="handleDeckClick">
            <div class="card" :class="{ flipped: isCardFlipped }">
              <div class="card__face card__face--back"></div>
              <div class="card__face card__face--front">
                <span class="card__palo">{{ cardPaloLabel }}</span>
                <p class="card__text">{{ cardBody }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="actions">
          <button v-if="shuffleVisible" type="button" class="action-btn" @click.stop="handleShuffle">Barajar de nuevo</button>
        </div>
      </section>

      <section v-else-if="currentMode === 'retos'" class="panel">
        <button type="button" class="back-btn" @click="setMode('home')">← Volver</button>
        <div class="panel-header panel-header--retos">
          <div class="panel-header__title-row">
            <h2>Retos</h2>
          </div>
        </div>
        <div class="reto-filters">
          <div class="filter-group">
            <p class="filter-title">Categoría</p>
            <div class="filter-options">
              <button
                v-for="option in RETO_CATEGORY_OPTIONS"
                :key="option.value"
                type="button"
                class="filter-btn"
                :class="{ 'filter-btn--active': selectedRetoCategory === option.value }"
                @click="selectedRetoCategory = option.value"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
          <div class="filter-group">
            <p class="filter-title">Intensidad</p>
            <div class="filter-options">
              <button
                v-for="option in RETO_INTENSITY_OPTIONS"
                :key="option.value"
                type="button"
                class="filter-btn"
                :class="{ 'filter-btn--active': selectedRetoIntensity === option.value }"
                @click="selectedRetoIntensity = option.value"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
        </div>
        <div class="reto-meta">
          <span v-if="retoMeta" class="reto-meta__chip">{{ RETO_CATEGORY_LABELS[retoMeta.categoria] }}</span>
          <span v-if="retoMeta" class="reto-meta__chip">{{ RETO_INTENSITY_LABELS[retoMeta.intensidad] }}</span>
          <span class="reto-meta__status">{{ retoDeckCountLabel }}</span>
        </div>
        <div class="reto-card" :class="{ 'reto-card--show': retoDisplay }">
          <p class="reto-card__text">{{ retoDisplay }}</p>
        </div>
        <button type="button" class="action-btn big" @click="nuevoReto">Nuevo reto</button>
      </section>

      <section v-else class="panel">
        <button type="button" class="back-btn" @click="setMode('home')">← Volver</button>
        <div class="panel-header">
          <h2>Botón del Caos</h2>
        </div>
        <div class="chaos-result-wrap">
          <p class="caos-result" :class="{ show: caosResult }">{{ caosResult || 'Pulsa el botón y vibra con la acción' }}</p>
        </div>
        <div class="chaos-wrap" :class="{ pulse: chaosPulse }">
          <button type="button" class="chaos-btn" @click="triggerChaos">♥ ¡APRIETA! ♥</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';

const decorativeSvgShapes = [
  {
    id: 'shape-1',
    src: new URL('./img/1.svg', import.meta.url).href,
    variant: 'glow1',
    style: {
      top: '-3%',
      left: '5%',
      transform: 'rotate(-12deg) scale(1.35)',
      opacity: '1'
    }
  },
  {
    id: 'shape-2',
    src: new URL('./img/2.svg', import.meta.url).href,
    variant: 'glow2',
    style: {
      top: '-2%',
      right: '30%',
      transform: 'rotate(8deg) scale(1.05)',
      opacity: '0.95'
    }
  },
  {
    id: 'shape-11',
    src: new URL('./img/11.svg', import.meta.url).href,
    variant: 'glow2',
    style: {
      top: '11%',
      left: '-7%',
      transform: 'rotate(4deg) scale(1.15)',
      opacity: '0.9'
    }
  },
  {
    id: 'shape-3',
    src: new URL('./img/3.svg', import.meta.url).href,
    variant: 'glow3',
    style: {
      bottom: '42%',
      left: '-4%',
      transform: 'rotate(-4deg) scale(0.9)',
      opacity: '0.9'
    }
  },
  {
    id: 'shape-12',
    src: new URL('./img/12.svg', import.meta.url).href,
    variant: 'glow4',
    style: {
      bottom: '2%',
      left: '12%',
      transform: 'rotate(-14deg) scale(1.25)',
      opacity: '0.95'
    }
  },
  {
    id: 'shape-4',
    src: new URL('./img/4.svg', import.meta.url).href,
    variant: 'glow4',
    style: {
      bottom: '6%',
      right: '10%',
      transform: 'rotate(6deg) scale(1.25)',
      opacity: '0.95'
    }
  },
  {
    id: 'shape-9',
    src: new URL('./img/9.svg', import.meta.url).href,
    variant: 'glow3',
    style: {
      bottom: '32%',
      right: '-4%',
      transform: 'rotate(-20deg) scale(1.2)',
      opacity: '0.88'
    }
  },
  {
    id: 'shape-14',
    src: new URL('./img/14.svg', import.meta.url).href,
    variant: 'glow5',
    style: {
      bottom: '24%',
      right: '74%',
      transform: 'rotate(-6deg) scale(1.5)',
      opacity: '0.9'
    }
  },
  {
    id: 'shape-5',
    src: new URL('./img/5.svg', import.meta.url).href,
    variant: 'glow5',
    style: {
      top: '0%',
      left: '64%',
      transform: 'rotate(10deg) scale(1)',
      opacity: '0.95'
    }
  },
  {
    id: 'shape-13',
    src: new URL('./img/13.svg', import.meta.url).href,
    variant: 'glow1',
    style: {
      top: '38%',
      right: '-5%',
      transform: 'rotate(40deg) scale(1)',
      opacity: '0.9'
    }
  },
  {
    id: 'shape-6',
    src: new URL('./img/6.svg', import.meta.url).href,
    variant: 'glow6',
    style: {
      top: '8%',
      right: '-6%',
      transform: 'rotate(18deg) scale(1.35)',
      opacity: '0.9'
    }
  }
];

const modeButtons = [
  { value: 'cartas', label: 'Cartas' },
  { value: 'retos', label: 'Retos' },
  { value: 'caos', label: 'Botón del Caos' }
];

const palos = [
  { value: 'picante', label: 'Picante', note: 'Frases sugerentes para encender miradas.' },
  { value: 'grupal', label: 'Grupal', note: 'Acciones que abrazan al equipo.' },
  { value: 'confesion', label: 'Confesión', note: 'Verdades tiernas o atrevidas para Ana.' },
  { value: 'baile', label: 'Baile', note: 'Pasos sensoriales para dominar la pista.' }
];

const PALO_LABELS = {
  picante: 'Picante',
  grupal: 'Grupal',
  confesion: 'Confesión',
  baile: 'Baile'
};

const CARTAS = [
  { palo: 'picante', texto: 'Describe la fantasía más dulce con tres actos y termina con un suspiro.' },
  { palo: 'picante', texto: 'Haz una pose suave y di “este es mi plan perfecto” con voz baja.' },
  { palo: 'picante', texto: 'Susurra un detalle atrevido que aún no te has atrevido a compartir.' },
  { palo: 'picante', texto: 'Cuenta el gesto más sexy que has hecho y qué lo convirtió en especial.' },
  { palo: 'picante', texto: 'Dibuja un beso prohibido en el aire y deja que el grupo lo adivine.' },
  { palo: 'picante', texto: 'Nombra una prenda que quisieras quitar lentamente y por qué te encanta.' },
  { palo: 'picante', texto: 'Describe un plan de baile íntimo que sólo tú puedes imaginar.' },
  { palo: 'picante', texto: 'Relata un momento en el que te sentiste irresistible sin decir una palabra.' },
  { palo: 'grupal', texto: 'Todos abrazad a la persona de enfrente y digan algo bonito de Ana.' },
  { palo: 'grupal', texto: 'Formen un círculo y compartan qué energía aporta cada una a la noche.' },
  { palo: 'grupal', texto: 'Inventen un brindis conjunto y repítanlo con una mirada cómplice.' },
  { palo: 'grupal', texto: 'El grupo crea una coreografía de risas de 10 segundos.' },
  { palo: 'grupal', texto: 'Canten “Por Ana” con una palabra inventada y manos arriba.' },
  { palo: 'grupal', texto: 'Cuéntenle a Ana una anécdota que sólo este grupo comprende.' },
  { palo: 'grupal', texto: 'Hagan el gesto secreto de la noche y celebren con un chorrito de alegría.' },
  { palo: 'confesion', texto: 'Confiesa qué emoción te da más nervios mirando la boda.' },
  { palo: 'confesion', texto: 'Admite un deseo tierno que guardas para Ana.' },
  { palo: 'confesion', texto: 'Comparte un secreto alegre sobre el grupo que nadie espere.' },
  { palo: 'confesion', texto: 'Di una verdad suave que te hace sentir libre.' },
  { palo: 'confesion', texto: 'Canta una línea que diga “te admiro” y explica por qué.' },
  { palo: 'confesion', texto: 'Recuerda un instante vulnerable que unió al grupo.' },
  { palo: 'baile', texto: 'Baila despacio mientras las demás dibujan olas con las manos.' },
  { palo: 'baile', texto: 'Improvisa un paso con palmas y un roce suave al final.' },
  { palo: 'baile', texto: 'Haz un giro dramático y termina con una reverencia juguetona.' },
  { palo: 'baile', texto: 'Mueve las caderas como si el ritmo fuera tu susurro favorito.' },
  { palo: 'baile', texto: 'Marca un paso de ocho tiempos con un guiño coqueto.' },
  { palo: 'baile', texto: 'Propón un duelo de pisadas suaves y ciérralo con una risa.' }
];

const RETOS = [
  { texto: 'Invita a dos personas a brindar juntas con un chupito y una mirada intensa.', categoria: 'grupal', intensidad: 'medio' },
  { texto: 'Confiesa qué acto pequeño te hace sentir más cerca de Ana.', categoria: 'confesion', intensidad: 'suave' },
  { texto: 'Baila 20 segundos con alguien usando solo los hombros.', categoria: 'baile', intensidad: 'medio' },
  { texto: 'Describe la escena de tu cita picante favorita en tres frases y termina con un “te provoca”.', categoria: 'picante', intensidad: 'medio' },
  { texto: 'El grupo repite una palabra cariñosa mientras hacen un círculo sonoro.', categoria: 'grupal', intensidad: 'suave' },
  { texto: 'Cuenta un deseo para Ana que te gustaría cumplir antes de la boda.', categoria: 'confesion', intensidad: 'medio' },
  { texto: 'Crea un paso improvisado con palmas y dilo en voz alta.', categoria: 'baile', intensidad: 'medio' },
  { texto: 'Dibuja con tu dedo en el aire una prenda prohibida y deja que el grupo la nombre.', categoria: 'picante', intensidad: 'medio' },
  { texto: 'Todos cuentan un recuerdo que la noche no puede olvidar.', categoria: 'grupal', intensidad: 'medio' },
  { texto: 'Confiesa qué emoción te sorprende cada vez que miras a Ana.', categoria: 'confesion', intensidad: 'medio' },
  { texto: 'Baila un paso lento y di el nombre de una canción antes de girar.', categoria: 'baile', intensidad: 'medio' },
  { texto: 'Invita a alguien a un brindis secreto con un chupito y una sonrisa tenue.', categoria: 'picante', intensidad: 'medio' },
  { texto: 'El grupo crea un brindis donde cada persona dice algo que admira.', categoria: 'grupal', intensidad: 'suave' },
  { texto: 'Confiesa qué palabra define tu historia con Ana.', categoria: 'confesion', intensidad: 'medio' },
  { texto: 'Haz un paso de baile con un suspiro al final que inspire a las demás.', categoria: 'baile', intensidad: 'medio' },
  { texto: 'Cuenta un deseo atrevido que incluirías en la luna de miel.', categoria: 'picante', intensidad: 'atrevido' },
  { texto: 'Todas dan un aplauso con ritmo y suman una frase de agradecimiento.', categoria: 'grupal', intensidad: 'medio' },
  { texto: 'Confiesa una emoción que da miedo admitir y termina con un brindis.', categoria: 'confesion', intensidad: 'medio' },
  { texto: 'Baila ocho tiempos y terminen con una reverencia elegante.', categoria: 'baile', intensidad: 'medio' },
  { texto: 'Describe un secreto sensual y deja que el grupo pregunte si es verdad.', categoria: 'picante', intensidad: 'medio' }
];

const RETO_CATEGORY_OPTIONS = [
  { value: 'todos', label: 'Todas' },
  { value: 'grupal', label: 'Grupal' },
  { value: 'confesion', label: 'Confesión' },
  { value: 'picante', label: 'Picante' },
  { value: 'baile', label: 'Baile' }
];

const RETO_INTENSITY_OPTIONS = [
  { value: 'todos', label: 'Todas' },
  { value: 'suave', label: 'Suave' },
  { value: 'medio', label: 'Medio' },
  { value: 'atrevido', label: 'Atrevido' }
];

const RETO_CATEGORY_LABELS = RETO_CATEGORY_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

const RETO_INTENSITY_LABELS = RETO_INTENSITY_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

const selectedRetoCategory = ref('todos');
const selectedRetoIntensity = ref('todos');
const retoDeck = ref([]);
const retoMeta = ref(null);
const deckNeedsShuffle = ref(false);

const retoDeckCountLabel = computed(() => {
  if (deckNeedsShuffle.value && retoDeck.value.length === 0) {
    return 'Se rebaraja tras terminar el deck';
  }
  return `${retoDeck.value.length} reto${retoDeck.value.length === 1 ? '' : 's'} restantes`;
});

const CAOS_ACTIONS = [
  'Todas beben',
  'Solo bebe Ana',
  'Cambio de asiento',
  'Abrazo grupal',
  'Chupito obligatorio',
  'Ana elige quién bebe',
  'Todas al unísono: "¡Por Ana!"',
  'La persona más cercana a Ana bebe',
  'Quien tenga el pelo más largo bebe',
  'Abrazo en cadena (una a una)',
  'La última en reír bebe',
  'Todas dan un beso en la mejilla a Ana',
  'Chupito en parejas: elige a alguien y bebéis juntas',
  'Ana elige la siguiente acción del caos',
  'Cambio de asiento: todas una silla a la derecha',
  'Quien tenga el móvil más cerca bebe',
  'Gritad "¡Despedida!" a la de tres',
  'La persona a la izquierda de Ana bebe',
  'Todas hacéis un brindis en verso',
  'Ana da un chupito a quien ella quiera',
  'Abrazo grupal de 10 segundos',
  'Quien no tenga las manos en la mesa bebe',
  'La más reciente en llegar bebe',
  'Todas tomáis un chupito',
  'Ana elige quién hace el siguiente reto',
  'Cambio de asiento al azar',
  'Quien tenga el anillo más bonito bebe',
  'Todas decís un piropo a Ana en 5 segundos',
  'La persona que tenga el vaso más lleno bebe',
  'Abrazo grupal y foto'
];

const currentMode = ref('home');
const selectedPalo = ref(null);
const currentCard = ref(null);
const isCardFlipped = ref(false);
const shuffleVisible = ref(false);
const cartasPoolByPalo = reactive({
  picante: [],
  grupal: [],
  confesion: [],
  baile: []
});
const cartasPoolAll = ref([]);
const retoDisplay = ref('Toca el botón para tu primer reto');
const caosResult = ref('');
const chaosPulse = ref(false);

const cardPaloLabel = computed(() => {
  if (currentCard.value) return PALO_LABELS[currentCard.value.palo] || currentCard.value.palo;
  if (selectedPalo.value && selectedPalo.value !== 'cualquiera') return PALO_LABELS[selectedPalo.value];
  return 'Cartas';
});

const cardBody = computed(() => currentCard.value?.texto || 'Selecciona Picante, Grupal, Confesión o Baile y toca el mazo.');

function getFilteredRetos() {
  return RETOS.filter((reto) => {
    const matchesCategory = selectedRetoCategory.value === 'todos' || reto.categoria === selectedRetoCategory.value;
    const matchesIntensity = selectedRetoIntensity.value === 'todos' || reto.intensidad === selectedRetoIntensity.value;
    return matchesCategory && matchesIntensity;
  });
}

function shuffleList(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function resetRetoDeck() {
  const filtered = getFilteredRetos();
  if (filtered.length === 0) {
    retoDeck.value = [];
    retoMeta.value = null;
    retoDisplay.value = 'Sin retos para esta combinación. Cambia el filtro.';
    deckNeedsShuffle.value = false;
    return;
  }
  retoDeck.value = shuffleList(filtered);
  deckNeedsShuffle.value = false;
}

watch([selectedRetoCategory, selectedRetoIntensity], resetRetoDeck, { immediate: true });

function setMode(mode) {
  currentMode.value = mode;
  if (mode !== 'cartas') {
    resetSelection();
  }
}

function handlePaloSelect(palo) {
  selectedPalo.value = palo;
  currentCard.value = null;
  isCardFlipped.value = false;
  shuffleVisible.value = false;
  if (palo !== 'cualquiera') {
    getPoolForPalo(palo);
  }
}

function getPoolForPalo(palo) {
  if (cartasPoolByPalo[palo].length === 0) {
    cartasPoolByPalo[palo] = CARTAS.filter((c) => c.palo === palo).slice();
  }
  return cartasPoolByPalo[palo];
}

function getRandomCartaFromPalo(palo) {
  let pool;
  if (palo === 'cualquiera') {
    if (cartasPoolAll.value.length === 0) {
      cartasPoolAll.value = CARTAS.slice();
    }
    pool = cartasPoolAll.value;
  } else {
    pool = getPoolForPalo(palo);
  }

  if (pool.length === 0) return null;
  const index = Math.floor(Math.random() * pool.length);
  const [carta] = pool.splice(index, 1);

  if (palo === 'cualquiera') {
    cartasPoolAll.value = pool;
    shuffleVisible.value = pool.length === 0;
  } else {
    cartasPoolByPalo[palo] = pool;
    shuffleVisible.value = pool.length === 0;
  }

  return carta;
}

function handleDeckClick() {
  if (!selectedPalo.value) return;
  if (isCardFlipped.value) {
    isCardFlipped.value = false;
    return;
  }
  drawCard();
}

function drawCard() {
  if (!selectedPalo.value) return;
  const carta = getRandomCartaFromPalo(selectedPalo.value);
  if (!carta) return;
  currentCard.value = carta;
  isCardFlipped.value = true;
}

function handleShuffle() {
  if (!selectedPalo.value) return;
  if (selectedPalo.value === 'cualquiera') {
    cartasPoolAll.value = [];
  } else {
    cartasPoolByPalo[selectedPalo.value] = [];
  }
  shuffleVisible.value = false;
  isCardFlipped.value = false;
  currentCard.value = null;
}


function resetSelection() {
  selectedPalo.value = null;
  currentCard.value = null;
  isCardFlipped.value = false;
  shuffleVisible.value = false;
}

function nuevoReto() {
  if (retoDeck.value.length === 0) {
    resetRetoDeck();
  }
  if (retoDeck.value.length === 0) {
    return;
  }
  const reto = retoDeck.value.pop();
  retoDisplay.value = reto.texto;
  retoMeta.value = reto;
  deckNeedsShuffle.value = retoDeck.value.length === 0;
}

function triggerChaos() {
  caosResult.value = CAOS_ACTIONS[Math.floor(Math.random() * CAOS_ACTIONS.length)];
  chaosPulse.value = true;
  vibrate();
  setTimeout(() => {
    chaosPulse.value = false;
  }, 600);
}

function vibrate() {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    navigator.vibrate([50, 30, 50]);
  }
}
</script>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
  padding-bottom: 40px;
  background: #7a003c;
  color: #ffeef8;
  display: flex;
  flex-direction: column;
  font-family: var(--font);
  overflow: hidden;
}

.screen-wrapper {
  flex: 1;
}

.app-header {
  text-align: center;
  padding: 28px 0 0;
}

.app-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: inherit;
  margin-bottom: 12px;
}


.panel {
  position: relative;
  padding: 32px 20px;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.home-panel {
  padding-top: 80px;
}

.panel-header h2 {
  font-size: 1.8rem;
  margin-bottom: 6px;
  color: #fff;
  font-family: inherit;
}

.panel-header p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  font-family: inherit;
}

.panel-header--retos {
  gap: 6px;
}

.panel-header--cartas {
  gap: 6px;
}

.panel-header__title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-title {
  font-size: clamp(2.6rem, 9vw, 3.5rem);
  color: #fff;
  margin-bottom: 10px;
  text-align: center;
}

.app-body {
  color: rgba(255, 255, 255, 0.95);
  text-align: center;
  margin: 0 auto 28px;
  max-width: 580px;
  font-size: 1.15rem;
  line-height: 1.6;
}

.home-note {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  margin-bottom: 24px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
}

.mode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 18px;
  justify-items: center;
  width: min(960px, 100%);
  margin: 0 auto;
}

.mode-btn {
  border: none;
  border-radius: 26px;
  padding: 22px 16px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #3b0020;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-family: inherit;
  font-family: var(--title-font);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: #fffdf8;
  border: 4px solid rgba(200, 27, 91, 0.95);
  box-shadow: inset 0 0 0 2px rgba(200, 27, 91, 0.8), 0 18px 30px rgba(74, 0, 40, 0.45);
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.85);
  max-width: 220px;
  width: 100%;
}

.mode-btn:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: inset 0 0 0 2px rgba(200, 27, 91, 0.9), 0 18px 30px rgba(74, 0, 40, 0.45);
}

.mode-btn.retos {
  color: #4f0026;
  background: #fff7fb;
}

.mode-btn.caos {
  color: #4a0024;
  background: #ffeef4;
}

@media (max-width: 640px) {
  .mode-grid {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 0 12px;
  }

  .mode-btn {
    width: min(200px, 85vw);
    font-size: 1.05rem;
  }

  .mode-btn.caos {
    justify-self: center;
  }
}

.palos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 18px;
  max-width: 960px;
  margin: 0 auto;
}

.palo-btn {
  border-radius: 24px;
  padding: 20px;
  font-size: 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
  font-family: inherit;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.08);
  text-align: center;
}

.palo-name {
  font-weight: 700;
  letter-spacing: 0.04em;
}

.palo-note {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 160px;
}

.palo-btn.selected {
  border-color: rgba(255, 255, 255, 0.9);
  color: #fff;
  background: linear-gradient(145deg, #d80069, #90003b);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
}

.cancel-btn,
.back-btn {
  border: none;
  background: transparent;
  color: #fff;
  padding: 0;
  cursor: pointer;
}

.back-btn {
  font-size: 1.45rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  font-family: inherit;
  line-height: 1.2;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.deck-wrapper {
  display: flex;
  justify-content: center;
}

.deck {
  width: min(220px, 70vw);
  height: min(300px, 90vw);
  perspective: 1200px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.deck--inactive {
  opacity: 0.3;
  pointer-events: none;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card__face {
  position: absolute;
  inset: 0;
  border-radius: 22px;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.3);
}

.card__face--back {
  background: linear-gradient(145deg, #f06292, #a21264);
}

.card__face--back::after {
  content: '♥';
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.9);
}

.card__face--front {
  background: linear-gradient(145deg, #fff4f8, #ffd9ec);
  transform: rotateY(180deg);
}

.card__palo {
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  padding: 4px 14px;
  border-radius: 999px;
  background: rgba(198, 20, 87, 0.15);
  color: #c2185b;
}

.card__text {
  margin-top: 12px;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
  color: #3d1532;
  font-family: inherit;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.action-btn {
  border: none;
  border-radius: 28px;
  padding: 14px 24px;
  background: rgba(255, 255, 255, 0.95);
  font-weight: 600;
  color: #c2185b;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  font-family: inherit;
}

.action-btn.big {
  width: 100%;
  max-width: 360px;
  background: linear-gradient(145deg, #f06292, #d60b67);
  color: #fff;
  font-size: 1.45rem;
  padding: 20px 28px;
}

.reto-card {
  min-height: 160px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-size: 1.15rem;
  text-align: center;
  color: #3d1532;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  font-family: inherit;
}

.reto-filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.filter-group {
  flex: 1;
  min-width: 160px;
}

.filter-title {
  margin-bottom: 6px;
  font-weight: 600;
  color: #fff;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-btn {
  border: 1px solid rgba(255, 255, 255, 0.65);
  background: transparent;
  color: #fff;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.filter-btn--active {
  background: rgba(255, 255, 255, 0.95);
  color: #c2185b;
  border-color: #fff;
}

.reto-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.95rem;
}

.reto-meta__chip {
  background: rgba(255, 255, 255, 0.9);
  color: #c2185b;
  padding: 4px 12px;
  border-radius: 999px;
  font-weight: 600;
}

.reto-meta__status {
  font-weight: 600;
}

.caos-result {
  min-height: 88px;
  margin-top: 12px;
  font-weight: 600;
  font-size: 1.15rem;
  text-align: center;
  color: #fff;
  font-family: inherit;
}

.chaos-result-wrap {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
}

.chaos-wrap {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.chaos-btn {
  width: min(240px, 80vw);
  height: min(240px, 80vw);
  border-radius: 50%;
  border: none;
  background: linear-gradient(145deg, #c2185b, #ff5252);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
}

.chaos-wrap.pulse .chaos-btn {
  animation: pulse 0.5s ease-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
  }
  50% {
    transform: scale(1.04);
    box-shadow: 0 0 0 35px rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(1);
  }
}

.home-panel {
  overflow: hidden;
}

.home-content {
  position: relative;
  z-index: 1;
}

.decorative-svgs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.decorative-svg {
  position: absolute;
  width: clamp(110px, 15vw, 240px);
  top: var(--svg-top, auto);
  left: var(--svg-left, auto);
  right: var(--svg-right, auto);
  bottom: var(--svg-bottom, auto);
  opacity: var(--svg-opacity, 0.95);
  filter: drop-shadow(0 0 35px rgba(0, 0, 0, 0.8));
  transform: rotate(var(--svg-rotate, 0deg)) scale(var(--svg-scale, 1));
  transition: transform 0.6s ease, opacity 0.6s ease;
}


.floating-icon {
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  opacity: 0.95;
  transition: opacity 0.3s ease;
  animation: floatEase 16s ease-in-out infinite;
  will-change: transform, opacity;
}

.floating-icon--love {
  top: 8%;
  left: 14%;
  width: 48px;
  height: 48px;
  animation-delay: 0s;
}

.floating-icon--wine {
  top: 32%;
  right: 10%;
  animation-delay: 2s;
}

.floating-icon--retos {
  bottom: 20%;
  left: 14%;
  animation-delay: 5s;
}

.floating-icon--chaos {
  top: 58%;
  right: 18%;
  animation-delay: 3s;
}

.floating-icon--tiny {
  bottom: 6%;
  right: 25%;
  width: 30px;
  height: 30px;
  animation-delay: 7s;
}

@keyframes floatEase {
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-12px) scale(1.03); }
  100% { transform: translateY(0) scale(1); }
}

@media (min-width: 768px) {
  .panel {
    padding: 48px 40px;
  }

  .panel-header h2 {
    font-size: 2.1rem;
  }

  .reto-card {
    min-height: 180px;
  }
}
</style>
