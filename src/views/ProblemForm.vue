<template>
  <div class="page-wrap">
    <!-- ===== ШАПКА ===== -->
    <header class="header">
      <div class="header-inner">
        <div class="logo-block">
          <img src="../../A4.png" alt="logo" class="logo" />
        </div>

        <nav class="menu">
          <a class="menu-item" href="#">Сообщить о проблеме</a>
          <a class="menu-item" href="#">Мои обращения</a>
        </nav>
      </div>

      <div class="accent-line"></div>
    </header>

    <!-- ===== САМА ФОРМА ===== -->
    <section class="problem-section">
      <h1 class="title">Сообщите о проблеме</h1>
      <p class="subtitle">ПЭК слышит — скажи, что можно улучшить!</p>

      <form class="problem-form">
        <!-- Категория -->
        <label class="form-label">Категория проблемы</label>
        <div class="select-wrapper" :class="{ activeSelect: category !== '' }">
          <select v-model="category">
            <option disabled value="">Выберите категорию проблемы</option>
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

        <!-- Описание -->
        <label class="form-label">Описание проблемы</label>
        <textarea
          class="textarea"
          v-model="message"
          placeholder="Опишите, что не работает или мешает"
        ></textarea>

        <!-- Чекбокс -->
        <label class="checkbox">
          <input type="checkbox" v-model="agree" />
          Я буду участвовать в реализации
        </label>

        <!-- Кнопка -->
        <button class="submit-btn">Отправить</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const category = ref('')
const message = ref('')
const agree = ref(false)
</script>

<style scoped>
/* =============== ШАПКА =============== */

.header {
  width: 100%;
  background: transparent;
  padding: 10px 0 4px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-inner {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 35px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ЛОГО */
.logo {
  height: 55px;
}

/* МЕНЮ */
.menu {
  display: flex;
  gap: 35px;
}

.menu-item {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  transition: 0.2s;
}

.menu-item:hover {
  color: #bf2244;
}

/* Линия */
.accent-line {
  width: 95%;
  max-width: 1500px;
  height: 3px;
  margin: 8px auto 0;
  border-radius: 3px;
  background: linear-gradient(90deg, #50518c, #bf2244);
}

/* =============== СЕКЦИЯ ФОРМЫ =============== */

.problem-section {
  max-width: 900px;
  margin: 60px auto;
  padding: 0 20px;
  text-align: center;
}

.title {
  font-size: 46px;
  font-weight: 800;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 20px;
  opacity: 0.7;
  margin-bottom: 50px;
}

/* --- ФОРМА --- */
.problem-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
}

/* Лейбл */
.form-label {
  text-align: left;
  font-size: 22px;
  font-weight: 700;
}

/* --- СЕЛЕКТ --- */
.select-wrapper {
  position: relative;
  width: 100%;
  border: 3px solid rgba(0, 0, 0, 0.18);
  border-radius: 14px;
  background: #fff;
  transition: 0.3s;
}

.select-wrapper.activeSelect {
  background: rgba(80, 81, 140, 0.07);
  border-color: #50518c;
}

select {
  width: 100%;
  padding: 22px 22px;
  border: none;
  background: transparent;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  appearance: none;
  outline: none;
}

.arrow {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

/* --- ТЕКСТОВОЕ ПОЛЕ --- */
.textarea {
  width: 100%;
  height: 200px;
  padding: 20px;

  border: 3px solid rgba(0, 0, 0, 0.18);
  border-radius: 14px;

  font-size: 18px;
  font-weight: 500;
  resize: none;

  transition: 0.25s;
}

.textarea:focus {
  border-color: #bf2244;
  background: rgba(191, 34, 68, 0.05);
  box-shadow: 0 0 12px rgba(191, 34, 68, 0.25);
}

/* --- ЧЕКБОКС --- */
.checkbox {
  font-size: 18px;
  font-weight: 500;
  display: flex;
  text-align: left;
  align-items: center;
  gap: 12px;
}

/* --- КНОПКА --- */
.submit-btn {
  width: 260px;
  margin: 30px auto 0;
  padding: 18px 0;

  background: #bf2244;
  color: white;
  font-size: 22px;
  font-weight: 700;

  border: none;
  border-radius: 14px;
  cursor: pointer;

  transition: 0.25s;
  box-shadow: 0 6px 18px rgba(191, 34, 68, 0.25);
}

.submit-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(191, 34, 68, 0.35);
}
</style>
