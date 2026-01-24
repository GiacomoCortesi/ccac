import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLocalizedPath } from '../utils/languageUtils'

export const useLanguage = () => {
  const { lang } = useParams<{ lang: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  
  // Derive current language from URL params, fallback to i18next, then 'it'
  const currentLanguage = lang || i18n.language || 'it'
  
  const setLanguage = (newLang: string) => {
    // Don't change language for admin routes
    if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/login')) {
      return
    }
    const cleanPath = location.pathname.replace(/^\/(it|en)/, '') || '/'
    const newPath = getLocalizedPath(cleanPath, newLang)
    i18n.changeLanguage(newLang)
    navigate(newPath)
  }
  
  const getLocalizedPathHelper = (path: string): string => {
    return getLocalizedPath(path, currentLanguage)
  }
  
  return {
    currentLanguage,
    setLanguage,
    getLocalizedPath: getLocalizedPathHelper,
  }
}
