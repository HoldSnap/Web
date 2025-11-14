<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <h2 class="title">Авторизация</h2>
      <p class="subtitle">ПЭК: Пульс инноваций</p>

      <form class="form" @submit.prevent="goMain">
        <!-- ЛОГИН -->
        <div class="input-group floating">
          <input id="login" type="text" required placeholder=" " />
          <label for="login">Логин</label>
        </div>

        <!-- ПАРОЛЬ -->
        <div class="input-group floating">
          <input id="password" type="password" required placeholder=" " />
          <label for="password">Пароль</label>
        </div>

        <a href="#" class="forgot">Забыли пароль?</a>

        <button class="submit">Войти</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goMain() {
  router.push('/Main')
}
</script>

<style scoped>
/* === ОБЁРТКА С ЛЁГКОЙ АНИМАЦИЕЙ === */
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

/* === КАРТОЧКА === */
.auth-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);

  width: 100%;
  max-width: 580px;
  padding: 70px 65px;

  border-radius: 28px;
  box-shadow:
    0 20px 40px rgba(80, 81, 140, 0.12),
    0 10px 25px rgba(0, 0, 0, 0.08);

  animation: fadeIn 0.7s ease;
}

/* === ЗАГОЛОВКИ === */
.title {
  font-size: 46px;
  font-weight: 900;
  color: #50518c;
  text-align: center;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 22px;
  text-align: center;
  opacity: 0.8;
  margin-bottom: 55px;
}

/* === ГРУППА ПОЛЕЙ === */
.floating {
  position: relative;
  margin-bottom: 38px;
}

/* === ПОЛЕ === */
.floating input {
  width: 100%;
  padding: 26px 20px 10px;

  border: 2.5px solid rgba(0, 0, 0, 0.25);
  border-radius: 14px;

  font-size: 22px;
  background: #fff;

  transition: 0.3s ease;
}

/* ФОКУС */
.floating input:focus {
  border-color: #50518c;
  box-shadow: 0 0 12px rgba(80, 81, 140, 0.28);
}

/* === ЛЕЙБЛ === */
.floating label {
  position: absolute;
  left: 20px;
  top: 24px;

  font-size: 22px;
  color: #777;

  background: white;
  padding: 0 6px;

  cursor: text;
  transition: 0.25s;
  pointer-events: none;
}

/* === ПОДЪЁМ ЛЕЙБЛА === */
.floating input:focus + label,
.floating input:not(:placeholder-shown) + label {
  top: -12px;
  left: 18px;
  font-size: 16px;
  color: #50518c;
}

/* === ЗАБЫЛИ ПАРОЛЬ === */
.forgot {
  font-size: 18px;
  color: #50518c;
  text-decoration: none;
  transition: 0.2s;
  display: inline-block;
  margin-bottom: 20px;
}

.forgot:hover {
  color: #bf2244;
}

/* === КНОПКА ВОЙТИ === */
.submit {
  width: 100%;
  padding: 22px;

  background: linear-gradient(130deg, #bf2244, #a51c38);
  border: none;
  border-radius: 14px;

  font-size: 26px;
  font-weight: 900;
  color: #fff;

  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: 0 10px 25px rgba(191, 34, 68, 0.25);
}

.submit:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 14px 32px rgba(191, 34, 68, 0.35);
}

/* === АНИМАЦИЯ === */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
