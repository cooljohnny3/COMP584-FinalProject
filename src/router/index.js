import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('username') === null) {
          next({
            path: '/login'
          })
        } else {
          next()
        }
      }
    },
    {
      title: 'Login',
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      title: 'Register',
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
