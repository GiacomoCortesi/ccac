import React from 'react'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
function Coffee() {
  return (
    <Button
      target='_blank'
      href='https://www.buymeacoffee.com/couscousacolazione'
    >
      <img
        src='https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg'
        alt='Buy me a coffee'
      />
      <Typography>BUY US BEER</Typography>
    </Button>
  )
}

export default Coffee
