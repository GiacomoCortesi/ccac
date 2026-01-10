import { createTheme } from '@mui/material'
import '../App.css'

import TypeWriter from '../static/fonts/zai_SoftItalicTypewriter.ttf'
import STIXTwoMath from '../static/fonts/STIXTwoMath-Regular.ttf'

export const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00A3E2',
    },
    secondary: {
      main: '#0EEAFF',
    },
    text: {
      primary: '#E5E7EB',
      secondary: '#9CA3AF',
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
        @font-face {
          font-family: 'STIXTwoMath';
          src: url(${STIXTwoMath});
        }
      `,
    },
  },
  typography: {
    h1: {
      fontFamily: 'couscous-regular',
    },
    h2: {
      fontFamily: 'couscous-regular',
    },
    h3: {
      fontFamily: 'STIXTwoMath',
    },
    h4: {
      fontFamily: 'couscous-regular',
    },
    h5: {
      fontFamily: 'STIXTwoMath',
    },
    h6: {
      fontFamily: 'STIXTwoMath',
    },
  },
})
