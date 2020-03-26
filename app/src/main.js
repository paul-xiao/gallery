import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $http from './utils/http'
import clickOutside from './directives/click-outside'
import components from './components'


Vue.prototype.$http = $http
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let email = localStorage.getItem('user')
  let {auth} = to.meta
  if(!email && auth && !['signin', 'signup'].includes(to.name)) {
    return next({path: `/signin${to.fullPath ? `?redirect=${to.fullPath}` : ''}`})
  }
  next()
})
// register directive
Vue.directive('click-outside', clickOutside);
// register components
Object.values(components).forEach(com => {
  Vue.component(com.name, com)
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
