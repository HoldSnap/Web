<template>
  <header class="header fade-down">
    <div class="header-inner">
      <!-- ЛОГОТИП -->
      <div class="logo-block fade-left">
        <img src="../../A4.png" alt="logo" class="logo" />
        <span class="site-name">ПЭК: Пульс инноваций</span>
      </div>

      <!-- МЕНЮ -->
      <nav class="menu fade-right">
        <router-link class="menu-item" to="/idealist">Идеи</router-link>
        <router-link class="menu-item" to="/problemlist">Жалобы</router-link>
        <router-link class="menu-item" to="/rating">Рейтинг</router-link>
        <router-link class="menu-item" to="/shop">Магазин</router-link>
      </nav>
    </div>

    <div class="accent-line line-animate"></div>
  </header>
</template>

<script setup></script>

<style scoped>
/* ======= АНИМАЦИИ ======= */
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeLeft {
  from {
    opacity: 0;
    transform: translateX(-25px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeRight {
  from {
    opacity: 0;
    transform: translateX(25px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes growLine {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 95%;
    opacity: 1;
  }
}

/* Анимационные классы */
.fade-down {
  animation: fadeDown 0.8s ease both;
}
.fade-left {
  animation: fadeLeft 1s ease both;
}
.fade-right {
  animation: fadeRight 1s ease both;
}
.line-animate {
  animation: growLine 1.2s ease both;
}

/* ======= ШАПКА ======= */
.header {
  width: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

  padding: 6px 0;
  position: sticky;
  top: 0;
  z-index: 50;

  background: transparent;
  backdrop-filter: blur(10px); /* лёгкий премиальный блюр */
}

/* ======= ЛИНИЯ ======= */
.accent-line {
  width: 95%;
  max-width: 1500px;
  height: 4px;
  margin: 6px auto 0;
  background: linear-gradient(90deg, #50518c, #bf2244);
  border-radius: 2px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* ======= КОНТЕЙНЕР ======= */
.header-inner {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 35px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 80px;
}

/* ======= ЛОГО ======= */
.logo-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  height: 85px;
  width: 85px;
  object-fit: contain;
  margin-top: -4px;
}

/* ======= ТЕКСТ ======= */
.site-name {
  font-size: 34px;
  font-weight: 800;
  background: linear-gradient(90deg, #50518c, #bf2244);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  transition: background-position 0.5s;
  cursor: pointer;
}

.site-name:hover {
  background-position: 200% center;
}

/* ======= МЕНЮ ======= */
.menu {
  display: flex;
  gap: 35px;
}

.menu-item {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  padding-bottom: 3px;
  border-bottom: 2px solid transparent;
  transition: 0.2s;
}

.menu-item:hover {
  color: #bf2244;
  border-color: #bf2244;
}
</style>
