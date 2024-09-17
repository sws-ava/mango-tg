<template>
    <Breadcrumbs
      :category-id="parseInt(route.params.id)"
    />
  <div class="list">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs.vue";
import {useRoute} from "vue-router";
const route = useRoute()

</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  gap: var(--list-gap);
}
</style>