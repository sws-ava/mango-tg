<template>
  <div class="form__holder">
    <form
      @submit.prevent
    >
      <BrandField
        :label-title="t('cartPage.name')"
        v-model="orderForm.name"
        tabindex="1"
        :errors="validationErrors.name"
      />
      <BrandField
        :label-title="t('cartPage.phone')"
        v-model="orderForm.phone"
        field-type="phone"
        :errors="validationErrors.phone"
      />
      <BrandField
        :label-title="t('cartPage.address')"
        v-model="orderForm.address"
        tabindex="2"
        :errors="validationErrors.address"
      />
      <BrandField
        field-type="input-persons"
        field-holder-class="--persons"
        :label-title="t('cartPage.persons')"
        v-model="orderForm.persons"
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


const validationErrors:Ref = ref({
  name: [],
  phone: [],
  address: [],
})

const formValidation = () => {
  let isValidate = true
  // name
  validationErrors.value.name = []
  if(orderForm.value.name.length < 2){
    validationErrors.value.name.push('validation.empty')
    isValidate = false
  }

  // phone
  validationErrors.value.phone = []
  if(orderForm.value.phone.length < 18){
    validationErrors.value.phone.push('validation.missingNumbers')
    isValidate = false
  }

  // address
  validationErrors.value.address = []
  if(orderForm.value.address.length < 2){
    validationErrors.value.address.push('validation.empty')
    isValidate = false
  }
  return isValidate
}


const createOrderHandler = async () => {
  const isValidate = formValidation()
  if (!isValidate) return

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

watch(() => orderForm.value.name, (newName, prevName) => {
    validationErrors.value.name = []
  }
);
watch(() => orderForm.value.phone, (newName, prevName) => {
    validationErrors.value.phone = []
  }
);
watch(() => orderForm.value.address, (newName, prevName) => {
    validationErrors.value.address = []
  }
);

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