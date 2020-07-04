import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Link } from "react-router-dom"
import "../App.css"
import Navigator from "../components/Navigator"
import Marketplace from "./Marketplace";

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  }
}));

const Main = () => {
    const classes = useStyles();
    const [selectedItem, setSelectedItem] = useState(0);
    const [appTitle, setAppTitle] = useState("Home")

    console.log("Main")
    const handleListItemClick = (event, index, appTitle) => {
      setSelectedItem(index);
      setAppTitle(appTitle);
    }
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Navigator 
            appTitle={appTitle}
            selectedItem={selectedItem}
            handleListItemClick={handleListItemClick}></Navigator>      

          {(selectedItem == 1) && <Marketplace></Marketplace>}   
        </div>
      </ThemeProvider>
    )
}

export default Main