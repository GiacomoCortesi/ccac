import { useNavigate } from 'react-router-dom'
import { useLanguage } from './useLanguage'

/**
 * Hook that provides navigation with automatic language prefix
 */
export const useLocalizedNavigate = () => {
  const navigate = useNavigate()
  const { getLocalizedPath } = useLanguage()

  return (to: string, options?: { replace?: boolean; state?: any }) => {
    const localizedPath = getLocalizedPath(to)
    navigate(localizedPath, options)
  }
}
