<template>
  <div class="gallery">
    <scrollable-box :list="lists"></scrollable-box>
    <gallery-list :list="galleryLists" />
  </div>
</template>

<script>
import ScrollableBox from '../components/ScrollableBox'
import GalleryList from '../components/GalleryList'
export default {
  name: 'Gallery',
  components: {
    ScrollableBox,
    GalleryList,
  },
  data() {
    return {
      lists: [],
      galleryLists: [],
    }
  },
  props: {
    msg: String,
  },
  created() {
    this.$http.get('/post/list').then(({ data }) => {
      this.galleryLists = data
      this.lists = data
        .filter((item, index) => index < 5) //前五条数据
        .map((l) => {
          return {
            name: l.title,
            url: l.files[0],
          }
        })
    })
  },
}
</script>
<style lang="stylus"></style>
