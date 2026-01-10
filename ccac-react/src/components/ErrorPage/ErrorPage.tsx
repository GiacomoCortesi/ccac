import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import NotFound from '../../static/not-found.jpeg'
import GenericError from '../../static/generic-error.jpeg'
import DrawerAppBar from '../AppBar/DrawerAppBar'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  const is404 = isRouteErrorResponse(error) && error.status === 404

  return (
    <Box
      style={{
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <DrawerAppBar />
      {is404 ? (
        <>
          <Typography variant="h5" sx={{ marginBottom: '1em', textAlign: 'center' }}>
            The page you are looking for cannot be found!
          </Typography>
          <img
            src={`${NotFound}?fit=crop&auto=format`}
            alt={'page not found'}
            style={{ maxWidth: 350, maxHeight: 350 }}
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </Box>
  )
}
