import { defineStore } from 'pinia'
import type {IProduct, IVariant} from "@/models/category";

export const useProductModalStore = defineStore('productModalStore', {

  state: (): IProductModal => {
    return {
      isShowProductModal: false,
      product: {
        picture: '',
        goodsItems: [],
        title_ru: '',
        title_ua: '',
        desc_ru: '',
        desc_ua: '',
      } as IProduct
    }
  },

  actions: {
    showModalHandler(flag: boolean){
      if(flag){
        document.querySelector('body').classList.add('body-lock');
      }
      else {
        document.querySelector('body').classList.remove('body-lock');
      }

      this.isShowProductModal = flag
    },
    setProduct(product: IProduct){
      this.product = product
    },
    clearProduct(){
      this.product = {}
    },
  },
})

export interface IProductModal {
  isShowProductModal: boolean
  product: object
}
