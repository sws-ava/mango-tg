const apiRoutes = {
  PUT: '?_method=PUT',
  system: {
    login: '/login',
    // register: '/register',
    logout: '/logout'
  },
  getData: {
    blocks: '/blocks',
    menu: '/menu',
    orderCreate: '/order-create',
    isOrderTime: '/is-order-time'
  },
  locales:{
    list: '/locales'
  },
  pages: {
    list: '/pages',
    item: '/pages/{id}'
  },
  categories:{
    list: '/categories',
    item: '/categories/{id}',
    showHide: '/categories/show/{id}',
    orderItem: '/categories/order/{id}/{order}',
    syncProducts: '/categories/products/{id}/sync',
    attachProducts: '/categories/products/{id}/attach'
  },
}

export default apiRoutes
