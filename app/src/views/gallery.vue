<template>

     <div class="list">
        <button @click="test">test</button>
       <div v-for="item of data" :key="item._id" class="list-item">
         <h1>{{item.title}}</h1>
         <div class="content">
            <div class="inner" v-for="file of item.files" :key="file.name">
               <img :src="`/api/ipfs/${file.path}`" alt="" v-if="file.type && file.type.includes('image')">
               <video :src="`/api/ipfs/${file.path}`" v-else></video>
            </div>
         </div>
       </div>
     </div>
      <!-- <v-row >
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <input type="file" class="hidden" ref="fileInput" multiple @change="uploadInit" />
      </v-row> -->
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Gallery',
   data: () => ({
      data: []
    }),
  props: {
    msg: String
  },
  computed: {
    ...mapGetters([
      'uploadStatus',
      'uploadFiles'
    ])
  },
  watch: {
    uploadStatus(val){
      val && this.$refs.fileInput.click()
      this.$store.commit('UPDATE_UPLOAD_STATUS', false)
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    init() {
      this.$http.get('/post/').then(({data}) => {
        console.log(data)
        this.data = data
      })
    },
    uploadInit(e){
      const {files} = e.target
      this.$store.commit('UPDATE_UPLOAD_FILES', files)
      this.$router.push('/post')
    },
    test() {
      this.$test.foo()

      console.log(this.$test)
    }
  }
}
</script>
<style lang="stylus" scoped>
.list
  display flex
  &-item
    color: #333
    margin 20px
    img, video 
      width 200px
      height 200px
</style>