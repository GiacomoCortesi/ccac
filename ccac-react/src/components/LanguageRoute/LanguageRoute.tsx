import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLanguageFromPath, getLocalizedPath } from '../../utils/languageUtils'

interface LanguageRouteProps {
  children: React.ReactNode
}

/**
 * Component that ensures the current route has a language prefix
 * and redirects to the appropriate language if missing
 */
export const LanguageRoute: React.FC<LanguageRouteProps> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  useEffect(() => {
    const path = location.pathname
    
    // Skip language handling for admin and login routes
    if (path.startsWith('/admin') || path.startsWith('/login')) {
      return
    }

    // Check if path already has language prefix
    const lang = getLanguageFromPath(path)
    
    if (!lang || (lang !== 'it' && lang !== 'en')) {
      // No language prefix or invalid language, redirect to default
      const browserLang = navigator.language || navigator.languages?.[0] || 'it'
      const defaultLang = browserLang.startsWith('it') ? 'it' : browserLang.startsWith('en') ? 'en' : 'it'
      const cleanPath = path === '/' ? '' : path.replace(/^\//, '')
      const newPath = `/${defaultLang}${cleanPath ? `/${cleanPath}` : ''}`
      navigate(newPath, { replace: true })
    } else {
      // Update i18n language if needed
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang)
      }
    }
  }, [location.pathname, navigate, i18n])

  return <>{children}</>
}
