import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const include = function(path) {
  return () => import(`@/views/${path}`)
}

// history: connect-history-api-fallback

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: include('index'),
      redirect: '/profile',
      children: [
        {
          path: '/profile',
          name: 'profile',
          component: include('profile'),
          meta: {
            auth: true
          }
        },
      ],
      meta: {
        auth: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: include('signin'),
      meta: {
        auth: false
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: include('signup'),
      meta: {
        auth: false
      }
    }
  ]
})

export default router
