import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import NotFound from '../../static/not-found.jpeg'
import GenericError from '../../static/generic-error.jpeg'
import DrawerAppBar from '../AppBar/DrawerAppBar'
import { useTranslation } from 'react-i18next'

export default function ErrorPage() {
  const error = useRouteError()
  const { t } = useTranslation()
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
            {t('error.notFound')}
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
            {t('error.oops')}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '1em', textAlign: 'center' }}>
            {t('error.unexpectedError')}
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
