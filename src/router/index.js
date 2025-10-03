import { createRouter, createWebHistory } from 'vue-router'
import SegmentView from '@/views/SegmentView'

const routes = [
  {
    path: '/:segmentId',
    name: 'segmented',
    component: SegmentView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
