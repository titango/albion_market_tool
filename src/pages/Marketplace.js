import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { Button, IconButton } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SaveIcon from '@material-ui/icons/Save';
import StopIcon from '@material-ui/icons/Stop';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import Snackbar from '@material-ui/core/Snackbar';

import {database} from '../data/local_database';
import {convertDataFromMarketplace, millisecondsToHuman} from '../util/util';
import config from '../config';
import DialogMarketplaceSave from '../components/DialogMarketplaceSave';

import CustomThemeProvider from '../components/CustomThemeProvider';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginTop: 70
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  searchTop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  clearAndSave: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '10px'
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
    
  }
}));

function marketURL(param){
  return (`https://www.albion-online-data.com/api/v2/stats/Prices/${param}?locations=Martlock,Thetford,Fort%20Sterling,Lymhurst,Bridgewatch,Caerleon`)
} 

function iconURL(item_id)
{
  let upId = item_id.toUpperCase();
  return `https://render.albiononline.com/v1/item/${upId}.png`;
}
const orderedCity = [
  "Bridgewatch",
  "Caerleon",
  "Fort Sterling",
  "Lymhurst",
  "Martlock",
  "Thetford"
];

const Marketplace = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [dataDisplay, setDataDisplay] = useState([]);
  const [savedSearch, setSavedSearch] = useState("");
  const [savedSearchList, setSavedSearchList] = useState([]);
  
  // Saved
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    setDataDisplay(database.marketplace);
    axios.post(config.load_market_list)
    .then((v) => {
      console.log("saved list return: ", v);
      setSavedSearchList(v.data.data);
    })
  },[])

  const pullURL = async (value) => {
    console.log("pullURL: ", value);
    if(typeof value != 'undefined' && value && value.name)
    {
      // console.log("value to search: ", value);
      setIsLoading(true);
      await axios.get(marketURL(value.name.toLowerCase())
      ).then((data) => {
        console.log("data got: ", data);
        
        let dataConverted = convertDataFromMarketplace(data.data);
  
        let tryFindMarket = database.marketplace.find((v) => {
          let matched = false;
          dataConverted.forEach((dv) => {
            matched = v.name.toLowerCase() == dv.name;
          });
          return matched;
        });

        if(typeof tryFindMarket == 'undefined')
        {
          dataConverted.forEach((v) => {
            database.marketplace.unshift(v);
          })
        }
        setDataDisplay(database.marketplace);
        setIsLoading(false);
        return Promise.resolve(1);
      })
    }
  }

  const clearData = () => {
    database.marketplace = [];
    setDataDisplay([]);
    setSavedSearch("");
  }

  const saveMarketplaceData = (e) => {
    e.preventDefault();
    console.log("dataDisplay: ", dataDisplay);
    setOpen(true);
  }

  const removeSingleData = (row) => {
    console.log("remove data row: ", row);
    let itemIndex = database.marketplace.findIndex((v) => v.name == row.name);

    console.log("itemIndex: ", itemIndex);
    console.log("db 1: ", database.marketplace);
    if(itemIndex > -1) //found
    {
      database.marketplace.splice(itemIndex, 1);

      console.log("db 2: ", database.marketplace);
      setDataDisplay([...database.marketplace]);
    }
  }

  const handleSavedChange = async (e) => {
    let value = e.target.value;
    setSavedSearch(value);

    let findInSavedList = savedSearchList.find((v) => v.name == value);

    if(typeof findInSavedList != 'undefined')
    {
      database.marketplace = [];
      for(var i =0; i < findInSavedList.data.length; i++)
      {
        let v = findInSavedList.data[i];
        await pullURL(v);
      }
    }
  }

  const handleClosedDialog = (value) => {
    console.log("handle closed dialog: ", value);
    setOpen(false);

    if(value)
    {
      axios.post(config.save_market_list, {name: value, data: dataDisplay})
      .then((v) => {
        setSnackBarOpen(true);
      })
      setSelectedValue(value);
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

  return(
    <CustomThemeProvider appTitle="MarketPlace" selectedItem={1}
      pullURL={pullURL} hasSearch={true} clearFunc={clearData}
      >
        <main className={classes.content}>
        {isLoading && <CircularProgress/>}

          <div>
            <div className={classes.searchTop}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-helper-label">Saved list</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={savedSearch}
                  onChange={handleSavedChange}
                >
                  {
                    savedSearchList.map((savedItem, ind) => {
                      return(
                        <MenuItem value={savedItem.name} key={ind}>
                          <em>{savedItem.name}</em>
                        </MenuItem>
                      )    
                    })
                  }
                </Select>
                {/* <FormHelperText>Saved searched list</FormHelperText> */}
              </FormControl>
              
              <div className={classes.clearAndSave}>
                <Button color="inherit" onClick={() => clearData()}><RotateLeftIcon/>&nbsp; Clear</Button>
                <Button color="primary" variant="contained" onClick={(e) => {saveMarketplaceData(e)}}> <SaveIcon/>&nbsp; Save data</Button>
              </div>
              
            </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
            <colgroup>
                <col width="20%" />
                <col width="11%" />
                <col width="11%" />
                <col width="11%" />
                <col width="11%" />
                <col width="11%" />
                <col width="11%" />
            </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell><div className={classes.tableHeader}>Item name</div></TableCell>
                  <TableCell><div className={classes.tableHeader}><StopIcon style={{'color': 'orange'}}/>Bridgewatch</div></TableCell>
                  <TableCell><div className={classes.tableHeader}><StopIcon style={{'color': 'black'}}/>Caerleon</div></TableCell>
                  <TableCell><div className={classes.tableHeader}><StopOutlinedIcon style={{'color': 'gray'}}/>Fort Sterling</div></TableCell>
                  <TableCell><div className={classes.tableHeader}><StopIcon style={{'color': 'green'}}/>Lymhurst</div></TableCell>
                  <TableCell><div className={classes.tableHeader}><StopIcon style={{'color': 'cornflowerblue'}}/>Martlock</div></TableCell>
                  <TableCell><div className={classes.tableHeader}><StopIcon style={{'color': 'purple'}}/>Thetford</div></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataDisplay.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      <div style={{'display': 'flex', 'alignItems': 'center'}}>
                        <IconButton onClick={() => {removeSingleData(row)}}>
                          <HighlightOffIcon style={{'color': 'darkred'}}/>
                        </IconButton>
                        
                        <img src={iconURL(row.name)} width="45"/>
                        {row.name}
                      </div>
                      
                    </TableCell>
                    {
                    orderedCity.map((cityName, orderedIndex) => {
                      let tryFind = row.data.find(((cityData) => cityData.city == cityName));
                      
                      
                      if(tryFind){

                        let dateDiff = millisecondsToHuman((new Date()).getTime() - (new Date(tryFind.sell_price_min_date + "Z")).getTime());
                        
                        return (
                          <TableCell align="center" key={orderedIndex}>
                            <div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center'}}>
                              <img src="silver_currency.png"/> 
                              <span style={{'marginLeft': '10px', 'fontWeight': 'bold'}}>{tryFind.sell_price_min}</span>
                            </div>
                            <p style={{'color': dateDiff.color}}>{dateDiff.time} ago</p>
                          </TableCell>
                        )
                      }else{
                        return (
                          <TableCell align="center" key={orderedIndex}>N/A</TableCell>
                        )
                      }
                        
                    })
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <DialogMarketplaceSave
          selectedValue={selectedValue} 
          open={open} 
          listItems={savedSearchList}
          onClose={handleClosedDialog} />

          <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          open={snackBarOpen}
          autoHideDuration={3000}
          message="Saved successfully"
          onClose={handleCloseSnackbar}
          >
      </Snackbar>
          </div>
        </main>
      
    </CustomThemeProvider>
  )
}

export default Marketplace;