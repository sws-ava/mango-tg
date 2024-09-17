<template>
  <div class="price">
    {{ price }} {{ currency }}
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";


const props = defineProps({
  product: {
    type: Object,
    default: () => {},
    required: true
  }
})

const price = computed(() => {
  if (props.product.goodsItems.length === 1) {
    return  Math.floor(props.product.goodsItems[0].price)
  }else if (props.product.goodsItems.length > 1){
    const min = Math.min(...props.product.goodsItems.map(item => item.price));
    const max = Math.max(...props.product.goodsItems.map(item => item.price));
    return min+' - '+max
  }
})

const currency = computed(() => {
  return import.meta.env.VITE_BASE_CURRENCY
})

</script>

<style scoped lang="scss">
.price{
  font-size: 14px;
  border: none;
  cursor: pointer;
  padding: 3px;
  font-weight: 900;
  min-width: 80px;
  background-color: rgb(232, 143, 42);
  color: rgb(0, 0, 0);
  border-radius: 20px 0px 10px;
  width: fit-content;
  margin-left: auto;
  position: absolute;
  right: 0;
  bottom: 0;
  padding-left: 8px;
  text-align: right;
  padding-right: 10px;
}
</style>