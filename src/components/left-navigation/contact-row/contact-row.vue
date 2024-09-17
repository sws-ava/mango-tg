<template>

  <div class="row">
    <div class="row__icon">
      <GoogleIcon
        v-if="icon"
        :name="icon"
      />
    </div>
    <div class="row__text">
      <div v-if="title" class="row__text-title">{{title}}</div>
      <template v-if="type === 'phone'">
        <a
          :href="getPhoneNumber(text)"
          @click="makeCall(getPhoneNumber(text))"
        >
          {{text}}
        </a>
      </template>
      <template v-else-if="type === 'mail'">
        <a
          :href="getMail(text)"
          @click="makeCall(getMail(text))"
        >
          {{text}}
        </a>
      </template>
      <template v-else>
        {{text}}

      </template>
    </div>
  </div>
</template>

<script setup lang="ts">

import GoogleIcon from "@/components/google-icon/google-icon.vue";

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})

const makeCall = (phone) => {
  window.open(phone)
}

const getMail = (text) => {
  if(!text) return ''
  const mailto = 'mailto:'

  return mailto + text
}

const getPhoneNumber = (phone: string) => {
  if(!phone) return ''
  const tel = 'tel:+38'

  let res = phone.split(' ').join('')
    .replace("+38", '')
    .replace("+3", '')
    .replace('(', '')
    .replace(')', '')

  return tel + res
}


</script>

<style scoped lang="scss">
.row{
  display: flex;
  justify-content: flex-start;
  text-align: left;
  gap: 5px;
  padding: 10px 0;
  align-items: center;
  &__text{
    &-title{
      font-size: 16px;
    }
  }
}
a{
  color: #fff;
  text-decoration: none;
  &:hover{
    text-decoration: underline;
  }
}
</style>