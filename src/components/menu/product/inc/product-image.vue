<template>
  <img
    class="img"
    :src="backgroundImageBuilder(getProductImage(imagePath))"
    alt=""
  />
</template>

<script setup lang="ts">

import {backgroundImageBuilder} from "@/utils/backgroundImageBuilder";

const props = defineProps({
  imagePath: {
    type: String,
    default: ''
  }
})

const getProductImage = (path) => {
  if(path) return path
  else return 'no_image.png'
}

</script>

<style scoped lang="scss">


.img {
    width: 100px;
    height: 100px;
    margin: 2px;
    border-radius: 0 16px 16px 16px;
    object-fit: cover;
}
</style>