<template>
  <div class="empty-cart">{{t('cartPage.emptyCart')}}</div>
  <BrandButton
    :title="t('button.toMenu')"
    @click="toMenuHandler"
  />
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import router from "@/router";
import BrandButton from "@/components/brand-button/brand-button.vue";

const {t} = useI18n()

const toMenuHandler = () => {
  router.push({ name: 'Main' });
}

</script>

<style scoped lang="scss">
.empty-cart{
  margin-top: 120px;
  margin-bottom: 30px;
  font-size: 16px;
  text-align: center;
}
.button {
  border: 1px solid #000;
  outline: none;
  padding: 4px 8px;
  background: #ef6a28;
  font-size: 16px;
  color: #000;
  border-radius: 3px;
  display: block;
  margin: 0 auto;
}
</style>