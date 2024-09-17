<template>
  <div class="form__holder">
    <form
      @submit.prevent
    >
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
      <CheckBox
        :label="t('cartPage.saveData')"
        v-model="isSaveUserNameAndPhone"
        id="save-data"
      />
      <BrandButton
        class="form__button"
        :title="t('button.makeOrder')"
        @click="createOrderHandler"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import BrandField from "@/components/brand-field/brand-field.vue";
import type {Ref} from "vue";
import {ref, watch} from "vue";
import BrandButton from "@/components/brand-button/brand-button.vue";
import ApiGetDataService from "@/utils/api/services/apiGetDataService";
import {useCartStore} from "@/store/cart";
import CheckBox from "@/components/Form/CheckBox/CheckBox.vue";
import router from "@/router";

const cartStore = useCartStore()
const {t} = useI18n()

const isSaveUserNameAndPhone: Ref = ref(true)

const formFieldContentController = (fieldName) => {
  if(cartStore.userInfo[fieldName]) return cartStore.userInfo[fieldName]
  if(localStorage.getItem(fieldName)) return localStorage.getItem(fieldName)
  return ''
}

const orderForm: Ref = ref({
  name: formFieldContentController('name'),
  phone: formFieldContentController('phone'),
  address: formFieldContentController('address'),
  persons: formFieldContentController('persons'),
  comment: formFieldContentController('comment')
})


const createOrderHandler = async () => {
  const data = {
    cart: cartStore.cart,
    userInfo: cartStore.userInfo
  }
  const response = await ApiGetDataService.orderCreate(null, data)
  if (response.status.toString().startsWith('20')) {
    await clearUserPhoneAndDataFromLocalStorage()
    await router.push({name: 'OrderAccepted'})
    cartStore.clearCart()
  }else{
  }
}

const clearUserPhoneAndDataFromLocalStorage = async () => {
  if(!isSaveUserNameAndPhone.value){
    localStorage.removeItem('name')
    localStorage.removeItem('phone')
    cartStore.clearUserInfo()
  }
}

watch(orderForm.value, () => {
  cartStore.setUserInfo(orderForm)
  localStorage.setItem('name', orderForm.value.name)
  localStorage.setItem('phone', orderForm.value.phone)
}, {deep: true})

</script>

<style scoped lang="scss">
.form {
  &__holder {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-bottom: 50px;
  }

  &__button {
    margin: 40px auto;
  }
}

</style>