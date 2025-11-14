<script setup>
import Header from './views/Header.vue'
</script>

<template>
  <div id="app-layout">
    <router-view />
  </div>
</template>

<style>
/* ОБЯЗАТЕЛЬНО — убирает влияние reset */
html,
body {
  background: transparent !important;
  margin: 0;
  padding: 0;
}

/* ГЛАВНАЯ ОБЁРТКА */
#app-layout {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
}

/* ГЛОБАЛЬНЫЙ ФОН */
#app-layout::before {
  content: '';
  position: fixed;
  inset: 0;

  background:
    radial-gradient(circle at 20% 30%, rgba(80, 81, 140, 0.28), transparent 60%),
    radial-gradient(circle at 80% 70%, rgba(191, 34, 68, 0.28), transparent 55%);

  filter: blur(30px);
  opacity: 1;
  z-index: -1;
  pointer-events: none;
}

/* Контент поверх */
#app-layout > * {
  position: relative;
  z-index: 2;
}
</style>
