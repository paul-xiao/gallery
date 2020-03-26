<template>
  <div class="list-wrap">
    <Breadcrumbs :pageNum="pageNum" v-model="currentPage"/>
    <div class="list" v-if="list">
     <div class="list-inner">
       <div class="list-item" v-for="page in list">
      <div class="list-item-head">
       <router-link :to="page.path" class="title">{{page.title}}</router-link>
         <small><span class="publish-date">{{publishDate(page.frontmatter.date)}}</span></small>
       </div>
      <div v-html="page.excerpt" class="list-item-excerpt"></div>
      <div class="list-item-head"> <small><span class="tags" v-for="tag in page.frontmatter.tags">
         <span class="tag" @click="handleClick(tag)">
           {{` #${tag}`}}
         </span>
       </span>
       <span class="categories" v-for="category in page.frontmatter.categories">
         <span class="category" @click="handleClick(category)">{{` @${category}`}}</span>
       </span>
       <span class="sticked" v-if="page.frontmatter.stick">sticked</span>
       </small></div>
    </div>
     </div>
  </div>
  <Pagination :pageNum="pageNum" v-model="currentPage"/>
  </div>
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