<template>
<v-card
    max-width="344"
    class="mx-auto"
  >
    <v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
        <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      height="194"
    ></v-img>

    <v-card-text>
      Visit ten places on our planet that are undergoing the biggest changes today.
    </v-card-text>

    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Read
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Bookmark
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>   
 </template>
<script>
import moment from '../utils/moment'
import Pagination from "./Pagination";
import Breadcrumbs from "./Breadcrumbs";
import ListArchives from "./ListArchives";
export default {
  name: 'List',
  data() {
    return {
      defaultNumPerPage: 5,
      currentPage: 0
    }
  },
  props: {
    pages: {
      type: Array
    }
  },
  computed: {
    pageNum() {
      return Math.ceil(this.pages.length / this.defaultNumPerPage )
    },
    list() {
      return this.pages.slice(this.currentPage*this.defaultNumPerPage, (this.currentPage+1) * this.defaultNumPerPage)
    }
  },
  methods: {
    publishDate(publishDate) {
      return moment(publishDate).date
    },
    handleClick(filter) {
      this.$emit('filter', filter)
    }
  }
}
</script>