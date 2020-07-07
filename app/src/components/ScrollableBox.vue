<template>
  <div class="scrollable-box">
    <div class="scrollable-box-inner" :style="{ width: width }">
      <div
        class="scrollable-box-item"
        v-for="(item, index) of list"
        :key="index"
      >
        <img :src="item.url" alt="" width="100%" height="100%" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScrollableBox',
  data() {
    return {
      width: null,
    }
  },
  props: {
    list: {
      type: Array,
      default: () => {},
    },
  },
  mounted() {
    setTimeout(() => {
      console.log(document.querySelector('.scrollable-box-item'))

      const unit =
        document.querySelector('.scrollable-box-item') &&
        document.querySelector('.scrollable-box-item').getBoundingClientRect()
          .width
      const baseMargin = 5
      this.width = (unit + baseMargin) * this.list.length + 'px'
    }, 500)
  },
}
</script>
<style lang="stylus" scoped>
.scrollable-box
  height 150px
  position relative
  overflow auto
  &-item
    width 250px
    height 150px
    display inline-block
    margin-right 5px
    box-shadow: inset 0 0 0 1px #ccc
    &:last-child{
        margin-right 0
        }
</style>
