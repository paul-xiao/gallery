<template>
<div class="theme-container">
 <Header :site="site" :config="config"/>
 <div class="theme-content">
   <slot></slot>
 </div>
 <Footer />
</div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
 export default {
   name: 'BaseLayout',
   components: {
     [Header.name]: Header,
     [Footer.name]: Footer,
   },
   computed: {
     site() {
       return {
         title: 'Home'
       }
     },
     config() {
       return this.$themeConfig
     },
     page() {
       return this.$page
     }
   },
   mounted() {
     document.addEventListener('touchmove', this.handleTouchMove)
   },
   methods: {
     handleTouchMove() {
       document.body.scrollTop = 0
     }
   },
   beforeDestory() {
     document.removeEventListener('touchmove', this.handleTouchMove)
   }
 }
</script>