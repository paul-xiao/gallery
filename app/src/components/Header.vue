<template>
  <div class="theme-header" v-if="site">
    <div class="nav-bar" @click="sideOn = true">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div class="left">
       <router-link to="/">{{site.title}}</router-link>
    </div>
    <div :class="['nav', sideOn ? 'side-on' : '']">
        <div class="title"><h4>Menu</h4><div class="side-close" @click="sideOn = false"></div></div>
        <div class="search-box" v-click-outside="clearSearchVal">
          <input type="text" @keyup.prevent="handleKeyUp" v-model="searchVal" placeholder="input title here ...">
        </div>
        <ul>
          <li v-for="(item, index) in config.nav" :key="index">
            <router-link :to="item.link">
            {{item.text}}
            </router-link>
          </li>
        </ul>
    </div>
    <div class="avatar">
      <Dropdown :list="dropdown">
        <img v-if="userinfo.avatar" :src="userinfo.avatar" alt="">
        <icon-user v-else class="default-icon" />
      </Dropdown>
    </div>
      
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      result: [],
      searchVal: '',
      sideOn: false,
      dropdown: [
        {
          label: 'Profile',
          link: '/profile',
        },
        {
          label: 'Logout',
          link: '',
        }
      ]
    }
  },
  props: {
   site: {
     type: Object,
     default: () => {
       return {
         title: 'Gallery'
       }
     }
   },
   config: {
     type: Object,
     default: () => {
       return {
         nav: [{
           link: '/',
           text: 'gallery'
         }]
       }
     }
   }
  },
  watch: {
    $route() {
      this.sideOn = false
    },
    sideOn() {
      // console.log(1)
    }
  },
  mounted() {
    document.addEventListener('keyup', this.clearSearchVal)
  },
  computed:{
    ...mapGetters([
      'userinfo'
    ])
  },
  methods: {
    handleKeyUp(e) {
     const { value } = e.target
     this.result = value.length > 2 ? this.pages.filter(e => e.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())) : []
    },
    clearSearchVal(e){
      if(!e.key || e.key === 'Escape'){
        this.searchVal = ""
        this.result = []
      }
    }
  },
  beforeDestory() {
    document.removeEventListener('keyup', this.clearSearchVal)
  }
}
</script>