<template>
  <div class="post">
    <van-form @submit="handleUpload">
      <div>
        <div class="post-images">
          <van-uploader
            name="file"
            v-model="formData.fileList"
            multiple
            :max-count="9"
          />
        </div>
        <van-field
          label="标题"
          v-model="formData.title"
          name="title"
          :rules="[{ required: true, message: '' }]"
          placeholder="请输入标题"
        />
        <van-field
          v-model="formData.desc"
          rows="2"
          name="desc"
          autosize
          :rules="[{ required: true, message: '' }]"
          label="描述"
          type="textarea"
          maxlength="50"
          placeholder="请输入描述"
          show-word-limit
        />
      </div>
      <van-button type="info" size="large" round native-type="submit"
        >提交</van-button
      >
    </van-form>
  </div>
</template>
<script>
import { Toast, Notify } from "vant";
import { Form, Field, Button, Uploader } from "vant";

export default {
  components: {
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
    "van-uploader": Uploader,
  },
  data: () => {
    return {
      formData: {
        title: "",
        fileList: [],
        desc: "",
      },
    };
  },
  methods: {
    handleUpload() {
      if (this.formData.fileList.length === 0) {
        Notify("请上传图片");
      } else {
        let formData = new FormData();
        formData.append("title", this.formData.title);
        this.formData.fileList.forEach((file) => {
          formData.append("file", file.file);
        });
        formData.append("desc", this.formData.desc);
        this.$http
          .post("/post/add", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            Toast.success("发布成功");
            this.$router.push("/gallery");
          });
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.van-uploader__wrapper {
  justify-content: center;
}

.post, form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
