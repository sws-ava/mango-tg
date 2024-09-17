<template>
  <div class="copyright-row">
    © {{title}}-{{new Date().getFullYear()}}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})



</script>

<style scoped>
.copyright-row{
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    text-align: center;
    margin-top: auto;
    margin-bottom: 20px;
}
</style>