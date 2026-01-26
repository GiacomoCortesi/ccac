import { Outlet, useParams, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Layout component that handles language initialization for language-prefixed routes
 */
export const LanguageLayout = () => {
  const { lang } = useParams<{ lang: string }>()
  const location = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (lang && (lang === 'it' || lang === 'en')) {
      i18n.changeLanguage(lang)
    }
  }, [lang, i18n])

  // Redirect to default language if invalid language
  if (lang && lang !== 'it' && lang !== 'en') {
    // If lang is invalid, it means the path matched /:lang where lang is actually a route path
    // Preserve the entire pathname and prepend /it
    // e.g., /presskit -> /it/presskit, /presskit/alma-presskit -> /it/presskit/alma-presskit
    const pathAfterSlash = location.pathname.slice(1) // Remove leading /
    return <Navigate to={`/it/${pathAfterSlash}`} replace />
  }

  return <Outlet />
}
