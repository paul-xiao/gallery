<template>
  <v-app>
    <Header :site="site" v-model="drawer" :config="config" />
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/profile">
          <v-list-item-action>
            <v-icon>account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container grid-list-xs>
        <slot></slot>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>
<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  name: "BaseLayout",
  data() {
    return {
      drawer: false
    };
  },
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer
  },
  computed: {
    site() {
      return {
        title: "Home"
      };
    },
    config() {
      return this.$themeConfig;
    },
    page() {
      return this.$page;
    }
  },
  mounted() {
    document.addEventListener("touchmove", this.handleTouchMove);
  },
  methods: {
    handleTouchMove() {
      document.body.scrollTop = 0;
    }
  },
  beforeDestory() {
    document.removeEventListener("touchmove", this.handleTouchMove);
  }
};
</script>