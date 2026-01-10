import { Box, Typography } from '@mui/material'
import GenericError from '../../static/generic-error.jpeg'

interface ErrorDisplayProps {
  error?: any
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null

  console.error(error)

  return (
    <Box
      style={{
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        padding: '2em',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '1em', textAlign: 'center' }}>
        Oops!
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '1em', textAlign: 'center' }}>
        Sorry, an unexpected error has occurred.
      </Typography>
      <img
        src={`${GenericError}?fit=crop&auto=format`}
        alt={'error'}
        style={{ maxWidth: 350, maxHeight: 350 }}
      />
    </Box>
  )
}
