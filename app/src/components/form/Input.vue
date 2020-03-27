<template>
  <div class="form-input">
    <label :for="name">{{name}}</label>
    <input :type="type" :name="name" v-model="value"/>
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
  }
}
</script>