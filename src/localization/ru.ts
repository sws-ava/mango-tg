import {LocaleMessages} from 'vue-i18n'

const ru: LocaleMessages<any> = {
  testLocale: {
    test: 'ru'
  },
  breadCrumbs: {
    all: 'Все меню'
  },
  leftNavi: {
    delivery: 'Доставка',
    deliveryTimeTitle: 'Принимаем заказы'
  },
  button: {
    close: "Закрыть",
    toMenu: "К меню",
    makeOrder: "Заказать"
  },
  nots: {
    success: "Отлично!",
    variantAdded: "Блюдо добавлено в корзину"
  },
  cartPage: {
    title: "Корзина",
    emptyCart: "Корзина пуста",
    total: "Итого",
    toOrder: "К оформлению заказа",
    name: "Имя",
    phone: "Телефон",
    address: "Адрес",
    persons: "Персон",
    comment: "Комментарий к заказу",
    saveData: "Сохранить в приложении имя и телефон для будущих заказов.",
    orderGet: "Спасибо за заказ! <br> Если его не подтвердили по Вашему телефону в течение 15 минут, <br> позвоните пожалуйста:"
  }
}

export default ru
