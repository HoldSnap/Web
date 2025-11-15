<template>
  <section class="promo">
    <!-- Контент -->
    <div class="promo-inner">
      <!-- Левая часть -->
      <div class="promo-left">
        <h1 class="title">
          Пульс инноваций
          <span class="line"></span>
        </h1>
      </div>

      <!-- Правая часть -->
      <div class="promo-right">
        <h2 class="subtitle">Твоя энергия меняет ПЭК</h2>

        <div class="actions">
          <router-link to="/idea" class="btn idea"> Подать идею </router-link>
          <router-link to="/ProblemForm" class="btn complaint"> Подать жалобу </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.btn {
  text-decoration: none !important;
}
/* ======= ОБЩИЙ КОНТЕЙНЕР ======= */
.promo {
  position: relative;
  width: 100%;
  padding: 120px 0;
  overflow: hidden;
}

/* ======= ВНУТРЕННИЙ КОНТЕЙНЕР ======= */
.promo-inner {
  position: relative;
  z-index: 2;

  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  gap: 50px;
}

/* ======= ЛЕВАЯ ЧАСТЬ ======= */
.title {
  font-size: 72px;
  font-weight: 800;
  line-height: 1.1;
  color: #222;

  position: relative;
  display: inline-block;
  cursor: pointer;

  animation: fadeLeft 0.8s ease;

  transition:
    transform 0.25s ease,
    text-shadow 0.25s ease;
}

/* ==== ПАРАЛЛАКС-ХОВЕР ==== */
.title:hover {
  transform: translateX(6px);
  text-shadow: 0 0 18px rgba(80, 81, 140, 0.25);
}

/* ======= ЛИНИЯ ======= */
/* Начальная анимация: 0% → 25% */
.title .line {
  display: block;
  height: 6px;
  margin-top: 16px;
  border-radius: 3px;

  background: linear-gradient(90deg, #50518c, #bf2244);

  width: 25%;
  animation: lineStart 0.8s ease forwards;

  transition: width 0.45s ease;
}

/* При наведении — до 100% */
.title:hover .line {
  width: 100%;
}

/* ==== Линия — стартовая анимация ==== */
@keyframes lineStart {
  from {
    width: 0%;
  }
  to {
    width: 25%;
  }
}

/* ======= ПРАВАЯ ЧАСТЬ ======= */
.subtitle {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 36px;
  text-align: center;

  animation: fadeRight 1s ease;
}

/* ======= КНОПКИ ======= */
.actions {
  display: flex;
  gap: 30px;
  justify-content: center;

  animation: slideUp 0.8s ease;
}

.btn {
  padding: 18px 40px;
  border: none;
  color: white;
  border-radius: 12px;
  cursor: pointer;

  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.3px;

  background: linear-gradient(130deg, #bf2244, #a11834);
  transition: 0.3s;

  box-shadow: 0 6px 18px rgba(191, 34, 68, 0.25);
}

/* Наведение — пульс + подъём */
.btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 0 18px rgba(191, 34, 68, 0.4);
}

/* ======= АНИМАЦИИ ======= */
@keyframes fadeLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ======= АДАПТИВ ======= */
@media (max-width: 900px) {
  .promo-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .title {
    font-size: 54px;
  }

  .subtitle {
    font-size: 28px;
  }

  .actions {
    flex-direction: column;
  }
}
</style>
