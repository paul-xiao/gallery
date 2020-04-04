<template>
  <v-app-bar app clipped-left color="indigo">
    <v-icon @click="toggleDrawer" color="white">menu</v-icon>
    <v-toolbar-title class="ml-4 white--text capitalize">{{$route.name}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="handlePost" color="primary" v-if="$route.name === 'post'">save</v-btn>
    <v-icon @click="handlePost" color="white" v-else>add</v-icon>

  </v-app-bar>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      result: [],
      searchVal: "",
      sideOn: false,
      dropdown: [
        {
          label: "Profile",
          link: "/profile"
        },
        {
          label: "Logout",
          link: ""
        }
      ]
    };
  },
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    site: {
      type: Object,
      default: () => {
        return {
          title: "Gallery"
        };
      }
    },
    config: {
      type: Object,
      default: () => {
        return {
          nav: [
            {
              link: "/",
              text: "gallery"
            }
          ]
        };
      }
    }
  },
  watch: {
    $route() {
      this.sideOn = false;
    },
    sideOn() {
      // console.log(1)
    }
  },
  mounted() {
    document.addEventListener("keyup", this.clearSearchVal);
  },
  computed: {
    ...mapGetters(["userinfo"])
  },
  methods: {
    toggleDrawer() {
      this.$emit("input", !this.drawer);
    },
    handleKeyUp(e) {
      const { value } = e.target;
      this.result =
        value.length > 2
          ? this.pages.filter(e =>
              e.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
            )
          : [];
    },
    clearSearchVal(e) {
      if (!e.key || e.key === "Escape") {
        this.searchVal = "";
        this.result = [];
      }
    },
    handlePost(){
      console.log(1)
      this.$store.commit('UPDATE_UPLOAD_STATUS', true)
    }
  },
  beforeDestory() {
    document.removeEventListener("keyup", this.clearSearchVal);
  }
};
</script>