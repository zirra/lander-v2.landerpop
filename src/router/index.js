import { createRouter, createWebHistory } from 'vue-router'
import SegmentView from '@/views/SegmentView'
import SettingsView from '@/views/SettingsView'
import HomeView from '@/views/HomeView'
import SignupView from '@/views/SignupView'

const routes = [
  {
    path: '/:segmentId',
    name: 'segmented',
    component: SegmentView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
