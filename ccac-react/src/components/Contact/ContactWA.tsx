import { WhatsApp } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { TypographyPropsVariantOverrides } from '@mui/material/Typography/Typography'
import { Variant } from '@mui/material/styles/createTypography'
import { OverridableStringUnion } from '@mui/types'
import { useTranslation } from 'react-i18next'

interface ContactWAProps {
  variant: OverridableStringUnion<
    Variant | 'inherit',
    TypographyPropsVariantOverrides
  >
}
const ContactWA = (props: ContactWAProps) => {
  const { t } = useTranslation()
  return (
    <Box sx={{ margin: 1.25, display: 'flex', alignItems: 'center' }}>
      <WhatsApp />
      <Typography variant={props.variant} sx={{ margin: 1.25 }}>
        {t('contact.whatsapp')} +39 3391348111
      </Typography>
    </Box>
  )
}

export default ContactWA
