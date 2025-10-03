import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import SegmentView from '@/views/SegmentView'

const routes = [
  {
    path: '/:segmentId',
    name: 'segmented',
    component: SegmentView
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
