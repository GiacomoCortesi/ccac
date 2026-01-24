import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'
import { Switch, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import ContentSpacer from './ContentSpacer'
import classes from './AppBar.module.css'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../hooks/useLanguage'

const ResponsiveAppBar = () => {
  const { t } = useTranslation()
  const { getLocalizedPath } = useLanguage()

  const pages = [
    { key: 'home', path: '/' },
    { key: 'products', path: '/products' },
  ]

  const handleMenuItemClick = (path: string) => {
    window.location.href = getLocalizedPath(path)
  }
  const [checked, setChecked] = React.useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  return (
    <>
      <AppBar
        style={{ background: 'transparent', boxShadow: 'none' }}
        position='fixed'
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Switch
              sx={{ display: 'none' }}
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  className={classes.link}
                  variant='text'
                  size={'large'}
                  disableRipple
                  key={page.key}
                  onClick={() => handleMenuItemClick(page.path)}
                  sx={{ my: 2, color: 'primary', display: 'block' }}
                >
                  <Typography variant='h4'>{t(`navigation.${page.key}`)}</Typography>
                </Button>
              ))}
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <RouterLink to={getLocalizedPath('/')}>
                <IconButton aria-label={`home button`} disableRipple={true}>
                  <HomeIcon color={'primary'} fontSize={'large'} />
                </IconButton>
              </RouterLink>
            </Box>
            <Box>
              <RouterLink to={getLocalizedPath('/cart')}>
                <IconButton aria-label={`user cart`} disableRipple={true}>
                  <ShoppingCartIcon color={'primary'} fontSize={'large'} />
                </IconButton>
              </RouterLink>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ContentSpacer />
    </>
  )
}
export default ResponsiveAppBar
