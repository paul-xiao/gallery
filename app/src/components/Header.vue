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
      <img v-if="avatar" :src="avatar" alt="">
      <icon-user v-else class="default-icon" /></div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      result: [],
      searchVal: '',
      sideOn: false,
      avatar: ''
    }
  },
  props: {
   site: {
     type: Object,
     default: () => {
       return {
         title: 'Home'
       }
     }
   },
   config: {
     type: Object,
     default: () => {
       return {
         nav: [{
           link: '/',
           text: 'xx'
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
    pages() {
       const blogs = this.$site.pages.filter(e => e.id === 'post').sort((a,b) => new Date(b.publishDate) - new Date(a.publishDate))

        if(this.filter){
           return blogs.filter(e => (e.frontmatter.tags && e.frontmatter.tags.includes(this.filter)) || (e.frontmatter.categories && e.frontmatter.categories.includes(this.filter)))
         } else {
          return blogs
         }
     }
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