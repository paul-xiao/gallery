import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $http from './utils/http'
// import $saveToIpfs from './utils/saveToIpfs'
import clickOutside from './directives/click-outside'
import components from './components'
import $message from './components/message'
import pxui from 'pxui'
import Vant from 'vant'
import 'vant/lib/index.css'
import { Lazyload } from 'vant'
import { Toast, Notify } from 'vant'

Vue.use(Lazyload)
Vue.use(Vant)
Vue.prototype.$http = $http
Vue.prototype.$toast = Toast
Vue.prototype.$notify = Notify
// Vue.prototype.$saveToIpfs = $saveToIpfs
Vue.prototype.$message = $message
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // let { username } = JSON.parse(localStorage.getItem('userinfo')) || {}
  // let { auth } = to.meta
  // if(!username && auth && !['signin', 'signup'].includes(to.name)) {
  //   return next({path: `/signin${to.fullPath ? `?redirect=${to.fullPath}` : ''}`})
  // }
  next()
})
// register directive
Vue.directive('click-outside', clickOutside)
// register components
Vue.use(components)
Vue.use(pxui)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
