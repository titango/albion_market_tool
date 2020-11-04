import React, {Suspense} from 'react';
import {Link } from 'react-router-dom';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import logo from './albion.png';
import './App.css';
import { Button } from '@material-ui/core';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: "rgb(154, 205, 50)",
    '&:hover': {
      backgroundColor: green[700],
    },
    fontWeight: 600
  },
}))(Button);

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <p className="primary-text-color">Albion Online Market Tool</p>
        <Link className="App-link" to="/main">
          <ThemeProvider theme={theme}>
            <ColorButton className="App-button" 
            size="large" color="primary" variant="contained">Get started</ColorButton>
          </ThemeProvider>
        </Link>
        
      </header>
      <div className="App-cover"></div>
    </div>
  );
}

export default App;
