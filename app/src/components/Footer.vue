<template>
  <div class="theme-footer">
    <div class="bottom-nav">
      <div class="bottom-nav-item" v-for="item of nav" :key="item.title">
        <van-icon :name="item.icon" color="#FFF" size="30" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {
      nav: [
        {
          title: '1',
          icon: 'home-o',
        },
        {
          title: '2',
          icon: 'search',
        },
        {
          title: '3',
          icon: 'add-o',
        },
        {
          title: '4',
          icon: 'info-o',
        },
        {
          title: '5',
          icon: 'user-o',
        },
      ],
    }
  },
  props: {},
}
</script>
<style lang="stylus">
.bottom-nav
  height 100%
  display flex
  align-items center
  justify-content center
  &-item
    flex:1
    display flex
    align-items center
    justify-content center
</style>
