<template>
  <div class="dropdown" v-click-outside="handleClose">
    <div class="dropdown-target" @click.prevent="flag = !flag">
      <slot></slot>
    </div>
    <div class="dropdown-main" v-show="flag">
      <div class="dropdown-item" v-for="(item, index) of list" :key="index">
      <router-link :to="item.link" @click.native="handleClick(item)">{{item.label}}</router-link>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dropdown',
  data() {
    return {
      flag: false
    }
  },
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    handleClose() {
      if(this.flag) {
        this.flag = false
      }
    },
    handleClick(item) {
      if(this.flag) {
        this.flag = false
      }
      if(item.label === 'Logout') {
        this.$store.dispatch('LOG_OUT')
      }
    }
  }
}
</script>