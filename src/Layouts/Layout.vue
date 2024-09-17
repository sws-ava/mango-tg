<template>
  <div class="wrapper">
<!--    <Header />-->
    <slot/>
  </div>
</template>

<script setup lang="ts">
import {useNotifications} from "@/store/notifications";
import {useI18n} from "vue-i18n";
import Header from "@/components/header/header.vue";
import {onMounted} from "vue";

const {t} = useI18n()
const notifications = useNotifications()

onMounted(() => {
    window.scrollTo(0,0);
})


</script>

<style lang="scss" scoped>
.wrapper{
  padding: calc(var(--header-height) + 20px) 20px calc(var(--bottom-navigation-height) + 10px);
}
</style>