import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import Restaurants from './pages/Restaurants.vue';
import Menu from './pages/Menu.vue';
import CheckOutPage from './pages/CheckOutPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },

    {
      path: '/restaurants',
      name: 'restaurants',
      component: Restaurants,
    },

    {
      path: '/menu/:slug',
      name: 'menu',
      component: Menu,
    },

    {
      path: '/check-out',
      name: 'check-out',
      component: CheckOutPage,
    },

    {
      path: '/:pathMatch(.)',
      name: 'not-found',
      component: NotFoundPage,
    },
    
  ]
})

export default router
