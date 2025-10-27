import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, logInWithEmailAndPassword } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import classes from './Login.module.css'
import { Link, Box, TextField, Button } from '@mui/material'
import AppBar from '../AppBar/AppBar'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    // Redirect authenticated users to admin warehouse
    if (user) navigate('/admin/warehouse')
  }, [user, loading, navigate])
  return (
    <>
      <AppBar />
      <Box className={classes.container}>
        <TextField
          id='email'
          label='e-mail'
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value)
          }}
        />
        <TextField
          id='password'
          type='password'
          value={password}
          margin='normal'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
          label='Password'
        />
        <Box className={classes.btncont}>
          <Button
            className={classes.button}
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Login
          </Button>
        </Box>
        <Link href='/reset' underline='none'>
          Forgot Password
        </Link>
        <p>
          Dont have an account?{' '}
          <Link href='/register' underline='none'>
            Register
          </Link>{' '}
          now.
        </p>
      </Box>
    </>
  )
}
export default Login
