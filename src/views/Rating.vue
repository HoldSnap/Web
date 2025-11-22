<template>
  <div class="full-page">
    <!-- ШАПКА С ВОЗВРАТОМ В ГЛАВНОЕ МЕНЮ -->
    <header class="header fade-down">
      <div class="header-inner">
        <div class="logo-block fade-left">
          <router-link to="/main" class="logo-link">
            <img src="../../A4.png" alt="logo" class="logo" />
          </router-link>
          <span class="site-name">ПЭК: Пульс инноваций</span>
        </div>

        <nav class="menu fade-right">
          <router-link class="menu-item" to="/main">Главное меню</router-link>
          <router-link class="menu-item" to="/idea">Предложить идею</router-link>
          <router-link class="menu-item menu-item--active" to="/rating">
            Рейтинг
          </router-link>
        </nav>
      </div>

      <div class="accent-line line-animate"></div>
    </header>

    <!-- ОСНОВНОЙ КОНТЕНТ -->
    <main class="rating-page">
      <section class="rating-wrapper">
        <!-- Заголовок и краткий текст -->
        <header class="rating-header fade-down">
          <div>
            <h1 class="rating-title">Кто сегодня задаёт ритм ПЭК?</h1>
            <p class="rating-subtitle">
              Здесь собраны лидеры по количеству идей, реализованных инициатив и
              лучших решений.
            </p>
          </div>

          <div class="rating-meta">
            <span class="meta-pill">
              Всего идей: <strong>147</strong>
            </span>
            <span class="meta-pill">
              Реализовано: <strong>83</strong>
            </span>
          </div>
        </header>

        <!-- Переключатель между ТОПами -->
        <section class="rating-tabs-card fade-up">
          <div class="tabs-row">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              type="button"
              class="tab-pill"
              :class="{ 'tab-pill--active': activeTab === tab.key }"
              @click="activeTab = tab.key"
            >
              <span class="tab-pill-dot"></span>
              {{ tab.label }}
            </button>
          </div>

          <p class="tabs-description">
            {{ activeTabDescription }}
          </p>
        </section>

        <!-- Список рейтинга -->
        <section class="rating-list">
          <!-- ТОП АВТОРОВ -->
          <article
            v-if="activeTab === 'authors'"
            v-for="(user, index) in topAuthors"
            :key="'author-' + index"
            class="rating-card fade-up-card"
          >
            <div class="rating-card-main">
              <div class="rating-rank">
                <span class="rank-number">{{ index + 1 }}</span>
              </div>

              <div class="rating-left">
                <div class="avatar-circle">👤</div>
                <div class="rating-text-block">
                  <div class="rating-name">{{ user.name }}</div>
                  <div class="rating-role">{{ user.role }}</div>
                </div>
              </div>
            </div>

            <div class="rating-right">
              <div class="rating-stat">
                <span class="stat-label">Идей</span>
                <span class="stat-value">{{ user.ideas }}</span>
              </div>
              <div class="rating-stat">
                <span class="stat-label">Реализовано</span>
                <span class="stat-value stat-value--accent">{{ user.done }}</span>
              </div>
            </div>
          </article>

          <!-- ТОП ПОДРАЗДЕЛЕНИЙ -->
          <article
            v-if="activeTab === 'departments'"
            v-for="(d, index) in topDepartments"
            :key="'dep-' + index"
            class="rating-card fade-up-card"
          >
            <div class="rating-card-main">
              <div class="rating-rank">
                <span class="rank-number">{{ index + 1 }}</span>
              </div>

              <div class="rating-left">
                <div class="avatar-circle avatar-circle--office">
                  <span class="office-emoji">{{ d.icon }}</span>
                </div>
                <div class="rating-text-block">
                  <div class="rating-name">{{ d.department }}</div>
                  <div class="rating-role">{{ d.city }}</div>
                </div>
              </div>
            </div>

            <div class="rating-right">
              <div class="rating-stat">
                <span class="stat-label">Идей</span>
                <span class="stat-value">{{ d.ideas }}</span>
              </div>
              <div class="rating-stat">
                <span class="stat-label">Реализовано</span>
                <span class="stat-value stat-value--accent">{{ d.done }}</span>
              </div>
            </div>
          </article>

          <!-- ТОП ИДЕЙ -->
          <article
            v-if="activeTab === 'ideas'"
            v-for="(idea, index) in topIdeas"
            :key="'idea-' + index"
            class="rating-card rating-card--idea fade-up-card"
          >
            <div class="rating-card-main">
              <div class="rating-rank rating-rank--idea">
                <span class="rank-number">{{ index + 1 }}</span>
              </div>

              <div class="rating-idea-content">
                <h3 class="idea-title">{{ idea.title }}</h3>

                <div class="idea-meta-row">
                  <span class="idea-meta">
                    Автор: <strong>{{ idea.author }}</strong>
                  </span>
                  <span class="idea-meta idea-meta--accent">
                    Эффект: {{ idea.effect }}
                  </span>
                </div>

                <p class="idea-description">
                  {{ idea.description }}
                </p>
              </div>
            </div>
          </article>
        </section>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const activeTab = ref('authors')

const tabs = [
  { key: 'authors', label: 'ТОП авторов' },
  { key: 'departments', label: 'ТОП подразделений' },
  { key: 'ideas', label: 'ТОП идей' },
]

const activeTabDescription = computed(() => {
  switch (activeTab.value) {
    case 'authors':
      return 'Лидеры по количеству предложенных и реализованных идей.'
    case 'departments':
      return 'Подразделения, задающие темп по инициативам и улучшениям.'
    case 'ideas':
      return 'Идеи, которые заметно повлияли на сервис, скорость и качество.'
    default:
      return ''
  }
})

// Демоданные — можно заменить на данные из API
const topAuthors = [
  { name: 'Иванов Иван И.', role: 'Водитель', ideas: 17, done: 9 },
  { name: 'Колчина Юлия П.', role: 'Складовщик', ideas: 15, done: 9 },
  { name: 'Уланская Юлия А.', role: 'Грузчик', ideas: 12, done: 7 },
  { name: 'Коржавина Алина Е.', role: 'Водитель', ideas: 9, done: 4 },
  { name: 'Соколов Дмитрий Н.', role: 'Инженер', ideas: 8, done: 5 },
]

const topDepartments = [
  { department: 'Офис Москва', city: 'Москва', ideas: 42, done: 22, icon: '🏢' },
  { department: 'Склад Казань', city: 'Казань', ideas: 30, done: 15, icon: '📦' },
  { department: 'Логистика СПб', city: 'Санкт-Петербург', ideas: 27, done: 13, icon: '🚚' },
  { department: 'IT-центр Самара', city: 'Самара', ideas: 22, done: 17, icon: '💻' },
  { department: 'Офис Екатеринбург', city: 'Екатеринбург', ideas: 19, done: 9, icon: '🏬' },
]

const topIdeas = [
  {
    title: 'Оптимизация маршрута доставки',
    author: 'Колчина Юлия П.',
    effect: 'Сократили время доставки на 10%',
    description:
      'Пересчитаны маршруты с учётом пробок и загрузки машин — среднее время доставки уменьшилось на 10%.',
  },
  {
    title: 'Автоматизация обработки заявок',
    author: 'Иванов Иван И.',
    effect: 'Экономия 120 человеко-часов в месяц',
    description:
      'Предложена и внедрена форма с автозаполнением данных водителей и рейсов, что значительно ускорило обработку заявок.',
  },
  {
    title: 'Новая система маркировки на складе',
    author: 'Уланская Юлия А.',
    effect: 'Ускорение сортировки на 20%',
    description:
      'Введены цветовые ярлыки по типу груза и направлению, снизилось количество пересортов и задержек.',
  },
  {
    title: 'Обновление программы вводного инструктажа',
    author: 'Коржавина Алина Е.',
    effect: 'Снижение ошибок новых сотрудников на 25%',
    description:
      'Инструктаж стал короче, понятнее и с живыми примерами — новички быстрее выходят на целевые показатели.',
  },
  {
    title: 'Стандарты быстрой погрузки',
    author: 'Соколов Дмитрий Н.',
    effect: 'Минус 10 минут на каждую машину',
    description:
      'Разработаны чек-листы и разметка зоны погрузки, что уменьшило простои транспорта и ускорило выезд рейсов.',
  },
]
</script>

<style scoped>
/* === ШАПКА (как на других страницах) ====================== */
.header {
  width: 100%;
  padding: 6px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
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
  height: 70px;
  width: 70px;
  object-fit: contain;
  margin-top: -2px;
}

.site-name {
  font-size: 26px;
  font-weight: 800;
  background: linear-gradient(90deg, #50518c, #bf2244);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  transition: background-position 0.5s;
  cursor: pointer;
}

.site-name:hover {
  background-position: 100% 0;
}

.menu {
  display: flex;
  gap: 24px;
}

.menu-item {
  font-size: 16px;
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

.menu-item--active {
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

/* === ФОН СТРАНИЦЫ ======================================== */

.rating-page {
  min-height: 100vh;
  padding: 60px 0 80px;
  background: radial-gradient(circle at 0 0, #e2e6ff 0, #f6e2f0 40%, #ffe8ee 80%);
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

.rating-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 32px;
}

/* === ЗАГОЛОВОК ========================================== */

.rating-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 24px;
}

.rating-title {
  font-size: 32px;
  font-weight: 800;
  color: #262648;
  margin-bottom: 6px;
  text-align: left;
}

.rating-subtitle {
  font-size: 15px;
  max-width: 520px;
  opacity: 0.8;
}

.rating-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta-pill {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 13px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

/* === ТАБЫ =============================================== */

.rating-tabs-card {
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.92);
  padding: 14px 18px 10px;
  box-shadow: 0 12px 24px rgba(70, 54, 100, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
}

.tabs-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.tab-pill {
  border-radius: 999px;
  border: 1px solid rgba(80, 81, 140, 0.2);
  padding: 6px 12px;
  background: rgba(247, 247, 255, 0.8);
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #30304d;
  transition: 0.2s;
}

.tab-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #bf2244;
  opacity: 0.7;
}

.tab-pill--active {
  background: linear-gradient(90deg, #50518c, #bf2244);
  color: #fff;
  border-color: transparent;
}

.tab-pill--active .tab-pill-dot {
  background: #fff;
  opacity: 1;
}

.tabs-description {
  font-size: 13px;
  opacity: 0.8;
}

/* === СПИСОК КАРТОЧЕК ==================================== */

.rating-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Базовая карточка */
.rating-card {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  padding: 12px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 26px rgba(74, 58, 110, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.95);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.rating-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 34px rgba(74, 58, 110, 0.22);
}

.rating-card-main {
  display: flex;
  align-items: center;
  gap: 14px;
}

/* Номер места */
.rating-rank {
  flex: 0 0 32px;
  height: 32px;
  border-radius: 999px;
  background: rgba(80, 81, 140, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating-rank--idea {
  background: rgba(191, 34, 68, 0.1);
}

.rank-number {
  font-size: 16px;
  font-weight: 700;
  color: #30304d;
}

/* Левая часть */
.rating-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #eef0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

.avatar-circle--office {
  background: #ffe9f1;
}

.office-emoji {
  transform: translateY(1px);
}

.rating-text-block {
  display: flex;
  flex-direction: column;
}

.rating-name {
  font-size: 16px;
  font-weight: 700;
  color: #262648;
}

.rating-role {
  font-size: 13px;
  opacity: 0.8;
}

/* Правая часть (цифры) */
.rating-right {
  display: flex;
  align-items: center;
  gap: 22px;
  font-size: 14px;
}

.rating-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.stat-label {
  font-size: 12px;
  opacity: 0.75;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #262648;
}

.stat-value--accent {
  color: #bf2244;
}

/* Карточка идеи */
.rating-card--idea {
  border-radius: 24px;
}

.rating-idea-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.idea-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  color: #262648;
}

.idea-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 13px;
  margin-top: 2px;
}

.idea-meta {
  opacity: 0.85;
}

.idea-meta--accent {
  color: #bf2244;
  font-weight: 600;
}

.idea-description {
  font-size: 13px;
  margin-top: 4px;
  color: rgba(20, 24, 55, 0.85);
}

/* === АНИМАЦИИ =========================================== */

.fade-down {
  animation: fade-down 0.5s ease-out;
}

.fade-up {
  animation: fade-up 0.5s ease-out;
}

.fade-up-card {
  animation: fade-up 0.45s ease-out;
}

@keyframes fade-down {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* === АДАПТИВ ============================================ */

@media (max-width: 900px) {
  .rating-wrapper {
    padding: 0 18px;
  }

  .rating-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .rating-title {
    text-align: left;
  }

  .rating-card {
    flex-direction: column;
    align-items: flex-start;
    border-radius: 20px;
  }

  .rating-right {
    margin-top: 8px;
    width: 100%;
    justify-content: flex-end;
  }
}

@media (max-width: 600px) {
  .header-inner {
    padding: 0 18px;
  }

  .menu {
    gap: 14px;
  }

  .rating-card {
    padding: 10px 14px;
  }

  .rating-right {
    justify-content: space-between;
  }
}
</style>
