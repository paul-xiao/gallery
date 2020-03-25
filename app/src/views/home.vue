<template>
  <div class="container">
    <h1>Home</h1>
    <h4>Hi, {{user}}</h4>
    <button @click="logout">logout</button>
    <div class="post-wrap" v-if="!!files.length">
      <div class="post" v-for="(file, index) of files" :key="index">
        <h4>{{file.title}}</h4>
        <img :src="file.link" alt />
        <p>{{file.desc}}</p>
      </div>
    </div>

    <input type="file" class="hidden" ref="fileInput" multiple @change="uploadInit" />
    <button @click="handleUpload">upload</button>
  </div>
</template>
<script>
import ipfsClient from "ipfs-http-client";
export default {
  name: "Home",
  data() {
    return {
      files: [],
      ipfs: ipfsClient("/ip4/127.0.0.1/tcp/5001"),
      gateway: `127.0.0.1/ipfs`
    };
  },
  computed: {
    user() {
      return localStorage.getItem("user");
    },
  },
  methods: {
    logout() {
      this.$http.delete("/logout");
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
    async saveToIpfs(files) {
      const source = this.ipfs.add([...files], {
        progress: prog => console.log(`received: ${prog}`)
      });
      try {
        for await (const file of source) {
          console.log(file);
          const {path, size} = file
          this.files = [...this.files, {path, size , link: `/api/ipfs/${path}`}]
          console.log(this.files)
        }
      } catch (err) {
        console.error(err);
      }
    },
    handleUpload() {
      this.$http.post("addfile");
    }
  }
};
</script>