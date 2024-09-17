<template>
  <Layout>
    <List>
      <ListItem
        v-for="product in products"
      >
        <Product
          :product="product"
        />
      </ListItem>
    </List>
  </Layout>
</template>

<script setup lang="ts">

import {computed} from "vue";
import {useRoute} from "vue-router";
import Product from "@/components/menu/product/product.vue";
import Layout from "@/Layouts/Layout.vue";
import {useMenuStore} from "@/store/menu";
import {ICategory} from "@/models/menu/menu";
import List from "@/components/menu/list/list.vue";
import ListItem from "@/components/menu/list-item/list-item.vue";

const route = useRoute()
const menuStore = useMenuStore()


const products = computed(() => {
  if(!menuStore.menu) return []
  const category = menuStore.menu.find((el:ICategory) => el.id == route.params.id)
  if(category) return category.goods
})


</script>

<style scoped lang="scss">

</style>