import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function setNavigatorWidth() {
  let quarterWidth = window.innerWidth / 4;
  if(quarterWidth > 240) {return 240;}
  else {
    if(quarterWidth < 150) { return 150;}
    else {return quarterWidth;}
  }
}
const Navigator = () => {
  const [drawerWidth, setDrawerWidth] = useState(setNavigatorWidth());
  const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      maxWidth: 300
    },
    drawerPaper: {
      width: drawerWidth,
    },
  }));

  const classes = useStyles();
  

  useEffect(() => {
    window.addEventListener("resize", function() {
      let resizeWins = setNavigatorWidth();
      console.log("resizeWins: ", resizeWins)
      setDrawerWidth(resizeWins);
    })
  }, [])

  console.log(window.innerWidth);
  return(
    <div className="App">
    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Home'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
}

export default Navigator;