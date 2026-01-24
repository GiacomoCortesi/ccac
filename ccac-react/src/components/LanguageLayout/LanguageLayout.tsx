import { Outlet, useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Layout component that handles language initialization for language-prefixed routes
 */
export const LanguageLayout = () => {
  const { lang } = useParams<{ lang: string }>()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (lang && (lang === 'it' || lang === 'en')) {
      i18n.changeLanguage(lang)
    }
  }, [lang, i18n])

  // Redirect to default language if invalid language
  if (lang && lang !== 'it' && lang !== 'en') {
    const browserLang = navigator.language || navigator.languages?.[0] || 'it'
    const defaultLang = browserLang.startsWith('it') ? 'it' : browserLang.startsWith('en') ? 'en' : 'it'
    return <Navigate to={`/${defaultLang}`} replace />
  }

  return <Outlet />
}
