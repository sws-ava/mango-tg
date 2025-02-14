<template>
  <div class="wrapper">
    <div
      class="no-orders-time"
      v-if="!menu.isOnlineOrder"
    >
      {{ t('noOrder.ttl') }}
    </div>
<!--    <Header />-->
    <slot/>
  </div>
</template>

<script setup lang="ts">
import {useNotifications} from "@/store/notifications";
import {useI18n} from "vue-i18n";
import Header from "@/components/header/header.vue";
import {onMounted} from "vue";
import {useMenuStore} from "@/store/menu";

const {t} = useI18n()
const notifications = useNotifications()
const menu = useMenuStore()

onMounted(() => {
    window.scrollTo(0,0);
})


</script>

<style lang="scss" scoped>
.no-orders-time{
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: red;
}
.wrapper{
  padding: calc(var(--header-height) + 20px) 20px calc(var(--bottom-navigation-height) + 10px);
}
</style>