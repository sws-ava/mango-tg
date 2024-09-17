<template>
  <div class="variants">
    <div
      class="variant"
      v-for="cartRow in cartStore.cart"
    >
      <div>
        <p>
          {{ getProductTitle(cartRow) }}
          {{ cartRow.variant.weight }}
          {{ cartRow.variant.weightKind }}
        </p>
      </div>
      <div class="price">
        {{ Math.round(cartRow.variant.price ? cartRow.variant.price : 0) }}
        {{ currency }}
        <GoogleIcon
          class-name="--pointer"
          name="remove"
          @click="cartStore.decrementRow(cartRow.variant_id)"
        />
        <div class="amount">{{ Math.round(cartRow.amount) }}</div>
        <GoogleIcon
          class-name="--pointer"
          name="add"
          @click="cartStore.incrementRow(cartRow.variant_id)"
        />
        <GoogleIcon
          class-name="--pointer"
          class="trash"
          name="delete_forever"
          @click="cartStore.removeRow(cartRow.variant_id)"
        />
      </div>
      <div>
      </div>
    </div>
  </div>
  <div class="total">
    {{ t('cartPage.total') }}: {{ totalCart }} {{ currency }}
  </div>
  <BrandButton
    classes="--toOrder"
    :title="t('cartPage.toOrder')"
    @click="showOrderFormHandler"
  />
    <CartForm  v-if="showOrderForm"/>
</template>

<script setup lang="ts">

import GoogleIcon from "@/components/google-icon/google-icon.vue";
import {useI18n} from "vue-i18n";
import {useCartStore} from "@/store/cart";
import {computed, Ref, ref, watch} from "vue";
import BrandButton from "@/components/brand-button/brand-button.vue";
import CartForm from "@/views/cart/cart-form.vue";

const {t, locale, fallbackLocale} = useI18n()
const cartStore = useCartStore()

const currency = computed(() => {
  return import.meta.env.VITE_BASE_CURRENCY
})

const showOrderFormHandler = async () => {
  await showOrderFormAction()
  // if(showOrderForm.value){
  //   document.getElementById("cartForm").scrollIntoView();
  // }
}
const showOrderFormAction = () => {
  showOrderForm.value = !showOrderForm.value
}

const showOrderForm: Ref = ref(false)
const selected_language = ref(locale);
const fallbackLocale_language = ref(fallbackLocale);

const totalCart = computed(() => {
  let total = 0
  if (cartStore.cart.length) {
    cartStore.cart.forEach((el: any) => {
      total = total + (el.price * el.amount)
    })
  }
  return total
})

const getProductTitle = (row) => {
  if (row.product.goodsItems.length === 1) {
    const title = row.variant['title_' + selected_language.value]
    if (title !== null) return title
    else return row.variant['title_' + fallbackLocale_language.value]
  } else if (row.product.goodsItems.length > 1) {
    if (row.variant['title_' + selected_language.value] !== null) {
      return row.product['title_' + selected_language.value] + ' ' + row.variant['title_' + selected_language.value]
    } else {
      return row.product['title_' + fallbackLocale_language.value] + ' ' + row.variant['title_' + fallbackLocale_language.value]
    }
  }
}

</script>

<style scoped lang="scss">
.variant + .variant {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, .3);
}

.price {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.trash {
  margin-left: 50px;
}

.total {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 1);
  font-size: 18px;
  text-align: center;
}

.--toOrder {
  margin: 40px auto;
}

.--pointer {
  cursor: pointer;
}
</style>