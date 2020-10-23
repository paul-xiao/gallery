<template>
  <div class="chat">
    <div class="header" @click="$router.go(-1)">
      <div class="return">
        <van-icon name="arrow-left" color="#1989fa" />
      </div>
      <div class="header-title">{{ title + ":" + socketId }}</div>
    </div>
    <div class="msgs">
      <div
        class="msg"
        :class="{ reverse: item.type === 'send' }"
        v-for="(item, index) of msgs"
        :key="index"
      >
        <div class="avatar">
          <img :src="item.from.avatar" alt="" />
        </div>
        <div class="content">
          <span>{{ item.content }}</span>
        </div>
      </div>
    </div>
    <div class="submit">
      <van-field v-model="feedback" placeholder="Say it!">
        <template #button>
          <van-button size="small" type="primary" @click="handleClick">
            提交</van-button
          >
        </template>
      </van-field>
    </div>
  </div>
</template>
<script>
import timeDiff from "../utils/timeDiff";
import { Field, Button, Icon } from "vant";
import { mapGetters } from "vuex";

export default {
  components: {
    "van-icon": Icon,
    "van-field": Field,
    "van-button": Button,
  },
  data() {
    return {
      value: null,
      feedback: null,
      status: null,
      $easyim: null,
      title: "ChatRoom1",
      socketId: "ChatRoom1",
      msgs: [
        // {
        //   from: {
        //     avatar: require("../assets/avatar/1.jpg"),
        //   },
        //   content: "text msgs",
        //   type: "receive", // receive
        //   status: "readed",
        //   timestramp: new Date(),
        // },
      ],
    };
  },
  filters: {
    shortDate(value) {
      if (!value) return "";
      return timeDiff(value);
    },
  },
  computed: {
    ...mapGetters(["userinfo"]),
  },
  watch: {
    $route() {
      console.log("route changed");
      this.$easyim.leaveRoom({
        roomId: this.title,
      });
    },
  },
  mounted() {
    const { id, username, type } = this.$route.params;

    this.title = username;
    this.socketId = id;
    this.$easyim.joinRoom({
      roomId: this.title,
    });
    if (type) {
      this.$easyim.subscribeGroup(this.title, (val) => {
        this.msgs.push(val);
      });
    } else {
      this.$easyim.receivePivate((val) => {
        this.msgs.push(val);
      });
    }
  },
  beforeRouteLeave(from, to, next) {
    this.$easyim.leaveRoom({
      roomId: this.title,
    });
    this.$nextTick(() => {
      next();
    });
  },
  methods: {
    handleClick() {
      console.log("click");
      this.$store.commit("UPDATE_CON", {
        id: "V15cQCbTf7JvcqraAAAB",
        ip: "::ffff:172.20.10.2",
        lastUpdated: "Fri Oct 23 2020 16:13:13 GMT+0800 (GMT+08:00)",
        username: "paultest",
        avatar: "/static/timg.jpg",
        userId: "5f0d158e9e3f9e3d5c80d6d9",
      });
      this.$easyim.sendMessage({
        text: this.feedback, //消息内容
        to: {
          id: this.$route.params.id, //群id
          type: this.$route.params.type, //group
          data: {
            avatar: this.userinfo.avatar,
            nickname: this.userinfo.username,
          },
        },
      });
    },
    onSearch() {},
    onCancel() {},
  },
};
</script>
<style lang="stylus" scoped>
.chat {
  height: 100%;
  background: #f2f2f2;

  /deep/ .van-search--show-action {
    padding-left: 0;
  }

  .header {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;
    background: #fafafa;

    &-title {
      flex: 1;
    }
  }

  .msgs {
    height: calc(100% - 100px);
    overflow: auto;

    .msg {
      background: #f2f2f2;
      display: flex;
      padding: 15px;

      &.reverse {
        flex-direction: row-reverse;

        .content {
          margin-right: 15px;
          flex: 1;
          border-radius: 10px;
          text-align: left;

          &:before {
            display: none;
          }

          &:after {
            content: '';
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 8px solid #fff;
            position: absolute;
            top: 50%;
            right: -8px;
            transform: translateY(-50%);
          }
        }
      }

      .avatar {
        height: 50px;
        width: 50px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .content {
        background: #fff;
        margin-left: 15px;
        padding: 15px;
        position: relative;
        flex: 1;
        border-radius: 10px;
        text-align: left;

        span {
          line-height: 1.7;
        }

        &:before {
          content: '';
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-right: 8px solid #fff;
          position: absolute;
          top: 50%;
          left: -8px;
          transform: translateY(-50%);
        }
      }
    }
  }

  .submit {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;

    /deep/ .van-field__body {
      border: 1px solid #f2f2f2;
    }

    /deep/ .van-field__control {
      font-size: 16px;
    }

    /deep/ .van-button__text {
      font-size: 16px;
    }
  }
}
</style>