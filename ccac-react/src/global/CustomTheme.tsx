import { createTheme } from '@mui/material'
import '../App.css'

import TypeWriter from '../static/fonts/zai_SoftItalicTypewriter.ttf'

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#b98d1c',
    },
    secondary: {
      main: '#0EEAFF',
    },
  },
  mixins: {
    toolbar: { minHeight: 80 },
  },
  // add local typewriter font and overwrite typography default roboto font
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'TypeWriter';
          src: url(${TypeWriter});
        }
      `,
    },
  },
  typography: {
    fontWeightRegular: 'bold',
    fontFamily: 'TypeWriter',
  },
})
