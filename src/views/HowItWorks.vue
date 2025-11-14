<template>
  <section class="how">
    <h2 class="how-title">Как это работает</h2>
    <p class="how-sub">От идеи до реализации — простой и понятный путь к изменениям!</p>

    <div class="how-grid">
      <!-- Шаг 1 -->
      <div class="how-card" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <div class="step-circle">1</div>

        <h3 class="card-title">Напиши идею</h3>
        <p class="card-text">Поделись своим предложением по улучшению работы компании.</p>
      </div>

      <!-- Шаг 2 -->
      <div class="how-card" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <div class="step-circle">2</div>

        <h3 class="card-title">Мы рассмотрим</h3>
        <p class="card-text">
          Команда оценит идею, даст обратную связь и предложит варианты реализации.
        </p>
      </div>

      <!-- Шаг 3 -->
      <div class="how-card" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <div class="step-circle">3</div>

        <h3 class="card-title">Идея реализуется</h3>
        <p class="card-text">Одобренные идеи внедряются в рамках проектов компании.</p>
      </div>

      <!-- Шаг 4 -->
      <div class="how-card" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <div class="step-circle">4</div>

        <h3 class="card-title">Получи награды</h3>
        <p class="card-text">Коины, признание и реальные бонусы за вклад в развитие ПЭК.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let observer = null

// 3D-наклон карточки при движении мыши
const handleMouseMove = (event) => {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()

  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const midX = rect.width / 2
  const midY = rect.height / 2

  const rotateY = ((x - midX) / midX) * 10 // максимум ~10°
  const rotateX = -((y - midY) / midY) * 10

  card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
}

const handleMouseLeave = (event) => {
  const card = event.currentTarget
  card.style.transform = ''
}

onMounted(() => {
  const cards = document.querySelectorAll('.how-card')

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2,
    },
  )

  cards.forEach((card, index) => {
    card.style.setProperty('--card-delay', `${index * 0.15}s`)
    observer.observe(card)
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* ======= СЕКЦИЯ ======= */
.how {
  width: 100%;
  max-width: 1400px;
  margin: 140px auto;
  padding: 0 40px;
  text-align: center;
}

/* Заголовок */
.how-title {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 16px;

  background: linear-gradient(90deg, #50518c, #bf2244);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: fadeDown 0.8s ease;
}

.how-sub {
  margin-top: 8px;
  font-size: 20px;
  opacity: 0.8;
  margin-bottom: 80px;

  animation: fadeDown 1s ease;
}

/* ======= GRID + ЛИНИЯ МЕЖДУ КАРТОЧКАМИ ======= */
.how-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

/* Анимированная линия */
.how-grid::before {
  content: '';
  position: absolute;
  left: 6%;
  right: 6%;
  top: 95px; /* примерно по центру кружков */
  height: 2px;
  border-radius: 999px;

  background: linear-gradient(90deg, #50518c, #bf2244, #50518c);
  background-size: 200% 100%;
  animation: lineFlow 4s linear infinite;
  opacity: 0.55;
  z-index: 0;
}

/* ======= КАРТОЧКА ======= */
.how-card {
  position: relative;
  z-index: 1;

  padding: 40px 28px 46px;
  border-radius: 22px;

  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);

  text-align: left;
  cursor: default;
  min-height: 260px;

  /* для scroll-reveal */
  opacity: 0;
  transform: translateY(30px) scale(0.97);
  transition:
    transform 0.6s ease,
    opacity 0.6s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  transition-delay: var(--card-delay, 0s);

  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.08);
}

/* когда вошла в зону видимости */
.how-card.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* hover — усиливаем свет и тень, 3D-наклон добавляет JS */
.how-card:hover {
  box-shadow: 0 20px 44px rgba(80, 81, 140, 0.35);
  border-color: rgba(191, 34, 68, 0.35);
}

/* ======= STEP КРУГ С НОМЕРОМ ======= */
.step-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 22px;
  font-weight: 700;
  color: #ffffff;

  background: radial-gradient(circle at 30% 30%, #ffffff, #bf2244);
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.7),
    0 0 18px rgba(191, 34, 68, 0.8);

  margin-bottom: 22px;

  animation: pulseGlow 2.5s ease-in-out infinite;
}

/* Заголовок и текст */
.card-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.card-text {
  font-size: 17px;
  line-height: 1.55;
  opacity: 0.85;
}

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

/* Пульсация свечения вокруг круга */
@keyframes pulseGlow {
  0% {
    box-shadow:
      0 0 0 2px rgba(255, 255, 255, 0.7),
      0 0 18px rgba(191, 34, 68, 0.75);
  }
  50% {
    box-shadow:
      0 0 0 4px rgba(255, 255, 255, 0.9),
      0 0 26px rgba(80, 81, 140, 0.9);
  }
  100% {
    box-shadow:
      0 0 0 2px rgba(255, 255, 255, 0.7),
      0 0 18px rgba(191, 34, 68, 0.75);
  }
}

/* Анимация бегущего градиента по линии */
@keyframes lineFlow {
  from {
    background-position: 0% 0;
  }
  to {
    background-position: 200% 0;
  }
}

/* ======= АДАПТИВ ======= */
@media (max-width: 1200px) {
  .how-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .how-grid::before {
    left: 8%;
    right: 8%;
    top: 100px;
  }
}

@media (max-width: 700px) {
  .how-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .how-grid::before {
    display: none; /* на мобилке линии между карточками можно убрать */
  }

  .how {
    margin: 100px auto;
    padding: 0 20px;
  }
}
</style>
