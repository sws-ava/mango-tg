<template>
    <div class="card mb-2 px-4 py-2" >
        <div class="d-flex align-items-center justify-content-between">
            <h4
                v-if="title"
            >
                {{ title }}
            </h4>
            <slot name="actions"></slot>
        </div>
        <BreadCrumbs
            v-if="breadCrumbs?.length"
            :bread-crumbs="breadCrumbs"
        />
    </div>
</template>

<script setup lang="ts">

import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs.vue";

const props = defineProps({
    breadCrumbs: {
        type: Object,
        default: []
    },
    title: {
        type: String,
        default: ''
    }
})
</script>

<style lang="scss" scoped>

</style>