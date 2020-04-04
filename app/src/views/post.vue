<template>
<v-container fluid>
    <v-img
        src="https://picsum.photos/350/165?random"
        height="125"
        class="grey darken-4"
    ></v-img>
    <video src=""></video>
<v-textarea
          solo
          name="input-7-4"
          label="Solo textarea"
        ></v-textarea>
</v-container>
</template>

<script>
export default {
  name: 'post',
   data: () => ({
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      ],
    }),
  props: {
    msg: String
  }
}
</script>