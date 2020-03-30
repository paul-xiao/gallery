<template>
  <div class="gallery">
     <div class="item" v-for="(item, index) of lists" :key="index">
       {{item.name}}
     </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      lists: []
    }
  },
  props: {
    msg: String
  },
  mounted() {
    const AMOUNT =  100
    for(let i =0 ; i< AMOUNT; i++) {
      this.lists.push({
        name: i.toString()
      })
    }
  }
}
</script>