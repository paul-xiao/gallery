<template>
  <button
    v-if="type != 'cancel'"
    :class="classes"
    :type="btnType"
    :style="style"
    @click="handleClick">
    <span><slot></slot></span>
    <axel-icon name="loading" v-if="loading"></axel-icon>
  </button>
  <button type="button" v-else :class="classes" @click.stop.prevent="cancel" @mousedown="handleMousedown">
    <span><slot></slot></span>
  </button>
</template>

<script>
import Icon from './Icon'
const prefixCls = 'btn'
/**
  props values:
    type: primary, secondary(default), info, warning, error, default, cancel
    size: xl, lg, md(default), sm, xs
    btnType: button(default), submit
*/
export default {
  name: 'Button',
  components: {
    [Icon.name]: Icon
  },
  props: {
    type: {
      type: String,
      default: 'secondary'
    },
    size: {
      type: String,
      default: 'md'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    block: {
      type: Boolean,
      default: false
    },
    btnStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    btnType: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}__${this.type}`]: !!this.type,
          [`${prefixCls}__${this.size}`]: !!this.size,
          [`${prefixCls}__disabled`]: this.disabled,
          [`${prefixCls}__round`]: this.round,
          [`${prefixCls}__loading`]: this.loading,
          'is-plain': this.plain,
          'is-block': this.block,
          'is-loading': this.loading
        }
      ]
    },
    style() {
      return { minWidth: this.btnType == 'submit' ? '100px' : null, width: this.width ? `${this.width}px` : null, ...this.btnStyle }
    }
  },
  methods: {
    handleClick(e) {
      !this.disabled && !this.loading && this.$emit('click', e)
    },
    cancel(e) {
      this.$emit('click', e)
    },
    handleMousedown(e) {
      this.$emit('mousedown', e)
    }
  }
}
</script>
