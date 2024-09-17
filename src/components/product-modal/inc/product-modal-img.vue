<template>
  <img
    class="img"
    :src="backgroundImageBuilder(productImage)"
  />

</template>

<script setup lang="ts">
import {computed} from "vue";
import {useProductModalStore} from "@/store/productModal";
import {backgroundImageBuilder} from "@/utils/backgroundImageBuilder";

const productModalStore = useProductModalStore()

const productImage = computed(() => {
  if(productModalStore.product.picture) return productModalStore.product.picture
  else return 'no_image.png'
})

</script>

<style scoped lang="scss">
.img{
  width: calc(100% + 20px);
  margin: -10px -10px 10px;
}
</style>