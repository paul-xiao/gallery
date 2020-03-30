<template>
  <transition name="message-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'message',
        type && !iconClass ? `message--${ type }` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass,
        title ? 'with-title' : ''
      ]"
      :style="positionStyle"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      role="alert">
      <i :class="iconClass" v-if="iconClass"></i>
      <i :class="typeClass" v-else></i>
      <slot>
        <p  v-if="dangerouslyUseHTMLString"  v-html="message" class="message__content"></p>
        <div class="message__content_wrap" v-else>
          <div class="message__content-title" v-if="title">{{title}}</div>
          <p v-if="!dangerouslyUseHTMLString" class="message__content">{{ message }}</p>
        </div>
      </slot>
      <i v-if="showClose" class="message__closeBtn icon-close" @click="close"></i>
    </div>
  </transition>
</template>

<script type="text/babel">
const typeMap = {
  success: 'Success!',
  info: 'Info',
  warning: 'Warning',
  error: 'Error',
  grey: ''
}
export default {
  data() {
    return {
      visible: false,
      message: '',
      duration: 3000,
      type: 'info',
      iconClass: '',
      customClass: '',
      onClose: null,
      showClose: false,
      closed: false,
      verticalOffset: 20,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false
    }
  },

  computed: {
    title() {
      return this.type ? typeMap[this.type] : 'Default'
    },
    typeClass() {
      return this.type && !this.iconClass
        ? `message__icon icon-${this.type}`
        : `message__icon icon-info`
    },
    positionStyle() {
      return {
        'top': `${this.verticalOffset}px`
      }
    }
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
      }
    }
  },

  methods: {
    handleAfterLeave() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },

    close() {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },

    clearTimer() {
      clearTimeout(this.timer)
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    keydown(e) {
      if (e.keyCode === 27) { // esc关闭消息
        if (!this.closed) {
          this.close()
        }
      }
    }
  },
  mounted() {
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown)
  }
}
</script>
