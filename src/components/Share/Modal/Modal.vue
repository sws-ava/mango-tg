<template>
  <div
    class="modal"
    :class="open ? 'show' : ''"
    tabindex="-1"
  >
    <div
      class="modal__body scroll"
      :style="{ maxWidth: (maxWidth ? props.maxWidth : '')}"
    >
      <div class="modal-content">
        modal
<!--        <img class="product__img" :src="backgroundImageBuilder(getProductImage(product))" />-->

<!--        <div class="product__info-inner">-->
<!--          <h3>{{product.Name}}</h3>-->
<!--          <span v-html="product.Description"></span>-->
<!--        </div>-->
<!--        <div class="product__price">-->
<!--          {{ product.Prices[0].Price == 0 ? 1 : product.Prices[0].Price }}-->
<!--          {{product.Prices[0].Currency.ShortName}}-->
<!--        </div>-->
<!--        <div class="product__portion">-->
<!--          {{product.Prices[0].Serving}}-->
<!--          {{product.Prices[0].Unit.Name}}-->
<!--        </div>-->
<!--        <div class="actions">-->
<!--          <button-->
<!--            class="button"-->
<!--            style="background: grey"-->
<!--            @click="emit('action', 'cancel')"-->
<!--          >-->
<!--            Отмена-->
<!--          </button>-->
<!--          <button-->
<!--            class="button"-->
<!--          >-->
<!--            Заказать-->
<!--          </button>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n"
import Head from '@/components/Share/Head/Head.vue'
import Icon from '@/components/Share/Icon/Icon.vue'
import {backgroundImageBuilder} from "@/utils/backgroundImageBuilder";

const {t} = useI18n()

const props = defineProps(['product', 'maxWidth', 'hideHeaderLine', 'open', 'title', 'titleColor', 'buttonText', 'buttonCancel', 'isStandardButtons', 'okDisabled', 'width', 'height', 'background'])

const emit = defineEmits(['action'])

const getProductImage = (product) => {
  if(product.Images?.length) {
    return product.Images[0].Image
  }
  if(product.product?.length){
    return product.product[0].Image
  }


  return 'restaurant_logo'
}

const onClickHandler = (action: string) => {
  emit('action', action)
}
</script>

<style lang="scss" scoped>
.actions{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 0px;
}
.product__img{
  width: calc(100% + 20px);
  margin-left: -10px;
  margin-right: -10px;
  margin-top: -10px;
  margin-bottom: 10px;
}
.button{
  border: 1px solid #000;
  outline: none;
  padding: 2px 4px;
  background: #ef6a28;
  font-size: 16px;
  color: #000;
}
.modal{
  position: absolute;
  left: 0;
  top: -1000px;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0, .7);
  z-index: -999;
  display: flex;
  align-items: center;
  justify-content: center;
  &.show{
    top: 0;
    z-index: 990;
  }
  &__body{
    background: #c7b6b6;
    padding: 10px;
    width: 100%;
    min-height: 300px ;
    border-right: 20px;
    overflow: scroll;
    color: #000;
    max-height: 90vh;
  }
}

</style>