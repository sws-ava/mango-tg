<template>
  <div class="translate">
    <select
      v-model="selected_language"
      @change="setLocaleAction"
    >
      <option
        v-for="localeItem in i18n.global.availableLocales"
        :selected="locale === locale"
      >
        {{ localeItem }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import i18n from "@/localization";
import {onMounted, ref} from "vue";

const {t, locale} = useI18n()

const selected_language = ref(locale);

const setLocaleAction = () => {
  locale.value = selected_language.value;
  localStorage.setItem('locale', locale.value)
};

const setLocaleHandler = () => {
  const localStorageLocale = localStorage.getItem('locale')
  if(!localStorageLocale) localStorage.setItem('locale', selected_language.value)
  else locale.value = selected_language.value = localStorageLocale;
};

onMounted(() => {
  setLocaleHandler()
})

</script>

<style scoped>
.translate {
    margin-left: auto;
    cursor: pointer;
    position: absolute;
    left: var(--wrapper-padding-left);
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: #000;
        color: #fff;
        text-transform: uppercase;
        padding: 3px 8px;
        border: none;
        cursor: pointer;
        font-size: 18px;
    }

    option {
        cursor: pointer;
    }
}
</style>