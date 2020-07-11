const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const fs = require("fs");
const isDev = require("electron-is-dev");
const express = require('express');
const app2 = express();
const lib = require("./lib");
const cors = require("cors");

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 1200, 
        height: 800,
        icon: ""
    });
     

    mainWindow.loadURL(
        isDev
        ? "http://localhost:4567"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
}

let readFileMem = [];

var corsOptions = {
  origin: 'http://localhost:4567',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app2.use(cors(corsOptions));

app2.get('/simplify', async (req, res, next) =>   {
  console.log('Simplifying.......');
  const dataRead = await simplifyList();
  return res.jsonp({status: "success"});
});

app2.get('/nameList', async (req, res, next) =>   {
  console.log('Returning file list');
  return res.jsonp({data: readFileMem});
});

app2.get('/loadFile', async (req, res, next) =>   {
  console.log('Loading file list');
  let tryRead = await lib.readFileList();
  if(tryRead)
  {
    readFileMem = tryRead;
  }
  return res.jsonp({status: 'success'});
});

app2.listen(5123, function () {
  console.log('Data app listening on port 5123!');
});

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
    app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
    createWindow();
    }
});