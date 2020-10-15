<template>
  <div class="theme-footer">
    <div class="bottom-nav">
      <div class="bottom-nav-item" v-for="item of nav" :key="item.title">
        <van-icon
          :name="item.icon"
          color="#FFF"
          size="30"
          @click="handleClick(item)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from "vant";
export default {
  name: "Footer",
  components: {
    "van-icon": Icon,
  },
  data() {
    return {
      nav: [
        {
          title: "1",
          icon: "home-o",
          link: "gallery",
        },
        {
          title: "2",
          icon: "search",
          link: "search",
        },
        {
          title: "3",
          icon: "add-o",
          link: "post",
        },
        {
          title: "4",
          icon: "chat-o",
          link: "im",
        },
        {
          title: "5",
          icon: "user-o",
          link: "profile",
        },
      ],
    };
  },
  props: {},
  methods: {
    handleClick(item) {
      if (this.$route.name !== item.link) {
        this.$router.push(item.link);
      }
    },
  },
};
</script>
<style lang="stylus">
.bottom-nav {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
