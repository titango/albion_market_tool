import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#455A64",
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#FFC107',
    },
  },
});

/**
 * 
 * @props appTitle - Title bar
 * @props selectedItem - the order of highlighted item from the navigator
 * @props pullURL - the URL to pull when click on search
 * @props hasSearch - Search bar display or not
 * @props clearFunc - Clear search function
 */
const CustomThemeProvider = ({children}) => {
  const classes = useStyles();

  return(
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        {children}
        {/* {(selectedItem == 1) && <Marketplace></Marketplace>}    */}
      </div>
    </ThemeProvider>
  )
}

export default CustomThemeProvider;