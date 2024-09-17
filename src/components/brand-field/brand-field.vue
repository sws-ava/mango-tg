<template>
  <div
    class="field"
    :class="computedErrorClass + ' ' + fieldHolderClass"
  >
    <label
      class="field__label"
      :class="labelClass"
      :for="labelTitle"
    >
      {{ labelTitle }}
    </label>
    <input
      v-if="fieldType === 'input'"
      :id="labelTitle"
      class="field__input"
      :class="fieldClass"
      type="text"
      :value="modelValue"
      @input="updateField"
      :required="required"
    />
    <input
      v-if="fieldType === 'phone'"
      :id="labelTitle"
      class="field__input"
      :class="fieldClass"
      type="tel"
      :value="modelValue"
      @input="updateField"
      placeholder="+38(099) 999-99-99"
      v-maska="phoneMaskOptions"
    />
    <div class="input-persons" v-else-if="fieldType === 'input-persons'">
      <GoogleIcon
        name="remove"
        @click="updateFieldByButton('-')"
      />
      <input
        :id="labelTitle"
        class="field__input"
        :class="fieldClass"
        type="number"
        min="0"
        minlength="0"
        :value="modelValue"
        :required="required"
        :readonly="true"
      />
      <GoogleIcon
        name="add"
        @click="updateFieldByButton('+')"
      />
    </div>
    <textarea
      v-else-if="fieldType === 'textarea'"
      :value="modelValue"
      @input="updateField"
      :required="required"
    ></textarea>
    <template v-if="errors?.length">
    <div
      v-for="error in errors"
      class="error-row"
    >
      {{$t(error)}}
      <GoogleIcon name="error" />
    </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import GoogleIcon from "@/components/google-icon/google-icon.vue";
import { vMaska } from "maska/vue"
import {computed} from "vue";

const phoneMaskOptions ={
  mask: "+38(0##) ###-##-##",
  eager: false
}

const computedErrorClass = computed(() => {
  return props.errors?.length ? '--error' : ''
})

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: [String, Number],
  errors: {
    type: Array,
    default: () => []
  },
  required: {
    type: Boolean,
    default: false
  },
  fieldType: {
    type: String,
    default: 'input'
  },
  labelTitle: {
    type: String,
    default: ''
  },
  labelClass: {
    type: String,
    default: ''
  },
  fieldClass: {
    type: String,
    default: ''
  },
  fieldHolderClass: {
    type: String,
    default: ''
  },
  minLength: {
    type: Number,
    default: 0
  },
  maxLength: {
    type: Number,
    default: 10000
  }
})

const updateField = (event) => {
  emit('update:modelValue', event.target.value)
}
const updateFieldByButton = (flag) => {
  if(flag === '+') emit('update:modelValue', props.modelValue + 1)
  if(flag === '-' && props.modelValue > 1) emit('update:modelValue', props.modelValue - 1)
}




</script>

<style scoped lang="scss">
.field {
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  &__label {
    margin-bottom: 5px;
    width: fit-content;
  }

  input,
  input:focus-visible,
  textarea,
  textarea:focus-visible{
    font-family: "Roboto", sans-serif;
    border: 1px solid #fff;
    border-radius: 4px;
    width: 100%;
    background: #000;
    color: #fff;
    padding: 6px 10px;
    outline: none;
    font-size: 16px;
    &::placeholder{
      color: rgba(255,255,255, .6);
    }
  }

  textarea{
    min-height: 70px;
  }

  &.--error{
    input,
    input:focus-visible,
    textarea,
    textarea:focus-visible{
      border-color: red;
    }

    .error-row{
      color: red;
      display: flex;
      align-items: center;
      font-size: 12px;
      margin-top: 4px;
      gap: 5px;
      justify-content: flex-end;
      span{
        font-size: 16px;
      }
    }
  }

}

.--persons{
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 30px;
  input{
    width: 40px;
    max-width: 40px;
    text-align: center;
  }
  .input-persons{
    display: flex;
    align-items: center;
    gap: 15px;
  }
}

.error-row{
  color: red;
  display: flex;
  align-items: center;
}
</style>