<template>
  <div v-if="isLoading" class="loader" >
    <div class="logo">
      <img class="logo-img" src="/images/logo.png" alt="">
    </div>
    <div class="progress">
      <div
        class="progress__inner"
        :style="{width: progress+'%'}"
      />
      <div class="progress__num">
        {{ Math.round(progress) }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAppLoader} from "@/store/appLoader";
import {computed, onMounted, Ref, ref} from "vue";

const appLoader = useAppLoader()
const progress: Ref = ref(0)

const isLoading = computed(() => {
  return appLoader.isLoading
})

onMounted(() => {
  const duration = 2000;
  const intervalTime = 5;
  const increment = 100 / (duration / intervalTime); // шаг инкремента

  const interval = setInterval(() => {
    if (progress.value + increment >= 97) {
      clearInterval(interval);
      return 97;
    }
    progress.value = progress.value + increment;
  }, intervalTime);

  return () => clearInterval(interval);
})
</script>

<style scoped lang="scss">
.logo {
  max-width: 170px;

  &-img {
    width: 100%;
  }
}

.progress {
  width: 100%;
  height: 30px;
  max-width: 200px;
  border: 1px solid #B51C1F;
  border-radius: 5px;
  position: relative;
  margin-top: 30px;
  &__inner {
    border-radius: 3px;
    transform: translateY(-50%);
    position: absolute;
    left: 2px;
    top: 50%;
    height: 100%;
    max-height: calc(100% - 4px);
    width: 2%;
    background: #B51C1F;
  }

  &__num {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.loader {
  text-align: center;
  position: absolute;
  left: 0;
  width: 100%;
  top: 0;
  height: 100vh;
  background: #000;
  color: #E6D287;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>