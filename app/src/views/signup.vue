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
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
        <router-link to="/signin">登录</router-link>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Notify, Form, Field, Button } from "vant";

export default {
  components: {
    "van-button": Button,
    "van-form": Form,
    "van-field": Field,
  },
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$http.post("/user/signup", this.formData).then(() => {
        Notify("you are on");
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.signin {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  input, button {
    display: block;
    border: 0;
    margin: 10px 0;
    height: 35px;
    width: 200px;
    outline: none;
  }

  input {
    width: calc(200px - 20px);
    padding: 0 10px;
    box-shadow: 0 0 1px #607d8b;
  }

  button {
    background: lightblue;
    color: #FFF;

    &:active, &:hover {
      background: darken(lightblue, 20%);
    }
  }

  a {
    margin: 10px 0;
    text-decoration: none;
    color: darken(lightblue, 10%);
  }
}
</style>
