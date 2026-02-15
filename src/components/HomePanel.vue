<template>
  <section class="panel home-panel">
    <div class="home-content">
      <h1 class="app-title">La Noche de Ana</h1>
      <p class="app-body">Elige Cartas, Retos o el Botón del Caos.</p>
      <p class="home-note">aqui una frase para ana.</p>
      <div class="mode-grid">
        <button v-for="mode in modeButtons" :key="mode.value" type="button" class="mode-btn" :class="mode.value" @click="$emit('set-mode', mode.value)">
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
</template>

<script setup>
const modeButtons = [
  { value: 'cartas', label: 'Cartas' },
  { value: 'retos', label: 'Retos' },
  { value: 'caos', label: 'EL CAOS DE ANA 😈' }
];

const decorativeSvgShapes = [
  {
    id: 'shape-1',
    src: new URL('../img/1.svg', import.meta.url).href,
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
    src: new URL('../img/2.svg', import.meta.url).href,
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
    src: new URL('../img/11.svg', import.meta.url).href,
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
    src: new URL('../img/3.svg', import.meta.url).href,
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
    src: new URL('../img/12.svg', import.meta.url).href,
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
    src: new URL('../img/4.svg', import.meta.url).href,
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
    src: new URL('../img/9.svg', import.meta.url).href,
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
    src: new URL('../img/14.svg', import.meta.url).href,
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
    src: new URL('../img/5.svg', import.meta.url).href,
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
    src: new URL('../img/13.svg', import.meta.url).href,
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
    src: new URL('../img/6.svg', import.meta.url).href,
    variant: 'glow6',
    style: {
      top: '8%',
      right: '-6%',
      transform: 'rotate(18deg) scale(1.35)',
      opacity: '0.9'
    }
  }
];

defineEmits(['set-mode']);
</script>

<style scoped>
/* Estilos específicos de HomePanel */
.home-panel {
  padding-top: 80px;
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
  transform: translateY(-4px) scale(1.03);
  box-shadow: inset 0 0 0 2px rgba(200, 27, 91, 0.9), 0 22px 34px rgba(74, 0, 40, 0.5);
}

.mode-btn.retos {
  color: #4f0026;
  background: #fff7fb;
}

.mode-btn.caos {
  color: #ffffff;
  background: linear-gradient(135deg, #ff0055 0%, #aa0033 100%);
  border-color: #ffcccc;
  box-shadow: 0 10px 30px rgba(255, 0, 85, 0.4), inset 0 0 0 2px rgba(255, 255, 255, 0.3);
  animation: pulse 2s infinite ease-in-out;
  position: relative;
  overflow: hidden;
}

.mode-btn.caos:hover {
  animation: shake 0.5s infinite;
  background: linear-gradient(135deg, #ff3377 0%, #cc0044 100%);
  box-shadow: 0 15px 40px rgba(255, 0, 85, 0.6), inset 0 0 0 2px rgba(255, 255, 255, 0.5);
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
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
}
</style>
