<template>
  <div class="form__holder">
    <form action="">
      <BrandField
        :label-title="t('cartPage.name')"
        v-model="orderForm.name"
        :required="true"
        tabindex="1"
      />
      <BrandField
        :label-title="t('cartPage.phone')"
        v-model="orderForm.phone"
        :required="true"
        field-type="phone"
      />
      <BrandField
        :label-title="t('cartPage.address')"
        v-model="orderForm.address"
        :required="true"
        tabindex="2"
      />
      <BrandField
        field-type="input-persons"
        field-holder-class="--persons"
        :label-title="t('cartPage.persons')"
        v-model="orderForm.persons"
        :required="true"
        tabindex="3"
      />
      <BrandField
        field-type="textarea"
        :label-title="t('cartPage.comment')"
        v-model="orderForm.comment"
        tabindex="4"
      />
      <BrandButton
        class="form__button"
        :title="t('button.makeOrder')"
        @click="updateStore"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import BrandField from "@/components/brand-field/brand-field.vue";
import type {Ref} from "vue";
import {ref} from "vue";
import BrandButton from "@/components/brand-button/brand-button.vue";

const {t} = useI18n()

const orderForm: Ref = ref({
  name: localStorage.getItem('name') ? localStorage.getItem('name') : '',
  phone: localStorage.getItem('phone') ? localStorage.getItem('phone') : '',
  address: '',
  persons: 1,
  comment: ''
})


const updateStore = () => {
  console.log(orderForm.value)
  localStorage.setItem('phone', orderForm.value.phone)
  localStorage.setItem('name', orderForm.value.name)
}

</script>

<style scoped lang="scss">
.form {
  &__holder {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-bottom: 50px;
  }

  &__button {
    margin: 0 auto;
  }
}

</style>