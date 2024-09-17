<template>
  <svg class="icon" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <use :xlink:href="'/images/sprite.svg#icon-' + name" :style="`color:${color}`"></use>
  </svg>
</template>
<script setup>

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
})

</script>

<style>
.icon {
    display: block;
}
</style>