<template>
  <div class="app-shell">
    <div class="hearts-bg" aria-hidden="true">
      <span v-for="i in 12" :key="`heart-${i}`" :class="['heart', `h${i}`]">♥</span>
      <span v-for="i in 6" :key="`star-${i}`" :class="['star', `s${i}`]">✦</span>
    </div>

    <header class="app-header">
      <div class="icon-badge icon-badge--heart">
        <img
          class="icon-badge__img"
          width="70"
          height="70"
          src="https://img.icons8.com/external-stickers-smashing-stocks/70/external-Love-love-stickers-smashing-stocks-55.png"
          alt="Corazón sticker"
        />
      </div>
      <p class="app-subtitle">Despedida de Ana</p>
    </header>

    <main class="screen-wrapper">
      <section v-if="currentMode === 'home'" class="panel home-panel">
        <div class="home-content">
          <h1 class="app-title">La Noche de Ana</h1>
          <p class="app-body">Elige un modo y deja que la noche hable: Cartas, Retos o el Botón del Caos.</p>
          <div class="mode-grid">
            <button v-for="mode in modeButtons" :key="mode.value" type="button" class="mode-btn" :class="mode.value" @click="setMode(mode.value)">
              <span class="mode-emoji">{{ mode.emoji }}</span>
              <span>{{ mode.label }}</span>
            </button>
          </div>
        </div>
      </section>

      <section v-else-if="currentMode === 'cartas'" class="panel">
        <button type="button" class="back-btn" @click="setMode('home')">← Volver</button>
        <div class="panel-header panel-header--cartas">
          <div class="panel-header__title-row">
            <div class="icon-badge icon-badge--wine">
              <img
                class="icon-badge__img"
                width="32"
                height="32"
                src="https://img.icons8.com/?size=100&id=cGRK7J78JNXm&format=png&color=000000"
                alt="Icono de copa de vino"
              />
            </div>
            <h2>Cartas</h2>
          </div>
        </div>
        <div class="palos-grid">
          <button v-for="palo in palos" :key="palo.value" type="button" class="palo-btn" :class="{ selected: selectedPalo === palo.value }" @click="handlePaloSelect(palo.value)">
            <span class="palo-emoji">{{ palo.emoji }}</span>
            <span class="palo-name">{{ palo.label }}</span>
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
            <div class="icon-badge icon-badge--retos">
              <img
                class="icon-badge__img"
                width="36"
                height="36"
                src="https://img.icons8.com/?size=100&id=apdRmWcq7Bbr&format=png&color=000000"
                alt="Icono de retazos"
              />
            </div>
            <h2>Retos</h2>
          </div>
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
          <div class="icon-badge icon-badge--chaos">
            <img
              class="icon-badge__img"
              width="42"
              height="42"
              src="https://img.icons8.com/?size=100&id=9QYXsh4FjVpx&format=png&color=000000"
              alt="Gradient shock icon"
            />
          </div>
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
import { computed, reactive, ref } from 'vue';

const modeButtons = [
  { value: 'cartas', label: 'Cartas', emoji: '🎴' },
  { value: 'retos', label: 'Retos', emoji: '🔥' },
  { value: 'caos', label: 'Botón del Caos', emoji: '💣' }
];

const palos = [
  { value: 'picante', label: 'Picante', emoji: '🔥' },
  { value: 'bebida', label: 'Bebida', emoji: '🍸' },
  { value: 'grupal', label: 'Grupal', emoji: '👯' },
  { value: 'verguenza', label: 'Vergüenza', emoji: '😳' },
  { value: 'diversion', label: 'Diversión', emoji: '🎉' },
  { value: 'novia', label: 'Novia', emoji: '💒' },
  { value: 'cualquiera', label: 'Cualquier palo', emoji: '🎲' }
];

const PALO_LABELS = {
  picante: 'Picante',
  bebida: 'Bebida',
  grupal: 'Grupal',
  verguenza: 'Vergüenza',
  diversion: 'Diversión',
  novia: 'Novia'
};

const CARTAS = [
  { palo: 'picante', texto: 'Describe tu fantasía más reciente (sin filtros).' },
  { palo: 'picante', texto: 'Cuenta el beso más apasionado que has dado y con quién fue.' },
  { palo: 'picante', texto: 'Nombra una parte del cuerpo que no te atrevas a besar en público.' },
  { palo: 'picante', texto: 'Haz un striptease de 10 segundos con música imaginaria.' },
  { palo: 'picante', texto: 'Elige a alguien y susurra al oído un piropo picante.' },
  { palo: 'picante', texto: 'Confiesa el lugar más inusual donde te has besado.' },
  { palo: 'picante', texto: 'Haz un reto de caricias en el aire: dibuja con la mano una zona erógena y que adivinen.' },
  { palo: 'picante', texto: 'Recrea con palabras una escena romántica de película con la persona que tengas enfrente.' },
  { palo: 'picante', texto: 'Quita una prenda pequeña y describe cada detalle antes de volverla a poner.' },
  { palo: 'picante', texto: 'Cuenta qué prenda te quitarías primero en una despedida salvaje y por qué.' },
  { palo: 'bebida', texto: 'Toma un chupito con Ana.' },
  { palo: 'bebida', texto: 'Elige a alguien: esa persona debe hacer un chupito contigo.' },
  { palo: 'bebida', texto: 'Di "¡Brindis por Ana!" en tres idiomas diferentes.' },
  { palo: 'bebida', texto: 'Propón un brindis con una palabra inventada.' },
  { palo: 'bebida', texto: 'Haz un brindis usando solo emojis (dilo en alto).' },
  { palo: 'bebida', texto: 'Toma un chupito si nunca te has emborrachado en una despedida (si no, elige a alguien).' },
  { palo: 'bebida', texto: 'Brinda por la persona de tu derecha y bebéis juntas.' },
  { palo: 'bebida', texto: 'Haz un brindis dedicado a la suegra (en tono cómico).' },
  { palo: 'bebida', texto: 'Chupito en pareja: elige a alguien y bebéis los dos.' },
  { palo: 'grupal', texto: 'Da un abrazo a cada persona del grupo en 20 segundos.' },
  { palo: 'grupal', texto: 'Haz una foto grupal con la pose más ridícula.' },
  { palo: 'grupal', texto: 'Elige a dos personas: deben darse un abrazo de 10 segundos.' },
  { palo: 'grupal', texto: 'Haz un selfie grupal con caras de susto.' },
  { palo: 'grupal', texto: 'Da un abrazo grupal y gritad "¡Por Ana!" a la de tres.' },
  { palo: 'grupal', texto: 'Imita a alguien del grupo hasta que lo adivinen.' },
  { palo: 'grupal', texto: 'Di tres cumplidos seguidos a la persona de tu derecha.' },
  { palo: 'grupal', texto: 'Da un beso en la mejilla a la persona que tengas más lejos.' },
  { palo: 'grupal', texto: 'Elige quién debe hacer el siguiente reto.' },
  { palo: 'verguenza', texto: 'Envía un audio de voz a alguien que no esté diciendo "Estoy en la despedida de Ana" con voz de fiesta.' },
  { palo: 'verguenza', texto: 'Baila 30 segundos con los ojos cerrados.' },
  { palo: 'verguenza', texto: 'Canta el estribillo de una canción de boda elegida por el grupo.' },
  { palo: 'verguenza', texto: 'Canta "Cumpleaños feliz" pero cambiando "cumpleaños" por "despedida".' },
  { palo: 'verguenza', texto: 'Canta una canción de amor en playback exagerado.' },
  { palo: 'verguenza', texto: 'Di qué animal serías en una boda y por qué (y actúa como tal 10 segundos).' },
  { palo: 'verguenza', texto: 'Haz una declaración dramática de amor a la comida o la bebida.' },
  { palo: 'diversion', texto: 'Baila como si no hubiera mañana durante una canción.' },
  { palo: 'diversion', texto: 'Inventa un chiste sobre bodas (puede ser malo).' },
  { palo: 'diversion', texto: 'Baila como si tuvieras 80 años.' },
  { palo: 'diversion', texto: 'Di la primera palabra que se te venga al pensar en "boda".' },
  { palo: 'diversion', texto: 'Di tres cosas que adoras de las despedidas.' },
  { palo: 'diversion', texto: 'Cuenta qué llevarías a una isla desierta (objeto + persona del grupo).' },
  { palo: 'diversion', texto: 'Di qué superpoder tendrías en una boda.' },
  { palo: 'diversion', texto: 'Cuenta un sueño raro que hayas tenido sobre Ana o bodas.' },
  { palo: 'novia', texto: 'Haz un brindis dedicado a Ana en verso.' },
  { palo: 'novia', texto: 'Cuenta qué es lo que más te gusta de Ana.' },
  { palo: 'novia', texto: 'Haz una predicción sobre el primer año de Ana.' },
  { palo: 'novia', texto: 'Haz un discurso de 20 segundos como si fueras la madrina.' },
  { palo: 'novia', texto: 'Baila con Ana 30 segundos.' },
  { palo: 'novia', texto: 'Cuenta una anécdota graciosa de Ana.' },
  { palo: 'novia', texto: 'Elige a alguien: esa persona debe decir un piropo a Ana.' },
  { palo: 'novia', texto: 'Haz una promesa simbólica a Ana para el día de la boda.' },
  { palo: 'novia', texto: 'Cuenta qué harías si fueras Ana por un día.' }
];

const RETOS = [
  'Toma un chupito con Ana.',
  'Cuenta el peor beso que hayas dado.',
  'Baila en el centro del grupo durante una canción.',
  'Imita a cada persona del grupo en 10 segundos.',
  'Di tres mentiras y una verdad; el grupo debe adivinar la verdad.',
  'Haz un brindis dedicado a la suegra (en tono cómico).',
  'Envía un mensaje de voz a tu madre diciendo que estás en una despedida.',
  'Abre TikTok y haz el primer baile que te salga.',
  'Da un abrazo a la persona que tengas más a la izquierda.',
  'Canta el cumpleaños feliz cambiando "cumpleaños" por "soltera".',
  'Cuenta qué te pondrías el día de tu boda (o qué te pusiste).',
  'Elige a alguien: esa persona bebe un chupito.',
  'Haz una declaración de amor falsa a la bebida.',
  'Baila con los ojos cerrados 20 segundos.',
  'Di el primer nombre que se te venga: esa persona brinda contigo.',
  'Cuenta una anécdota vergonzosa de Ana.',
  'Haz una foto grupal con la pose más ridícula.',
  'Di qué animal serías en una fiesta y actúa como tal 15 segundos.',
  'Toma un chupito si has llorado en una boda.',
  'Imita la voz de Ana diciendo "¡Sí, quiero!".',
  'Propón un brindis usando solo una palabra repetida 5 veces.',
  'Da un beso en la mejilla a tres personas diferentes.',
  'Cuenta tu peor cita en una frase.',
  'Baila como si tuvieras 5 años.',
  'Elige a dos personas: deben darse la mano durante 30 segundos.',
  'Di qué llevarías a una isla desierta (objeto + persona del grupo).',
  'Haz un selfie con Ana con cara de susto.',
  'Canta el estribillo de una canción de amor en playback.',
'Cuenta un sueño raro que hayas tenido sobre Ana.',
  'Brinda por la persona que más te haya hecho reír esta noche.',
  'Haz una promesa simbólica a Ana para el día de la boda.',
  'Di tres cumplidos seguidos a la persona de tu derecha.',
  'Baila 30 segundos con Ana.',
  'Cuenta qué superpoder tendrías en una despedida.',
  'Elige quién hace el siguiente reto.',
  'Toma un chupito con la persona que tengas enfrente.',
  'Imita a alguien del grupo hasta que lo adivinen.',
  'Di la primera palabra que se te venga al pensar en "Ana".',
  'Haz un discurso de 15 segundos como si fueras la madrina.',
  'Da un abrazo grupal y gritad "¡Por Ana!" a la de tres.',
  'Cuenta qué es lo que más te gusta de Ana.',
'Haz una predicción sobre el primer año de Ana.',
  'Baila como si no hubiera mañana.',
  'Di una verdad que nunca hayas dicho en público.',
  'Elige a alguien: esa persona debe hacer un brindis a Ana.',
  'Cuenta un secreto que nunca hayas contado en una despedida.',
  'Haz una foto grupal con caras de susto.',
  'Da un abrazo a cada persona del grupo en 25 segundos.',
  'Inventa un chiste sobre bodas.',
  'Di "Brindis por Ana" en tres idiomas.',
  'Elige a alguien: esa persona hace un chupito contigo.',
  'Cuenta qué es lo que más te gusta de las despedidas.',
  'Haz un brindis con una palabra inventada.',
  'Baila con la persona de tu izquierda 20 segundos.',
  'Di qué llevarías a una isla (objeto + persona).',
  'Haz un selfie grupal con la pose más divertida.',
  'Cuenta una anécdota graciosa de Ana.',
  'Da un beso en la mejilla a la persona que tengas más lejos.',
  'Haz una declaración dramática de amor a la comida.',
  'Canta una canción de amor en playback exagerado.',
  'Cuenta qué harías si fueras Ana por un día.',
  'Haz un cambio de prenda con alguien del grupo y presume el nuevo outfit durante 10 segundos.',
  'Besa con ojos cerrados a la persona que elijas por 3 segundos.',
  'Quita un accesorio y descríbelo como si fuera un tesoro prohibido antes de dárselo a alguien.',
  'Haz un strip de labios: usa tu boca para quitar un lazo o cinta de la persona de tu derecha.',
  'Cuenta cómo sería tu cita perfecta si la otra persona tuviera que llevarte con una sola prenda.',
  'Reta a alguien a imitarte mientras te quitas una prenda imaginaria.',
  'Describe con detalle una prenda que llevarías para encender la pista y luego mímala.',
  'Haz una confesión picante y que el otro grupo vote si es verdad o mentira.',
  'Baila con alguien sujetando solo una prenda en la mano como si fuera un micrófono.',
  'Elige a alguien para que te dé un beso en la mejilla, pero hazlo como si fuera la escena final de una película prohibida.'
];

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
  bebida: [],
  grupal: [],
  verguenza: [],
  diversion: [],
  novia: []
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

const cardBody = computed(() => currentCard.value?.texto || 'Selecciona un palo y toca el mazo.');

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
  const index = Math.floor(Math.random() * RETOS.length);
  retoDisplay.value = RETOS[index];
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
  background: linear-gradient(165deg, #fee7f5 0%, #f5b0d1 45%, #d60b67 100%);
  color: #31081a;
  display: flex;
  flex-direction: column;
  font-family: var(--font);
}

.screen-wrapper {
  flex: 1;
}

.app-header {
  text-align: center;
  padding: 24px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.app-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  font-family: inherit;
}

.icon-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 18px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.05);
}

.icon-badge--heart {
  background: rgba(255, 77, 166, 0.15);
}

.icon-badge__img {
  display: block;
  width: 100%;
  height: 100%;
  filter: none;
}

.icon-badge--retos {
  background: rgba(255, 255, 255, 0.25);
}

.icon-badge--chaos {
  background: rgba(255, 255, 255, 0.35);
}

.icon-badge--wine {
  background: rgba(255, 255, 255, 0.3);
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
  font-size: clamp(2.4rem, 8vw, 3.2rem);
  color: #fff;
  margin-bottom: 12px;
  text-align: center;
}

.app-body {
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 20px;
}

.mode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}

.mode-btn {
  border: none;
  border-radius: 24px;
  padding: 18px 14px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  transition: transform 0.2s ease;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  font-family: inherit;
}

.mode-btn:hover {
  transform: translateY(-2px) scale(1.01);
}

.mode-btn.cartas {
  background: linear-gradient(145deg, #ff5b93, #ff1f70);
}

.mode-btn.retos {
  background: linear-gradient(145deg, #d60b67, #f06292);
}

.mode-btn.caos {
  background: linear-gradient(145deg, #b71c1c, #ff5252);
}

.palos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.palo-btn {
  border: 2px solid rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.92);
  border-radius: 18px;
  padding: 12px;
  font-size: 1rem;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
  font-family: inherit;
}

.palo-btn.selected {
  border-color: rgba(255, 255, 255, 0.9);
  background: linear-gradient(145deg, #ff6e9c, #ff2a75);
  color: #fff;
  box-shadow: 0 12px 30px rgba(255, 0, 120, 0.25);
}

.cancel-btn,
.back-btn {
  border: none;
  background: transparent;
  color: #fff;
  font-size: 1rem;
  padding: 0;
  cursor: pointer;
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

.hearts-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: -1;
}

.hearts-bg .heart,
.hearts-bg .star {
  position: absolute;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  animation: float 8s ease-in-out infinite;
}

.hearts-bg .star {
  color: rgba(255, 255, 255, 0.4);
  animation-duration: 6s;
}

.hearts-bg .h1 { top: 10%; left: 8%; }
.hearts-bg .h2 { top: 35%; left: 30%; }
.hearts-bg .h3 { top: 75%; left: 18%; }
.hearts-bg .h4 { top: 20%; right: 12%; }
.hearts-bg .h5 { bottom: 10%; right: 18%; }
.hearts-bg .h6 { bottom: 24%; left: 40%; }
.hearts-bg .h7 { bottom: 40%; right: 6%; }
.hearts-bg .h8 { top: 60%; right: 30%; }
.hearts-bg .h9 { top: 50%; left: 10%; }
.hearts-bg .h10 { bottom: 5%; left: 50%; }
.hearts-bg .h11 { bottom: 20%; right: 45%; }
.hearts-bg .h12 { top: 5%; right: 5%; }

.hearts-bg .s1 { top: 25%; left: 15%; }
.hearts-bg .s2 { top: 45%; right: 35%; }
.hearts-bg .s3 { bottom: 30%; left: 28%; }
.hearts-bg .s4 { bottom: 10%; right: 38%; }
.hearts-bg .s5 { top: 18%; left: 55%; }
.hearts-bg .s6 { bottom: 45%; right: 12%; }

@keyframes float {
  0% { transform: translateY(0) scale(1); opacity: 0.4; }
  50% { transform: translateY(-20px) scale(1.1); opacity: 0.7; }
  100% { transform: translateY(0) scale(1); opacity: 0.4; }
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
