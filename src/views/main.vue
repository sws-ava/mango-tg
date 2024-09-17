<template>
  <Layout>
    <List>
      <ListItem v-for="category in categories">
        <Category
          :category="category"
          @click="navigateToCategory(category.id)"
        />
      </ListItem>
    </List>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/Layouts/Layout.vue";
import {computed} from "vue";
import Category from "@/components/menu/category/category.vue";
import {useRoute} from "vue-router";
import router from "@/router";
import {useMenuStore} from "@/store/menu";
import type {ICategory} from "@/models/menu/menu";
import List from "@/components/menu/list/list.vue";
import ListItem from "@/components/menu/list-item/list-item.vue";
// import ApiGetDataService from "@/utils/api/services/apiGetDataService";

const route = useRoute()
const menuStore = useMenuStore()


//
// const getIsOrderTime = async () => {
//   const response = await ApiGetDataService.menu({})
//   if (response.status.toString().startsWith('20')) {
//
//   } else {
//   }
// }


const categories = computed(() => {
  if (!menuStore.menu) return []
  return menuStore.menu.filter((el: ICategory) => el.parent_id == 0)
})


const navigateToCategory = async (id) => {
  await router.push({name: 'Categories', params: {id: id}})
}

</script>