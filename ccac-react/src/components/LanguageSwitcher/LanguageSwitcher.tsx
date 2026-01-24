import { Button, ButtonGroup } from '@mui/material'
import { useLanguage } from '../../hooks/useLanguage'
import { useTranslation } from 'react-i18next'

export const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage } = useLanguage()
  const { i18n } = useTranslation()

  const handleLanguageChange = (lang: string) => {
    if (lang !== currentLanguage) {
      setLanguage(lang)
    }
  }

  return (
    <ButtonGroup variant="outlined" size="small">
      <Button
        variant={currentLanguage === 'it' ? 'contained' : 'outlined'}
        onClick={() => handleLanguageChange('it')}
      >
        IT
      </Button>
      <Button
        variant={currentLanguage === 'en' ? 'contained' : 'outlined'}
        onClick={() => handleLanguageChange('en')}
      >
        EN
      </Button>
    </ButtonGroup>
  )
}
