<template>
  <div class="form-textarea">
    <label :for="name">{{name}}</label>
    <textarea :name="name" id="" cols="30" rows="10"></textarea>
  </div>
</template>
<script>
export default {
  name: "Textarea",
  props: {
    name: {
      type: String
    }
  }
}
</script>