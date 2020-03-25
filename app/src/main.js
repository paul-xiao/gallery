import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $http from './utils/http'

Vue.prototype.$http = $http
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let email = localStorage.getItem('user')
  let {auth} = to.meta
  if (to.matched.length === 0) {
    from.name ? next({
      name: from.name
    }) : next('/errorinfo');
  } else if(!email && auth && !['signin', 'signup'].includes(to.name)) {
    return next({path: `/signin${to.fullPath ? `?redirect=${to.fullPath}` : ''}`})
  }
  next()
})




new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
