import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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

const CityTrading = () => {
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);

  console.log("Marketplaces.js")

  useEffect(() => {
    console.log("try read");
    
  },[])

  return(
    <main className={classes.content}>
      <div>
        <List>
          {
            <ListItem button>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          }
        </List>
      </div>
    </main>
  )
}

export default CityTrading;