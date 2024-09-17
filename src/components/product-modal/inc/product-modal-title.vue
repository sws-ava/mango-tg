<template>
  <h3>{{productTitle}}</h3>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useProductModalStore} from "@/store/productModal";
import {backgroundImageBuilder} from "@/utils/backgroundImageBuilder";
import {useI18n} from "vue-i18n";
const {locale, fallbackLocale} = useI18n()
const productModalStore = useProductModalStore()

const selected_language = ref(locale);
const fallbackLocale_language = ref(fallbackLocale);


const productImage = computed(() => {
  if(productModalStore.product.picture) return productModalStore.product.picture
  else return 'no_image.png'
})

const productTitle = computed(() => {
  if (productModalStore.product.goodsItems.length === 1) {
    const title = productModalStore.product.goodsItems[0]['title_' + selected_language.value]
    if (title !== null) return title
    else return productModalStore.product.goodsItems[0]['title_' + fallbackLocale_language.value]
  }else if (productModalStore.product.goodsItems.length > 1){
    if(productModalStore.product['title_'+selected_language.value] !== null) {
      return productModalStore.product['title_'+selected_language.value]
    }else{
      return productModalStore.product['title_'+fallbackLocale_language.value]
    }
  }
})

</script>

<style scoped lang="scss">

</style>