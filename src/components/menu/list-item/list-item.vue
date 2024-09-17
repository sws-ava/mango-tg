<template>
  <div class="list-item">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.list-item{
    flex-grow: 0;
    max-width: 100%;
    flex-basis: 100%;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-size: 100% 100%;
    cursor: pointer;
    position: relative;
    background: #3a372c;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    border-radius: 0 20px 20px 20px;
    overflow: hidden;

    @media (min-width: 600px) {
        max-width: calc(50% - (var(--list-gap) / 2));
        flex-basis: calc(50% - (var(--list-gap) / 2));
    }
    @media (min-width: 960px) {
        max-width: calc(33.333333% - (var(--list-gap) / 1.4));
        flex-basis: calc(33.333333% - (var(--list-gap) / 1.4));
    }
}
</style>