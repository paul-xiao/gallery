<template>
  <div class="profile">
    <Form @submit="handleSubmit" @reset="handleReset">
      <template slot="title">Profile</template>
      <template slot="main">
            <div class="avatar" @click="startUpload">
                <img v-if="formData.avatar" :src="formData.avatar" alt="">
                <icon-user v-else class="default-icon" />
            </div>
            <Input type="text" name="username" readonly="readonly" v-model="formData.username"/>
            <Input type="text" name="nickname" v-model="formData.nickname"/>
            <Input type="text" name="region" v-model="formData.region"/>
            <Textarea name="intro" v-model="formData.intro" />
      </template>
    </Form>
        <input type="file" class="hidden" ref="fileInput" @change="uploadInit" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters([
      'userinfo'
    ])
  },
  watch: {
   formData: {
     handler(val) {
      console.log(val);
    },
    immediate: true,
    deep: true
   }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      Object.assign(this.formData, this.userinfo)
    },
    handleSubmit() {
       this.$store.dispatch('UPDATE_USER_INFO', this.formData)
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
          avatar: `/api/ipfs/${file.path}`
        })
        this.$store.commit('UPDATE_USER_STATE', this.formData)
      }).catch(err => console.log(err))
    },
  }
}
</script>