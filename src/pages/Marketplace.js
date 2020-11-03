import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import database from '../data/local_database';
import {convertDataFromMarketplace} from '../util/util';

import CustomThemeProvider from '../components/CustomThemeProvider';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  return (`https://www.albion-online-data.com/api/v2/stats/Prices/${param}?locations=Martlock,Thetford,Fort Sterling,Lymhurst,Bridgewatch,Caerleon`)
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
  const [dataCount, setDataCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  console.log("Marketplaces.js")

  useEffect(() => {
    console.log("try read");
  },[])

  const pullURL = (value) => {
    if(value != "")
    {
      setIsLoading(true);
      axios.get(marketURL(value.toLowerCase())
      ).then((data) => {
        setIsLoading(false);
        database.marketplace = convertDataFromMarketplace(data.data);
        setDataCount(dataCount + 1);
      })
    }
  }

  return(
    <CustomThemeProvider appTitle="MarketPlace" selectedItem={1}
      pullURL={pullURL} hasSearch={true}
      >
        <main className={classes.content}>
        {isLoading && <CircularProgress/>}
        {!isLoading && 
          
          <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Bridgewatch</TableCell>
                  <TableCell>Caerleon</TableCell>
                  <TableCell>Fort Sterling</TableCell>
                  <TableCell>Lymhurst</TableCell>
                  <TableCell>Martlock</TableCell>
                  <TableCell>Thetford</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {database.marketplace.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    {
                    orderedCity.map((cityName, orderedIndex) => {
                      let tryFind = row.data.find(((cityData) => cityData.city == cityName));
                      if(tryFind){
                        return (
                          <TableCell align="center" key={orderedIndex}>{tryFind.sell_price_min}</TableCell>
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