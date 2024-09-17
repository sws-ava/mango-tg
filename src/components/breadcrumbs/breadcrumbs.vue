<template>
  <div class="breadcrumbs">
    <div
      class="breadcrumb-item"
      @click="returnHomeHandler"
    >
      {{t('breadCrumbs.all')}}
    </div>
    <template
      v-for="item in listArr"
    >
      >
    <div
      class="breadcrumb-item"
      @click="returnToCategoryHandler(item)"
    >
      {{ item['title_'+selected_language] }}
    </div>

    </template>
  </div>
</template>

<script setup lang="ts">

import {useI18n} from "vue-i18n";
import type {Ref} from "vue";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";
import {useMenuStore} from "@/store/menu";
import {useAppLoader} from "@/store/appLoader";
import type {ICategory} from "@/models/category";

const { t,locale } = useI18n()
const route = useRoute()
const menuStore = useMenuStore()
const appLoader = useAppLoader()

const selected_language = ref(locale);

const props = defineProps({
    categoryId: {
        type: Number,
        default: null
    }
})

const list:Ref = ref([])

const returnHomeHandler = () => {
  router.push({name: 'Main'})
}

const returnToCategoryHandler = (cat) => {
  if(cat.isLast) return
  router.push({name: 'Categories', params: {id: parseInt(cat.id)}})
}

const getParentCategory = (id:number, isLast) => {
  if(!menuStore.menu.length) return
  let category:ICategory = menuStore.menu.find((el:any) => el.id == id)
  category.isLast = isLast
  list.value.unshift(category)
  if(category.parent_id > 0) {
    getParentCategory(parseInt(category.parent_id), false)
  }
}

const listArr = computed(() => {
  if(appLoader.isLoading) return []
  if(!route.params.id) return []
  getParentCategory(parseInt(route.params.id), true)
  return list.value
})


</script>

<style lang="scss" scoped>
.breadcrumbs{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  flex-wrap: wrap;
  text-transform: uppercase;
}
.breadcrumb-item{
  white-space: nowrap;
  font-size: 10px;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 3px;
  padding: 1px 4px;
}
</style>