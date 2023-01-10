import React from 'react';
import './App.css';
import {RouterProvider} from 'react-router-dom';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {customTheme} from "./global/CustomTheme";
import {router} from "./Router";

function App() {
  return (
          <ThemeProvider theme={customTheme}>
              <CssBaseline />
              <RouterProvider router={router} />
          </ThemeProvider>
  );
}

export default App;
