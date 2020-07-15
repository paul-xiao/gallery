<template>
  <van-form @submit="onSubmit">
    <van-uploader v-model="avatar" :after-read="afterRead" :max-count="1" />

    <van-field v-model="userinfo.username" name="username" label="用户名" placeholder="用户名" readonly />
    <van-field
      v-model="userinfo.nickname"
      type="nickname"
      name="nickname"
      label="昵称"
      placeholder="昵称"
    />
    <van-field
      v-model="userinfo.desc"
      rows="2"
      name="desc"
      autosize
      label="描述"
      type="textarea"
      maxlength="50"
      placeholder="请输入描述"
      show-word-limit
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
      <br />
      <van-button round block type="default" @click="handleLogout">注销</van-button>
    </div>
  </van-form>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      avatar: [
        {
          url: ""
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["userinfo"])
  },
  watch: {
    userinfo(val) {
      this.avatar[0].url = val.avatar;
    }
  },
  mounted() {
    this.avatar[0].url = this.userinfo.avatar;
  },
  methods: {
    onSubmit(values) {
      const { nickname, desc } = values;
      this.$http
        .post("/user/update", { nickname, desc })
        .then(() => {
          this.$toast("更新成功");
        })
        .catch(err => {
          this.$notify(err);
        });
    },
    afterRead(avatar) {
      this.avatar[0].status = "uploading";
      this.avatar[0].message = "上传中...";
      const formData = new FormData();
      formData.append("avatar", avatar.file);
      this.$http
        .post("/user/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.avatar[0].status = "done";
          this.avatar[0].message = "";
          console.log(res);
        })
        .catch(() => {
          this.avatar[0].status = "failed";
          this.avatar[0].message = "上传失败";
        });
    },
    handleLogout() {
      this.$store.dispatch("LOG_OUT");
    }
  }
};
</script>
<style lang="stylus" scoped>
/deep/ .van-uploader__upload {
  border-radius: 50%;
}
</style>
