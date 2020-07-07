<template>
  <van-form @submit="onSubmit">
    <van-uploader
      v-model="avatar"
      :after-read="afterRead"
      :max-count="1"
      :deletable="false"
    />

    <van-field
      v-model="username"
      name="username"
      label="用户名"
      placeholder="用户名"
      readonly
    />
    <van-field
      v-model="nickname"
      type="nickname"
      name="nickname"
      label="昵称"
      placeholder="昵称"
    />
    <van-field
      v-model="desc"
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
      <van-button round block type="info" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      avatar: [],
      username: '',
      nickname: '',
      desc: '',
    }
  },
  computed: {
    ...mapGetters(['userinfo']),
  },
  created() {
    this.username = this.userinfo.username
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
    afterRead(file) {
      this.avatar[0].status = 'uploading'
      this.avatar[0].message = '上传中...'

      setTimeout(() => {
        this.avatar[0].status = 'failed'
        this.avatar[0].message = '上传失败'
      }, 1000)
    },
  },
}
</script>
<style lang="stylus" scoped>
/deep/ .van-uploader__upload
  border-radius: 50%
</style>
