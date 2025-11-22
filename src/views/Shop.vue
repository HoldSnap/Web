<template>
  <div class="full-page">
    <!-- Шапка сайта -->
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
          <router-link class="menu-item menu-item--active" to="/shop">
            Корпоративный магазин
          </router-link>
        </nav>
      </div>

      <div class="accent-line line-animate"></div>
    </header>

    <main class="shop-page">
      <div class="shop-wrapper">
        <!-- Hero-зона с заголовком -->
        <section class="shop-hero fade-down">
          <div class="hero-bg-orbit hero-bg-orbit--1"></div>
          <div class="hero-bg-orbit hero-bg-orbit--2"></div>
          <div class="hero-bg-orbit hero-bg-orbit--3"></div>

          <div class="shop-hero-content">
            <div>
              <p class="hero-kicker">Корпоративные привилегии</p>
              <h1 class="shop-title">Корпоративный магазин</h1>
              <p class="shop-subtitle">
                Обучайся, расти, вдохновляй — обменяй свои коины на обучение, кофе,
                мерч и многое другое.
              </p>

              <div class="hero-tags-row">
                <span class="hero-tag">Курсы и обучение</span>
                <span class="hero-tag">Еда и напитки</span>
                <span class="hero-tag">Мерч</span>
                <span class="hero-tag hero-tag--soft">Благотворительность</span>
              </div>
            </div>

            <div class="balance-card">
              <div class="balance-card-header">
                <span class="balance-label">Ваш баланс</span>
                <span class="balance-pill">Demo</span>
              </div>
              <div class="balance-value">
                {{ balance.toLocaleString('ru-RU') }}
                <span class="balance-unit">коинов</span>
              </div>
              <p class="balance-description">
                Коины начисляются за инициативность, обучение и вклад в развитие компании.
              </p>
              <button class="balance-btn" type="button">
                Как получить больше коинов?
              </button>
            </div>
          </div>
        </section>

        <!-- Фильтры и поиск -->
        <section class="shop-filters-card fade-up">
          <div class="filters-top-row">
            <div class="categories-chips">
              <button
                v-for="cat in categories"
                :key="cat.key"
                type="button"
                class="category-chip"
                :class="{ 'category-chip--active': activeCategory === cat.key }"
                @click="activeCategory = cat.key"
              >
                <span class="category-chip-dot"></span>
                {{ cat.label }}
              </button>
            </div>

            <div class="filters-inline">
              <div class="filter-block filter-block--search">
                <label class="filter-label">Поиск</label>
                <div class="search-wrapper">
                  <input
                    v-model="searchQuery"
                    type="text"
                    class="search-input"
                    placeholder="Название или описание товара..."
                  />
                </div>
              </div>

              <div class="filter-block filter-block--compact">
                <label class="filter-label">Сортировка</label>
                <div class="select-wrapper" :class="{ active: sortBy }">
                  <select v-model="sortBy">
                    <option value="recommended">Рекомендованные</option>
                    <option value="priceAsc">Сначала дешевле</option>
                    <option value="priceDesc">Сначала дороже</option>
                  </select>
                  <span class="arrow">▼</span>
                </div>
              </div>
            </div>
          </div>

          <div class="filters-footer">
            <label class="checkbox-inline">
              <input type="checkbox" v-model="onlyAvailableForBalance" />
              <span>Показывать только то, что можно купить за текущий баланс</span>
            </label>

            <button
              class="link-reset"
              type="button"
              v-if="hasActiveFilters"
              @click="resetFilters"
            >
              Сбросить фильтры
            </button>
          </div>
        </section>

        <!-- Состояние списка -->
        <section class="shop-state" v-if="!filteredProducts.length">
          <div class="state-block">
            <p class="state-text">
              По выбранным параметрам товаров нет. Попробуйте изменить фильтры.
            </p>
          </div>
        </section>

        <!-- Сетка карточек товаров -->
        <section v-else class="shop-grid fade-up">
          <article
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card"
          >
            <header class="product-card-header">
              <div class="product-icon" :class="`product-icon--${product.category}`">
                <span class="product-emoji">{{ product.icon }}</span>
              </div>

              <div class="product-header-main">
                <div class="product-category-pill">
                  {{ categoryLabel(product.category) }}
                </div>
                <h3 class="product-title">{{ product.title }}</h3>
                <p class="product-description">
                  {{ product.description }}
                </p>
              </div>
            </header>

            <footer class="product-card-footer">
              <div class="product-footer-left">
                <div class="price-pill">
                  <span class="coin-dot"></span>
                  {{ product.price.toLocaleString('ru-RU') }} коинов
                </div>
                <span v-if="product.badge" class="badge-pill">
                  {{ product.badge }}
                </span>
              </div>

              <div class="product-footer-actions">
                <button
                  class="btn-primary"
                  type="button"
                  :disabled="product.price > balance"
                >
                  {{ product.price > balance ? 'Недостаточно коинов' : 'Купить' }}
                </button>

                <button
                  v-if="product.hasDetails"
                  class="btn-ghost"
                  type="button"
                  @click="$router.push({ name: 'product-details', params: { id: product.id } })"
                >
                  Подробнее
                </button>
              </div>
            </footer>
          </article>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const balance = ref(2300)

const categories = [
  { key: 'all', label: 'Все категории' },
  { key: 'courses', label: 'Курсы и обучение' },
  { key: 'food', label: 'Еда и напитки' },
  { key: 'merch', label: 'Корпоративный мерч' },
  { key: 'charity', label: 'Благотворительность' },
  { key: 'subscription', label: 'Абонементы' },
  { key: 'giftcard', label: 'Подарочные карты' },
]

const products = ref([
  {
    id: 1,
    category: 'courses',
    icon: '🎓',
    title: 'Курс “Эффективные коммуникации”',
    description: '4-недельная онлайн-программа по развитию soft-skills и работе с обратной связью.',
    price: 2000,
    hasDetails: true,
    badge: 'Популярное',
    weight: 100,
  },
  {
    id: 2,
    category: 'courses',
    icon: '💡',
    title: 'Курс “Дизайн мышления”',
    description: 'Практический курс по генерации и тестированию идей на реальных кейсах компании.',
    price: 2500,
    hasDetails: true,
    badge: 'Новый',
    weight: 90,
  },
  {
    id: 3,
    category: 'food',
    icon: '☕️',
    title: 'Кофе на неделю',
    description: 'Купон на 5 ароматных кофе в корпоративной кофейне рядом с офисом.',
    price: 500,
    hasDetails: false,
    badge: 'Must have',
    weight: 95,
  },
  {
    id: 4,
    category: 'food',
    icon: '🍱',
    title: 'Ланч-сертификат',
    description: 'Сбалансированный обед в партнёрском кафе. Отличный способ перезагрузиться.',
    price: 700,
    hasDetails: false,
    badge: null,
    weight: 70,
  },
  {
    id: 5,
    category: 'merch',
    icon: '👕',
    title: 'Фирменная футболка',
    description: 'Мягкий хлопок, лаконичный дизайн и логотип — чтобы носить ценности компании.',
    price: 1200,
    hasDetails: true,
    badge: 'Лимитированно',
    weight: 85,
  },
  {
    id: 6,
    category: 'merch',
    icon: '🧢',
    title: 'Кепка с логотипом',
    description: 'Лаконичный аксессуар на каждый день — для прогулок и корпоративных мероприятий.',
    price: 900,
    hasDetails: false,
    badge: null,
    weight: 60,
  },
  {
    id: 7,
    category: 'charity',
    icon: '🤝',
    title: 'Пожертвование в благотворительный фонд',
    description:
      'Ваши коины будут переведены в фонд поддержки социальных проектов и инициатив.',
    price: 300,
    hasDetails: true,
    badge: 'Добро',
    weight: 110,
  },
  {
    id: 8,
    category: 'subscription',
    icon: '🏋️‍♀️',
    title: 'Абонемент в спортзал на месяц',
    description:
      'Доступ в партнёрский фитнес-клуб. Позаботьтесь о здоровье и энергии на работу.',
    price: 1800,
    hasDetails: true,
    badge: null,
    weight: 80,
  },
  {
    id: 9,
    category: 'giftcard',
    icon: '🎁',
    title: 'Подарочная карта маркетплейса',
    description:
      'Сертификат на покупки в популярном онлайн-маркетплейсе. Выбор за вами.',
    price: 1500,
    hasDetails: false,
    badge: null,
    weight: 75,
  },
])

const activeCategory = ref('all')
const searchQuery = ref('')
const sortBy = ref('recommended')
const onlyAvailableForBalance = ref(false)

const hasActiveFilters = computed(() => {
  return (
    activeCategory.value !== 'all' ||
    !!searchQuery.value.trim() ||
    onlyAvailableForBalance.value ||
    sortBy.value !== 'recommended'
  )
})

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  let list = products.value.slice()

  if (activeCategory.value !== 'all') {
    list = list.filter(p => p.category === activeCategory.value)
  }

  if (query) {
    list = list.filter(p => {
      const haystack = (p.title + ' ' + p.description).toLowerCase()
      return haystack.includes(query)
    })
  }

  if (onlyAvailableForBalance.value) {
    list = list.filter(p => p.price <= balance.value)
  }

  // сортировка
  if (sortBy.value === 'priceAsc') {
    list.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'priceDesc') {
    list.sort((a, b) => b.price - a.price)
  } else {
    // recommended — по весу, затем по цене
    list.sort((a, b) => {
      if (b.weight !== a.weight) return b.weight - a.weight
      return a.price - b.price
    })
  }

  return list
})

const resetFilters = () => {
  activeCategory.value = 'all'
  searchQuery.value = ''
  sortBy.value = 'recommended'
  onlyAvailableForBalance.value = false
}

const categoryLabel = categoryKey => {
  const cat = categories.find(c => c.key === categoryKey)
  return cat ? cat.label : 'Категория'
}
</script>

<style scoped>
/* Общие элементы шапки — взято из твоего стиля и чуть доработано */
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

/* Основной фон страницы */
.shop-page {
  min-height: 100vh;
  padding: 60px 0 80px;
  background: radial-gradient(circle at 0 0, #e2e6ff 0, #f6e2f0 40%, #ffe8ee 80%);
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

.shop-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

/* Hero-зона */
.shop-hero {
  position: relative;
  border-radius: 28px;
  padding: 32px 32px 30px;
  margin-bottom: 28px;
  overflow: hidden;
  background: radial-gradient(circle at 0 0, #ffffff 0, rgba(255, 255, 255, 0.9) 45%, rgba(255, 255, 255, 0.8) 100%);
  box-shadow: 0 18px 40px rgba(40, 30, 80, 0.25);
}

.shop-hero-content {
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 32px;
  z-index: 2;
}

.hero-kicker {
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #50518c;
  font-weight: 700;
  margin-bottom: 6px;
}

.shop-title {
  font-size: 32px;
  line-height: 1.1;
  font-weight: 800;
  color: #262648;
  margin-bottom: 8px;
}

.shop-subtitle {
  max-width: 520px;
  font-size: 15px;
  color: rgba(20, 24, 55, 0.8);
  margin-bottom: 14px;
}

.hero-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.hero-tag {
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(191, 34, 68, 0.08);
  border: 1px solid rgba(191, 34, 68, 0.2);
  color: #bf2244;
}

.hero-tag--soft {
  background: rgba(80, 81, 140, 0.08);
  border-color: rgba(80, 81, 140, 0.2);
  color: #50518c;
}

/* Плашка баланса */
.balance-card {
  min-width: 260px;
  max-width: 320px;
  background: rgba(20, 18, 48, 0.94);
  border-radius: 20px;
  padding: 18px 18px 16px;
  color: #fff;
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.balance-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.balance-label {
  font-size: 13px;
  opacity: 0.8;
}

.balance-pill {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.balance-value {
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 4px;
}

.balance-unit {
  font-size: 13px;
  font-weight: 500;
  opacity: 0.85;
  margin-left: 6px;
}

.balance-description {
  font-size: 12px;
  line-height: 1.4;
  opacity: 0.85;
  margin-bottom: 12px;
}

.balance-btn {
  width: 100%;
  border-radius: 999px;
  border: none;
  padding: 8px 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(90deg, #bf2244, #ff7b5c);
  color: #fff;
  box-shadow: 0 10px 20px rgba(191, 34, 68, 0.6);
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
}

.balance-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 26px rgba(191, 34, 68, 0.7);
  filter: brightness(1.03);
}

.balance-btn:active {
  transform: translateY(0);
  box-shadow: 0 6px 12px rgba(191, 34, 68, 0.5);
}

/* Декоративные орбиты */
.hero-bg-orbit {
  position: absolute;
  border-radius: 50%;
  filter: blur(18px);
  opacity: 0.7;
  mix-blend-mode: screen;
  animation: float 16s linear infinite alternate;
}

.hero-bg-orbit--1 {
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, #fbd1e0, transparent 60%);
  top: -40px;
  right: -80px;
}

.hero-bg-orbit--2 {
  width: 220px;
  height: 220px;
  background: radial-gradient(circle, #bec4ff, transparent 65%);
  bottom: -60px;
  left: -30px;
  animation-delay: -6s;
}

.hero-bg-orbit--3 {
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, #ffd6a0, transparent 60%);
  top: 20px;
  left: 40%;
  animation-delay: -3s;
}

/* Карточка фильтров */
.shop-filters-card {
  margin-top: 24px;
  margin-bottom: 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.9);
  padding: 16px 18px 12px;
  box-shadow: 0 12px 24px rgba(70, 54, 100, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.filters-top-row {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
}

/* Чипы категорий */
.categories-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-chip {
  border-radius: 999px;
  border: 1px solid rgba(80, 81, 140, 0.16);
  padding: 6px 12px;
  font-size: 13px;
  background: rgba(247, 247, 255, 0.8);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: 0.2s;
  color: #30304d;
}

.category-chip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #bf2244;
  opacity: 0.7;
}

.category-chip--active {
  background: linear-gradient(90deg, #50518c, #bf2244);
  color: #fff;
  border-color: transparent;
}

.category-chip--active .category-chip-dot {
  background: #fff;
  opacity: 1;
}

/* Поиск и селекты */
.filters-inline {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.filter-block {
  min-width: 180px;
}

.filter-block--search {
  min-width: 220px;
}

.filter-block--compact {
  min-width: 160px;
}

.filter-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(20, 24, 55, 0.7);
  margin-bottom: 4px;
  display: inline-block;
}

.search-wrapper {
  position: relative;
}

.search-input {
  width: 100%;
  border-radius: 999px;
  border: 1px solid rgba(80, 81, 140, 0.2);
  padding: 8px 12px;
  font-size: 13px;
  outline: none;
  background: rgba(255, 255, 255, 0.96);
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.search-input:focus {
  border-color: #bf2244;
  box-shadow: 0 0 0 1px rgba(191, 34, 68, 0.35);
  background: #fff;
}

/* Select */
.select-wrapper {
  position: relative;
}

.select-wrapper select {
  width: 100%;
  border-radius: 999px;
  border: 1px solid rgba(80, 81, 140, 0.2);
  padding: 8px 28px 8px 12px;
  font-size: 13px;
  outline: none;
  background: rgba(255, 255, 255, 0.96);
  appearance: none;
  -webkit-appearance: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.select-wrapper .arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  color: rgba(20, 24, 55, 0.7);
  pointer-events: none;
}

.select-wrapper.active select:focus,
.select-wrapper.select-wrapper--active select {
  border-color: #bf2244;
  box-shadow: 0 0 0 1px rgba(191, 34, 68, 0.35);
}

/* Нижняя строка фильтров */
.filters-footer {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.checkbox-inline {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: rgba(20, 24, 55, 0.9);
}

.checkbox-inline input {
  cursor: pointer;
}

.link-reset {
  padding: 4px 0;
  background: none;
  border: none;
  color: #bf2244;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
}

/* Состояние списка */
.shop-state .state-block {
  margin-top: 20px;
  padding: 16px 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px dashed rgba(80, 81, 140, 0.3);
  text-align: center;
}

.state-text {
  font-size: 14px;
  color: rgba(20, 24, 55, 0.85);
}

/* Сетка товаров */
.shop-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

/* Карточка товара */
.product-card {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  padding: 14px 14px 12px;
  box-shadow: 0 14px 30px rgba(74, 58, 110, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 38px rgba(74, 58, 110, 0.22);
  border-color: rgba(191, 34, 68, 0.35);
}

/* header */
.product-card-header {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.product-icon {
  flex: 0 0 44px;
  height: 44px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 20% 0, #fff 0, rgba(255, 255, 255, 0.9) 40%, rgba(255, 255, 255, 0.3) 100%);
  box-shadow: 0 8px 18px rgba(80, 81, 140, 0.35);
  font-size: 24px;
}

.product-icon--courses {
  background: radial-gradient(circle at 0 0, #d9e1ff, #ffffff 40%, rgba(255, 255, 255, 0.1) 100%);
}

.product-icon--food {
  background: radial-gradient(circle at 0 0, #ffe2c2, #ffffff 40%, rgba(255, 255, 255, 0.1) 100%);
}

.product-icon--merch {
  background: radial-gradient(circle at 0 0, #ffd6e7, #ffffff 40%, rgba(255, 255, 255, 0.1) 100%);
}

.product-icon--charity {
  background: radial-gradient(circle at 0 0, #d6ffe5, #ffffff 40%, rgba(255, 255, 255, 0.1) 100%);
}

.product-icon--subscription {
  background: radial-gradient(circle at 0 0, #d8f0ff, #ffffff 40%, rgba(255, 255, 255, 0.1) 100%);
}

.product-icon--giftcard {
  background: radial-gradient(circle at 0 0, #f9e0ff, #ffffff 40%, rgba(255, 255, 255, 0.1) 100%);
}

.product-emoji {
  transform: translateY(1px);
}

.product-header-main {
  flex: 1;
}

.product-category-pill {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(80, 81, 140, 0.06);
  color: rgba(26, 27, 70, 0.9);
  font-size: 11px;
  margin-bottom: 4px;
}

.product-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #262648;
}

.product-description {
  font-size: 13px;
  line-height: 1.4;
  color: rgba(20, 24, 55, 0.78);
}

/* footer */
.product-card-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  margin-top: 8px;
}

.product-footer-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.price-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: linear-gradient(90deg, #bf2244, #ff7b5c);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 8px 18px rgba(191, 34, 68, 0.6);
}

.coin-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.4);
}

.badge-pill {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  color: #50518c;
  background: rgba(80, 81, 140, 0.08);
}

/* кнопки */
.product-footer-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn-primary {
  border-radius: 999px;
  border: none;
  padding: 7px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  background: #bf2244;
  color: #fff;
  box-shadow: 0 8px 16px rgba(191, 34, 68, 0.5);
  white-space: nowrap;
  transition: 0.16s ease;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 12px 22px rgba(191, 34, 68, 0.6);
  filter: brightness(1.02);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 6px 12px rgba(191, 34, 68, 0.6);
}

.btn-primary:disabled {
  cursor: default;
  opacity: 0.7;
  box-shadow: none;
  background: #c7c7d5;
  color: #ffffff;
}

.btn-ghost {
  border-radius: 999px;
  border: 1px solid rgba(80, 81, 140, 0.35);
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  color: #30304d;
  white-space: nowrap;
  transition: 0.16s ease;
}

.btn-ghost:hover {
  background: rgba(80, 81, 140, 0.06);
}

/* Анимации */
@keyframes float {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(10px, -12px, 0);
  }
}

.fade-down {
  animation: fade-down 0.5s ease-out;
}

.fade-up {
  animation: fade-up 0.5s ease-out;
}

@keyframes fade-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
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

/* Адаптив */
@media (max-width: 1024px) {
  .shop-hero-content {
    flex-direction: column;
  }

  .balance-card {
    max-width: 100%;
    width: 100%;
  }

  .shop-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .header-inner {
    padding: 0 18px;
  }

  .shop-wrapper {
    padding: 0 18px;
  }

  .shop-hero {
    padding: 20px 18px 18px;
  }

  .shop-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .filters-top-row {
    flex-direction: column;
  }

  .filters-inline {
    width: 100%;
    justify-content: stretch;
  }

  .filter-block,
  .filter-block--search,
  .filter-block--compact {
    min-width: 100%;
  }
}
</style>
