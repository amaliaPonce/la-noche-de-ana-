<template>
  <div class="app-shell" :class="{ 'is-chaos': currentMode === 'caos' }">
    <header class="app-header">
      <p class="app-subtitle">despedida de Ana</p>
    </header>

    <main class="screen-wrapper">
      <Transition name="fade" mode="out-in">
        <HomePanel
          v-if="currentMode === 'home'"
          @set-mode="setMode"
        />
        <CartasPanel
          v-else-if="currentMode === 'cartas'"
          @back="setMode('home')"
        />
        <RetosPanel
          v-else-if="currentMode === 'retos'"
          @back="setMode('home')"
        />
        <ChaosPanel
          v-else-if="currentMode === 'caos'"
          @back="setMode('home')"
        />
      </Transition>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HomePanel from './components/HomePanel.vue';
import CartasPanel from './components/CartasPanel.vue';
import RetosPanel from './components/RetosPanel.vue';
import ChaosPanel from './components/ChaosPanel.vue';

const currentMode = ref('home');

function setMode(mode) {
  currentMode.value = mode;
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
  transition: background-color 0.5s ease;
}

.app-shell.is-chaos {
  background: #000000;
}

.screen-wrapper {
  flex: 1;
}

.app-header {
  text-align: center;
  padding: 48px 0 0;
}

.app-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: inherit;
  margin-bottom: 12px;
}

/* Transiciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
