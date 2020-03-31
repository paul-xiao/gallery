import BaseLayout from './BaseLayout'
import Button from './Button'
import Dropdown from './Dropdown'
import message from './message'
import Icon from './Icon'
import forms from './form'

const components = [
  BaseLayout,
  Button,
  Dropdown,
  message,
  Icon,
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
