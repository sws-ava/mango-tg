<template>
  <div
    class="product"
    @click="showProductModal(product)"
  >
    <ProductImage :image-path="product.picture"/>
    <div class="product__info">
      <div class="product__info-inner">
        <ProductTitle :product="product"/>
        <ProductDescription :product="product"/>
      </div>
      <ProductPrice :product="product"/>
      <ProductPortion :product="product"/>
    </div>

  </div>
</template>

<script setup lang="ts">

import {Ref, ref} from "vue";
import ProductImage from "@/components/menu/product/inc/product-image.vue";
import ProductTitle from "@/components/menu/product/inc/product-title.vue";
import ProductDescription from "@/components/menu/product/inc/product-description.vue";
import ProductPrice from "@/components/menu/product/inc/product-price.vue";
import ProductPortion from "@/components/menu/product/inc/product-portion.vue";

import {useProductModalStore} from "@/store/productModal";
import type {IProduct} from "@/models/category";

const productModalStore = useProductModalStore()

const props = defineProps({
  product: {
    type: Object,
    default: () => {
    }
  }
})

const showProductModal = async (product: IProduct) => {
  productModalStore.clearProduct()
  await productModalStore.setProduct(product)
  productModalStore.showModalHandler(true)
}

</script>

<style lang="scss" scoped>
.product {
  color: #fff;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-size: 100% 100%;
  cursor: pointer;
  position: relative;
  background: #3a372c;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  border-radius: 0 20px 20px 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &__info {
    width: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    height: 100%;

    &-inner {
      flex: 1 0 auto;
      padding: 2px 5px 5px 10px !important;
    }
  }
}
</style>