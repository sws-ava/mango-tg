import { createRouter, createWebHistory } from 'vue-router'
import {useUserSession} from "@/store/userSession";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('@/views/main.vue'),
    },
    {
      path: '/categories/:id',
      name: 'Categories',
      component: () => import('@/views/categories.vue'),
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: () => import('@/views/category.vue'),
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/cart.vue'),
    },
    {
      path: '/order-accepted',
      name: 'OrderAccepted',
      component: () => import('@/views/cart/order-accepted.vue'),
    },

  ]
})

export default router
