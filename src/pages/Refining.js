import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import CustomThemeProvider from '../components/CustomThemeProvider';
import Navigator from '../components/Navigator';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    backgroundColor: "white",
    padding: theme.spacing(3),
    marginTop: 70
  },
}));

const Refining = () => {
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);

  console.log("Refining.js")

  useEffect(() => {
    console.log("try read");
    
  },[])

  return(
    <CustomThemeProvider >
      <Navigator appTitle="Refining" selectedItem={2}
      hasSearch={false}></Navigator>
        <main className={classes.content}>

        </main>
    </CustomThemeProvider>
  )
}

export default Refining;