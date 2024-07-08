import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Calculator from '@/components/Calculator.vue'
import UploadTest from '@/views/UploadTest.vue'
import Login from '@/views/Login.vue'
import Layout from '@/views/Layout.vue'
import UploadExcel from '@/views/UploadExcel'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/Calculator',
        name: 'Calculator',
        component: Calculator
      },
      {
        path: '/UploadTest',
        name: 'UploadTest',
        component: UploadTest
      },
      {
        path: '/UploadExcel',
        name: 'UploadExcel',
        component: UploadExcel
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
