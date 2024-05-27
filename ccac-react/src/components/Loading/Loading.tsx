import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'

export default function Loading() {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <CircularProgress />
    </Box>
  )
}
