import { createRouter, createWebHistory } from 'vue-router'
import SegmentView from '@/views/SegmentView'
import SettingsView from '@/views/SettingsView'
import HomeView from '@/views/HomeView'

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
