<template>
  <label
    v-if="isShowLabel"
    class="form-label"
  >
    {{ label }}
  </label>
  <textarea
    v-if="type === 'textarea'"
    :style="{minHeight: minHeight ? minHeight : ''}"
    class="form-control"
    :class="classes"
    :id="id"
    :value="modelValue"
    :required="required"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="update"
  />
  <template v-else-if="type === 'fieldEditor'">
    <field-editor
      v-model="value"
      :editorButtons="editorButtons"
      :isEditing="disabled"
    />
  </template>
  <input
    v-else
    :type="type"
    class="form-control"
    :class="classes"
    :id="id"
    :value="modelValue"
    :required="required"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="update"
  >
</template>

<script setup lang="ts">
import {ref, Ref, watch} from "vue";
import FieldEditor from "@/components/FieldEditor/FieldEditor.vue";

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
  mods: {
    type: Array<String>,
  },
  value: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: ''
  },
  classes: {
    type: String,
    default: ''
  },
  isShowLabel: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: 'Label'
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  minHeight: {
    type: String,
    default: ''
  },
  editorButtons: {
    type: Object,
    default: () => { }
  },
})

const value: Ref = ref('')

const update = (e) => {
  emit('update:modelValue', e.target.value)
}

</script>

<style lang="scss" scoped>

</style>