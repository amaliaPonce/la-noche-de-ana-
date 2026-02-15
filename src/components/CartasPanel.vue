<template>
  <section class="panel cartas-panel">
    <div class="cartas-content">
      <div class="cartas-top">
        <button type="button" class="back-btn" @click="$emit('back')">← Volver</button>
        <div class="panel-header panel-header--cartas cartas-header">
          <div class="panel-header__title-row">
            <h2 class="cartas-title">Cartas</h2>
          </div>
        </div>
      </div>
      <div class="cartas-grid">
        <div class="deck-panel">
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
        </div>
      </div>
      <div class="actions cartas-actions">
        <button
          v-if="shuffleVisible"
          type="button"
          class="action-btn"
          @click.stop="handleShuffle"
        >
          Barajar de nuevo
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { PALO_LABELS, CARTAS } from '../data/cartas.js';

const selectedPalo = ref('cualquiera');
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

const cardPaloLabel = computed(() => {
  if (currentCard.value) return PALO_LABELS[currentCard.value.palo] || currentCard.value.palo;
  if (selectedPalo.value && selectedPalo.value !== 'cualquiera') return PALO_LABELS[selectedPalo.value];
  return 'Cartas';
});

const cardBody = computed(() => currentCard.value?.texto || 'Toca el mazo para sacar una carta.');



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

defineEmits(['back']);
</script>

<style scoped>
.cartas-panel {
  position: relative;
  background: transparent;
  border: none;
  box-shadow: none;
  margin: 0;
  font-family: var(--font);
  padding-top: 64px;
}

.cartas-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 6px;
}

.cartas-top {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.cartas-header {
  max-width: 420px;
}

.panel-header .cartas-title {
  font-family: var(--title-font);
  letter-spacing: 0.06em;
  margin: 0;
  padding: 0;
  font-size: 2.1rem;
}

.cartas-grid {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.panel-header--cartas {
  gap: 6px;
}

.panel-header__title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.deck-wrapper {
  width: 100%;
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
  opacity: 0.25;
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
  font-family: var(--title-font);
  font-weight: 700;
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

.cartas-actions {
  justify-content: center;
}

.deck-panel {
  padding: 6px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}


@media (max-width: 640px) {
  .cartas-grid {
    gap: 8px;
  }
}

@media (min-width: 768px) {
  .cartas-grid {
    align-items: center;
  }
}
</style>
