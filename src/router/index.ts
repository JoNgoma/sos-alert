import SignIn from '@/views/auth/SignIn.vue';
import SignUp from '@/views/auth/SignUp.vue';
import HomeAccueil from '@/views/pages/HomeAccueil.vue';
import HomeContact from '@/views/pages/HomeContact.vue';
import HomeFirst from '@/views/pages/HomeFirst.vue';
import HomeNotif from '@/views/pages/HomeNotif.vue';
import ParentTabs from '@/views/ParentTabs.vue';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'homeFirst',
        component: HomeFirst
      },
      {
        path: '/home',
        component: ParentTabs,
        children: [
          {
            path: '',
            name: 'home',
            component: HomeAccueil
          },
          {
            path: 'notifications',
            name: 'notifications',
            component: HomeNotif
          },
          {
            path: 'contact',
            name: 'contact',
            component: HomeContact
          }
        ]
      },
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  {
    path: '/signup',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: SignIn
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
