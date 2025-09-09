import SignIn from '@/views/auth/SignIn.vue'
import SignUp from '@/views/auth/SignUp.vue'
import HomeAccueil from '@/views/pages/HomeAccueil.vue'
import HomeContact from '@/views/pages/HomeContact.vue'
import HomeFirst from '@/views/pages/HomeFirst.vue'
import HomeNotif from '@/views/pages/HomeNotif.vue'
import SignalProb from '@/views/pages/home/SignalProb.vue'
import ParentTabs from '@/views/ParentTabs.vue'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import DetailAlert from '@/views/pages/notif/DetailAlert.vue'
import AlertStatus from '@/views/pages/home/AlertStatus.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'homeFirst',
    component: HomeFirst,
  },
  {
    path: '/page',
    component: ParentTabs,
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeAccueil,
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: HomeNotif,
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: HomeContact,
      },
      {
        path: 'home/problem',
        name: 'signalProblem',
        component: SignalProb,
      },
      {
        path: 'home/alert',
        name: 'signalLocation',
        component: AlertStatus,
      },
      {
        path: 'notifications/:id',
        name: 'detailAlert',
        component: DetailAlert,
        props: true
      },
    ],
  },
  {
    path: '/signup',
    name: 'signUp',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'login',
    component: SignIn,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
