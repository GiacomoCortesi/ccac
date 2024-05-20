import React from 'react'
import { MailOutline } from '@mui/icons-material'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'
import { Variant } from '@mui/material/styles/createTypography'
import { TypographyPropsVariantOverrides } from '@mui/material/Typography/Typography'
interface ContactMailProps {
  variant: OverridableStringUnion<
    Variant | 'inherit',
    TypographyPropsVariantOverrides
  >
}
const ContactMail = (props: ContactMailProps) => {
  return (
    <Box sx={{ margin: 1.25, display: 'flex', alignItems: 'center' }}>
      <MailOutline />
      <Typography variant={props.variant} sx={{ margin: 1.25 }}>
        mail: couscousacolazione@gmail.com
      </Typography>
    </Box>
  )
}

export default ContactMail
