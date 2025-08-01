import { createRouter, createWebHistory } from 'vue-router'
import CartView from '@/views/CartView.vue'
import catalView from '@/views/catalView.vue'
import FAqView from '@/views/FAqView.vue'
import UnderOrderView from '@/views/UnderOrderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: catalView,
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAqView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/order',
      name: 'order',
      component: UnderOrderView,
    },
  ],
})

export default router
