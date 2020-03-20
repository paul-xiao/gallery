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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.gallery{
  display: flex;
    flex-direction: row;
    width: max-content;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}
.item {
  height: 500px;
  width: 500px;
  border: 10px solid #f2f2f2;
  margin: 5px;
}
</style>
