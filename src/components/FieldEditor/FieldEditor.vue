<template>
  <div
    class="field-editor form-control"
    :style="isEditing ? '    margin-top: 52px;' : ''"
  >
    <div v-if="!isEditing" class="field-editor__lock"></div>
    <div
      v-if="isEditing"
      class="field-editor__buttons flex gap-2"
    >
      <button
        type="button"
        v-if="editorButtons.bold"
        class="button --sm --bg-secondary field-editor__button"
        @click="editor?.chain().focus().toggleBold().run()" :disabled="!editor?.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor?.isActive('bold') }"
      >
        Ж
      </button>
      <button
        type="button"
        v-if="editorButtons.textAligns"
        class="button --sm --bg-secondary field-editor__button"
        @click="editor?.chain().focus().setTextAlign('left').run()"
        :class="{ 'is-active': editor?.isActive({ textAlign: 'left' }) }"
      >
        L
      </button>
      <button
        type="button"
        v-if="editorButtons.textAligns"
        class="button --sm --bg-secondary field-editor__button"
        @click="editor?.chain().focus().setTextAlign('center').run()"
        :class="{ 'is-active': editor?.isActive({ textAlign: 'center' }) }"
      >
        C
      </button>
      <button
        type="button"
        v-if="editorButtons.textAligns"
        class="button --sm --bg-secondary field-editor__button"
        @click="editor?.chain().focus().setTextAlign('right').run()"
        :class="{ 'is-active': editor?.isActive({ textAlign: 'right' }) }"
      >
        R
      </button>
    </div>
    <editor-content
      :editor="editor"
    />
  </div>
</template>


<script setup lang="ts">
// Дока тут
// https://tiptap.dev/docs/editor/examples/default

import {EditorContent, useEditor} from "@tiptap/vue-3";
import {computed, ref, Ref, watch} from "vue";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from '@tiptap/extension-text-align'

const props = defineProps({
  modelValue:{
    type: String,
    default: '',
  },
  isEditing:{
    type: Boolean,
    default: false
  },
  classes: {
    type: String,
    default: ''
  },
  bold:{
    type: Boolean,
    default: false
  },
  editorButtons:{
    type: Object,
    default: () => {}
  }

})


const emits = defineEmits(['update:modelValue'])
const text: Ref = ref(props.modelValue || null)

watch([text], () => {
  emits('update:modelValue', text.value)
})

watch([props], () => {
  console.log(props.modelValue)
  text.value = props.modelValue
  if (editor.value?.getHTML() !== text.value) {
    editor.value?.commands.setContent(text.value, false)
  }
}, {deep: true})

const editor = useEditor({
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
  onUpdate: () => {
    text.value = editor.value?.getHTML()
  }
})

</script>

<style lang="scss" scoped>
.field-editor{
  width: 100%;
  position: relative;
  min-height: 400px;
  &__buttons{
    margin-top: -58px;
    margin-bottom: 20px;
  }
  button{
    height: 34px!important;
    &.is-active{
      background: grey;
    }
  }
  &__lock{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
</style>