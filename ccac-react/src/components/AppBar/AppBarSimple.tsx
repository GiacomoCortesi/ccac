import React, { Fragment } from 'react'
import { Typography, useMediaQuery, useTheme } from '@mui/material'
import Footer from '../Footer/Footer'
import { Link as RouterLink } from 'react-router-dom/'
import classes from './AppBarSimple.module.css'
import Coffee from '../Coffee/Coffee'
import Box from '@mui/material/Box'

const AppBarSimple = () => {
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Fragment>
      <Fragment>
        {window.location.pathname !== '/' &&
        window.location.pathname !== '/home' ? (
          <RouterLink to='/'>
            <Typography
              color={theme.palette.primary.light}
              variant={matchesMD ? 'h4' : 'h3'}
              className={classes.topleft}
              style={{ fontFamily: 'couscous-regular' }}
            >
              HOME
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
            <RouterLink to={'/products'}>
              <Typography
                color={theme.palette.primary.dark}
                variant={matchesMD ? 'h4' : 'h3'}
                className={classes.bottomleft}
                style={{ fontFamily: 'couscous-regular' }}
              >
                COMPRA
              </Typography>
            </RouterLink>
            <RouterLink to={'/video'}>
              <Typography
                color={theme.palette.primary.dark}
                variant={matchesMD ? 'h4' : 'h3'}
                className={classes.bottomright}
                style={{ fontFamily: 'couscous-regular' }}
              >
                ASCOLTA
              </Typography>
            </RouterLink>
            <RouterLink to={'/contact'}>
              <Typography
                color={theme.palette.primary.dark}
                variant={matchesMD ? 'h4' : 'h3'}
                className={classes.topright}
                style={{ fontFamily: 'couscous-regular' }}
              >
                CONTATTI
              </Typography>
            </RouterLink>
            <RouterLink to={'/presskit'}>
              <Typography
                color={theme.palette.primary.dark}
                variant={matchesMD ? 'h4' : 'h3'}
                className={classes.topleft}
                style={{ fontFamily: 'couscous-regular' }}
              >
                MEDIA
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
