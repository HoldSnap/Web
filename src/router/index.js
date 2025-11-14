import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import ProblemForm from '@/views/ProblemForm.vue'
import Register from '@/views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/ProblemForm',
      name: 'ProblemForm',
      component: ProblemForm,
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
    },
  ],

  // >>> ВАЖНО ДОБАВЛЯЕМ ЭТО <<<
  scrollBehavior() {
    return { top: 0 } // всегда прокручиваем к началу страницы
  },
})

export default router
