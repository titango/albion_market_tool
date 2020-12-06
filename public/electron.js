const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const fs = require("fs");
const isDev = require("electron-is-dev");
const express = require('express');
const app2 = express();
const bodyParser = require('body-parser');
const lib = require("./lib");
const cors = require("cors");
const { simplifyList } = require("./lib");

let mainWindow;
function createWindow() {
    // mainWindow = new BrowserWindow({ 
    //     width: 1200, 
    //     height: 800,
    //     icon: ""
    // });

    mainWindow = new BrowserWindow({ 
      width: 1500, 
      height: 800,
      icon: ""
  });
    // mainWindow.setResizable(false);

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
app2.use(bodyParser.json());

app2.get('/simplify', async (req, res, next) =>   {
  console.log('Simplifying.......');
  const dataRead = await simplifyList();
  console.log("Success simplifying...");
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

// WRITE FILE
// MARKETPLACE

app2.post('/saveFileMarketplace', async (req, res, next) =>   {
  console.log("file received body: ", req.body);

  let requestName = req.body.name;
  let requestData = req.body.data;
  let marketPath = './marketplace_data.json';

  let JsonData = []; // in case no file
  let writeNew = false;

  const fileData = fs.readFileSync(path.resolve(__dirname, marketPath),'utf-8');
  if(fileData)
  {
    JsonData = JSON.parse(fileData);
    let findElement = JsonData.find((v) => v.name == requestName);
    if(typeof findElement != 'undefined')
    {
      findElement.data = requestData;
    }else{
      writeNew = true;
    }
  }else { // Just write new
    writeNew = true;
  }

  if(writeNew)
  {
    JsonData.push({name: requestName, data: requestData});
  }

  await fs.writeFileSync(path.resolve(__dirname, marketPath), JSON.stringify(JsonData));
  res.status(200).jsonp({status: 'success'});
});

app2.post('/loadFileMarketplace', async(req, res, next) => {
  let marketPath = './marketplace_data.json';

  const fileData = fs.readFileSync(path.resolve(__dirname, marketPath),'utf-8');
  let JsonData = [];
  if(fileData)
  {
    JsonData = JSON.parse(fileData);
  }
  res.status(200).jsonp({data: JsonData});
});

app2.post('/removeItemMarketplace', async(req, res, next) => {
  let marketPath = './marketplace_data.json';
  let requestName = req.body.name;
  const fileData = fs.readFileSync(path.resolve(__dirname, marketPath),'utf-8');
  let JsonData = [];
  if(fileData)
  {
    JsonData = JSON.parse(fileData);
  }

  let tryFindIndex = JsonData.findIndex((v) => requestName == v.name);
  if(tryFindIndex >= 0)
  {
    JsonData.splice(tryFindIndex, 1);
  }
  
  await fs.writeFileSync(path.resolve(__dirname, marketPath), JSON.stringify(JsonData));
  res.status(200).jsonp({data: JsonData});
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