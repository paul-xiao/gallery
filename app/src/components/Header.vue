<template>
  <div class="header">
    <div class="logo">
      <img :src="logo" alt="">
    </div>
    <div class="profile">
      <div class="avatar" :title="userinfo.name">
        <img :src="userinfo.avatar" alt="">
      </div>
      <div class="profile-dropdown">
        <ul>
          <li v-for="(item, index) of dropdown" :key="index">{{item.label}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dropdown: [
        {
          label: 'Profile',
          link: '/profie'
        }
      ],
      logo: '/logo'
    }
  },
  props: {
    userinfo: {
      type: Object,
      default: {
        name: 'paul',
        avatar: 'hash',
        sex: 'man',
        age: '10',
        addr: 'cd'
      }
    }
  }
}
</script>