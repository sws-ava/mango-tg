<template>
  <span>{{productDescription}}</span>

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

const productDescription = computed(() => {
  if (productModalStore.product.goodsItems.length === 1) {
    const title = productModalStore.product.goodsItems[0]['desc_' + selected_language.value]
    if (title !== null) return title
    else return productModalStore.product.goodsItems[0]['desc_' + fallbackLocale_language.value]
  }else if (productModalStore.product.goodsItems.length > 1){
    if(productModalStore.product['desc_'+selected_language.value] !== null) {
      return productModalStore.product['desc_'+selected_language.value]
    }else{
      return productModalStore.product['desc_'+fallbackLocale_language.value]
    }
  }
})

</script>

<style scoped lang="scss">
span{
  font-size: 12px;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>