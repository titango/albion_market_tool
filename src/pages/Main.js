import React, { useState, useEffect } from "react"

import Axios from "axios";

import "../App.css"

import config from "../config";
import CustomThemeProvider from "../components/CustomThemeProvider";

const Main = () => {
    
    console.log("Main.js");

    useEffect(() => {
      // Load file first time
      Axios.get(config.reload_file_list_url).then((v) => {
        console.log("load file to memory: ", v);
      })
    },[])

    return (
      <CustomThemeProvider appTitle="Home" selectedItem={0}>
        <div>Test</div>
      </CustomThemeProvider>
    )
}

export default Main