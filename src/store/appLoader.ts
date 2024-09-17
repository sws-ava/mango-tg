import { defineStore } from 'pinia'

export const useAppLoader = defineStore('appLoaderStore', {

  state: (): ILoading => {
    return {
      isLoading: false,
    }
  },

  actions: {
    setAppLoading(flag:boolean):void {
      this.isLoading = flag
    },
  },
})

interface ILoading {
  isLoading: boolean
}

