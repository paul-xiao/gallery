<template>
  <v-app-bar app clipped-left color="indigo">
    <v-icon @click="toggleDrawer">menu</v-icon>
    <v-toolbar-title class="ml-4">App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-icon>add</v-icon>
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
    }
  },
  beforeDestory() {
    document.removeEventListener("keyup", this.clearSearchVal);
  }
};
</script>