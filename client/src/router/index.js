import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/signin'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    Vue.prototype.$auth.onAuthStateChanged(function (user) {
      if (user !== null) {
        next()
      } else {
        next('/signin')
      }
    })
  } else {
    next()
  }
})

export default router
