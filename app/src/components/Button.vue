<template>
    <button :type="type" class="btn" @click="handleClick">{{title}}</button>
</template>
<script>
export default {
  name:'Button',
  props: {
    type: {
      type: String,
      default: 'button'
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