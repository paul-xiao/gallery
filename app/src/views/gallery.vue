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
      lists: [
        {
          name: '1',
          url: 'https://img.yzcdn.cn/vant/apple-1.jpg',
        },
        {
          name: '1',
          url: 'https://img.yzcdn.cn/vant/apple-2.jpg',
        },
        {
          name: '1',
          url: 'https://img.yzcdn.cn/vant/apple-3.jpg',
        },
      ],
      galleryLists: [
        {
          user: {
            name: 'xx',
            avatar: 'https://img.yzcdn.cn/vant/apple-3.jpg',
          },
          images: [
            'https://img.yzcdn.cn/vant/apple-3.jpg',
            'https://img.yzcdn.cn/vant/apple-2.jpg',
          ],
          likes: 1000,
          content: 'contents',
          comments: [
            {
              user: 'dummy1',
              content: '瓜兮兮',
              parentID: 1,
            },
            {
              user: 'dummy2',
              content: '哈哈哈',
              parentID: 1,
            },
          ],
          date: new Date(),
        },
        {
          user: {
            name: 'xx',
            avatar: 'https://img.yzcdn.cn/vant/apple-3.jpg',
          },
          images: [
            'https://img.yzcdn.cn/vant/apple-3.jpg',
            'https://img.yzcdn.cn/vant/apple-2.jpg',
          ],
          likes: 1000,
          content: 'contents',
          comments: [
            {
              user: 'dummy1',
              content: '瓜兮兮',
              parentID: 1,
            },
            {
              user: 'dummy2',
              content: '哈哈哈',
              parentID: 1,
            },
          ],
          date: new Date(),
        },
        {
          user: {
            name: 'xx',
            avatar: 'https://img.yzcdn.cn/vant/apple-3.jpg',
          },
          images: [
            'https://img.yzcdn.cn/vant/apple-3.jpg',
            'https://img.yzcdn.cn/vant/apple-2.jpg',
          ],
          likes: 1000,
          content: 'contents',
          comments: [
            {
              user: 'dummy1',
              content: '瓜兮兮',
              parentID: 1,
            },
            {
              user: 'dummy2',
              content: '哈哈哈',
              parentID: 1,
            },
          ],
          date: new Date(),
        },
      ],
    }
  },
  props: {
    msg: String,
  },
  mounted() {},
}
</script>
<style lang="stylus"></style>
