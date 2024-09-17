<template>
  <div
    class="logo"
    @click="homeAction"
  >
    <img src="/images/logo.png" alt="">
  </div>
</template>

<script setup lang="ts">

import router from "@/router";

const homeAction = () => {
  router.push({name: 'Main'})
}

</script>

<style scoped>
.logo{
    margin-left: 20px;
    margin-right: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    img{
        height: 100%;
        max-height: 25px;
    }
}
</style>