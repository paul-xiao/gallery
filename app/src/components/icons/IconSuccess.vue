<template>
  <svg xmlns="http://www.w3.org/2000/svg" :class="['icon', classes]" :width="width" :height="height" viewBox="0 0 512 512" :fill="iconColor">
    <title>{{iconName}}</title>
    <path d='M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z' style='fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px'/>
<polyline points='352 176 217.6 336 160 272' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/>
  </svg>
</template>
<script>
export default {
  name: "IconSuccess",
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