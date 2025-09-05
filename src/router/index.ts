import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
// import HomePage from '../views/HomePage.vue'
import HomeFirst from '@/views/pages/HomeFirst.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: HomePage
  // },
  {
    path: '/home',
    name: 'HomeFirst',
    component: HomeFirst
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
