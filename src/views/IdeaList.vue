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
          <router-link class="menu-item" to="/idea">Предложить идею</router-link>
        </nav>
      </div>

      <div class="accent-line line-animate"></div>
    </header>

    <main class="ideas-page">
      <section class="ideas-wrapper">
        <header class="ideas-header">
          <div>
            <h1 class="ideas-title">Идеи сотрудников</h1>
            <p class="ideas-subtitle">
              Здесь собраны предложения по улучшению процессов, сервиса и рабочих условий.
            </p>
          </div>

          <div class="ideas-meta">
            <span class="meta-pill" v-if="ideas.length">
              Всего идей: <strong>{{ ideas.length }}</strong>
            </span>
            <span class="meta-pill" v-if="filteredIdeas.length !== ideas.length">
              Отфильтровано: <strong>{{ filteredIdeas.length }}</strong>
            </span>
          </div>
        </header>

        <section class="filters-card">
          <div class="filters-row">
            <div class="filter-block">
              <label class="filter-label">Область улучшения</label>
              <div class="select-wrapper" :class="{ active: areaFilter }">
                <select v-model="areaFilter">
                  <option value="">Все области</option>
                  <option v-for="area in uniqueAreas" :key="area" :value="area">
                    {{ area }}
                  </option>
                </select>
                <span class="arrow">▼</span>
              </div>
            </div>

            <div class="filter-block">
              <label class="filter-label">Эффект</label>
              <div class="select-wrapper" :class="{ active: effectFilter }">
                <select v-model="effectFilter">
                  <option value="">Любой эффект</option>
                  <option v-for="eff in uniqueEffects" :key="eff" :value="eff">
                    {{ eff }}
                  </option>
                </select>
                <span class="arrow">▼</span>
              </div>
            </div>

            <div class="filter-block filter-block--search">
              <label class="filter-label">Поиск по тексту</label>
              <div class="search-wrapper">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="search-input"
                  placeholder="Искать по тексту..."
                />
              </div>
            </div>
          </div>

          <div class="filters-footer">
            <label class="checkbox-inline">
              <input type="checkbox" v-model="onlyWithParticipation" />
              <span>Только идеи с готовностью участвовать</span>
            </label>

            <button class="link-reset" type="button" @click="resetFilters" v-if="hasActiveFilters">
              Сбросить фильтры
            </button>
          </div>
        </section>

        <section class="ideas-state" v-if="isLoading || errorMessage || !filteredIdeas.length">
          <div v-if="isLoading" class="state-block">
            <div class="loader"></div>
            <p class="state-text">Загружаем идеи…</p>
          </div>

          <div v-else-if="errorMessage" class="state-block state-block--error">
            <p class="state-text state-text--error">
              {{ errorMessage }}
            </p>
            <button class="retry-btn" type="button" @click="fetchIdeas">Попробовать ещё раз</button>
          </div>

          <div v-else class="state-block">
            <p class="state-text">По выбранным фильтрам идей нет.</p>
          </div>
        </section>

        <section v-else class="ideas-list">
          <article
            v-for="(idea, index) in filteredIdeas"
            :key="idea.id || index"
            class="idea-card-item fade-up-card"
          >
            <header class="idea-card-header">
              <div class="idea-tags">
                <span class="tag tag--area" v-if="idea.improvementArea">
                  {{ idea.improvementArea }}
                </span>
                <span class="tag tag--effect" v-if="idea.effect">
                  {{ idea.effect }}
                </span>
                <span class="tag tag--participation" v-if="idea.agree"> Готов участвовать </span>
              </div>

              <div class="idea-meta">
                <span class="idea-number">Идея #{{ index + 1 }}</span>
                <span v-if="idea.timestamp" class="idea-date">
                  {{ formatDate(idea.timestamp) }}
                </span>
              </div>
            </header>

            <div class="idea-card-body">
              <div v-if="!expanded[index]">
                <p class="idea-text short-text">
                  {{ trimmedText(idea) }}
                </p>
              </div>

              <div v-else class="idea-full">
                <h3 class="idea-section-title">Текущая ситуация</h3>
                <p class="idea-text">
                  {{ idea.currentSituation }}
                </p>

                <h3 class="idea-section-title">Предлагаемое решение</h3>
                <p class="idea-text">
                  {{ idea.solutionDescription }}
                </p>

                <footer class="idea-card-footer" v-if="idea.author || idea.status">
                  <span v-if="idea.author" class="meta-chip"> Автор: {{ idea.author }} </span>
                  <span v-if="idea.status" class="meta-chip meta-chip--status">
                    Статус: {{ idea.status }}
                  </span>
                </footer>
              </div>

              <button class="expand-btn" @click="toggleExpand(index)">
                {{ expanded[index] ? 'Свернуть ▲' : 'Развернуть ▼' }}
              </button>
            </div>
          </article>
        </section>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const IDEAS_URL =
  'https://script.google.com/macros/s/AKfycbypZpyn8A0_GrgiWa0J0b13Hk6bYGRqmHCdGS-bBGxv9Xf586nNyN3gQIVDGvIoWRRRKw/exec?action=getIdeas'

const ideas = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const expanded = ref({})

const areaFilter = ref('')
const effectFilter = ref('')
const searchQuery = ref('')
const onlyWithParticipation = ref(false)

const hasActiveFilters = computed(
  () =>
    !!areaFilter.value ||
    !!effectFilter.value ||
    !!searchQuery.value.trim() ||
    onlyWithParticipation.value,
)

const fetchIdeas = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const res = await fetch(IDEAS_URL)
    if (!res.ok) throw new Error('Ответ сервера: ' + res.status)

    const data = await res.json()
    const rawIdeas = Array.isArray(data) ? data : data.ideas || []

    ideas.value = rawIdeas
      .map((item) => ({
        id: item.id ?? item.ID ?? null,
        improvementArea: item.improvementArea ?? item['Область'] ?? '',
        currentSituation: item.currentSituation ?? item['ТекущаяСитуация'] ?? '',
        solutionDescription: item.solutionDescription ?? item['ОписаниеРешения'] ?? '',
        effect: item.effect ?? item['Эффект'] ?? '',
        agree: item.agree === true || item.agree === 'Да',
        timestamp: item.timestamp ?? item['дата'] ?? '',
        author: item.author ?? item['Автор'] ?? '',
        status: item.status ?? item['Статус'] ?? '',
      }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  } catch (err) {
    errorMessage.value = 'Не удалось загрузить идеи. Попробуйте позже.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchIdeas()
})

const uniqueAreas = computed(() => {
  const set = new Set(ideas.value.map((i) => i.improvementArea).filter(Boolean))
  return Array.from(set)
})

const uniqueEffects = computed(() => {
  const set = new Set(ideas.value.map((i) => i.effect).filter(Boolean))
  return Array.from(set)
})

const filteredIdeas = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return ideas.value.filter((idea) => {
    if (areaFilter.value && idea.improvementArea !== areaFilter.value) return false
    if (effectFilter.value && idea.effect !== effectFilter.value) return false
    if (onlyWithParticipation.value && !idea.agree) return false

    if (query) {
      const haystack = [
        idea.currentSituation,
        idea.solutionDescription,
        idea.improvementArea,
        idea.effect,
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(query)) return false
    }

    return true
  })
})

const resetFilters = () => {
  areaFilter.value = ''
  effectFilter.value = ''
  searchQuery.value = ''
  onlyWithParticipation.value = false
}

const trimmedText = (idea) => {
  const full = (idea.currentSituation || '') + '\n\n' + (idea.solutionDescription || '')

  return full.length > 150 ? full.slice(0, 150) + '…' : full
}

const toggleExpand = (index) => {
  expanded.value[index] = !expanded.value[index]
}

const formatDate = (value) => {
  if (!value) return ''
  const d = new Date(value)
  if (isNaN(d)) return value
  return d.toLocaleString('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}
</script>

<style scoped>
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

.ideas-page {
  min-height: 100vh;
  padding: 60px 0;
  background: linear-gradient(135deg, #d7dcf5, #e6d7f2 50%, #f8dde4);
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
}

.ideas-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

.ideas-header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-end;
  margin-bottom: 24px;
}

.ideas-title {
  font-size: 30px;
  font-weight: 800;
  color: #262648;
  margin-bottom: 6px;
}

.ideas-subtitle {
  font-size: 15px;
  max-width: 620px;
  opacity: 0.78;
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
  grid-template-columns: 220px 220px minmax(0, 1fr);
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
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
}

.ideas-state {
  margin-top: 12px;
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

.retry-btn {
  margin-top: 10px;
  border-radius: 999px;
  border: none;
  padding: 8px 18px;
  background: linear-gradient(135deg, #d72648, #bf2244);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}

.ideas-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
}

.idea-card-item {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 18px;
  padding: 18px 20px 16px;
  box-shadow: 0 18px 34px rgba(33, 37, 63, 0.22);
}

.idea-card-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 10px;
}

.idea-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
}

.tag--area {
  background: rgba(80, 81, 140, 0.12);
  color: #404178;
}

.tag--effect {
  background: rgba(191, 34, 68, 0.09);
  color: #bf2244;
}

.tag--participation {
  background: rgba(25, 135, 84, 0.12);
  color: #1a7f4b;
}

.idea-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-end;
  font-size: 12px;
  opacity: 0.75;
}

.idea-number {
  font-weight: 600;
}

.idea-card-body {
  margin-top: 4px;
}

.idea-full {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.idea-section-title {
  font-size: 13px;
  font-weight: 700;
  color: #52527b;
}

.idea-text,
.short-text {
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
}

.idea-card-footer {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.meta-chip {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.04);
}

.meta-chip--status {
  background: rgba(80, 81, 140, 0.12);
}

.expand-btn {
  margin-top: 12px;
  background: transparent;
  border: none;
  color: #bf2244;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
