<template>
  <Header/>
  <RouterView />
  <Notifications/>
  <LeftNavigation />
  <AppLoader />
  <ProductModal />
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import Notifications from "@/components/Share/Notifications/Notifications.vue";
import Header from "@/components/header/header.vue";
import LeftNavigation from "@/components/left-navigation/left-navigation.vue";
import {onMounted} from "vue";
import {lastVersionHandler} from "@/utils/lastVersionHandler";
import ApiGetDataService from "@/utils/api/services/apiGetDataService";
import {useBlocksStore} from "@/store/blocks";
import {useMenuStore} from "@/store/menu";
import {useAppLoader} from "@/store/appLoader";
import AppLoader from "@/components/app-loader/app-loader.vue";
import ProductModal from "@/components/product-modal/product-modal.vue";

const blockStore = useBlocksStore()
const menu = useMenuStore()
const appLoader = useAppLoader()

// TODO
// срань уберать ниже
// выносить getData в appClient

const getData = async () => {
  appLoader.setAppLoading(true)
  const response = await ApiGetDataService.menu({})
  if (response.status.toString().startsWith('20')) {
    blockStore.setBlocks(response.data.blocks)
    menu.setMenu(response.data.categories)
    lastVersionHandler(response.data.version)
    appLoader.setAppLoading(false)
  }else{
    appLoader.setAppLoading(false)
  }
  appLoader.setAppLoading(false)
}

onMounted(() => {
  getData()
})

</script>

<style>
@import url('/src/assets/base.css');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-size: 14px;
    line-height: 1.4;
    color: #fff;
    background-color: #1d1d1d;
    font-family: "Roboto", sans-serif;
    /*touch-action: none !important;*/
    /*-webkit-touch-callout: none!important;*/

}

.body-lock{
    overflow: hidden;
}

.ibg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.scroll {
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
        opacity: 0;
        overflow: hidden;
        background: transparent;
        display: none;
    }

    &::-webkit-scrollbar-track {
        width: 0;
        height: 0;
        opacity: 0;
        overflow: hidden;
        background: transparent;
        display: none;
    }

    &::-webkit-scrollbar-thumb {
        width: 0;
        height: 0;
        opacity: 0;
        overflow: hidden;
        background: transparent;
        display: none;
    }
}

input,
select,
option {
    border: none;
    outline: none;
}


</style>
