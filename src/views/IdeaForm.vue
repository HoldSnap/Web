<template>
  <div class="full-page">
    <!-- ======== НОВАЯ КРАСИВАЯ ШАПКА ======== -->
    <header class="header fade-down">
      <div class="header-inner">
        <div class="logo-block fade-left">
          <router-link to="/Main" class="logo-link">
            <img src="../../A4.png" alt="logo" class="logo" />
          </router-link>
          <span class="site-name">ПЭК: Пульс инноваций</span>
        </div>

        <nav class="menu fade-right">
          <router-link class="menu-item" to="/main">Главное меню</router-link>
          <router-link class="menu-item" to="/idealist">Идеи</router-link>
        </nav>
      </div>

      <div class="accent-line line-animate"></div>
    </header>

    <!-- ======== ФОРМА ======== -->
    <div class="idea-page">
      <div class="idea-card">
        <h1 class="idea-title">ПЭК слышит — скажи, что можно улучшить!</h1>
        <p class="idea-subtitle">
          Опишите вашу идею так, чтобы по этому описанию её можно было реализовать без
          дополнительных вопросов.
        </p>

        <transition name="fade-up">
          <form class="idea-form" @submit.prevent="handleSubmit">
            <!-- ОБЛАСТЬ УЛУЧШЕНИЯ -->
            <div class="field-group" :class="{ 'has-error': errors.improvementArea }">
              <div class="label-row">
                <label class="form-label">Область улучшения</label>
                <span class="tooltip-wrapper">
                  ⓘ
                  <span class="tooltip">Выберите, к какой части работы относится ваша идея.</span>
                </span>
              </div>

              <div class="select-wrapper" :class="{ active: improvementArea }">
                <select v-model="improvementArea">
                  <option disabled value="">
                    Выберите с какой областью пересекается ваша идея
                  </option>
                  <option>Процессы</option>
                  <option>Клиентский сервис</option>
                  <option>Склад</option>
                  <option>Транспорт</option>
                  <option>Офис</option>
                  <option>ИТ / системы</option>
                  <option>Другое</option>
                </select>
                <span class="arrow">▼</span>
              </div>

              <p v-if="errors.improvementArea" class="error-text">
                {{ errors.improvementArea }}
              </p>
            </div>

            <!-- ТЕКУЩАЯ СИТУАЦИЯ -->
            <div class="field-group" :class="{ 'has-error': errors.currentSituation }">
              <div class="label-row">
                <label class="form-label">Текущая ситуация</label>
                <span class="tooltip-wrapper">
                  ⓘ
                  <span class="tooltip">
                    Опишите, как устроен процесс сейчас: кто что делает, какие шаги есть.
                  </span>
                </span>
              </div>
              <p class="helper-text">Опишите, как устроен процесс сейчас и в чём его минусы.</p>

              <textarea
                v-model="currentSituation"
                class="textarea"
                placeholder="Например: клиент ждёт подтверждение от 2 до 3 дней..."
              ></textarea>

              <p v-if="errors.currentSituation" class="error-text">
                {{ errors.currentSituation }}
              </p>
            </div>

            <!-- ОПИСАНИЕ РЕШЕНИЯ -->
            <div class="field-group" :class="{ 'has-error': errors.solutionDescription }">
              <div class="label-row">
                <label class="form-label">Описание решения</label>
                <span class="tooltip-wrapper">
                  ⓘ
                  <span class="tooltip">
                    Опишите, что нужно изменить: добавить, убрать, автоматизировать.
                  </span>
                </span>
              </div>
              <p class="helper-text">Опишите вашу идею и как она решает проблему.</p>

              <textarea
                v-model="solutionDescription"
                class="textarea"
                placeholder="Например: внедрить автоуведомление клиенту..."
              ></textarea>

              <p v-if="errors.solutionDescription" class="error-text">
                {{ errors.solutionDescription }}
              </p>
            </div>

            <!-- ЭФФЕКТ -->
            <div class="field-group" :class="{ 'has-error': errors.effect }">
              <div class="label-row">
                <label class="form-label">Эффект</label>
                <span class="tooltip-wrapper">
                  ⓘ
                  <span class="tooltip">Укажите, какой результат даст внедрение идеи.</span>
                </span>
              </div>

              <div class="select-wrapper" :class="{ active: effect }">
                <select v-model="effect">
                  <option disabled value="">Какой эффект окажет реализация вашей идеи</option>
                  <option>Ускорение процессов</option>
                  <option>Снижение затрат</option>
                  <option>Улучшение качества сервиса</option>
                  <option>Повышение безопасности</option>
                  <option>Повышение удобства сотрудников</option>
                  <option>Другое</option>
                </select>
                <span class="arrow">▼</span>
              </div>

              <p v-if="errors.effect" class="error-text">
                {{ errors.effect }}
              </p>
            </div>

            <!-- ЧЕКБОКС -->
            <div class="field-group checkbox-group">
              <label class="checkbox">
                <input type="checkbox" v-model="agree" />
                <span>Я готов принимать участие в реализации идеи</span>
              </label>
              <p class="helper-text">Необязательное поле, но увеличивает шанс внедрения.</p>
            </div>

            <!-- КНОПКА -->
            <div class="actions">
              <button
                class="submit-btn"
                :class="{ 'submit-btn--disabled': isSubmitting }"
                type="submit"
              >
                <span v-if="!isSubmitting">Отправить идею</span>
                <span v-else>Проверяем данные…</span>
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
    transform: translateY(-18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeLeft {
  from {
    opacity: 0;
    transform: translateX(-22px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes fadeRight {
  from {
    opacity: 0;
    transform: translateX(22px);
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

/* ======= НОВАЯ ПРЕМИАЛЬНАЯ ШАПКА ======= */
.header {
  width: 100%;
  padding: 6px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  background: transparent;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

.header-inner {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 82px;
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
  font-size: 32px;
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
  transition: 0.25s;
}

.menu-item:hover {
  color: #bf2244;
  border-color: #bf2244;
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

/* ===== ФОН ===== */
.idea-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 60px 0;
  background: linear-gradient(135deg, #d7dcf5, #e6d7f2 50%, #f8dde4);
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
}

/* ===== КАРТОЧКА ===== */
.idea-card {
  width: 820px;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 18px;
  padding: 32px 40px 40px;
  box-shadow: 0 18px 40px rgba(33, 37, 63, 0.25);
  animation: card-appear 0.5s ease-out;
}

@keyframes card-appear {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Заголовки */
.idea-title {
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 8px;
  color: #262648;
}

.idea-subtitle {
  font-size: 15px;
  opacity: 0.8;
  margin-bottom: 28px;
}

/* Форма */
.idea-form {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  gap: 6px;
}

.form-label {
  font-size: 17px;
  font-weight: 600;
  color: #252545;
}

.helper-text {
  font-size: 13px;
  opacity: 0.7;
}

/* Tooltip */
.tooltip-wrapper {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  background: #e0e2ff;
  color: #373a9c;
  border-radius: 50%;
  font-size: 11px;
}

.tooltip {
  position: absolute;
  left: 22px;
  top: 50%;
  transform: translateY(-50%);
  background: #1f2146;
  color: #fff;
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.4;
  border-radius: 10px;
  min-width: 230px;
  max-width: 320px;
  opacity: 0;
  pointer-events: none;
  transition: 0.2s;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
}
.tooltip-wrapper:hover .tooltip {
  opacity: 1;
}

/* SELECT */
.select-wrapper {
  position: relative;
  border-radius: 10px;
  border: 2px solid rgba(19, 21, 58, 0.2);
  background: #f8f8ff;
  transition: 0.25s ease;
}
.select-wrapper:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 16px rgba(35, 38, 90, 0.22);
}
.select-wrapper.active {
  border-color: #5657b3;
  background: #f0f1ff;
}

select {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  padding: 15px 44px 15px 16px;
  border: none;
  background: transparent;
  font-size: 15px;
  cursor: pointer;
}
.arrow {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  opacity: 0.8;
}

/* TEXTAREA */
.textarea {
  width: 100%;
  min-height: 150px;
  border-radius: 10px;
  border: 2px solid rgba(19, 21, 58, 0.2);
  padding: 14px 16px;
  font-size: 15px;
  resize: vertical;
  background: #fdfdff;
  transition: 0.25s ease;
}
.textarea:focus {
  border-color: #bf2244;
  background: #fff6f8;
  box-shadow: 0 7px 20px rgba(191, 34, 68, 0.25);
  transform: translateY(-1px);
}

/* CHECKBOX */
.checkbox-group {
  margin-top: 4px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
}

.checkbox input {
  width: 18px;
  height: 18px;
}

/* Ошибки и сообщения */
.error-text {
  font-size: 13px;
  color: #e34747;
}

.form-message {
  margin-top: 10px;
  font-size: 14px;
}
.form-message.success {
  color: #1a7f4b;
}
.form-message.error {
  color: #e34747;
}

/* Кнопка */
.actions {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.submit-btn {
  border: none;
  border-radius: 999px;
  padding: 13px 32px;
  background: linear-gradient(135deg, #d72648, #bf2244);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 26px rgba(191, 34, 68, 0.35);
  transition: 0.25s ease;
}
.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(191, 34, 68, 0.45);
}
.submit-btn--disabled {
  opacity: 0.7;
  cursor: default;
  box-shadow: none;
}
</style>

<script setup>
const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbypZpyn8A0_GrgiWa0J0b13Hk6bYGRqmHCdGS-bBGxv9Xf586nNyN3gQIVDGvIoWRRRKw/exec'
import { reactive, ref } from 'vue'

const improvementArea = ref('')
const currentSituation = ref('')
const solutionDescription = ref('')
const effect = ref('')
const agree = ref(false)

const errors = reactive({
  improvementArea: '',
  currentSituation: '',
  solutionDescription: '',
  effect: '',
})

const isSubmitting = ref(false)
const formMessage = ref('')
const formMessageType = ref('') // 'success' | 'error'

const clearErrors = () => {
  errors.improvementArea = ''
  errors.currentSituation = ''
  errors.solutionDescription = ''
  errors.effect = ''
}

const validate = () => {
  clearErrors()
  let valid = true

  if (!improvementArea.value) {
    errors.improvementArea = 'Пожалуйста, выберите область, к которой относится идея.'
    valid = false
  }

  if (!currentSituation.value.trim()) {
    errors.currentSituation = 'Опишите текущую ситуацию хотя бы в нескольких предложениях.'
    valid = false
  } else if (currentSituation.value.trim().length < 30) {
    errors.currentSituation = 'Добавьте немного деталей — не менее 30 символов.'
    valid = false
  }

  if (!solutionDescription.value.trim()) {
    errors.solutionDescription = 'Опишите, что именно вы предлагаете изменить.'
    valid = false
  } else if (solutionDescription.value.trim().length < 30) {
    errors.solutionDescription = 'Раскройте идею чуть подробнее — не менее 30 символов.'
    valid = false
  }

  if (!effect.value) {
    errors.effect = 'Выберите ожидаемый эффект от идеи.'
    valid = false
  }

  return valid
}

const resetForm = () => {
  improvementArea.value = ''
  currentSituation.value = ''
  solutionDescription.value = ''
  effect.value = ''
  agree.value = false
  clearErrors()
}

const handleSubmit = async () => {
  formMessage.value = ''
  formMessageType.value = ''

  if (!validate()) {
    formMessage.value = 'Проверьте выделенные поля — нужно немного доработать описание.'
    formMessageType.value = 'error'
    return
  }

  isSubmitting.value = true

  const payload = {
    type: 'idea', // важно!
    improvementArea: improvementArea.value,
    currentSituation: currentSituation.value,
    solutionDescription: solutionDescription.value,
    effect: effect.value,
    agree: agree.value,
  }

  console.log('Отправляю идею:', payload)

  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    // После отправки
    isSubmitting.value = false
    resetForm()

    formMessage.value = 'Спасибо! Ваша идея отправлена.'
    formMessageType.value = 'success'
  } catch (err) {
    console.error('Ошибка отправки идеи:', err)
    isSubmitting.value = false

    formMessage.value = 'Не удалось отправить идею. Попробуйте позже.'
    formMessageType.value = 'error'
  }
}
</script>
