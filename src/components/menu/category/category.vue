<template>
  <div class="category">
    <div
      class="category__name"
    >
      {{ category['title_' + selected_language] }}
    </div>
    <img class="ibg category__bg" :src="backgroundImageBuilder(category.picture)" alt=""/>

  </div>
</template>

<script setup lang="ts">

import {backgroundImageBuilder} from "@/utils/backgroundImageBuilder";
import {useI18n} from "vue-i18n";
import {ref} from "vue";

const {t, locale} = useI18n()

const selected_language = ref(locale);

const props = defineProps({
  category: {
    type: Object,
    default: () => {
    }
  }
})

</script>

<style lang="scss" scoped>
.category {
  color: #fff;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &__name {
    color: #ffffff;
    width: 100%;
    text-align: center;
    margin-bottom: 7%;
    margin-top: 7%;
    z-index: 1;
    position: relative;
    font-size: 20px;
    font-weight: bold;
  }

  &__bg {
    opacity: .8;
  }
}
</style>