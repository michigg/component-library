import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CalibrationTest from './pages/CalibrationTest.vue'
import Test from './pages/Test.vue'

const mainRoutes: Array<RouteRecordRaw> = [
  {
    path: '/calibration',
    name: 'Calibration',
    component: CalibrationTest
  },
  {
    path: '/',
    name: 'Test',
    component: Test
  }
]
const routes = [...mainRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
