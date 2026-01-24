import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import Coffee from '../Coffee/Coffee'
import { useMediaQuery, useTheme } from '@mui/material'
import { Fragment } from 'react'
import AppBarSimple from './AppBarSimple'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../hooks/useLanguage'

const drawerWidth = 240

export default function DrawerAppBar() {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'))
  const { t } = useTranslation()
  const { getLocalizedPath } = useLanguage()

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        height: '100%',
        textAlign: 'center',
        marginTop: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 0.5,
      }}
    >
      <RouterLink to={getLocalizedPath('/')} style={{ textDecoration: 'none' }}>
        <Typography
          color={theme.palette.primary.dark}
          variant={'h4'}
          style={{ fontFamily: 'couscous-regular' }}
        >
          {t('navigation.home')}
        </Typography>
      </RouterLink>
      <RouterLink
        style={{ textDecoration: 'none' }}
        to={getLocalizedPath('/video')}
      >
        <Typography
          color={theme.palette.primary.dark}
          variant={'h4'}
          style={{ fontFamily: 'couscous-regular' }}
        >
          {t('navigation.listen')}
        </Typography>
      </RouterLink>
      <RouterLink
        style={{ textDecoration: 'none' }}
        to={getLocalizedPath('/products')}
      >
        <Typography
          color={theme.palette.primary.dark}
          variant={'h4'}
          style={{ fontFamily: 'couscous-regular' }}
        >
          {t('navigation.buy')}
        </Typography>
      </RouterLink>
      <RouterLink
        style={{ textDecoration: 'none' }}
        to={getLocalizedPath('/presskit')}
      >
        <Typography
          color={theme.palette.primary.dark}
          variant={'h4'}
          style={{ fontFamily: 'couscous-regular' }}
        >
          {t('navigation.media')}
        </Typography>
      </RouterLink>
      <RouterLink
        style={{ textDecoration: 'none' }}
        to={getLocalizedPath('/contact')}
      >
        <Typography
          color={theme.palette.primary.dark}
          variant={'h4'}
          style={{ fontFamily: 'couscous-regular' }}
        >
          {t('navigation.contact')}
        </Typography>
      </RouterLink>
      <Box style={{ marginTop: 'auto', marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
        <Coffee />
      </Box>
    </Box>
  )
  return (
    <Fragment>
      {matchesSM && <AppBarSimple />}
      <IconButton
        color='inherit'
        aria-label='open drawer'
        edge='start'
        onClick={handleDrawerToggle}
        sx={{
          mr: 2,
          display: { sm: 'none' },
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 1000,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            backgroundColor: 'rgba(20, 20, 20, 0.85)',
            backgroundImage: 'none',
          },
        }}
      >
        {drawer}
      </Drawer>
    </Fragment>
  )
}
