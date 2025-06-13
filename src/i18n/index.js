import { createI18n } from 'vue-i18n'
import en from './en.json'
import es from './es.json'

export const i18n = createI18n({
    locale: 'es',
    fallbackLocale: 'en',
    legacy: false,
    globalInjection: true,
    messages: {
        en,
        es
    }
})
