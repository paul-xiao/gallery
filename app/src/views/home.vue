<template>
  <div class="container">
    <h1>Home</h1>
    <h4>Hi, {{user}}</h4>
    <button @click="logout">logout</button>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    user() {
      return localStorage.getItem("user");
    }
  },
  methods: {
    logout() {
      this.$http.delete("/logout");
      localStorage.removeItem("user");
      this.$router.push("/signin");
    }
  }
};
</script>