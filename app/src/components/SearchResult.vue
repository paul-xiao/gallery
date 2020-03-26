<template>
  <div class="search-result" v-if="result.length">
      <div class="search-result-item" v-for="item in result">
          <router-link :to="item.path">{{item.title}}</router-link>
      </div>
  </div>
</template>
<script>
  export default {
      name: 'SearchResult',
      props: {
        result: {
            type: Array,
            default: []
        }
      }
  }
</script>