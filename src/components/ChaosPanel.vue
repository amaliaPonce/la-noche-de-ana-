<template>
  <section class="panel caos-panel">
    <button type="button" class="back-btn" @click="$emit('back')">← Volver</button>
    <div class="panel-header">
      <h2>EL CAOS DE ANA</h2>
    </div>
    <div class="chaos-panel__body">
      <div class="chaos-result-wrap" :class="{ 'has-result': caosResult }">
        <p class="caos-result" :key="caosResult">{{ caosResult || 'Pulsa el botón si te atreves' }}</p>
      </div>
      <div class="chaos-wrap">
        <button 
          type="button" 
          class="chaos-btn" 
          :class="{ 'is-active': chaosPulse }" 
          @click="triggerChaos"
        >
          <span class="chaos-btn__title">EL CAOS DE ANA</span>
          <span class="chaos-btn__subtitle">DALE CAÑA</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { CHAOS_CHALLENGES } from '../data/chaos.js';

const caosResult = ref('');
const chaosPulse = ref(false);

function triggerChaos() {
  // Generar reto aleatorio
  const nuevoReto = CHAOS_CHALLENGES[Math.floor(Math.random() * CHAOS_CHALLENGES.length)];
  
  // Pequeño hack para reiniciar la animación si sale el mismo reto (poco probable pero posible)
  if (caosResult.value === nuevoReto) {
    caosResult.value = '';
    setTimeout(() => { caosResult.value = nuevoReto; }, 10);
  } else {
    caosResult.value = nuevoReto;
  }

  // Activar animación del botón
  chaosPulse.value = true;
  
  setTimeout(() => {
    chaosPulse.value = false;
  }, 300);
}

defineEmits(['back']);
</script>

<style scoped>
.caos-panel {
  background: #000000;
  border-radius: 36px;
  padding: 32px 28px 32px;
  overflow: hidden;
  position: relative;
}

.panel-header {
  position: relative;
  z-index: 2;
  margin-bottom: 20px;
}

.back-btn {
  position: relative;
  z-index: 2;
  margin-bottom: 10px;
}

.chaos-panel__body {
  position: relative;
  z-index: 1;
  /* background: rgba(45, 0, 30, 0.4); - Removed to make full black */
  background: transparent;
  border-radius: 28px;
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-height: 400px;
  justify-content: space-between;
  /* border: 1px solid rgba(255, 255, 255, 0.05); - Removed border */
  /* box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2); - Removed shadow */
}

/* --- Resultado (Tarjeta) --- */
.chaos-result-wrap {
  width: 100%;
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.chaos-result-wrap.has-result {
  background: rgba(255, 255, 255, 0.95);
  border-color: #fff;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  transform: translateY(-5px);
}

.caos-result {
  margin: 0;
  font-weight: 600;
  font-size: 1.25rem;
  text-align: center;
  line-height: 1.4;
  color: rgba(255, 238, 248, 0.7); /* Color inicial tenue */
  font-family: var(--title-font);
  transition: all 0.3s ease;
}

.chaos-result-wrap.has-result .caos-result {
  color: #c2185b; /* Color intenso cuando hay resultado */
  font-size: 1.4rem;
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* --- Botón del Caos --- */
.chaos-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}

.chaos-btn {
  border: none;
  width: 100%;
  max-width: 280px;
  padding: 24px 20px;
  border-radius: 99px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  overflow: hidden;
  
  /* Estilos Premium */
  color: #ffffff;
  background: linear-gradient(135deg, #ff0055 0%, #cc0033 100%);
  border: 2px solid #ff99bb;
  box-shadow: 
    0 10px 30px rgba(255, 0, 85, 0.4), 
    inset 0 0 0 2px rgba(255, 255, 255, 0.2),
    0 0 0 0 rgba(255, 0, 85, 0.7); /* Para el efecto pulse */
  
  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  animation: pulse-glow 2s infinite;
}

.chaos-btn:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #ff3377 0%, #aa0033 100%);
  box-shadow: 0 15px 40px rgba(255, 0, 85, 0.5), inset 0 0 0 2px rgba(255, 255, 255, 0.3);
  animation: shake 0.5s infinite;
}

.chaos-btn:active,
.chaos-btn.is-active {
  transform: scale(0.95) translateY(2px);
  box-shadow: 0 5px 15px rgba(255, 0, 85, 0.3), inset 0 0 15px rgba(0,0,0,0.2);
  filter: brightness(0.9);
  animation: none;
}

.chaos-btn__title {
  font-size: 1.2rem;
  font-family: var(--title-font);
  font-weight: 800;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chaos-btn__subtitle {
  font-size: 0.75rem;
  letter-spacing: 0.4em;
  font-family: var(--title-font);
  opacity: 0.9;
  font-weight: 600;
}

/* --- Animaciones --- */

@keyframes pulse-glow {
  0% { box-shadow: 0 10px 30px rgba(255, 0, 85, 0.4), inset 0 0 0 2px rgba(255, 255, 255, 0.2), 0 0 0 0 rgba(255, 0, 85, 0.7); }
  70% { box-shadow: 0 10px 30px rgba(255, 0, 85, 0.4), inset 0 0 0 2px rgba(255, 255, 255, 0.2), 0 0 0 15px rgba(255, 0, 85, 0); }
  100% { box-shadow: 0 10px 30px rgba(255, 0, 85, 0.4), inset 0 0 0 2px rgba(255, 255, 255, 0.2), 0 0 0 0 rgba(255, 0, 85, 0); }
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

@keyframes popIn {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes rotateBackground {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (min-width: 768px) {
  .chaos-panel__body {
    padding: 40px;
    gap: 40px;
  }
  
  .chaos-btn {
    max-width: 320px;
    padding: 28px;
  }

  .chaos-btn__title {
    font-size: 1.4rem;
  }
}
</style>
