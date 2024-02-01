import {createTheme, responsiveFontSizes} from "@mui/material";
import '../App.css'
// @ts-ignore
import TypeWriter from '../static/fonts/zai_SoftItalicTypewriter.ttf';

export let customTheme = createTheme({
    palette: {
        primary: {
            main: '#b98d1c',
        },
        secondary: {
            main: '#0EEAFF',
        },
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
});

customTheme = responsiveFontSizes(customTheme);

