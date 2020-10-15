<template>
  <div class="gallery-list">
    <div class="gallery-list-item" v-for="(item, index) of list" :key="index">
      <van-skeleton avatar :row="3" :loading="loading">
        <div class="top-bar">
          <div class="left">
            <div class="avatar">
              <img
                :src="
                  item.author && item.author.avatar
                    ? item.author.avatar
                    : defaultAvatar
                "
              />
            </div>
            <div>
              <div class="name">{{ item.author && item.author.username }}</div>
              <div class="date">
                {{ new Date(item.createdAt).toLocaleDateString() }}
              </div>
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
            <van-image
              round
              width="20"
              height="20"
              v-if="item.likes && item.likes[0]"
              :src="item.likes && item.likes[0].avatar"
            />
            <van-image
              round
              width="20"
              height="20"
              v-if="item.likes && item.likes[1]"
              :src="item.likes && item.likes[1].avatar"
            />
            {{ item.likes ? item.likes.length : 0 }}
            <small>likes</small>
          </span>
          <div class="opts">
            <van-icon
              name="like-o"
              @click="toggleLikes(item)"
              :class="{ active: item.flag }"
            />
            <van-icon name="chat-o" />
            <van-icon name="share" />
          </div>
        </div>
        <div class="content">{{ item.desc }}</div>
        <div
          class="top-comments"
          v-if="item.comments && !!item.comments.length"
        >
          <div class="total-commnets">
            {{ item.comments && item.comments.length }} comments
          </div>
          <div
            class="comment"
            v-for="comment of item.comments"
            :key="comment._id"
          >
            <div class="top">
              <div class="comment-user">
                <van-image
                  round
                  width="20"
                  height="20"
                  v-if="comment.from"
                  :src="comment.from.avatar"
                />
                {{ comment.from.username }}
              </div>
              <div class="comment-likes">
                <van-icon name="chat-o" @click="handleCommentReply(comment)" />
                <van-icon
                  name="good-job-o"
                  @click="handleCommentLike(comment)"
                />
                <span>{{ comment.likes.length }}</span>
              </div>
            </div>
            <div class="comment-content">{{ comment.content }}</div>
            <div class="reply" v-if="comment.reply">
              <div
                class="reply-item"
                v-for="reply of comment.reply"
                :key="reply.id"
              >
                <div class="reply-item-content">
                  <span>{{ reply.from }} 回复 {{ reply.to }}：</span>
                  {{ reply.content }}
                </div>
                <div class="reply-item-opt">
                  <van-icon name="chat-o" />
                  <van-icon
                    name="good-job-o"
                    @click="handleCommentLike(comment)"
                  />
                  <span>{{ comment.likes.length }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <van-field
          placeholder="说点什么"
          @click="handleCommentShow(item)"
          disabled
        />
      </van-skeleton>
    </div>
    <van-popup v-model="comment" position="bottom" class="comment-popup">
      <div class="comment-popup-content top-comments">
        <div
          class="comment"
          v-for="comment of currentItem.comments"
          :key="comment._id"
        >
          <div class="top">
            <div class="comment-user">
              <van-image
                round
                width="20"
                height="20"
                v-if="comment.from"
                :src="comment.from.avatar"
              />
              {{ comment.from.username }}
            </div>
            <div class="comment-likes">
              <van-icon name="good-job-o" @click="handleCommentLike(comment)" />
              <span>{{ comment.likes.length }}</span>
            </div>
          </div>
          <div class="comment-content">{{ comment.content }}</div>
          <div class="reply" v-if="comment.reply">
            <div
              class="reply-item"
              v-for="reply of comment.reply"
              :key="reply.id"
            >
              <div class="reply-item-content">
                <span>{{ reply.from }} 回复 {{ reply.to }}：</span>
                {{ reply.content }}
              </div>
              <div class="reply-item-opt">
                <van-icon name="chat-o" />
                <van-icon
                  name="good-job-o"
                  @click="handleCommentLike(comment)"
                />
                <span>{{ comment.likes.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-popup-input">
        <van-field
          v-model="value"
          placeholder="说点什么"
          autofocus
          ref="comment"
        />
        <van-button
          v-if="comment"
          type="info"
          square
          native-type="submit"
          @click="handleCommentSubmit"
          >提交</van-button
        >
      </div>
    </van-popup>
    <van-popup v-model="reply" position="bottom" class="reply-popup">
      <div class="reply-popup-input">
        <van-field
          v-model="value"
          :placeholder="`回复：${
            currentComment &&
            currentComment.from &&
            currentComment.from.username
          }`"
          autofocus
          ref="reply"
        />
        <van-button
          v-if="reply"
          type="info"
          square
          native-type="submit"
          @click="handleCommentReplySubmit"
          >提交</van-button
        >
      </div>
    </van-popup>
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
import {
  Toast,
  Skeleton,
  Popup,
  ActionSheet,
  Field,
  Button,
  Icon,
  Swipe,
  SwipeItem,
  Image,
} from "vant";

export default {
  name: "ScrollableBox",
  components: {
    "van-popup": Popup,
    "van-action-sheet": ActionSheet,
    "van-field": Field,
    "van-button": Button,
    "van-icon": Icon,
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-skeleton": Skeleton,
    "van-image": Image,
  },
  data() {
    return {
      width: null,
      value: "",
      currentItem: {},
      currentComment: {},
      loading: true,
      comment: false,
      reply: false,
      defaultAvatar: require("../assets/icons/user.svg"),
      show: false,
      actions: [{ name: "删除", color: "#ee0a24" }],
    };
  },
  props: {
    list: {
      type: Array,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(["userinfo"]),
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
  methods: {
    buildTree(source, id, parent_id) {
      let temp = {};
      let tree = {};
      for (let i in source) {
        temp[source[i][id]] = source[i];
      }
      for (let i in temp) {
        let parentId = temp[i][parent_id];
        if (parentId) {
          if (temp[parentId] && !temp[parentId].reply) {
            temp[parentId].reply = new Array();
          }
          temp[parentId].reply.push(temp[i]);
        } else {
          tree[temp[i][id]] = temp[i];
        }
      }
      return Object.values(tree);
    },
    toggleLikes(item) {
      if (!item.disabled) {
        item.disabled = true;
        this.$http
          .post("/post/like", {
            postId: item._id,
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
          data: { _id: this.currentItem._id },
        })
        .then(() => {
          this.$emit("reload");
          Toast({
            message: "删除成功",
            icon: "https://img.yzcdn.cn/vant/logo.png",
          });
        });
    },
    handleCommentShow(item) {
      this.comment = true;
      this.currentItem = item;
      this.$nextTick(() => {
        let el = document.querySelector(".comment-popup input");
        el && el.focus();
      });
    },
    handleCommentSubmit() {
      this.$http
        .post("/post/comment", {
          postId: this.currentItem._id,
          content: this.value,
        })
        .then(({ data }) => {
          this.currentItem.comments = data.comments;
          this.currentItem.topComments = data.comments.slice(0, 5);
          document.querySelector(".comment-popup input").value = "";
          Toast("评论成功");
        });
    },
    handleCommentLike(comment) {
      this.$http
        .post("/post/comment/like", {
          commentId: comment._id,
        })
        .then(({ data }) => {
          console.log(data);
          comment.likes = data.likes;
          comment.flag = data.flag;
          data.flag ? Toast("点赞成功") : Toast("点赞取消");
          this.comment = false;
        });
    },
    handleCommentReply(commnet) {
      this.reply = true;
      this.currentComment = commnet;
    },
    handleCommentReplySubmit() {
      console.log(this.currentComment);
      this.$http
        .post("/post/comment", {
          postId: this.currentComment.postId,
          content: this.value,
          parent: this.currentComment._id,
        })
        .then(({ data }) => {
          console.log(data);

          // this.currentItem.comments = data.comments;
          // this.currentItem.topComments = data.comments.slice(0, 5);
          this.currentItem.comments = this.buildTree(
            data.comments,
            "_id",
            "parentId"
          );
          this.currentItem.topComments = this.currentItem.comments.slice(0, 5);
          document.querySelector(".reply-popup input").value = "";
          this.reply = false;
          Toast("评论成功");
        });
    },
  },
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
  align-items: center;

  .total-likes {
    display: flex;
    align-items: center;
  }

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

.reply {
  text-align: left;
  color: #999;
  background: #f2f2f2;
  padding: 10px;

  &-item {
    display: flex;
    margin: 5px 0;

    &-content {
      flex: 1;
    }

    &-opt {
      text-align: right;

      i {
        width: 20px;
      }
    }
  }
}

.top-comments {
  padding: 15px 0;

  .comment {
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 1.5;
    }

    &-user {
      color: #333;
      padding-right: 14px;
      display: flex;
      align-items: center;

      /deep/ .van-image {
        margin-right: 5px;
      }
    }

    &-likes {
      display: flex;
      align-items: center;

      span {
        margin-left: 5px;
        color: #777;
      }
    }

    &-content {
      color: #777;
      font-size: 16px;
      flex: 1;
      line-height: 1.5;
      text-align: left;
    }
  }
}

.reply-popup {
  &-input {
    display: flex;

    /deep/ .van-button {
      width: 80px;
    }
  }
}

.comment-popup {
  display: flex;
  flex-direction: column;
  height: 80%;

  &-content {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  &-input {
    display: flex;

    /deep/ .van-button {
      width: 80px;
    }
  }
}
</style>
