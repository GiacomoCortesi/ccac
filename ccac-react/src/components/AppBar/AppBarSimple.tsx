import React, { Fragment } from 'react'
import { Link, Typography, useMediaQuery, useTheme } from '@mui/material'
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
              variant={matchesMD ? 'h5' : 'h3'}
              className={classes.topleft}
              style={{ fontFamily: 'ntseawave', fontWeight: 'bold' }}
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
              }}
            >
              <Coffee />
            </Box>
            <RouterLink to={'/products'}>
              <Typography
                color={theme.palette.primary.light}
                variant={matchesMD ? 'h5' : 'h3'}
                className={classes.bottomleft}
                style={{ fontFamily: 'ntseawave', fontWeight: 'bold' }}
              >
                COMPRA
              </Typography>
            </RouterLink>
            <Link
              color={theme.palette.primary.light}
              target='_blank'
              href={'https://linktr.ee/couscousacolazioneluce'}
              underline={'none'}
              variant={matchesMD ? 'h5' : 'h3'}
              className={classes.bottomright}
              style={{ fontFamily: 'ntseawave', fontWeight: 'bold' }}
            >
              ASCOLTA
            </Link>
            <RouterLink to={'/contact'}>
              <Typography
                color={theme.palette.primary.dark}
                variant={matchesMD ? 'h5' : 'h3'}
                className={classes.topright}
                style={{ fontFamily: 'ntseawave', fontWeight: 'bold' }}
              >
                CONTATTI
              </Typography>
            </RouterLink>
            <Link
              color={theme.palette.primary.dark}
              target={'_blank'}
              href={'https://rcwaves.it/couscousacolazione2024'}
              underline={'none'}
              variant={matchesMD ? 'h5' : 'h3'}
              className={classes.topleft}
              style={{ fontFamily: 'ntseawave', fontWeight: 'bold' }}
            >
              PRESSKIT
            </Link>
          </Fragment>
        )}
      </Fragment>
      <Footer />
    </Fragment>
  )
}

export default AppBarSimple
