<template>
  <div class="form-input">
    <label :for="name">{{name}}</label>
    <input :type="type" :name="name" :value="value" @keyup="handleChange"/>
  </div>
</template>
<script>
export default {
  name: "Input",
  props: {
    value: {
      type: String
    },
    name: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>