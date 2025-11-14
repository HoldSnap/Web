<template>
  <div class="policy-bottom">
    <p class="text">
      Компания «ПЭК: Пульс инноваций» · Ярославль · Политика конфиденциальности соблюдается в полном
      объёме
    </p>
  </div>
</template>

<script setup></script>

<style scoped>
.policy-bottom {
  width: 100%;
  padding: 18px 0;
  margin-top: 120px; /* чтобы отделить от контента сверху */

  background: rgba(80, 81, 140, 0.08);
  border-top: 2px solid rgba(80, 81, 140, 0.25);

  backdrop-filter: blur(6px);

  text-align: center;
  animation: fadeUp 0.6s ease;
}

.text {
  font-size: 15px;
  font-weight: 500;
  opacity: 0.85;
  color: #111;
}

/* плавное появление */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
