import {defineStore} from 'pinia'

export const useCartStore = defineStore('cartStore', {

  state: () => {
    return {
      cart: [],
      userInfo: {
        name: '',
        phone: '',
        address: '',
        persons: 1,
        comment: '',
      }
    }
  },

  actions: {
    setUserInfo(userInfo:any){
      this.userInfo = userInfo
    },
    clearCart(){
      this.cart = []
    },
    clearUserInfo(){
      this.userInfo = {
        name: '',
        phone: '',
        address: '',
        persons: 1,
        comment: '',
      }
    },
    addToCart(variant: any, product: any) {
      console.log(variant, product)
      const isRow = this.cart.find((el: any) => el.variant_id === variant.id)
      if (!isRow) {
        const row = {
          variant_id: variant.id,
          product_id: product.id,
          price: parseInt(variant.price),
          amount: 1,
          variant,
          product,
        }
        this.cart.push(row)
      }else{
        this.incrementRow(variant.id)
      }
    },
    incrementRow(variantId:number){
      const idx = this.cart.findIndex((el:any) => el.variant_id === variantId)
      if(idx > -1) this.cart[idx].amount = this.cart[idx].amount + 1
    },
    decrementRow(variantId:number){
      const idx = this.cart.findIndex((el:any) => el.variant_id === variantId)
      if(idx > -1 && this.cart[idx].amount > 1) this.cart[idx].amount = this.cart[idx].amount - 1
    },
    removeRow(variantId:number){
      this.cart = this.cart.filter((el:any) => el.variant_id !== variantId)
    }
  },
})
