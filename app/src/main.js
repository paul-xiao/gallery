import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $http from './utils/http'
import $saveToIpfs from './utils/saveToIpfs'
import clickOutside from './directives/click-outside'
import components from './components'
import $message from './components/message'


Vue.prototype.$http = $http
Vue.prototype.$saveToIpfs = $saveToIpfs
Vue.prototype.$message = $message
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let { username } = JSON.parse(localStorage.getItem('userinfo')) || {}
  let {auth} = to.meta
  if(!username && auth && !['signin', 'signup'].includes(to.name)) {
    return next({path: `/signin${to.fullPath ? `?redirect=${to.fullPath}` : ''}`})
  }
  next()
})
// register directive
Vue.directive('click-outside', clickOutside);
// register components
Vue.use(components)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
