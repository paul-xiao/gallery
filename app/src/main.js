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
import { Lazyload } from 'vant'
import { Toast, Notify } from 'vant'
import 'amfe-flexible'

import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://192.168.43.141:3000'
}))

Vue.use(Lazyload)
Vue.prototype.$http = $http
Vue.prototype.$toast = Toast
Vue.prototype.$notify = Notify
// Vue.prototype.$saveToIpfs = $saveToIpfs
Vue.prototype.$message = $message
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let { username } = JSON.parse(sessionStorage.getItem('userinfo')) || {}
  let { auth } = to.meta
  if (!username && auth && !['signin', 'signup'].includes(to.name)) {
    console.log(username);
    return next({ path: `/signin` })
  }
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
