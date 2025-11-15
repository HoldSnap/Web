<template>
  <div class="full-page">
    <!-- ===== НОВАЯ КРАСИВАЯ ШАПКА ===== -->
    <header class="header fade-down">
      <div class="header-inner">
        <!-- ЛОГО-БЛОК -->
        <div class="logo-block fade-left">
          <router-link to="/main" class="logo-link">
            <img src="../../A4.png" alt="logo" class="logo" />
          </router-link>
          <span class="site-name">ПЭК: Пульс инноваций</span>
        </div>

        <!-- МЕНЮ -->
        <nav class="menu fade-right">
          <router-link class="menu-item" to="/main">Главное меню</router-link>
          <router-link class="menu-item" to="/problemlist">Проблемы</router-link>
        </nav>
      </div>

      <div class="accent-line line-animate"></div>
    </header>

    <!-- ===== ФОРМА ПРОБЛЕМЫ ===== -->
    <div class="problem-page">
      <div class="problem-card">
        <h1 class="title">Сообщите о проблеме</h1>
        <p class="subtitle">
          Помогите нам сделать процесс работы лучше — опишите, что мешает, где возникают сложности.
        </p>

        <transition name="fade-up">
          <form class="problem-form" @submit.prevent="sendData">
            <!-- Категория -->
            <div class="field-group" :class="{ 'has-error': errors.category }">
              <div class="label-row">
                <label class="form-label">Категория проблемы</label>

                <span class="tooltip-wrapper">
                  ⓘ
                  <span class="tooltip">
                    Выберите, к какой части работы относится проблема: офис, склад, сайт и т.п.
                  </span>
                </span>
              </div>

              <div class="select-wrapper" :class="{ active: category }">
                <select v-model="category">
                  <option disabled value="">Выберите категорию</option>
                  <option>Сайт</option>
                  <option>Офис</option>
                  <option>Логистика</option>
                  <option>Склад</option>
                  <option>Оборудование</option>
                  <option>Транспорт</option>
                  <option>Общение с клиентами</option>
                  <option>Другое</option>
                </select>
                <span class="arrow">▼</span>
              </div>

              <p v-if="errors.category" class="error-text">{{ errors.category }}</p>
            </div>

            <!-- Описание -->
            <div class="field-group" :class="{ 'has-error': errors.message }">
              <div class="label-row">
                <label class="form-label">Описание проблемы</label>

                <span class="tooltip-wrapper">
                  ⓘ
                  <span class="tooltip">
                    Постарайтесь описать подробно — как воспроизвести проблему, кому она мешает.
                  </span>
                </span>
              </div>

              <textarea
                v-model="message"
                class="textarea"
                placeholder="Например: программа зависает при поиске накладной..."
              ></textarea>

              <p v-if="errors.message" class="error-text">{{ errors.message }}</p>
            </div>

            <!-- Чекбокс -->
            <div class="field-group checkbox-group">
              <label class="checkbox">
                <input type="checkbox" v-model="agree" />
                <span>Я готов участвовать в решении</span>
              </label>
              <p class="helper-text">Необязательно, но помогает ускорить решение.</p>
            </div>

            <!-- КНОПКА -->
            <div class="actions">
              <button class="submit-btn" :class="{ 'submit-btn--disabled': isSubmitting }">
                <span v-if="!isSubmitting">Отправить проблему</span>
                <span v-else>Отправляем…</span>
              </button>

              <p v-if="formMessage" :class="['form-message', formMessageType]">
                {{ formMessage }}
              </p>
            </div>
          </form>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ======= АНИМАЦИИ ШАПКИ ======= */
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
  padding: 6px 0;
  position: sticky;
  top: 0;
  z-index: 50;
  background: transparent;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
}

.accent-line {
  width: 95%;
  max-width: 1500px;
  height: 4px;
  margin: 6px auto 0;
  background: linear-gradient(90deg, #50518c, #bf2244);
  border-radius: 2px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.header-inner {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

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

/* ===== ФОН ===== */
.problem-page {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  padding: 70px 0;
  background: linear-gradient(135deg, #d7dcf5, #e6d7f2 50%, #f8dde4);
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

/* ===== КАРТОЧКА ===== */
.problem-card {
  width: 880px;
  background: rgba(255, 255, 255, 0.97);
  border-radius: 22px;
  padding: 40px 46px 44px;
  box-shadow: 0 22px 50px rgba(33, 37, 63, 0.26);
  animation: fadeUpCard 0.5s ease-out;
}

/* Заголовки */
.title {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 10px;
  color: #262648;
}
.subtitle {
  font-size: 18px;
  line-height: 1.5;
  opacity: 0.85;
  margin-bottom: 34px;
}

/* Форма */
.problem-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Группа */
.field-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Ошибки */
.field-group.has-error .select-wrapper,
.field-group.has-error .textarea {
  border-color: #e34747;
  background: #fff5f5;
  box-shadow: 0 0 0 1px rgba(227, 71, 71, 0.2);
}
.field-group.has-error .form-label {
  color: #e34747;
}

.label-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.form-label {
  font-size: 19px;
  font-weight: 650;
  color: #252545;
}

/* Tooltip */
.tooltip-wrapper {
  position: relative;
  width: 20px;
  height: 20px;
  font-size: 12px;
  border-radius: 50%;
  background: #e0e2ff;
  color: #373a9c;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.tooltip {
  position: absolute;
  left: 26px;
  top: 50%;
  transform: translateY(-50%);
  background: #1f2146;
  color: white;
  font-size: 13px;
  line-height: 1.45;
  padding: 10px 12px;
  border-radius: 10px;
  min-width: 260px;
  max-width: 360px;
  opacity: 0;
  pointer-events: none;
  transition: 0.2s;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
  z-index: 10;
}
.tooltip-wrapper:hover .tooltip {
  opacity: 1;
}

/* SELECT */
.select-wrapper {
  position: relative;
  border: 2px solid rgba(19, 21, 58, 0.2);
  border-radius: 12px;
  background: #f8f8ff;
  transition: 0.25s ease;
}
.select-wrapper:hover {
  transform: translateY(-1px);
  box-shadow: 0 7px 20px rgba(35, 38, 90, 0.24);
}
.select-wrapper.active {
  border-color: #5657b3;
  background: #eef0ff;
}

select {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  padding: 18px 52px 18px 18px;
  border: none;
  background: transparent;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
}

.arrow {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  opacity: 0.8;
}

/* TEXTAREA */
.textarea {
  width: 100%;
  min-height: 210px;
  border-radius: 12px;
  border: 2px solid rgba(19, 21, 58, 0.2);
  padding: 18px 20px;
  font-size: 17px;
  line-height: 1.6;
  resize: vertical;
  background: #fdfdff;
  transition: 0.25s ease;
}
.textarea:focus {
  border-color: #bf2244;
  background: #fff6f8;
  box-shadow: 0 9px 26px rgba(191, 34, 68, 0.28);
  transform: translateY(-1px);
}

/* CHECKBOX */
.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}
.checkbox input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.helper-text {
  font-size: 15px;
  opacity: 0.75;
}

/* Ошибки */
.error-text {
  font-size: 14px;
  color: #e34747;
}

/* Кнопка */
.actions {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.submit-btn {
  border: none;
  border-radius: 999px;
  padding: 15px 36px;
  background: linear-gradient(135deg, #d72648, #bf2244);
  color: #fff;
  font-size: 17px;
  font-weight: 750;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(191, 34, 68, 0.38);
  transition: 0.25s ease;
}
.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(191, 34, 68, 0.48);
}
.submit-btn--disabled {
  opacity: 0.65;
  cursor: default;
  box-shadow: none;
}

/* Сообщения */
.form-message {
  margin-top: 12px;
  font-size: 15px;
}
.form-message.success {
  color: #1a7f4b;
}
.form-message.error {
  color: #e34747;
}

/* Анимация */
@keyframes fadeUpCard {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.fade-up-enter-active {
  animation: fadeUpCard 0.4s ease-out;
}
</style>

<script setup>
import { ref, reactive } from 'vue'

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbypZpyn8A0_GrgiWa0J0b13Hk6bYGRqmHCdGS-bBGxv9Xf586nNyN3gQIVDGvIoWRRRKw/exec'

const category = ref('')
const message = ref('')
const agree = ref(false)

const errors = reactive({
  category: '',
  message: '',
})

const formMessage = ref('')
const formMessageType = ref('')
const isSubmitting = ref(false)

const clearErrors = () => {
  errors.category = ''
  errors.message = ''
}

const validate = () => {
  clearErrors()
  let ok = true

  if (!category.value) ((errors.category = 'Выберите категорию'), (ok = false))

  if (!message.value.trim())
    ((errors.message = 'Опишите проблему хотя бы в одном предложении.'), (ok = false))

  return ok
}

const resetForm = () => {
  category.value = ''
  message.value = ''
  agree.value = false
  clearErrors()
}

const sendData = async () => {
  if (!validate()) {
    formMessageType.value = 'error'
    formMessage.value = 'Проверьте выделенные поля.'
    return
  }

  isSubmitting.value = true

  const payload = {
    type: 'problem',
    category: category.value,
    message: message.value,
    agree: agree.value,
  }

  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',

      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    resetForm()
    formMessage.value = 'Спасибо! Проблема отправлена.'
    formMessageType.value = 'success'
  } catch (error) {
    formMessage.value = 'Ошибка отправки. Попробуйте позже.'
    formMessageType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>
