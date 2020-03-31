<template>
  <div class="signin">
    <div class="form">
      <h4>Signin</h4>
      <input type="text" v-model="formData.username" placeholder="username">
      <input type="password" v-model="formData.password" placeholder="pwd">
      <button type="submit" @click.prevent="handleSubmit">signin</button>
      <router-link to="/signup">signup</router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ]) 
  },
  created() {
    const { username } = this.userinfo
    username && this.$router.push('/')
  },
  methods: {
     init() {
     this.$store.dispatch('GET_USER_INFO').then(() => {
      this.$router.push('/')
     })
    },
    handleSubmit() {
      this.$http.post('/user/signin', this.formData).then(({data}) => {
        if(data.status ){
            this.init()
        } else {
           this.$message.error(data.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.signin
 height: 100%;
 width: 100%;
 display: flex;
 justify-content: center;
 align-items: center;
.form
  input,button
    display: block;
    border: 0;
    margin: 10px 0;
    height: 35px;
    width: 200px;
    outline: none
  input
    width: calc( 200px - 20px);
    padding: 0 10px;
    box-shadow: 0 0 1px #607d8b;
  button
    background: lightblue;
    color: #FFF;
    &:active, &:hover 
     background: darken(lightblue, 20%);
  a
    margin: 10px 0;
    text-decoration: none;
    color: darken(lightblue, 10%);
</style>