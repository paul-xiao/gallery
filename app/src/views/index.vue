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
    const { userId } = this.userinfo;
    this.$easyim.connect(this.userinfo);
    this.$easyim.on("online", (users) => {
      let userList = users.filter((u) => u.userId !== userId);
      console.log(userList);
      this.$store.commit("UPDATE_CONTACTS", userList);
    });
    this.$easyim.on("conversations", (conversations) => {
      this.$store.commit("UPDATE_CON", conversations);
    });
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