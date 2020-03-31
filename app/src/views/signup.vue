<template>
  <v-app>
    <v-row align="center" justify="center">
      <v-form ref="form" v-model="valid" lazy-validation>
        <h4 align-start>Sign Up</h4>
        <v-text-field
          v-model="formData.username"
          :rules="nameRules"
          label="Username"
          prepend-icon="person"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.password"
          :rules="pwdRules"
          label="Password"
          prepend-icon="lock"
          type="password"
          required
        ></v-text-field>
        <v-btn color="primary" @click="handleSubmit">SignUp</v-btn>
        <v-btn class="ml-4">
          <router-link to="/signin">SignIn</router-link>
        </v-btn>
      </v-form>
    </v-row>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      valid: true,
      nameRules: [v => !!v || "Username is required"],
      pwdRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 6) || "Password must be more than 6 characters"
      ]
    };
  },
  methods: {
    handleSubmit() {
      if (this.$refs.form.validate()) {
        this.$http.post("/user/signup", this.formData).then(() => {
          alert("you are on");
        });
      }
    }
  }
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