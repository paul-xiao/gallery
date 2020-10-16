import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const include = function (path) {
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
          path: '/gallery',
          name: 'gallery',
          component: include('gallery'),
          meta: {
            auth: true,
          },
        },
        {
          path: '/profile',
          name: 'profile',
          component: include('profile'),
          meta: {
            auth: true,
          },
        },
        {
          path: '/post',
          name: 'post',
          component: include('post'),
          meta: {
            auth: true,
          },
        },
        {
          path: '/info',
          name: 'info',
          component: include('info'),
          meta: {
            auth: true,
          },
        },
        {
          path: '/search',
          name: 'search',
          component: include('search'),
          meta: {
            auth: true,
          },
        },
        {
          path: '/im',
          name: 'im',
          component: include('im'),
          meta: {
            auth: true,
          },
        }
      ],
      meta: {
        auth: true,
      },
    },
    {
      path: '/signin',
      name: 'signin',
      component: include('signin'),
      meta: {
        auth: false,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: include('signup'),
      meta: {
        auth: false,
      },
    },
    {
      path: '/chat',
      name: 'chat',
      component: include('chat'),
      meta: {
        auth: true,
      },
    }
  ],
})

export default router
