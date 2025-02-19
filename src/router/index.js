import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExpandUrlView from '../views/ExpandUrlView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:shortid',
      name: 'expandurl',
      component: ExpandUrlView,
    },
  ],
})

export default router
