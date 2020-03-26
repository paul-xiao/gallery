<template>
  <i
    v-if="path"
    class="axel-icon"
    :class="`icon-${name}`"
    :style="{backgroundImage: `url(${icon})`, cursor: cursor}">
  </i>
  <i v-else :class="classes" :style="{cursor: cursor}"></i>
</template>

<script>
const prefixCls = 'el-icon'
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    },
    cursor: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes() {
      return [
        prefixCls,
        `${prefixCls}-${this.name}`
      ]
    },
    icon() {
      return null
    }
  }
}
</script>
