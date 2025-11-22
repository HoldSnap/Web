import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/Main.vue'
import ProblemForm from '@/views/ProblemForm.vue'
import Register from '@/views/Register.vue'
import IdeaForm from '@/views/IdeaForm.vue'
import IdeaList from '@/views/IdeaList.vue'
import ProblemList from '@/views/ProblemList.vue'
import Shop from '@/views/Shop.vue'
import Rating from '@/views/Rating.vue'

const router = createRouter({
  history: createWebHashHistory(), // для GitHub Pages
  routes: [
    { path: '/', redirect: '/register' },
    { path: '/register', name: 'register', component: Register },
    { path: '/ProblemForm', name: 'ProblemForm', component: ProblemForm },
    { path: '/Main', name: 'Main', component: Main },
    { path: '/idea', name: 'idea', component: IdeaForm },
    { path: '/idealist', name: 'idealist', component: IdeaList },
    { path: '/problemlist', name: 'problemlist', component: ProblemList },
    {path: '/shop', name: 'shop', component: Shop},
    {path: '/rating', name:  'rating', component: Rating}
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router // ← ← ← ЭТО ОЧЕНЬ ВАЖНО
