<template>
  <div class="notifications">
    <div v-for="(item, index) in list" :key="index" class="notifications__item" :class="['--' + item.type]">
      <div class="notifications__icon">
        <Icon :name="icons[item.type]" />
      </div>
      <div class="notifications__text">
        <div class="notifications__title">{{ item.title }}</div>
        <div v-if="item.desc" class="notifications__desc">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>
<script src="./Notifications.ts" lang="ts"></script>
<style src="./Notifications.scss" lang="scss"></style>