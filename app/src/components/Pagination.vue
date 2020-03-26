<template>
  <div class="pagination">
      <span v-for="page, index of pageNum" @click="handlePageClick(index)" :class="['page', index===value && 'active']">{{index + 1}}</span>
  </div>
</template>
<script>
  export default {
      name: 'Pagination',
      props: {
        pageNum: {
            type: Number
        },
        value: {
            type: Number,
        }
      },
      methods: {
        handlePageClick(index) {
          this.$emit('input', index)
        }
      }
  }
</script>