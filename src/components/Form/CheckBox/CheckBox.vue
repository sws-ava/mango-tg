<template>
    <div class="form-check">
        <input
            class="form-check-input"
            type="checkbox"
            :checked="modelValue"
            :id="id"
            @change="update"
        >
        <label
            class="form-check-label"
            :for="id"
        >
            {{ label }}
        </label>
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    id:{
      type:String,
      default: ''
    },
    modelValue: {
        default: ''
    },
})

const update = (e) => {
    emit('update:modelValue', e.target.checked)
}

</script>

<style lang="scss" scoped>

</style>