<template>
    <ul class="nav flex-row flex-lg-column left-navigation">
        <li
            v-for="item in navItems"
            :key="item?.id"
            class="nav-item"
        >
            <RouterLink
                class="nav-link"
                :to="{name: item?.link}"
            >
                {{ item?.title }}
            </RouterLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
const props = defineProps({
    navItems: {
        type: Object,
        default: () => {}
    }
})


</script>

<style lang="scss" scoped>
.left-navigation{
  margin-top: 20px;
  font-size: 18px;
}
</style>