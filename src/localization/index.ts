import { createI18n } from 'vue-i18n'
import ru from '@/localization/ru'
import ua from "@/localization/ua";

const i18n = createI18n({
  locale: 'ua',
  legacy: false,
  fallbackLocale: "ua",
  messages: {
    ua: ua,
    ru: ru,
  },
})

export default i18n;

