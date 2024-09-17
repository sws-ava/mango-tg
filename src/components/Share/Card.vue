<template>
    <div
        class="card"
        :class="classes"
    >
        <div class="card-body">
            <h6
                v-if="title"
                class="card-subtitle mb-2 text-body-secondary">
                {{ title }}
            </h6>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    classes:{
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: '',
    }
})

</script>

<style lang="scss" scoped>

</style>