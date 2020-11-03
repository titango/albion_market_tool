import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Navigator from "../components/Navigator"

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

const CustomThemeProvider = ({children, appTitle, selectedItem, pullURL, hasSearch}) => {
  const classes = useStyles();

  return(
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Navigator 
          appTitle={appTitle}
          selectedItem={selectedItem}
          pullURL={pullURL} 
          hasSearch={hasSearch}></Navigator> 

        {children}
        {/* {(selectedItem == 1) && <Marketplace></Marketplace>}    */}
      </div>
    </ThemeProvider>
  )
}

export default CustomThemeProvider;