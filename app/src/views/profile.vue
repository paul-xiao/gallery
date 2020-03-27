<template>
  <div class="profile">
    <Form @submit="handleSubmit" @reset="handleReset">
      <template slot="title">Profile</template>
      <template slot="main">
            <div class="avatar" @click="startUpload">
                <img v-if="formData.avatar" :src="formData.avatar" alt="">
                <icon-user v-else class="default-icon" />
            </div>
            <Input type="text" name="username" v-model="formData.username"/>
            <Input type="text" name="nickname" v-model="formData.nickname"/>
            <Input type="text" name="region" v-model="formData.region"/>
            <Textarea name="intro" v-model="formData.intro" />
      </template>
    </Form>
        <input type="file" class="hidden" ref="fileInput" @change="uploadInit" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        avatar: '',
        nickname: '',
        region: '',
        intro: ''
      }
    }
  },
  computed: {
    userinfo() {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  watch: {
   formData(val) {
     console.log(val)
   }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.formData = Object.assign(this.formData, this.userinfo)
      console.log(this.formData)
    },
    handleSubmit() {
       this.$http.post('/user/update', this.formData).then(() => {
          this.$router.go()
        })
    },
    handleReset() {

    },
    startUpload() {
      this.$refs.fileInput.click()
    },
    uploadInit(e) {
      let files = [...e.target.files];
      this.$saveToIpfs(files).then(file => {
        Object.assign(this.formData, {
          avatar: `/api/ipfs/${file.path}`,
          size: file.size
        })
      }).catch(err => console.log(err))
    },
  }
}
</script>