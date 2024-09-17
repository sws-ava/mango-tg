<template>
  <div
    class="modal"
    :class="productModalStore.isShowProductModal ? 'show' : ''"
    tabindex="-1"
    @click.stop="hideProductModalHandler"
  >
    <div @click.stop class="modal__body scroll">
      <div class="close-holder">
        <div class="close" @click="hideProductModalHandler"></div>
      </div>
      <div class="modal-content">
        <ProductModalImg/>
        <div class="product__info-inner">
          <ProductModalTitle/>
          <ProductModalDescription/>
        </div>
        <ProductModalVariants/>
        <div class="actions">
          <button
            class="button"
            @click="hideProductModalHandler"
          >
            {{ t('button.close') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n"
import {useProductModalStore} from "@/store/productModal";
import ProductModalImg from "@/components/product-modal/inc/product-modal-img.vue";
import ProductModalTitle from "@/components/product-modal/inc/product-modal-title.vue";
import ProductModalDescription from "@/components/product-modal/inc/product-modal-description.vue";
import ProductModalVariants from "@/components/product-modal/inc/product-modal-variants.vue";

const productModalStore = useProductModalStore()
const {t} = useI18n()


const hideProductModalHandler = () => {
  productModalStore.showModalHandler(false)
}

</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto 10px;
}

.product__img {
  width: calc(100% + 20px);
  margin: -10px -10px 10px;
}

.button {
  border: 1px solid #000;
  outline: none;
  padding: 4px 8px;
  background: #ef6a28;
  font-size: 16px;
  color: #000;
  border-radius: 3px;
}

.modal {
  position: fixed;
  left: 0;
  top: -1000px;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .7);
  z-index: -999;
  display: flex;
  align-items: center;
  justify-content: center;

  &.show {
    top: 0;
    z-index: 990;
  }

  &__body {
    padding: 10px;
    width: 100%;
    min-height: 330px;
    border-right: 20px;
    overflow: scroll;
    max-height: 90vh;
    max-width: 300px;
    color: #fff;
    background: #000;
    border-radius: 7px;
    border-bottom: 1px solid #fff;
    position: relative;
  }
}

.close-holder {
  background: #000;
  border-radius: 50%;
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close {
  width: 20px;
  height: 20px;
  margin-top: -3px;

  &::after, &::before {
    content: '';
    left: 50%;
    top: 50%;
    width: 100%;
    height: 3px;
    background: #fff;
    position: absolute;
  }

  &::after {
    transform: translateX(-50%) rotate(45deg);
  }

  &::before {
    transform: translateX(-50%) rotate(-45deg);
  }
}

</style>