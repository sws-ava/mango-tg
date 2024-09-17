<template>
  <h3 class="h3">{{ productTitle }}</h3>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";

const {locale, fallbackLocale} = useI18n()
const selected_language = ref(locale);
const fallbackLocale_language = ref(fallbackLocale);

const props = defineProps({
  product: {
    type: Object,
    default: () => {
    },
    required: true
  }
})

const productTitle = computed(() => {
  if (props.product.goodsItems.length === 1) {
    const title = props.product.goodsItems[0]['title_' + selected_language.value]
    if (title !== null) return title
    else return props.product.goodsItems[0]['title_' + fallbackLocale_language.value]
  }else if (props.product.goodsItems.length > 1){
    if(props.product['title_'+selected_language.value] !== null) {
      return props.product['title_'+selected_language.value]
    }else{
      return props.product['title_'+fallbackLocale_language.value]
    }
  }
})

</script>

<style lang="scss" scoped>
.h3{
    display: -webkit-box;
    -webkit-line-clamp: 2; // количество строк
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>