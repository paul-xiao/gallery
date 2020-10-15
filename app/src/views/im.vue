<template>
  <div class="im">
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
      <div class="chat-list-item" v-for="chat of chatList" :key="chat.id">
        <div class="avatar">
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
            <div class="name">{{ chat.name }}</div>
            <div class="last">{{ chat.lastMsg }}</div>
          </div>
          <div class="right">
            <span>{{ chat.lastUpdated | shortDate }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <h1>{{ status }}</h1>
    <div class="msg">
      <ul>
        <li v-for="msg of msgs" :key="msg">{{ msg }}</li>
      </ul>
    </div>
    <div class="submit">
      <van-field v-model="feedback">
        <template #button>
          <van-button size="small" type="primary" @click="handleClick">
            提交</van-button
          >
        </template>
      </van-field>
    </div> -->
  </div>
</template>
<script>
import timeDiff from "../utils/timeDiff";
import { Search } from "vant";

export default {
  components: {
    "van-search": Search,
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
      this.status = "connected";
    },
    feedback: function (data) {
      console.log(
        `this method was fired by the socket server. eg: io.emit("feedback", ${data})`
      );
      this.msgs = data;
    },
  },
  data() {
    return {
      value: null,
      feedback: null,
      status: null,
      msgs: [],
      users: ["paul", "john", "honey"],
      chatList: [
        {
          avatar: require("../assets/avatar/1.jpg"),
          name: "Paul",
          lastMsg: "hola",
          lastUpdated: "2020-10-01 20:00:00",
        },
        {
          avatar: require("../assets/avatar/2.jpg"),
          name: "dummy",
          lastMsg: "hola",
          lastUpdated: "2020-10-01 20:00:00",
        },
        {
          avatar: require("../assets/avatar/3.jpg"),
          name: "numb",
          lastMsg: "hola",
          lastUpdated: "2020-10-01 20:00:00",
        },
        {
          avatar: require("../assets/avatar/4.jpg"),
          name: "stuiped",
          lastMsg: "hola",
          lastUpdated: "2020-10-01 20:00:00",
        },
        {
          type: "group",
          avatar: require("../assets/avatar/4.jpg"),
          name: "xx群",
          lastMsg: "hola",
          lastUpdated: "2020-10-01 20:00:00",
          members: [
            {
              name: "Paul",
              avatar: require("../assets/avatar/1.jpg"),
            },
            {
              name: "dummy",
              avatar: require("../assets/avatar/2.jpg"),
            },
          ],
        },
      ],
    };
  },
  filters: {
    shortDate(value) {
      if (!value) return "";
      return timeDiff(value);
    },
  },
  mounted() {
    this.$socket && this.$socket.emit("reset");
    if (typeof WebSocket === "undefined") {
      alert("您的浏览器不支持socket");
    }
  },
  methods: {
    handleClick() {
      console.log("click");
      this.$socket.emit("test", this.feedback);
    },
    onSearch() {},
    onCancel() {},
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

        &>img {
          width: 100%;
          height: 100%;
        }

        .group-avatar {
          display: flex;
          width: 100%;
          height: 100%;

          img {
            flex: 1;
            width: 50%;
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
  }
}
</style>