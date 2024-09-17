<template>
  <button
    class="button"
    :class="classes"
    :disabled="disabled"
  >
    {{ title }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '',
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: String,
    default: '',
    required: false,
  }
})

</script>

<style scoped lang="scss">
.button {
  border: 1px solid #000;
  outline: none;
  padding: 4px 8px;
  background: #ef6a28;
  font-size: 16px;
  color: #000;
  border-radius: 3px;
  display: block;
  cursor: pointer;
}
</style>