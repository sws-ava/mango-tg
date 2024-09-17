<template>
  <div
    v-if="portion"
    class="portion"
  >
    {{ portion }}
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";


const props = defineProps({
  product: {
    type: Object,
    default: () => {},
    required: true
  }
})

const portion = computed(() => {
  const weight = props.product.goodsItems[0].weight
  const weightKind = props.product.goodsItems[0].weightKind
  if(weight && weightKind) {
    return weight + ' ' + weightKind
  }else{
    return null
  }

})

</script>

<style scoped lang="scss">
.portion {
  left: 110px;
  bottom: 5px;
  position: absolute;
  border-radius: 4px;
  border: 1px solid #fff;
  padding: 0px 4px;
  font-size: 11px;
}
</style>