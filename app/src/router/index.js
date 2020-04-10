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
      redirect: '/gallery',
      children: [

        {
          path: '/post',
          name: 'post',
          component: include('post'),
          meta: {
            auth: true
          }
        },
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
      path: '/gallery',
      name: 'gallery',
      component: include('gallery'),
      meta: {
        auth: false
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
