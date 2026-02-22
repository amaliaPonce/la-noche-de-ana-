<template>
  <section class="panel">
    <div class="retos-top">
      <button type="button" class="back-btn" @click="$emit('back')">← Volver</button>
      <div class="panel-header panel-header--retos">
        <div class="panel-header__title-row">
          <h2 class="retos-title">Retos</h2>
        </div>
      </div>
    </div>

    <div class="card-container">
      <div class="reto-card" :class="{ 'reto-card--show': retoDisplay, 'animating': isAnimating }">
        <div class="card-content">
          <div class="reto-icon" v-if="currentEmoji">{{ currentEmoji }}</div>
          <p class="reto-card__text">{{ retoDisplay }}</p>
        </div>
      </div>
    </div>

    <button type="button" class="action-btn big" :class="{ 'btn-pulse': !isAnimating }" @click="nuevoReto">
      {{ retoDeck.length === 0 ? 'Barajar de nuevo' : 'Nuevo reto' }}
    </button>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { RETOS } from '../data/retos.js';

const retoDeck = ref([]);
const retoMeta = ref(null);

const retoDisplay = ref('Toca el botón para tu primer reto');
const isAnimating = ref(false);

const CATEGORY_EMOJIS = {
  grupal: '👯‍♀️',
  confesion: '🤫',
  picante: '🌶️',
  baile: '💃',
  todos: '🎲'
};

const currentEmoji = computed(() => {
  if (!retoMeta.value) return '✨';
  return CATEGORY_EMOJIS[retoMeta.value.categoria] || '✨';
});



function shuffleList(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function resetRetoDeck() {
  retoDeck.value = shuffleList(RETOS);

}

onMounted(() => {
  resetRetoDeck();
});

function nuevoReto() {
  if (retoDeck.value.length === 0) {
    resetRetoDeck();
  }
  
  if (retoDeck.value.length === 0) return;

  isAnimating.value = true;
  
  setTimeout(() => {
    const reto = retoDeck.value.pop();
    retoDisplay.value = reto.texto;
    retoMeta.value = reto;

    // Reset animation state next tick to trigger re-flow if needed or just remove class
    setTimeout(() => {
      isAnimating.value = false;
    }, 50);
  }, 300); // Wait for exit animation
}

defineEmits(['back']);
</script>

<style scoped>
.panel {
  position: relative;
  background: transparent;
  border: none;
  box-shadow: none;
  margin: 0;
  font-family: var(--font);
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
}

.retos-top {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.panel-header .retos-title {
  font-family: var(--title-font);
  letter-spacing: 0.06em;
  margin: 0;
  padding: 0;
  font-size: 2.1rem;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.panel-header--retos {
  gap: 6px;
  max-width: 420px;
}

.panel-header__title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.back-btn {
  border: none;
  background: transparent;
  color: #fff;
  padding: 0;
  cursor: pointer;
  font-size: 1.45rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  font-family: inherit;
  line-height: 1.2;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  opacity: 0.9;
  transition: opacity 0.2s;
}

.back-btn:hover {
  opacity: 1;
}

.card-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  perspective: 1000px;
}

.reto-card {
  width: 100%;
  max-width: 340px;
  min-height: 240px;
  margin: 0 auto;
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.25),
    inset 0 0 0 1px rgba(255, 255, 255, 0.6);
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.reto-card.reto-card--show {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.reto-card.animating {
  opacity: 0 !important;
  transform: translateY(-20px) scale(0.95) !important;
  transition: all 0.3s ease-in;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.reto-icon {
  font-size: 3.5rem;
  line-height: 1;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
  animation: float 3s ease-in-out infinite;
}

.reto-card__text {
  font-size: 1.25rem;
  line-height: 1.5;
  color: #3d1532;
  font-family: inherit;
  font-weight: 500;
  margin: 0;
}

.action-btn {
  border: none;
  border-radius: 999px;
  padding: 18px 36px;
  background: white;
  font-weight: 700;
  color: #c2185b;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  font-family: var(--title-font);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 10px auto 20px;
  display: block;
  font-size: 1.1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  min-width: 200px;
}

.action-btn:active {
  transform: scale(0.96);
}

.btn-pulse {
  animation: mild-pulse 2s infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes mild-pulse {
  0% { transform: scale(1); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); }
  50% { transform: scale(1.03); box-shadow: 0 15px 35px rgba(200, 27, 91, 0.3); }
  100% { transform: scale(1); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); }
}

@media (min-width: 768px) {
  .reto-card {
    min-height: 300px;
    max-width: 420px;
  }
  .reto-card__text {
    font-size: 1.4rem;
  }
}
</style>
