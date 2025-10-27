import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Typography, IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import ContentSpacer from './ContentSpacer'
import classes from './AppBar.module.css'
import { logout } from '../../firebase/firebase'

const AdminAppBar = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <>
      <AppBar
        style={{ background: 'transparent', boxShadow: 'none' }}
        position='fixed'
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                className={classes.link}
                variant='text'
                size={'large'}
                disableRipple
                onClick={() => navigate('/admin/warehouse')}
                sx={{ my: 2, color: 'primary', display: 'block' }}
              >
                <Typography variant='h5'>Warehouse</Typography>
              </Button>
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <RouterLink to={`/`}>
                <IconButton aria-label={`home button`} disableRipple={true}>
                  <HomeIcon color={'primary'} fontSize={'large'} />
                </IconButton>
              </RouterLink>
            </Box>
            <Box>
              <IconButton 
                aria-label={`logout button`} 
                disableRipple={true}
                onClick={handleLogout}
              >
                <LogoutIcon color={'primary'} fontSize={'large'} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ContentSpacer />
    </>
  )
}

export default AdminAppBar
