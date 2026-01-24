import { Fragment } from 'react'
import { useMediaQuery, useTheme, Button, Typography, Box, Divider, Grid } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import DrawerAppBar from '../AppBar/DrawerAppBar'
import Footer from '../Footer/Footer'
import rassegnaStampaPDF from '../../static/media-coverage/CousCousAColazione_RassegnaStampa.pdf?url'
import rassegnaStampaAlmaPDF from '../../static/media-coverage/CousCousAColazione_RassegnaStampa_Alma.pdf?url'
// Optimized images for display
// @ts-expect-error - vite-imagetools query parameters not recognized by TypeScript
import almaCover from '../../static/images/alma/album_cover.jpg?w=900&format=webp&quality=85'
// @ts-expect-error - vite-imagetools query parameters not recognized by TypeScript
import luceCover from '../../static/images/luce/cover.jpg?w=900&format=webp&quality=85'
// @ts-expect-error - vite-imagetools query parameters not recognized by TypeScript
import pressPhoto from '../../static/images/alma/photopress5.jpg?w=1600&format=webp&quality=85'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../hooks/useLanguage'

const PressKit = () => {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation()
  const { getLocalizedPath } = useLanguage()

  const handleOpenRassegnaStampa = () => {
    window.open(rassegnaStampaPDF, '_blank')
  }

  const handleOpenRassegnaStampaAlma = () => {
    window.open(rassegnaStampaAlmaPDF, '_blank')
  }

  return (
    <Fragment>
      <DrawerAppBar />
      <Box
        sx={{
          minHeight: window.innerHeight,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: matchesSM ? '2em' : '4em',
          paddingTop: '9.5em',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2em',
            width: '100%',
            maxWidth: '800px',
          }}
        >
          <Typography variant="h3" component="h1" align="center">
            {t('pressKit.media')}
          </Typography>
          <Divider sx={{ width: '100%' }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginBottom: '2em',
            }}
          >
            <Box
              sx={{
                maxWidth: matchesSM ? '100%' : '600px',
                width: '100%',
              }}
            >
              <img
                src={pressPhoto}
                alt="CousCous a colazione"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1em',
              width: '100%',
            }}
          >
            <Typography variant="body1" align="left" paragraph>
              {t('pressKit.description1')}
            </Typography>
            <Typography variant="body1" align="left" paragraph>
              {t('pressKit.description2')}
            </Typography>
            <Typography variant="body1" align="left" paragraph>
              {t('pressKit.description3')}
            </Typography>
            <Typography variant="body1" align="left" paragraph>
              {t('pressKit.description4')}
            </Typography>
            <Typography variant="body1" align="left" paragraph>
              {t('pressKit.description5')}
            </Typography>
          </Box>
          <Divider sx={{ width: '100%' }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1em',
              width: '100%',
            }}
          >
            <Typography variant="h4" component="h2" align="left">
              {t('pressKit.timeline')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5em',
                width: '100%',
              }}
            >
              <Typography variant="body1" align="left">
                {t('pressKit.timeline1')}
              </Typography>
              <Typography variant="body1" align="left">
                {t('pressKit.timeline2')}
              </Typography>
              <Typography variant="body1" align="left">
                {t('pressKit.timeline3')}
              </Typography>
              <Typography variant="body1" align="left">
                {t('pressKit.timeline4')}
              </Typography>
              <Typography variant="body1" align="left">
                {t('pressKit.timeline5')}
              </Typography>
              <Typography variant="body1" align="left">
                {t('pressKit.timeline6')}
              </Typography>
              <Typography variant="body1" align="left">
                {t('pressKit.timeline7')}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ width: '100%' }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2em',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  marginBottom: '1em',
                }}
              >
                <Box
                  sx={{
                    maxWidth: matchesSM ? '100%' : '300px',
                    width: '100%',
                  }}
                >
                  <img
                    src={almaCover}
                    alt="Alma Album Cover"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    component={RouterLink}
                    to={getLocalizedPath('/media/alma-presskit')}
                    fullWidth
                  >
                    {t('pressKit.almaPressKit')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    onClick={handleOpenRassegnaStampaAlma}
                    fullWidth
                  >
                    {t('pressKit.almaRassegnaStampa')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  marginBottom: '1em',
                }}
              >
                <Box
                  sx={{
                    maxWidth: matchesSM ? '100%' : '300px',
                    width: '100%',
                  }}
                >
                  <img
                    src={luceCover}
                    alt="Luce EP Cover"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    component={RouterLink}
                    to={getLocalizedPath('/media/luce-presskit')}
                    fullWidth
                  >
                    {t('pressKit.lucePressKit')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    onClick={handleOpenRassegnaStampa}
                    fullWidth
                  >
                    {t('pressKit.luceRassegnaStampa')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Fragment>
  )
}

export default PressKit

