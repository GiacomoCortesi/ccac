import { CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './Router'
import { customTheme } from './global/CustomTheme'
import './i18n/config'

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
