import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { Box } from '@mui/material'
import NotFound from '../../static/not-found.jpeg'
import GenericError from '../../static/generic-error.jpeg'
import DrawerAppBar from '../AppBar/DrawerAppBar'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

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
      {isRouteErrorResponse(error) && error.status === 404 ? (
        <>
          The page you are looking for cannot be found!
          <img
            src={`${NotFound}?fit=crop&auto=format`}
            alt={'page not found'}
            style={{ maxWidth: 350, maxHeight: 350 }}
          />
        </>
      ) : (
        <>
          Oops!
          <br />
          Sorry, an unexpected error has occurred.
          <img
            src={`${GenericError}?fit=crop&auto=format`}
            alt={'page not found'}
            style={{ maxWidth: 350, maxHeight: 350 }}
          />
        </>
      )}
    </Box>
  )
}
