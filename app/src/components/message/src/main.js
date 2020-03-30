import Vue from 'vue'
import Main from './main.vue'
let MessageConstructor = Vue.extend(Main)

let instance
let instances = []
let seed = 1

const Message = function(options) {
  if (Vue.prototype.$isServer) return
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  let userOnClose = options.onClose
  let id = 'message_' + seed++

  options.onClose = function() {
    Message.close(id, userOnClose)
  }
  instance = new MessageConstructor({
    data: options
  })
  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true
  instance.$el.style.zIndex = 9999 + instances.length
  instances.push(instance)
  instances.forEach(item => {
    if (item.id !== id) {
      item.$el.style.display = 'none'
    }
  })
  return instance
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Message(options)
  }
})

Message.close = function(id, userOnClose) {
  let len = instances.length
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }
}

Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default Message
