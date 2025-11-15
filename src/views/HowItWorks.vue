<template>
  <section class="how">
    <h2 class="how-title">Как это работает</h2>
    <p class="how-sub">Современный, понятный и вдохновляющий путь от мысли до результата.</p>

    <div class="how-grid">
      <div
        class="how-card"
        v-for="(step, index) in steps"
        :key="index"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <div class="step-watermark">{{ step.num }}</div>

        <h3 class="card-title">{{ step.title }}</h3>
        <p class="card-text">{{ step.text }}</p>

        <div class="light-glow"></div>
        <div class="noise-layer"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const steps = ref([
  {
    num: 'I',
    title: 'Подай идею',
    text: 'Расскажи своё предложение по улучшению процессов и сервиса.',
  },
  {
    num: 'II',
    title: 'Мы изучим',
    text: 'Специалисты рассмотрят предложение и дадут обратную связь.',
  },
  {
    num: 'III',
    title: 'Реализация',
    text: 'Одобренные идеи переходят к внедрению внутри компании.',
  },
  {
    num: 'IV',
    title: 'Получай бонусы',
    text: 'Участники получают коины, признание и реальные награды.',
  },
])

let observer = null

const handleMouseMove = (event) => {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()

  const x = (event.clientX - rect.left) / rect.width - 0.5
  const y = (event.clientY - rect.top) / rect.height - 0.5

  card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.03)`

  const wm = card.querySelector('.step-watermark')
  wm.style.transform = `translate(${x * 14}px, ${y * 14}px) scale(1.06)`

  const glow = card.querySelector('.light-glow')
  glow.style.opacity = '0.55'
  glow.style.transform = `translate(${x * 40}px, ${y * 40}px)`
}

const handleMouseLeave = (event) => {
  const card = event.currentTarget

  card.style.transform = ''
  const wm = card.querySelector('.step-watermark')
  wm.style.transform = ''
  const glow = card.querySelector('.light-glow')
  glow.style.opacity = '0'
  glow.style.transform = ''
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
    { threshold: 0.2 },
  )

  cards.forEach((card, i) => {
    card.style.setProperty('--delay', `${i * 0.18}s`)
    observer.observe(card)
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* ==================== ОСНОВА ==================== */
.how {
  width: 100%;
  max-width: 1400px;
  margin: 140px auto;
  padding: 0 40px;
  text-align: center;
}

.how-title {
  font-size: 46px;
  font-weight: 800;
  margin-bottom: 14px;

  background: linear-gradient(90deg, #50518c, #bf2244);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: fadeTop 0.8s ease;
}

.how-sub {
  font-size: 20px;
  opacity: 0.85;
  margin-bottom: 80px;

  animation: fadeTop 1s ease;
}

/* ==================== GRID ==================== */
.how-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 38px;
}

/* ==================== ПРЕМИУМ КАРТОЧКА ==================== */
.how-card {
  position: relative;
  padding: 48px 32px;
  border-radius: 26px;

  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.7);

  text-align: left;
  min-height: 260px;
  overflow: hidden;

  transform-style: preserve-3d;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease,
    opacity 0.6s ease;

  opacity: 0;
  transform: translateY(40px) scale(0.96);
  transition-delay: var(--delay);
}

.how-card.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.how-card:hover {
  box-shadow:
    0 24px 54px rgba(80, 81, 140, 0.3),
    0 12px 26px rgba(0, 0, 0, 0.1);
}

/* ==================== ГРАДИЕНТНЫЕ РИМСКИЕ WATERMARK ==================== */
.step-watermark {
  position: absolute;
  top: 10px;
  right: 20px;

  font-size: 128px;
  font-weight: 900;

  background: linear-gradient(180deg, #bf2244, #50518c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  opacity: 0.17;
  pointer-events: none;
  user-select: none;

  transform: translateY(20px) scale(0.95);
  transition:
    transform 0.35s ease,
    opacity 0.35s ease;
}

/* Watermark появляется мягко снизу */
.how-card.is-visible .step-watermark {
  transform: translateY(0) scale(1);
  opacity: 0.2;
}

/* ==================== ПОДСВЕТКА ПРИ ДВИЖЕНИИ ==================== */
.light-glow {
  position: absolute;
  width: 180px;
  height: 180px;
  top: 40%;
  left: 40%;
  transform: translate(-50%, -50%);
  pointer-events: none;

  background: radial-gradient(circle, rgba(255, 255, 255, 0.65), transparent 70%);
  opacity: 0;
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
  filter: blur(26px);
}

/* ==================== ПРЕМИУМ НОЙЗ-ОВЕРЛЕЙ ==================== */
.noise-layer {
  position: absolute;
  inset: 0;
  background-image: url('https://grainy-gradient.vercel.app/noise.svg');
  opacity: 0.18;
  pointer-events: none;
  mix-blend-mode: soft-light;
}

/* ==================== ТЕКСТ ==================== */
.card-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 14px;
}

.card-text {
  font-size: 17px;
  opacity: 0.88;
  line-height: 1.55;
}

/* ==================== АНИМАЦИИ ==================== */
@keyframes fadeTop {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ==================== АДАПТИВ ==================== */
@media (max-width: 1200px) {
  .how-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .how-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
