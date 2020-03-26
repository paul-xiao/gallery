<template>
  <div class="breadcrumbs">
      <span>{{$page.title}}</span>
  </div>
</template>
<script>
  export default {
      name: 'Breadcrumbs',
      props: {
        pageNum: {
            type: Number
        },
        value: {
            type: Number,
        }
      },
      mounted() {
        // console.log(this.$page)
      },
      methods: {
        handlePageClick(index) {
          this.$emit('input', index)
        }
      }
  }
</script>