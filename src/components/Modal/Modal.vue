<template>
    <div class="modal-open">
      <div
          class="modal modal-window"
          :class="open ? 'fade show d-block' : 'd-none'"
          tabindex="-1"
      >
          <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            :style="{ maxWidth: (maxWidth ? props.maxWidth : '')}"
          >
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">{{ title }}</h5>
                      <button
                          type="button"
                          class="btn-close"
                          @click="onClickHandler('cancel')"
                      />
                  </div>
                  <div class="modal-body">
                      <slot></slot>
                  </div>
                  <slot name="actions"></slot>
              </div>
          </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import Head from '@/components/Share/Head/Head.vue'
import Icon from '@/components/Share/Icon/Icon.vue'

const { t } = useI18n()

const props = defineProps(['maxWidth','hideHeaderLine', 'open', 'title', 'titleColor', 'buttonText', 'buttonCancel', 'isStandardButtons', 'okDisabled', 'width', 'height', 'background'])

const emit = defineEmits(['action'])

const onClickHandler = (action: string) => {
  emit('action', action)
}
</script>

<style lang="scss" scoped>
.modal-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  overflow: auto;
  background-color: rgba(0, 0, 0, .5);


}
.modal-window {
  background: rgba(0,0,0,0.7);
  //width: 500px;
  //height: max-content;
  //position: relative;
  //background: #ffffff;
  //padding: 5px;
  //border-radius: 5px;

  .header {
    .close {
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }
}
</style>