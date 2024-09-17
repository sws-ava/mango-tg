import { createApp } from 'vue'
import { createPinia } from 'pinia'
import localization from '@/localization'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(localization)

window.Telegram.WebApp.expand()
window.Telegram.WebApp.disableVerticalSwipes()
window.Telegram.WebApp.setHeaderColor('#010202')
window.Telegram.WebApp.ready()

app.mount('#app')
