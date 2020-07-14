<template>
  <div class="gallery-list">
    <div class="gallery-list-item" v-for="(item, index) of list" :key="index">
      <van-skeleton avatar :row="3" :loading="loading">
        <div class="top-bar">
          <div class="left">
            <div class="avatar">
              <img :src="item.author.avatar ? item.author.avatar : defaultAvatar" />
            </div>
            <div>
              <div class="name">{{ item.author.username }}</div>
              <div class="date">{{ new Date(item.createdAt).toLocaleDateString() }}</div>
            </div>
          </div>
          <div class="right">
            <van-icon name="ellipsis" @click="handleEllipsis(item)" />
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
          <span class="total-likes">
            {{ item.likes }}
            <small>likes</small>
          </span>
          <div class="opts">
            <van-icon name="like-o" @click="toggleLikes(item)" :class="{active:item.flag}" />
            <van-icon name="chat-o" />
            <van-icon name="share" />
          </div>
        </div>
        <div class="content">{{ item.desc }}</div>
        <div class="total-commnets">{{ item.comments && item.comments.length }}</div>
        <div class="top-coments" v-if="item.comments && !!item.comments.length">
          <div class="comment" v-for="comment of item.comments" :key="comment.user">
            <div class="comment-user">{{ comment.user }}</div>
            <div class="comment-content">{{ comment.content }}</div>
            <div>
              <van-icon name="like-o" />
              <van-icon name="chat-o" />
            </div>
          </div>
        </div>
      </van-skeleton>
    </div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Toast } from "vant";

export default {
  name: "ScrollableBox",
  data() {
    return {
      width: null,
      value: "",
      loading: true,
      defaultAvatar: require("../assets/icons/user.svg"),
      show: false,
      actions: [{ name: "删除", color: "#ee0a24" }]
    };
  },
  props: {
    list: {
      type: Array,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["userinfo"])
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
  methods: {
    toggleLikes(item) {
      if (!item.disabled) {
        item.disabled = true;
        this.$http
          .post("/post/like", {
            postId: item._id
          })
          .then(({ data }) => {
            item.disabled = false;
            item.flag = data.flag;
            item.likes = data.likes;
          })
          .catch(() => {
            item.disabled = false;
          });
      }
    },
    handleEllipsis(item) {
      this.show = true;
      this.currentItem = item;
    },
    onSelect({ name }) {
      console.log(name);
      console.log(this.currentItem);
      this.$http
        .delete("/post/delete", {
          data: { _id: this.currentItem._id }
        })
        .then(() => {
          this.$emit("reload");
          Toast({
            message: "删除成功",
            icon: "https://img.yzcdn.cn/vant/logo.png"
          });
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.gallery-list {
  position: relative;

  &-item {
    margin-bottom: 15px;

    &:first-child {
      margin-top: 15px;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.top-bar {
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 15px 0;
  box-shadow: inset 0 -1px 0 0 #ccc;

  .left {
    display: flex;
    align-items: center;

    .name {
      font-size: 18px;
      margin-bottom: 5px;
    }

    .date {
      font-size: 12px;
    }

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 15px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
  }
}

.images {
  padding: 15px 0;
  box-shadow: inset 0 -1px 0 0 #ccc;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;

  .opts {
    i {
      margin: 0 5px;

      &.active {
        color: red;
      }
    }
  }
}

.content {
  text-align: left;
  font-size: 18px;
}

.total-commnets {
  text-align: left;
  font-size: 12px;
  color: #777;
}

.top-coments {
  padding: 15px 0;

  .comment {
    display: flex;
    align-items: center;
    line-height: 1.5;

    &-user {
      color: #333;
      padding-right: 15px;
    }

    &-content {
      color: #777;
      font-size: 14px;
      flex: 1;
      text-align: left;
    }
  }
}
</style>
