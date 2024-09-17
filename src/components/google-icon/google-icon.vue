<template>

  <span
    v-if="name"
    class="material-symbols-outlined icon"
    :class="className ? className : ''"
    :style="{color: color ? color : ''}"
  >
    {{ name }}
  </span>
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
  className: {
    type: String,
    required: false,
  },
})

</script>

<style scoped>
.icon{
    line-height: 100%;
}
</style>