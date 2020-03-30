import BaseLayout from './BaseLayout'
import Button from './Button'
import message from './message'
import icons from './icons'
import forms from './form'

const components = [
  BaseLayout,
  Button,
  message,
  icons,
  forms
]


export default {
  install(Vue) {
    components.forEach(component => {
      if (Array.isArray(component)) {
        component.forEach(i => {
          Vue.component(i.name, i)
        })
      } else {
        Vue.component(component.name, component)
      }
    })
  }
}
