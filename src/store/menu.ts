import { defineStore } from 'pinia'
import type {IMenu, ICategory} from "@/models/menu/menu";

export const useMenuStore = defineStore('menuStore', {

  state: (): IMenu => {
    return {
      menu:  [] as ICategory[],
    }
  },

  actions: {
    setMenu(newMenu: ICategory[]){
      this.clear()
      this.menu = newMenu
    },
    clear(){
      this.menu = []
    }
  },
})

