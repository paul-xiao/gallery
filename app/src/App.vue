<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  created(){
   this.init()
  },
  methods: {
    init() {
      this.$http.get('/session').then(({data}) => {
        data.user && localStorage.setItem('user', data.user)
      }).catch(err => console.log(err.message))
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
