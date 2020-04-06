<template>
  <v-container fluid>
     <v-text-field
            label="Title"
            single-line
            solo
          ></v-text-field>
    <v-textarea solo name="input-7-4" label="Desc"></v-textarea>
    <v-row no-gutters>
      <v-col v-for="file of uploadFiles" :key="file.name" class="d-flex child-flex" cols="4">
        <v-img :src="file.link" height="125" class="grey darken-4"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "post",
  data: () => ({
    formData: {
      title: "",
      attaches: [],
      desc: ""
    }
  }),
  props: {
    msg: String
  },
  computed: {
    ...mapGetters(["uploadFiles"])
  },
  mounted() {
    console.log(this.uploadFiles);
  },
  methods: {
    handleSubmit() {
      let files = this.uploadFiles;
      this.$saveToIpfs(files)
        .then(file => {
          Object.assign(this.formData, {
            attaches: {
              ...file,
              link: `/api/ipfs/${file.path}`
            }
          });
          this.$store.commit("UPDATE_USER_STATE", this.formData);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>