<template>
  <div class="scrollable-box">
    <div class="scrollable-box-inner" :style="{ width: width }">
      <div class="scrollable-box-item" v-for="(item, index) of list" :key="index">
        <van-skeleton :row="3" :loading="loading">
          <img :src="item.url" alt width="100%" height="100%" />
        </van-skeleton>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ScrollableBox",
  data() {
    return {
      width: null,
      loading: true
    };
  },
  props: {
    list: {
      type: Array,
      default: () => {}
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(document.querySelector(".scrollable-box-item"));
      this.loading = false;
      const unit =
        document.querySelector(".scrollable-box-item") &&
        document.querySelector(".scrollable-box-item").getBoundingClientRect()
          .width;
      const baseMargin = 5;
      this.width = (unit + baseMargin) * this.list.length + "px";
    }, 3000);
  }
};
</script>
<style lang="stylus" scoped>
.scrollable-box {
  height: 150px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;

  &-item {
    width: 250px;
    height: 150px;
    display: inline-block;
    margin-right: 5px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
