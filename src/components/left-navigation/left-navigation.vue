<template>
  <div
    class="navi"
    @click.stop="hideLeftNavigationHandler"
  >
    <div @click.stop class="navi__inner scroll">
      <div class="navi__header">
        Mango
        <div class="close" @click="hideLeftNavigationHandler"></div>
      </div>
      <div class="navi__content">
        <div class="navi__devider" />
<!--        <NaviMenuItem />-->
<!--        <div class="navi__devider" />-->

        <ContactRow
          v-if="block?.address"
          :text="block.address"
          type="address"
          icon="location_on"
        />
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
<!--        <ContactRow-->
<!--          text="stanislav@gmal.com"-->
<!--          type="mail"-->
<!--          icon="mail"-->
<!--        />-->
<!--        <ContactRow-->
<!--          title="Время работы заведения"-->
<!--          text="10:00 - 22:00"-->
<!--          type="time"-->
<!--          icon="schedule"-->
<!--        />-->
        <ContactRow
          :title="t('leftNavi.deliveryTimeTitle')"
          text="10:00 - 21:30"
          type="time"
          icon="schedule"
        />
      </div>
      <Copyrights title="Sushi-mango 2015" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import NaviMenuItem from "@/components/left-navigation/navi-menu-item/navi-menu-item.vue";
import ContactRow from "@/components/left-navigation/contact-row/contact-row.vue";
import Copyrights from "@/components/left-navigation/copyrights/copyrights.vue";
import {computed, ref} from "vue";

const {t, locale} = useI18n()

import { useBlocksStore } from "@/store/blocks";
const blockStore = useBlocksStore()

// import {useBlocksState} from "@/store/blocks";
// const blocksState = useBlocksState()


const selected_language = ref(locale);


const block = computed(() => {
  return blockStore.blocks.find((el:any) => el.locale == selected_language.value)
})

const hideLeftNavigationHandler = (e) => {
  document.querySelector('body').classList.remove('show-left-navigation');
}

</script>

<style lang="scss">

.navi {
  position: fixed;
  z-index: 990;
  top: 0;
  bottom: var(--bottom-navigation-height);
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  left: -200%;

  &__devider{
    width: 100%;
    height: 1px;
    background: rgba(255,255,255,0.3);
  }
  &__inner {
    width: 100%;
    height: 100%;
    background: #000;
    max-width: 270px;
    padding-left: var(--wrapper-padding-left);
    padding-right: var(--wrapper-padding-right);
    padding-top: 14px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    gap: 10px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 17px;
    line-height: 100%;
  }
}

.show-left-navigation {
  .navi {
    left: 0;
    z-index: 990;
  }
}

.close {
  width: 20px;
  height: 20px;
  position: relative;
  cursor: pointer;

  &::after, &::before {
    content: '';
    left: 50%;
    top: 50%;
    width: 100%;
    height: 3px;
    background: #fff;
    position: absolute;
  }

  &::after {
    transform: translateX(-50%) rotate(45deg);
  }

  &::before {
    transform: translateX(-50%) rotate(-45deg);
  }
}

</style>