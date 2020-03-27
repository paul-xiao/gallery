<template>
<BaseLayout>
 <router-view />
  <!-- <div class="container">
    <h4>Hi, {{user}}</h4>
    <Button @click="logout">logout</Button>
    <div class="post-wrap" v-if="!!files.length">
      <div class="post" v-for="(file, index) of files" :key="index">
        <h4>{{file.title}}</h4>
        <img :src="file.link" alt />
        <p>{{file.desc}}</p>
      </div>
    </div>
    <input type="file" class="hidden" ref="fileInput" multiple @change="uploadInit" />
    <Button @click="handleUpload">upload</Button>
  </div> -->
</BaseLayout>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      files: [],
      gateway: `127.0.0.1/ipfs`
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$http.get('/user/session').then(({data}) => {
        if(!data.status) {
          this.logout()
        } else {
          this.user = data.username
          if(data.username) {
            localStorage.setItem('user', JSON.stringify(data))
          }
        }
      }).catch(err => console.log(err.message))
    },
    logout() {
      this.$http.delete("/user/logout");
      localStorage.removeItem("user");
      this.$router.push("/signin");
    },
    uploadInit(e) {
      let files = [...e.target.files];
      // // pin to ipfs
      // files.forEach(file => {
      //   const { name } = file;
      //   this.files = [...this.file, { name }];
      // });
      console.log(this.files);
      this.saveToIpfs(files)
    },
    handleUpload() {
      this.$http.post("addfile");
    }
  }
};
</script>
<style lang="stylus" scoped>
.post-wrap 
  .post
    img
      height: 50px;
</style>