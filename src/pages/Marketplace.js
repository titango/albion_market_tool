import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import {database} from '../data/local_database';
import {convertDataFromMarketplace, millisecondsToHuman} from '../util/util';

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
}));


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

let rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
  const [dataDisplay, setDataDisplay] = useState([]);

  // console.log("Marketplaces.js")

  useEffect(() => {
    setDataDisplay(database.marketplace);
  },[])

  const pullURL = (value) => {
    if(typeof value != 'undefined' && value && value.name)
    {
      // console.log("value to search: ", value);
      setIsLoading(true);
      axios.get(marketURL(value.name.toLowerCase())
      ).then((data) => {
        console.log("data got: ", data);
        
        let dataConverted = convertDataFromMarketplace(data.data);
  
        console.log("database.marketplace: ", database.marketplace);
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
            database.marketplace.push(v);
          })
        }
        // setTimeout(() => {
          setDataDisplay(database.marketplace);
          setIsLoading(false);
        // },1000)
        
      })
    }
  }

  const clearData = () => {
    database.marketplace = [];
    setDataDisplay([]);
  }

  return(
    <CustomThemeProvider appTitle="MarketPlace" selectedItem={1}
      pullURL={pullURL} hasSearch={true} clearFunc={clearData}
      >
        <main className={classes.content}>
        {isLoading && <CircularProgress/>}
        {!isLoading && 
          
          <div>
          <Button color="inherit" onClick={() => clearData()}><RotateLeftIcon/>&nbsp; Clear</Button>
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
                  <TableCell><div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center'}}>Name</div></TableCell>
                  <TableCell><div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center'}}>Bridgewatch</div></TableCell>
                  <TableCell><div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center'}}>Caerleon</div></TableCell>
                  <TableCell><div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center'}}>Fort Sterling</div></TableCell>
                  <TableCell><div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center'}}>Lymhurst</div></TableCell>
                  <TableCell><div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center'}}>Martlock</div></TableCell>
                  <TableCell><div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center'}}>Thetford</div></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataDisplay.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      <div style={{'display': 'flex', 'alignItems': 'center'}}>
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
                              <span style={{'marginLeft': '10px'}}>{tryFind.sell_price_min}</span>
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
          </div>
        }
        </main>
      
    </CustomThemeProvider>
  )
}

export default Marketplace;