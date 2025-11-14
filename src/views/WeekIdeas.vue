<template>
  <section class="week">
    <h2 class="week-title">Идеи недели и активности</h2>

    <div class="week-grid">
      <!-- 1 — Идея недели -->
      <div class="week-item fade-up">
        <div class="icon-circle">
          <img class="icon-img" src="../../double_star.svg" alt="Идея недели" />
        </div>

        <h3 class="item-title">Идея недели</h3>
        <p class="item-text">
          Выдвинуть и реализовать идею, которая может улучшить работу компании.
        </p>
      </div>

      <!-- 2 — Решение по жалобе -->
      <div class="week-item fade-up" style="animation-delay: 0.15s">
        <div class="icon-circle">
          <img class="icon-img" src="../../bubble_speach_dialog_talk.svg" alt="Решение по жалобе" />
        </div>

        <h3 class="item-title">Решение по жалобе</h3>
        <p class="item-text">
          Быстрое и эффективное решение проблем сотрудников, улучшение условий работы.
        </p>
      </div>

      <!-- 3 — Самый активный сотрудник -->
      <div class="week-item fade-up" style="animation-delay: 0.3s">
        <div class="icon-circle">
          <img class="icon-img" src="../../analyst_analysis.svg" alt="Самый активный сотрудник" />
        </div>

        <h3 class="item-title">Самый активный сотрудник</h3>
        <p class="item-text">
          Возможность быть признанным за активное участие и вклад в развитие компании.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
/* ======= СЕКЦИЯ ======= */
.week {
  width: 100%;
  max-width: 1400px;
  margin: 120px auto;
  padding: 0 40px;
  text-align: center;
}

/* Заголовок */
.week-title {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 80px;

  background: linear-gradient(90deg, #50518c, #bf2244);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: fadeDown 0.8s ease;
}

/* ======= GRID ======= */
.week-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 65px;
}

/* ======= КАРТОЧКА ======= */
.week-item {
  padding: 45px 30px;
  border-radius: 26px;

  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.4);

  transition: 0.35s;
  cursor: default;

  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.08);

  position: relative;
  overflow: hidden;
}

/* ======= HOVER эффекты ======= */
.week-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 22px 46px rgba(80, 81, 140, 0.28);
  border-color: rgba(191, 34, 68, 0.25);
}

/* СВЕТЯЩИЙСЯ ГРАДИЕНТ ПРИ НАВЕДЕНИИ */
.week-item::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle at 50% 0%, rgba(80, 81, 140, 0.35), transparent 70%);
  opacity: 0;
  transition: 0.4s;
}
.week-item:hover::before {
  opacity: 0.5;
}

/* ======= КРУГ ПОД SVG ======= */
.icon-circle {
  width: 120px;
  height: 120px;
  margin: 0 auto 25px;

  border-radius: 50%;
  background: linear-gradient(135deg, rgba(80, 81, 140, 0.18), rgba(191, 34, 68, 0.18));
  backdrop-filter: blur(6px);

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.1);
  transition: 0.35s;
}

.week-item:hover .icon-circle {
  transform: scale(1.08);
  box-shadow: 0 12px 28px rgba(191, 34, 68, 0.35);
}

/* ======= SVG ======= */
.icon-img {
  width: 65px;
  height: 65px;
  object-fit: contain;
  transition: 0.3s;
}

.week-item:hover .icon-img {
  transform: scale(1.1);
}

/* Заголовок карточки */
.item-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 18px;
  color: #222;
}

/* Текст описания */
.item-text {
  font-size: 17px;
  line-height: 1.55;
  opacity: 0.85;
}

/* ======= АНИМАЦИИ ======= */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.fade-up {
  animation: fadeUp 1s ease both;
}

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

/* ======= АДАПТИВ ======= */
@media (max-width: 900px) {
  .week-grid {
    grid-template-columns: 1fr;
  }

  .icon-circle {
    width: 110px;
    height: 110px;
  }

  .icon-img {
    width: 60px;
    height: 60px;
  }
}
</style>
