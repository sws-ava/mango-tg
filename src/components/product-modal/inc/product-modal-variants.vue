<template>
<div class="variants">
  <div
    class="variant"
    v-for="variant in productModalStore.product.goodsItems"
  >
    <div>
      <p v-if="productModalStore.product.goodsItems.length>1">{{ getProductTitle(variant) }}</p>
      <span>{{ variant.weight }} {{ variant.weightKind }}</span>
    </div>
    <div class="price">
      {{ Math.round(variant.price) }} {{currency}}
      <div
        v-if="isWorkingTimeChecker()"
        @click="addVariantToCartHandler(variant, productModalStore.product)"
      >
      <Icon
        name="cart"
      />
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useProductModalStore} from "@/store/productModal";
import {useI18n} from "vue-i18n";
import Icon from "@/components/icon/icon.vue";
import {useCartStore} from "@/store/cart";
import {useNotifications} from "@/store/notifications";
import {isWorkingTimeChecker} from "@/utils/isWorkingTimeChecker";

const {locale, fallbackLocale} = useI18n()
const productModalStore = useProductModalStore()
const cartStore = useCartStore()

const {t} = useI18n()
const nots = useNotifications()
const selected_language = ref(locale);
const fallbackLocale_language = ref(fallbackLocale);

const currency = computed(() => {
  return import.meta.env.VITE_BASE_CURRENCY
})

const addVariantToCartHandler = (variant, product) => {
  cartStore.addToCart(variant, product)
  nots.success(t('nots.success'), t('nots.variantAdded'));

}

const getProductTitle = (variant) => {
  if (productModalStore.product.goodsItems.length === 1) {
    const title = variant['title_' + selected_language.value]
    if (title !== null) return title
    else return variant['title_' + fallbackLocale_language.value]
  }else if (productModalStore.product.goodsItems.length > 1){
    if(variant['title_'+selected_language.value] !== null) {
      return variant['title_'+selected_language.value]
    }else{
      return variant['title_'+fallbackLocale_language.value]
    }
  }
}

</script>

<style scoped lang="scss">
.variants{
  margin-top: 20px;
  gap: 18px;
  display: flex;
  flex-direction: column;
}
.variant{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.price{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  font-size: 16px;
  gap: 10px;
  white-space: nowrap;
  svg{
    width: 30px;
    min-width: 30px;
  }
}
</style>