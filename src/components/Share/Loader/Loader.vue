<template>
  <div
    v-if="isAbsolute"
    class="loader__absolute"
  >
    <div class="d-flex justify-content-center"
    >
      <div class="spinner-border text-secondary" role="status"></div>

    </div>
  </div>
  <div
    v-if="!isAbsolute"
    class="d-flex justify-content-center"
  >
    <div class="spinner-border text-secondary" role="status"></div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  isAbsolute: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang="scss" scoped>
.loader{
  &__absolute{
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.375rem;
    backdrop-filter: blur(5px);
    padding-top: 40px;
    .spinner-border{
      color: white !important;
    }
  }
}
</style>