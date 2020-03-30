<template>
    <button :type="type" :class="[`btn`, `btn-${variant}`]" @click="handleClick">{{title}}</button>
</template>
<script>
export default {
  name:'Button',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'default'
    },
    title: {
      type: String,
      default: 'button'
    },
  },
  methods: {
    handleClick(){
      this.$emit('click')
    }
  }
}
</script>