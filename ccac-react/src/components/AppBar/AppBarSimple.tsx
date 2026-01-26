import React, { Fragment } from 'react'
import { Typography, useMediaQuery, useTheme } from '@mui/material'
import Footer from '../Footer/Footer'
import { Link as RouterLink, useLocation } from 'react-router-dom/'
import classes from './AppBarSimple.module.css'
import Coffee from '../Coffee/Coffee'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../hooks/useLanguage'
import { getPathWithoutLanguage } from '../../utils/languageUtils'

const AppBarSimple = () => {
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useTranslation()
  const { getLocalizedPath } = useLanguage()
  const location = useLocation()
  const cleanPath = getPathWithoutLanguage(location.pathname)
  const isHomePage = cleanPath === '/' || cleanPath === '/home'
  const isMediaChildPage = (cleanPath.startsWith('/media/') && cleanPath !== '/media') || 
                           (cleanPath.startsWith('/presskit/') && cleanPath !== '/presskit')

  return (
    <Fragment>
      <Fragment>
        {!isHomePage ? (
          <RouterLink to={isMediaChildPage ? getLocalizedPath('/media') : getLocalizedPath('/')}>
            <Typography
              color={theme.palette.primary.light}
              variant={matchesMD ? 'h4' : 'h3'}
              className={classes.topleft}
              style={{ fontFamily: 'couscous-regular' }}
            >
              {isMediaChildPage ? t('navigation.media') : t('navigation.home')}
            </Typography>
          </RouterLink>
        ) : (
          <Fragment>
            <Box
              sx={{
                position: 'fixed',
                top: 20,
                width: 170,
                right: window.innerWidth / 2 - 85,
                zIndex: 1000,
              }}
            >
              <Coffee />
            </Box>
            <RouterLink to={getLocalizedPath('/products')}>
              <Typography
                color={theme.palette.primary.dark}
                variant={matchesMD ? 'h4' : 'h3'}
                className={classes.bottomleft}
                style={{ fontFamily: 'couscous-regular' }}
              >
                {t('navigation.buy')}
              </Typography>
            </RouterLink>
            <RouterLink to={getLocalizedPath('/video')}>
              <Typography
                color={theme.palette.primary.dark}
                variant={matchesMD ? 'h4' : 'h3'}
                className={classes.bottomright}
                style={{ fontFamily: 'couscous-regular' }}
              >
                {t('navigation.listen')}
              </Typography>
            </RouterLink>
            <RouterLink to={getLocalizedPath('/contact')}>
              <Typography
                color={theme.palette.primary.dark}
                variant={matchesMD ? 'h4' : 'h3'}
                className={classes.topright}
                style={{ fontFamily: 'couscous-regular' }}
              >
                {t('navigation.contact')}
              </Typography>
            </RouterLink>
            <RouterLink to={getLocalizedPath('/media')}>
              <Typography
                color={theme.palette.primary.dark}
                variant={matchesMD ? 'h4' : 'h3'}
                className={classes.topleft}
                style={{ fontFamily: 'couscous-regular' }}
              >
                {t('navigation.media')}
              </Typography>
            </RouterLink>
          </Fragment>
        )}
      </Fragment>
      <Footer />
    </Fragment>
  )
}

export default AppBarSimple
