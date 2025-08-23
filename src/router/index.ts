import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/Articles.vue')
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/ArticleDetail.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/Gallery.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/Products.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('../views/Transactions.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, _from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next()
      } else {
        next('/login')
      }
    })
  } else {
    next()
  }
})

export default router