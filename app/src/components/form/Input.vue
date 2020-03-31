<template>
  <div class="form-input">
    <label :for="name">{{name}}</label>
    <input :type="type" :name="name" :value="value" :readonly="readonly" @keyup="handleChange"/>
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
    },
    readonly: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>