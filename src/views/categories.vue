<template>
  <Layout>
    <List>
      <ListItem
        v-for="category in categories"
      >
        <Category
          :category="category"
          @click="navigateToCategory(category.id)"
        />
      </ListItem>
    </List>
  </Layout>
</template>

<script setup lang="ts">

import Category from "@/components/menu/category/category.vue";
import Layout from "@/Layouts/Layout.vue";
import {computed, onMounted, ref, Ref} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";
import {useI18n} from "vue-i18n";
const {t} = useI18n()

import {useMenuStore} from "@/store/menu";
import type {ICategory} from "@/models/menu/menu";
import List from "@/components/menu/list/list.vue";
import ListItem from "@/components/menu/list-item/list-item.vue";

const route = useRoute()
const menuStore = useMenuStore()


const categories = computed(() => {
  if(!menuStore.menu) return []
  return menuStore.menu.filter((el:ICategory) => el.parent_id == route.params.id)
})



const navigateToCategory = async (id) => {
  await router.push({name: 'Category', params: {id: parseInt(id)}})
}



</script>

<style scoped lang="scss">

</style>