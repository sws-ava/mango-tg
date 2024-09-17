<template>
  <div class="navi-menu-item">
    {{t('leftNavi.delivery')}}
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n()

</script>

<style scoped>
.navi-menu-item{
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 10px;
    cursor: pointer;
}
</style>