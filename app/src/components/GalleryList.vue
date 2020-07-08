<template>
  <div class="gallery-list">
    <div class="gallery-list-item" v-for="(item, index) of list" :key="index">
      <div class="top-bar">
        <div class="left">
          <div class="avatar">
            <img
              :src="item.author.avatar ? item.author.avatar : defaultAvatar"
            />
          </div>
          <div>
            <div class="name">{{ item.author.username }}</div>
            <div class="date">
              {{ new Date(item.createdAt).toLocaleDateString() }}
            </div>
          </div>
        </div>
        <div class="right">
          <van-icon name="ellipsis" />
        </div>
      </div>
      <div class="images">
        <van-swipe height="200">
          <van-swipe-item v-for="(image, index) in item.files" :key="index">
            <img v-lazy="image" width="100%" height="100%" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="status-bar">
        <span class="total-likes">{{ item.likes }}</span>
        <div>
          <van-icon name="like-o" />
          <van-icon name="chat-o" />
          <van-icon name="share" />
        </div>
      </div>
      <div class="content">
        {{ item.desc }}
      </div>
      <div class="total-commnets">
        {{ item.comments && item.comments.length }}
      </div>
      <div class="top-coments" v-if="item.comments && !!item.comments.length">
        <div
          class="comment"
          v-for="comment of item.comments"
          :key="comment.user"
        >
          <div class="comment-user">{{ comment.user }}</div>
          <div class="comment-content">{{ comment.content }}</div>
          <div>
            <van-icon name="like-o" />
            <van-icon name="chat-o" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScrollableBox',
  data() {
    return {
      width: null,
      value: '',
      defaultAvatar: require('../assets/icons/user.svg'),
    }
  },
  props: {
    list: {
      type: Array,
      default: () => {},
    },
  },
  mounted() {
    // const unit = document
    //   .querySelector('.scollable-box-item')
    //   .getBoundingClientRect().width
    // const baseMargin = 5
    // this.width = (unit + baseMargin) * this.list.length + 'px'
  },
}
</script>
<style lang="stylus" scoped>
.gallery-list
  position relative
  &-item
    margin-bottom 15px
    &:first-child{
        margin-top 15px
        }
    &:last-child{
        margin-bottom 0
        }
    .top-bar
      display: flex
      justify-content space-between
      height 50px
      padding 15px 0
      box-shadow: inset 0 -1px 0 0 #ccc
      .left
        display: flex
        .name
          font-size 18px
        .date
          font-size 12px
        .avatar
          width 50px
          height 50px
          border-radius 50%
          overflow hidden
          margin-right 15px
          img
            width 100%
            height 100%
    .images
      padding 15px 0
      box-shadow: inset 0 -1px 0 0 #ccc
    .status-bar
      display flex
      justify-content space-between
      padding 10px 0
    .content
      text-align left
      font-size 18px
    .total-commnets
      text-align left
      font-size 12px
      color #777
    .top-coments
      padding 15px 0
      .comment
        display flex
        align-items center
        line-height 1.5
        &-user
          color: #333
          padding-right 15px
        &-content
          color:#777
          font-size 14px
          flex:1
          text-align left
</style>
