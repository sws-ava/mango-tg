<template>
  <Layout>
    <div class="title">{{ t('cartPage.title') }}</div>
    <template
      v-if="isWorkingTimeChecker()"
    >
      <EmptyCart v-if="!cartStore.cart.length"/>
      <CartList v-else/>
    </template>
    <div
      class="orderTime"
      v-else
    >
      <ContactRow
        :title="t('leftNavi.deliveryTimeTitle')"
        text="10:00 - 21:30"
        type="time"
        icon="schedule"
      />
    </div>

  </Layout>
</template>

<script setup lang="ts">

import Layout from "@/Layouts/Layout.vue";
import {useI18n} from "vue-i18n";
import {useCartStore} from "@/store/cart";
import {ref} from "vue";
import EmptyCart from "@/views/cart/empty-cart.vue";
import CartList from "@/views/cart/cart-list.vue";
import CartForm from "@/views/cart/cart-form.vue";
import {isWorkingTimeChecker} from "@/utils/isWorkingTimeChecker";
import ContactRow from "@/components/left-navigation/contact-row/contact-row.vue";

const {t, locale, fallbackLocale} = useI18n()
const selected_language = ref(locale);
const cartStore = useCartStore()


</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 16px;
  margin-bottom: 20px;
}
.orderTime{
  margin-top: 50px;
  .row{
    flex-direction: column;
    text-align: center;
  }
}
</style>