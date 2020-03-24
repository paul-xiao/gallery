<template>
  <div class="signin">
    <div class="form">
      <input type="text" v-model="formData.username" placeholder="username">
      <input type="password" v-model="formData.password" placeholder="pwd">
      <button type="submit" @click.prevent="handleSubmit">signin</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$http.post('/signin', this.formData).then(() => {
        alert('you are on')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.form{
  input,button{
    display: block;
  }
}
</style>