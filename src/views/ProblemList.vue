<template>
  <div class="full-page">
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
          <router-link class="menu-item" to="/ProblemForm">Предложить жалобу</router-link>
          <router-link class="menu-item" to="/idealist">Все идеи</router-link>
        </nav>
      </div>

      <div class="accent-line line-animate"></div>
    </header>

    <main class="complaints-page">
      <section class="complaints-wrapper">
        <header class="complaints-header">
          <div>
            <h1 class="complaints-title">Жалобы сотрудников</h1>
            <p class="complaints-subtitle">
              Здесь собраны проблемы и препятствия, которые мешают работе.
            </p>
          </div>

          <div class="complaints-meta">
            <span class="meta-pill" v-if="complaints.length"
              >Всего жалоб: {{ complaints.length }}</span
            >
            <span class="meta-pill" v-if="filteredComplaints.length !== complaints.length">
              Отфильтровано: {{ filteredComplaints.length }}
            </span>
          </div>
        </header>

        <section class="filters-card">
          <div class="filters-row">
            <div class="filter-block">
              <label class="filter-label">Категория</label>
              <div class="select-wrapper" :class="{ active: categoryFilter }">
                <select v-model="categoryFilter">
                  <option value="">Все категории</option>
                  <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
                <span class="arrow">▼</span>
              </div>
            </div>

            <div class="filter-block filter-block--search">
              <label class="filter-label">Поиск</label>
              <div class="search-wrapper">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="search-input"
                  placeholder="Поиск по тексту..."
                />
              </div>
            </div>
          </div>

          <div class="filters-footer">
            <label class="checkbox-inline">
              <input type="checkbox" v-model="onlyWithParticipation" />
              <span>Только с участием</span>
            </label>

            <button class="link-reset" v-if="hasActiveFilters" @click="resetFilters">
              Сбросить
            </button>
          </div>
        </section>

        <section
          class="complaints-state"
          v-if="isLoading || errorMessage || !filteredComplaints.length"
        >
          <div v-if="isLoading" class="state-block">
            <div class="loader"></div>
            <p class="state-text">Загружаем жалобы…</p>
          </div>

          <div v-else-if="errorMessage" class="state-block state-block--error">
            <p class="state-text state-text--error">{{ errorMessage }}</p>
          </div>

          <div v-else class="state-block">
            <p class="state-text">Жалоб по этим фильтрам нет.</p>
          </div>
        </section>

        <section v-else class="complaints-list">
          <article v-for="(c, index) in filteredComplaints" :key="index" class="complaint-card">
            <header class="complaint-header">
              <span class="complaint-number">Жалоба #{{ index + 1 }}</span>
              <span class="complaint-date">{{ formatDate(c.timestamp) }}</span>
            </header>

            <div class="complaint-body">
              <p class="complaint-text" v-if="expanded[index]">{{ c.message }}</p>

              <p class="complaint-text short-text" v-else>{{ short(c.message) }}</p>

              <button class="expand-btn" v-if="c.message.length > 150" @click="toggle(index)">
                {{ expanded[index] ? 'Свернуть' : 'Развернуть' }}
              </button>
            </div>

            <footer class="complaint-footer">
              <span class="complaint-category">{{ c.category }}</span>
              <span v-if="c.agree" class="complaint-agree">Готов участвовать</span>
            </footer>
          </article>
        </section>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const URL =
  'https://script.google.com/macros/s/AKfycbypZpyn8A0_GrgiWa0J0b13Hk6bYGRqmHCdGS-bBGxv9Xf586nNyN3gQIVDGvIoWRRRKw/exec?action=getComplaints'

const complaints = ref([])
const expanded = ref({})
const isLoading = ref(false)
const errorMessage = ref('')

const categoryFilter = ref('')
const searchQuery = ref('')
const onlyWithParticipation = ref(false)

const short = (t) => (t.length <= 150 ? t : t.slice(0, 150) + '…')
const toggle = (i) => (expanded.value[i] = !expanded.value[i])

const fetchComplaints = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const res = await fetch(URL)
    if (!res.ok) throw new Error()
    const json = await res.json()
    complaints.value = json.complaints.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  } catch (e) {
    errorMessage.value = 'Ошибка загрузки данных'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchComplaints)

const uniqueCategories = computed(() => [...new Set(complaints.value.map((c) => c.category))])
const hasActiveFilters = computed(
  () => categoryFilter.value || searchQuery.value.trim() || onlyWithParticipation.value,
)

const filteredComplaints = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return complaints.value.filter((c) => {
    if (categoryFilter.value && c.category !== categoryFilter.value) return false
    if (onlyWithParticipation.value && !c.agree) return false
    if (q && !c.message.toLowerCase().includes(q)) return false
    return true
  })
})

const resetFilters = () => {
  categoryFilter.value = ''
  searchQuery.value = ''
  onlyWithParticipation.value = false
}

const formatDate = (v) => {
  const d = new Date(v)
  if (isNaN(d)) return v
  return d.toLocaleString('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}
</script>

<style scoped>
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
  gap: 30px;
}
.menu-item {
  font-size: 18px;
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

.complaints-page {
  min-height: 100vh;
  padding: 60px 0;
  background: linear-gradient(135deg, #d7dcf5, #e6d7f2 50%, #f8dde4);
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
}
.complaints-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

.complaints-header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-end;
  margin-bottom: 24px;
}
.complaints-title {
  font-size: 30px;
  font-weight: 800;
  color: #262648;
  margin-bottom: 6px;
}
.complaints-subtitle {
  font-size: 15px;
  max-width: 620px;
  opacity: 0.78;
}
.complaints-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}
.meta-pill {
  background: rgba(255, 255, 255, 0.82);
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 13px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.filters-card {
  background: rgba(255, 255, 255, 0.96);
  border-radius: 16px;
  padding: 18px 20px 14px;
  margin-bottom: 24px;
  box-shadow: 0 14px 32px rgba(35, 38, 90, 0.18);
}
.filters-row {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 16px;
  margin-bottom: 10px;
}
.filter-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.filter-label {
  font-size: 13px;
  font-weight: 600;
  color: #303152;
}
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
  padding: 10px 40px 10px 12px;
  border: none;
  background: transparent;
  font-size: 14px;
  cursor: pointer;
}
.arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  opacity: 0.7;
}

.search-wrapper {
  border-radius: 10px;
  border: 2px solid rgba(19, 21, 58, 0.2);
  background: #fdfdff;
  padding: 2px 10px;
  display: flex;
  align-items: center;
}
.search-input {
  border: none;
  background: transparent;
  width: 100%;
  padding: 6px 4px;
  font-size: 14px;
  outline: none;
}

.filters-footer {
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.checkbox-inline {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
}
.checkbox-inline input {
  width: 16px;
  height: 16px;
}
.link-reset {
  border: none;
  background: transparent;
  font-size: 13px;
  color: #bf2244;
  cursor: pointer;
  text-decoration: underline;
}

.complaints-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
}
.complaint-card {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 18px;
  padding: 18px 20px 16px;
  box-shadow: 0 18px 34px rgba(33, 37, 63, 0.22);
}
.complaint-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 13px;
  opacity: 0.7;
}
.complaint-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.complaint-text,
.short-text {
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
}
.short-text {
  max-height: 95px;
  overflow: hidden;
  position: relative;
}
.short-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 35px;
  width: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);
}

.expand-btn {
  background: none;
  border: none;
  color: #50518c;
  cursor: pointer;
  font-size: 13px;
  text-decoration: underline;
  font-weight: 600;
  padding: 0;
  width: fit-content;
}
.expand-btn:hover {
  color: #bf2244;
}

.complaint-footer {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 12px;
}
.complaint-category {
  padding: 4px 10px;
  background: rgba(80, 81, 140, 0.12);
  border-radius: 999px;
}
.complaint-agree {
  padding: 4px 10px;
  background: rgba(25, 135, 84, 0.12);
  border-radius: 999px;
}

.state-block {
  background: rgba(255, 255, 255, 0.96);
  border-radius: 16px;
  padding: 28px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 14px 32px rgba(35, 38, 90, 0.18);
}
.state-text {
  font-size: 15px;
  opacity: 0.8;
  text-align: center;
}
.state-text--error {
  color: #e34747;
}
.loader {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 3px solid rgba(80, 81, 140, 0.2);
  border-top-color: #bf2244;
  margin-bottom: 12px;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
