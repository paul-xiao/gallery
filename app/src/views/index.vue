<template>
  <BaseLayout>
    <router-view />
  </BaseLayout>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "Home",
  created() {
    console.log("---update---");

    this.init();
  },
  computed: {
    ...mapGetters(["userinfo"]),
  },
  watch: {
    userinfo(val) {
      !val.username && this.$router.push("/signin");
    },
  },
  methods: {
    init() {
      axios
        .get(`http://localhost:3000/user/list`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
        });
      // this.$store
      //   .dispatch("GET_USER_INFO")
      //   .then(data => {
      //     console.log(data);
      //   })
      //   .catch(err => console.log(err));
    },
    logout() {
      this.$store.dispatch("LOG_OUT");
    },
  },
};
</script>
<style lang="stylus" scoped>
.post-wrap {
  .post {
    img {
      height: 50px;
    }
  }
}
</style>