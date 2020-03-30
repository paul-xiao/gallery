<template>
  <svg xmlns="http://www.w3.org/2000/svg" :class="['icon', classes]" :width="width" :height="height" viewBox="0 0 512 512" :fill="iconColor">
    <title>{{iconName}}</title>
    <line x1='368' y1='368' x2='144' y2='144' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/>
    <line x1='368' y1='144' x2='144' y2='368' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/>
  </svg>
</template>
<script>
export default {
  name: "IconClose",
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