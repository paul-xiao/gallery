<template>
  <div class="form-textarea">
    <label :for="name">{{name}}</label>
    <textarea :name="name" id="" cols="30" rows="10" :value="value" @keyup="handleChange"></textarea>
  </div>
</template>
<script>
export default {
  name: "Textarea",
  props: {
    name: {
      type: String
    },
    value: {
      type: String
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>