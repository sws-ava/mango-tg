<template>
  <Layout>
    <div
      class="accepted"
      v-html="$t('cartPage.orderGet')"
    />
    <div class="content">
      <ContactRow
        v-if="block?.phone1"
        :text="block.phone1"
        type="phone"
        icon="phone_in_talk"
      />
      <ContactRow
        v-if="block?.phone2"
        :text="block.phone2"
        type="phone"
        icon="phone_in_talk"
      />
      <BrandButton
        :title="$t('button.toMenu')"
        @click="toMenuHandler"
      />
    </div>
  </Layout>
</template>

<script setup lang="ts">

import Layout from "@/Layouts/Layout.vue";
import BrandButton from "@/components/brand-button/brand-button.vue";
import router from "@/router";
import ContactRow from "@/components/left-navigation/contact-row/contact-row.vue";

const {t, locale} = useI18n()

import {useBlocksStore} from "@/store/blocks";
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";

const blockStore = useBlocksStore()

const selected_language = ref(locale);

const block = computed(() => {
  return blockStore.blocks.find((el: any) => el.locale == selected_language.value)
})
const toMenuHandler = () => {
  router.push({name: 'Main'});
}
</script>

<style scoped lang="scss">
.accepted {
  margin-top: 100px;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
}

.content {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .button{
    margin-top: 20px;
  }
}
</style>