<template>
  <section class="promo">
    <div class="promo-bg-layer"></div>
    <div class="promo-inner">
      <div class="promo-left">
        <h1 class="title">
          Пульс инноваций
          <span class="line"></span>
        </h1>
        <p class="title-sub">
          Платформа, где идеи и обратная связь превращаются в реальные изменения внутри ПЭК.
        </p>
      </div>

      <div class="promo-right">
        <h2 class="subtitle">Твоя энергия меняет ПЭК</h2>

        <div class="actions">
          <router-link to="/idea" class="btn idea">Подать идею</router-link>
          <router-link to="/ProblemForm" class="btn complaint">Подать жалобу</router-link>
        </div>

        <div class="hotline-separator"></div>

        <p class="hotline-text">
          Мы слышим вас. Если так проще — позвоните:
          <span class="hotline-number">+7 (900) 123-45-67</span><br />
          Мы на связи с 9:00 до 18:00 по будням.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.promo {
  position: relative;
  width: 100%;
  padding: 120px 0;
  overflow: hidden;
}

.promo-bg-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.7;

  filter: blur(10px);
  animation: wavesMove 22s ease-in-out infinite alternate;
}

.promo-inner {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  align-items: center;
  gap: 60px;
}

.promo-left {
  transform: translateZ(0);
}

.promo-right {
  transform: translateZ(0);
}

.title {
  font-size: 72px;
  font-weight: 800;
  line-height: 1.05;
  color: #1f2033;
  position: relative;
  display: inline-block;
  cursor: default;
  animation: fadeLeft 0.9s ease;
  text-shadow: 0 0 18px rgba(255, 255, 255, 0.6);
}

.title::after {
  content: '';
  position: absolute;
  top: -16px;
  left: 10%;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(191, 34, 68, 0.15), transparent 60%);
  filter: blur(10px);
  z-index: -1;
  animation: glowPulse 5s ease-in-out infinite;
}

.title .line {
  display: block;
  height: 6px;
  margin-top: 16px;
  border-radius: 999px;
  background: linear-gradient(90deg, #50518c, #bf2244, #5e85ff);
  width: 28%;
  animation:
    lineStart 0.8s ease forwards,
    pulseLine 4s ease-in-out infinite;
  transform-origin: left;
  box-shadow: 0 0 18px rgba(80, 81, 140, 0.3);
}

.title-sub {
  margin-top: 26px;
  max-width: 520px;
  font-size: 18px;
  line-height: 1.6;
  color: #3d3e5b;
  opacity: 0.9;
  animation: fadeLeft 1.1s ease;
}

.subtitle {
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 34px;
  text-align: center;
  color: #272746;
  animation: fadeRight 1s ease;
  text-shadow: 0 8px 20px rgba(255, 255, 255, 0.8);
}

.actions {
  display: flex;
  gap: 26px;
  justify-content: center;
  animation: slideUpButtons 0.8s ease forwards;
}

.btn {
  text-decoration: none;
  padding: 18px 42px;
  border-radius: 14px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 750;
  letter-spacing: 0.04em;
  position: relative;
  overflow: hidden;
  color: #ffffff;
  background-image: linear-gradient(120deg, #bf2244, #a11834);
  box-shadow: 0 10px 24px rgba(191, 34, 68, 0.35);
  transform: translateY(0) scale(1);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    filter 0.25s ease;
}

.btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.28),
    transparent,
    rgba(255, 255, 255, 0.28)
  );
  opacity: 0;
  transform: translateX(-120%);
  animation: none;
}

.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, #bf2244, #d74662, #8c1741);
  opacity: 0;
  mix-blend-mode: screen;
  background-size: 200% 200%;
}

.btn:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow:
    0 0 24px rgba(191, 34, 68, 0.5),
    0 14px 30px rgba(0, 0, 0, 0.22);
  filter: saturate(1.05);
}

.btn:hover::before {
  opacity: 1;
  animation: sweep 1.1s ease-out;
}

.btn:hover::after {
  opacity: 1;
  animation: gradientFlow 4s linear infinite;
}

.hotline-separator {
  width: 72%;
  height: 2px;
  margin: 32px auto 18px;
  background: linear-gradient(90deg, #50518c, #bf2244, #5e85ff);
  opacity: 0.45;
  border-radius: 999px;
  box-shadow: 0 0 12px rgba(80, 81, 140, 0.35);
  animation: separatorAppear 0.9s ease forwards 0.35s;
  transform-origin: center;
}

.hotline-text {
  text-align: center;
  margin: 0 auto;
  font-size: 17px;
  line-height: 1.55;
  max-width: 580px;
  color: #32324a;
  opacity: 0;
  transform: translateY(18px);
  animation: hotlineUp 0.9s ease forwards 0.5s;
}

.hotline-number {
  font-weight: 800;
  background: linear-gradient(120deg, #50518c, #bf2244, #5e85ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 260% auto;
  cursor: pointer;
  transition:
    background-position 0.8s ease,
    text-shadow 0.3s ease,
    transform 0.2s ease;
}

.hotline-number:hover {
  background-position: 200% center;
  text-shadow: 0 0 18px rgba(191, 34, 68, 0.4);
  transform: translateY(-1px);
}

@keyframes wavesMove {
  0% {
    transform: translate3d(-10px, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(12px, 4px, 0) scale(1.03);
  }
  100% {
    transform: translate3d(-6px, -4px, 0) scale(1.02);
  }
}

@keyframes glowPulse {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.08);
  }
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
}

@keyframes lineStart {
  from {
    width: 0%;
  }
  to {
    width: 28%;
  }
}

@keyframes pulseLine {
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.06);
  }
  100% {
    transform: scaleX(1);
  }
}

@keyframes sweep {
  0% {
    transform: translateX(-140%);
  }
  60% {
    transform: translateX(20%);
  }
  100% {
    transform: translateX(120%);
  }
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

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

@keyframes slideUpButtons {
  from {
    opacity: 0;
    transform: translateY(35px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hotlineUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes separatorAppear {
  from {
    opacity: 0;
    transform: scaleX(0.4);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

@media (max-width: 900px) {
  .promo {
    padding: 80px 0 90px;
  }

  .promo-inner {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
    padding: 0 20px;
  }

  .title {
    font-size: 52px;
  }

  .title-sub {
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
  }

  .subtitle {
    font-size: 26px;
  }

  .actions {
    flex-direction: column;
    gap: 16px;
  }

  .btn {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    font-size: 18px;
  }

  .hotline-separator {
    width: 90%;
    margin-top: 26px;
  }

  .hotline-text {
    font-size: 16px;
  }
}
</style>
