<template>
  <div class="chat">
    <div class="header" @click="$router.go(-1)">
      <div class="return">
        <van-icon name="arrow-left" color="#1989fa" />
      </div>
      <div class="header-title">{{ title }}</div>
    </div>
    <div class="connected">{{ status }} is Connected</div>
    <div class="msg">
      <ul>
        <li v-for="msg of msgs" :key="msg">{{ msg }}</li>
      </ul>
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

export default {
  components: {
    "van-icon": Icon,
    "van-field": Field,
    "van-button": Button,
  },
  sockets: {
    connect: function () {
      this.status = "Conected";
    },
    message: function (data) {
      console.log(
        `this method was fired by the socket server. eg: io.emit("message", ${data})`
      );
      this.msgs = data;
    },
  },
  data() {
    return {
      value: null,
      feedback: null,
      status: null,
      title: "ChatRoom1",
      msgs: [],
    };
  },
  filters: {
    shortDate(value) {
      if (!value) return "";
      return timeDiff(value);
    },
  },
  mounted() {
    this.title = this.$route.params.name;
    this.$socket && this.$socket.emit("reset");
    if (typeof WebSocket === "undefined") {
      alert("您的浏览器不支持socket");
    }
  },
  methods: {
    handleClick() {
      console.log("click");
      this.$socket.emit("sendById", {
        id: this.$route.params.id,
        msg: this.feedback,
      });
    },
    onSearch() {},
    onCancel() {},
  },
};
</script>
<style lang="stylus" scoped>
.chat {
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

  .connected {
    color: #777;
    font-size: 16px;
    padding: 15px;
  }

  .chat-list {
    &-item {
      background: #f2f2f2;
      height: 50px;
      padding: 10px 0 10px 15px;
      font-size: 16px;
      display: flex;
      margin-top: 10px;

      &:first-child {
        margin-top: 0;
      }

      &.group {
      }

      .avatar {
        width: 50px;
        height: 50px;
        border: 1px solid #eee;
        border-radius: 4px;

        &>img {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 2px;
        }

        .group-avatar {
          display: flex;
          width: 100%;
          height: 100%;
          flex-wrap: wrap;

          img {
            display: flex;
            box-sizing: border-box;
            padding: 2px;

            &:only-child {
              height: 100%;
              align-items: center;
            }

            &:first-child:nth-last-child(2), &:first-child:nth-last-child(2) ~ img {
              width: 50%;
              height: 50%;
            }

            &:first-child:nth-last-child(3), &:first-child:nth-last-child(3) ~ img {
              width: 50%;
              height: 50%;
            }

            &:first-child:nth-last-child(3) {
              margin: 0 25%;
            }

            &:first-child:nth-last-child(3) ~ img {
              float: left;
            }

            &:first-child:nth-last-child(4), &:first-child:nth-last-child(4) ~ img {
              width: 50%;
              height: 50%;
            }

            &:first-child:nth-last-child(5), &:first-child:nth-last-child(5) ~ img, &:first-child:nth-last-child(6), &:first-child:nth-last-child(6) ~ img, &:first-child:nth-last-child(7), &:first-child:nth-last-child(7) ~ img, &:first-child:nth-last-child(8), &:first-child:nth-last-child(8) ~ img, &:first-child:nth-last-child(9), &:first-child:nth-last-child(9) ~ img {
              width: 33.33%;
              height: 33.33%;
            }
          }
        }
      }

      .info {
        flex: 1;
        padding: 15px;
        text-align: left;
        align-items: center;
      }
    }
  }

  .msg {
    li {
      text-align: left;
      line-height: 40px;
    }
  }

  .submit {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;

    /deep/ .van-field__body {
      background: #fafafa;
    }

    /deep/ .van-field__control {
      font-size: 16px;
      background: #fafafa;
    }
  }
}
</style>