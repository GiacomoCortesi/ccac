/**
 * Get the language from the current URL path
 */
export const getLanguageFromPath = (path: string): string => {
  const match = path.match(/^\/(it|en)(\/|$)/)
  return match ? match[1] : 'it'
}

/**
 * Get the path without the language prefix
 */
export const getPathWithoutLanguage = (path: string): string => {
  return path.replace(/^\/(it|en)(\/|$)/, '/').replace(/\/$/, '') || '/'
}

/**
 * Get localized path with language prefix
 */
export const getLocalizedPath = (path: string, lang: string): string => {
  // Remove leading slash and language prefix if present
  const cleanPath = path.replace(/^\/(it|en)(\/|$)/, '/').replace(/\/$/, '') || '/'
  
  // Don't add language prefix for admin routes
  if (cleanPath.startsWith('/admin') || cleanPath.startsWith('/login')) {
    return cleanPath
  }
  
  // Add language prefix
  return `/${lang}${cleanPath === '/' ? '' : cleanPath}`
}

/**
 * Extract language from URL and return both language and clean path
 */
export const parseLocalizedPath = (path: string): { lang: string; path: string } => {
  const lang = getLanguageFromPath(path)
  const cleanPath = getPathWithoutLanguage(path)
  return { lang, path: cleanPath }
}
