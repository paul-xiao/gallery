import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $http from './utils/http'

Vue.prototype.$http = $http
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let {auth} = to.meta
  const user = localStorage.getItem('user')

  if( auth && !user) {
    next('/signin')
  }
  
  next()
})




new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
