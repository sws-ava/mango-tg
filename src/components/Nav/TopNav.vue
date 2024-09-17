<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary justify-content-between d-flex px-4">
        <RouterLink
            class="nav-link"
            :to="{name:'Dashboard'}"
        >
            {{ title }}
        </RouterLink>
        <ul class="navbar-nav mb-lg-0">
            <li class="nav-item">
                <Logout />
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import Logout from "@/components/Logout.vue";
import {computed} from "vue";

const props = defineProps({
    navItems: {
        type: Object,
        default: () => {}
    }
})



const title = import.meta.env.VITE_SITE_NAME

</script>

<style lang="scss" scoped>

</style>