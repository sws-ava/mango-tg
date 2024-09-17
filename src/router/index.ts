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
    // {
    //     path: '/register',
    //     name: 'Register',
    //     component: () => import('@/views/Register.vue'),
    //   meta: {
    //     zeroAuth: true,
    //   }
    // },
    // {
    //   path: '/dashboard',
    //   name: 'Dashboard',
    //   component: () => import('@/views/Dashboard.vue')
    // },

  ]
})

// router.beforeEach((to, from, next) => {
//   const userSession = useUserSession()
//
//   if (to.meta.zeroAuth === undefined && !userSession.isLoggedIn) next({ name: 'Main' })
//   else next()
// })

export default router
