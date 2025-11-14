import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/Main.vue'
import ProblemForm from '@/views/ProblemForm.vue'
import Register from '@/views/Register.vue'

const router = createRouter({
  history: createWebHashHistory(), // для GitHub Pages
  routes: [
    { path: '/', redirect: '/Main' },
    { path: '/register', name: 'register', component: Register },
    { path: '/ProblemForm', name: 'ProblemForm', component: ProblemForm },
    { path: '/Main', name: 'Main', component: Main },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router // ← ← ← ЭТО ОЧЕНЬ ВАЖНО
