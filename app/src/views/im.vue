<template>
  <div class="im">
    <div class="header">当前在线：{{ chatList.length }} 人</div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="chat-list">
      <div
        class="chat-list-item"
        v-for="chat of chatList"
        :key="chat.userId"
        @click="openChat(chat)"
      >
        <div class="avatar" :class="{ offline: !chat.connected }">
          <img :src="chat.avatar" alt="" v-if="!chat.type" />
          <div class="group-avatar" v-else>
            <img
              :src="member.avatar"
              v-for="member of chat.members"
              :key="member.name"
              alt=""
            />
          </div>
        </div>
        <div class="info space-between">
          <div class="left">
            <div class="name">{{ chat.username }}</div>
            <div class="last">{{ chat.id }}</div>
          </div>
          <div class="right">
            <span>{{ chat.lastUpdated | shortDate }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="submit">
      <van-button type="primary" @click="handleDisconnect"
        >disconnect</van-button
      >
      <van-button type="primary" @click="handleReconnect">reconnect</van-button>
    </div>
  </div>
</template>
<script>
import timeDiff from "../utils/timeDiff";
import { Search, Button } from "vant";
import EasyimClient from "../utils/easyim_client";
import { mapGetters } from "vuex";
export default {
  components: {
    "van-search": Search,
    "van-button": Button,
  },
  data() {
    return {
      value: null,
      feedback: null,
      status: null,
      msgs: [],
      users: [],
      chatList: [],
      easyim: null,
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
  mounted() {
    const { username, avatar, userId } = this.userinfo;
    this.easyim = new EasyimClient({
      connection: "http://192.168.43.141:3001",
      query: {
        username,
        avatar,
        userId,
      },
    });
    this.easyim.on("online", (users) => {
      this.chatList = users.filter((u) => u.userId !== userId);
    });
  },
  methods: {
    handleClick() {
      console.log("click");
      this.$socket.emit("test", this.feedback);
    },
    onSearch() {},
    onCancel() {},
    openChat(chat) {
      console.log(chat.name);
      const { id, username } = chat;
      this.$router.push({
        name: "chat",
        params: {
          username,
          id,
        },
      });
    },
    handleDisconnect() {
      this.easyim.disconnect();
    },
    handleReconnect() {
      this.$router.go();
    },
  },
};
</script>
<style lang="stylus" scoped>
.im {
  /deep/ .van-search--show-action {
    padding-left: 0;
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
        position: relative;

        &:after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #31fd92;
          position: absolute;
          right: 0px;
          bottom: 1px;
        }

        &.offline {
          &:after {
            background: #ee0a24;
          }
        }

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
    padding: 15px;
    width: calc(100% - 30px);
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
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