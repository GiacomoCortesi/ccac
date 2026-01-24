import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import itTranslations from './locales/it/translation.json'
import enTranslations from './locales/en/translation.json'

// Get language from URL or browser
const getInitialLanguage = (): string => {
  // Check URL for language prefix (/it/ or /en/)
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    const match = path.match(/^\/(it|en)(\/|$)/)
    if (match) {
      return match[1]
    }
  }

  // Fallback to browser language
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language || navigator.languages?.[0] || 'it'
    return browserLang.startsWith('it') ? 'it' : browserLang.startsWith('en') ? 'en' : 'it'
  }
  return 'it'
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      it: {
        translation: itTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'it',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['navigator'],
      caches: [],
    },
  })

export default i18n
