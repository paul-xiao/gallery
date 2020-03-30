<template>
  <i :class="icon "></i>
</template>
<script>
import IconAlert from './IconAlert'
export default {
  name: "Icon",
  data() {
    return {
      IconAlert: 'IconAlert'
    }
  },
  components: {
   [IconAlert.name]: IconAlert
  },
  props: {
    iconName: {
      type: String,
      default: "box"
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: "#f2f2f2"
    },
    classes: {
      type: String,
      default: null
    }
  }
};
</script>