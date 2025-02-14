import { defineStore } from 'pinia'
import type {IMenu, ICategory} from "@/models/menu/menu";

export const useMenuStore = defineStore('menuStore', {

  state: (): IMenu => {
    return {
      menu:  [] as ICategory[],
      isOnlineOrder: true
    }
  },

  actions: {
    setMenu(newMenu: ICategory[], isOnlineOrder: boolean){
      this.clear()
      this.menu = newMenu
      this.isOnlineOrder = isOnlineOrder
    },
    clear(){
      this.menu = []
    }
  },
})

