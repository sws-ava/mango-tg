<template>
  <span class="span">{{ productDescription }}</span>
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

const productDescription = computed(() => {

  if (props.product.goodsItems.length === 1) {
    const title = props.product.goodsItems[0]['desc_' + selected_language.value]
    if (title !== null) return title
    else return props.product.goodsItems[0]['desc_' + fallbackLocale_language.value]
  } else if (props.product.goodsItems.length > 1) {
    if (props.product['desc_' + selected_language.value] !== null) {
      return props.product['desc_' + selected_language.value]
    } else {
      return props.product['desc_' + fallbackLocale_language.value]
    }
  }
  // return props.product['desc_'+selected_language.value]
})

</script>

<style scoped lang="scss">
.span {
  font-size: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2; // количество строк
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>