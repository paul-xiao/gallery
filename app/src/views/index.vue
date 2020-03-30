<template>
<BaseLayout>
 <router-view />
</BaseLayout>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: "Home",
  created() {
    this.init()
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  watch: {
   userinfo(val) {
    !val.username && this.$router.push('/signin')
   }
  },
  methods: {
    init() {
      this.$store.dispatch('GET_USER_INFO').catch(err => console.log(err))
    },
    logout() {
      this.$store.dispatch('LOG_OUT')
    }
  }
};
</script>
<style lang="stylus" scoped>
.post-wrap 
  .post
    img
      height: 50px;
</style>