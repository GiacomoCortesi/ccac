import React from 'react'
import { useTheme } from '@mui/material'

const ContentSpacer = () => {
  const theme = useTheme()
  return <div style={{ ...theme.mixins.toolbar, height: 'auto' }} />
}

export default ContentSpacer
