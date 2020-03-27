<template>
  <div class="form">
    <div class="form-head">
      <slot name="title"></slot>
    </div>
    <div class="form-main">
      <slot name="main" />
    </div>
    <div class="form-foot">
      <Button title="Save" @click="handleSubmit"/>
      <Button title="Reset" @click="handleReset"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Form',
  methods: {
    handleSubmit() {
      console.log(1)
      this.$emit('submit')
    },
    handleReset() {
      this.$emit('reset')
    }
  }
  
}
</script>