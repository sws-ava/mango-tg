<template>
  <div
    class="cart-holder"
    :class="route.name === 'Cart' ? ' --current-route' : ''"
    @click="navigateToCartHandler"

  >
    <Icon
      name="cart"
    />
    <div v-if="countOrder" class="count">{{ countOrder }}</div>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/icon/icon.vue";
import {computed, Ref, ref} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";
import {useCartStore} from "@/store/cart";

const cartStore = useCartStore()
const route = useRoute()

const countOrder = computed(()=>{
  let amountTotal = 0
  cartStore.cart.forEach((el:any) => {
    amountTotal += el.amount
  })
  return amountTotal
})


const navigateToCartHandler = () => {
  router.push({name: 'Cart'})
}

</script>

<style scoped lang="scss">
.cart-holder {
  //position: relative;
  width: 24px;
  min-width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 20px;
  position: absolute;
  right: var(--wrapper-padding-right);
}

.--current-route{
  svg{
    color: #C77522;
  }
}

.count{
  top: 0;
  color: white;
  right: 0;
  width: 13px;
  height: 13px;
  display: block;
  padding: 2px;
  position: absolute;
  font-size: 10px;
  line-height: 0.9;
  border-radius: 50%;
  letter-spacing: 0;
  background-color: red;
  text-align: center;
}
</style>