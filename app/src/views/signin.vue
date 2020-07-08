<template>
  <div class="signin">
    <van-form @submit="onSubmit">
      <van-field
        v-model="formData.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="formData.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
        <router-link to="/signup">注册</router-link>
      </div>
    </van-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Notify } from 'vant'

export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
    }
  },
  computed: {
    ...mapGetters(['userinfo']),
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
    onSubmit() {
      this.$http
        .post('/user/signin', this.formData)
        .then(({ data }) => {
          console.log(data)
          if (data.status) {
            this.init()
          } else {
            console.log(data.message)

            Notify(data.message)
          }
        })
        .catch((err) => {
          Notify(err.message)
        })
    },
  },
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
