import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';

import Axios from "axios";

import "../App.css"

import config from "../config";
import CustomThemeProvider from "../components/CustomThemeProvider";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginTop: 70
  },
}));

const Main = () => {
    const classes = useStyles();
    console.log("Main.js");

    useEffect(() => {
      // Load file first time
      // Axios.get(config.reload_file_list_url).then((v) => {
      //   console.log("load file to memory: ", v);
      // })
    },[])

    return (
      <CustomThemeProvider appTitle="Home" selectedItem={0}>
        <main className={classes.content}>
          <div>Test</div>
        </main>
        
      </CustomThemeProvider>
    )
}

export default Main