<template>
  <section class="faq">
    <h1 class="faq-title">Политика и контакты</h1>

    <div class="faq-list">
      <div
        v-for="(item, index) in faq"
        :key="index"
        class="faq-item"
        :class="{ open: openIndex === index }"
      >
        <!-- ВОПРОС -->
        <button class="faq-question" @click="toggle(index)">
          <span>{{ item.q }}</span>

          <!-- ИКОНКА (теперь синяя!) -->
          <div class="faq-icon">
            <span class="line line1"></span>
            <span class="line line2"></span>
          </div>
        </button>

        <!-- ОТВЕТ -->
        <div class="faq-answer">
          {{ item.a }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(0)

const toggle = (i) => {
  openIndex.value = openIndex.value === i ? null : i
}

const faq = [
  {
    q: 'Как связаться с компанией?',
    a: 'Вы можете связаться с нами по указанным на сайте контактным данным.',
  },
  {
    q: 'Где найти политику компании?',
    a: 'Политика компании доступна на нашем сайте в разделе "Политика и контакты".',
  },
  {
    q: 'Какие контактные данные представлены на сайте?',
    a: 'На сайте представлены контактные данные для связи с компанией, включая номер телефона и адрес электронной почты.',
  },
  {
    q: 'Могу ли я отправить своё предложение или жалобу?',
    a: 'Да, вы можете отправить своё предложение или жалобу через наш сайт в соответствующем разделе.',
  },
]
</script>

<style scoped>
/* ======= ОБЩИЙ СТИЛЬ ======= */
.faq {
  max-width: 900px;
  margin: 120px auto;
  padding: 0 30px;
}

.faq-title {
  text-align: center;
  font-size: 44px;
  font-weight: 800;

  background: linear-gradient(90deg, #50518c, #bf2244);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  margin-bottom: 60px;
  animation: fadeDown 0.7s ease;
}

/* ======= СПИСОК ======= */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 35px;
}

/* ======= ОДИН ЭЛЕМЕНТ ======= */
.faq-item {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 25px;
  transition: 0.3s;
}

/* ======= ВОПРОС ======= */
.faq-question {
  width: 100%;
  background: none;
  border: none;
  font-size: 22px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 20px;
  border-radius: 14px;

  transition: 0.25s ease;
}

.faq-question:hover {
  background: rgba(80, 81, 140, 0.08);
  transform: translateY(-2px);
}

/* ======= ИКОНКА (синяя) ======= */
.faq-icon {
  width: 34px;
  height: 34px;
  border-radius: 50%;

  background: rgba(80, 81, 140, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  transition: 0.25s ease;
}

/* линии — теперь СИНИЕ */
.line {
  position: absolute;
  width: 18px;
  height: 3px;
  background: #50518c; /* ← фирменный синий */
  border-radius: 3px;
  transition: 0.3s ease;
}

.line2 {
  transform: rotate(90deg);
}

/* превращение плюс → крестик */
.faq-item.open .line1 {
  transform: rotate(45deg);
}
.faq-item.open .line2 {
  transform: rotate(-45deg);
}

/* ======= ОТВЕТ ======= */
.faq-answer {
  font-size: 17px;
  line-height: 1.55;
  opacity: 0.9;
  padding: 12px 5px 0 5px;

  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.35s ease,
    opacity 0.3s ease;
}

.faq-item.open .faq-answer {
  max-height: 200px;
  opacity: 1;
}

/* Анимация появления */
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
