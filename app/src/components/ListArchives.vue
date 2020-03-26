<template>
    <div class="side-archives">
        <div class="total">
          total blogs : {{pages.length}}
        </div>
        <div class="group-by-month">
          <h4>group by month :</h4>
            <span v-for="month in monthes" class="month" @click="handleClick(month[0])">{{`${month[0]}  ${month[1].length}`}}</span>
        </div>
        <div class="group-by-tags">
          <h4>group by tags :</h4>
            <span v-for="tag in tags" class="tag" @click="handleClick(tag[0])">{{`${tag[0]}  ${tag[1]}`}}</span>
        </div>
        <div class="group-by-categories">
         <h4> group by categories :</h4>
            <span v-for="category in categories" class="category" @click="handleClick(category[0])">{{`${category[0]}  ${category[1]}`}}</span>
        </div>
    </div>
</template>

<script>
  import moment from "../utils/moment";
  export default {
      name: 'ListArchives',
      data() {
        return {
          monthly: null
        }
      },
      computed: {
        pages() {
         return this.$site.pages.filter(e => e.id === 'post').sort((a,b) => new Date(b.publishDate) - new Date(a.publishDate))
        },
         monthes() {
          const map = new Map()
          this.pages.forEach(e => {
            const Month = moment(e.frontmatter.date).getMonth()
            if(map.has(Month)){
              map.set(Month, [
                ...map.get(Month),
                e
              ])
            }else {
              map.set(Month, [].concat(e))
            }
          })
          return map
        },
        tags() {
          const map = new Map()
          this.pages.forEach(e => {
            const tags = e.frontmatter.tags
            
            if(tags){
              for(const tag of tags) {
                if(map.has(tag)){
                  map.set(tag, map.get(tag) + 1)
                }else {
                  map.set(tag, 1)
                }
              }
            }
          })
          return map
        },
        categories() {
          const map = new Map()
          this.pages.forEach(e => {
            const categories = e.frontmatter.categories
            if(categories){
              for(const tag of categories) {
                if(map.has(tag)){
                  map.set(tag, map.get(tag) + 1)
                }else {
                  map.set(tag, 1)
                }
              }
            }
          })
          return map
        }
      },
      methods: {
        handleClick(filter) {
          this.$router.push({
            path: '/',
            query: {
              filter: filter
            }
          })
        },
        handleMoment(date) {
          return moment(date).date
        }
      }
  }
</script>