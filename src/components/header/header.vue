<template>
  <div class="header">
    <HeaderTranslate />
    <HeaderLogo />
    <HeaderBurger />
    <HeaderCart />
  </div>
</template>

<script setup lang="ts">

import HeaderBurger from "@/components/header-burger/header-burger.vue";
import HeaderLogo from "@/components/header-logo/header-logo.vue";
import HeaderTranslate from "@/components/header-translate/header-translate.vue";
import HeaderCart from "@/components/header-cart/header-cart.vue";
</script>

<style scoped>

.header{
    touch-action: none !important;
    -webkit-touch-callout: none!important;

    z-index: 700;
    background: #000;
    position: fixed;
    left: 0;
    width: 100%;
    top: 0;
    padding: 10px var(--wrapper-padding-right) 10px var(--wrapper-padding-left);
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--header-height);
}
</style>