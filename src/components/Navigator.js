import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

function setNavigatorWidth() {
  let quarterWidth = window.innerWidth / 4;
  if(quarterWidth > 240) {return 240;}
  else {
    if(quarterWidth < 150) { return 150;}
    else {return quarterWidth;}
  }
}
const Navigator = ({appTitle, selectedItem, handleListItemClick}) => {
  const [drawerWidth, setDrawerWidth] = useState(setNavigatorWidth());
  const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      // flexShrink: 0,
      maxWidth: 300,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    noLink: {
      textDecoration: 'none',
      color: 'black'
    }
  }));

  const classes = useStyles();

  useEffect(() => {
    window.addEventListener("resize", function() {
      let resizeWins = setNavigatorWidth();
      setDrawerWidth(resizeWins);
    })
  }, [])

  return(
    <div className="App">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {appTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          <Link className={classes.noLink} to="/main"><ListItem button key={'Home'} selected={selectedItem === 0} 
          onClick={(e) => handleListItemClick(e, 0, 'Home')}>
            <ListItemIcon><HomeIcon></HomeIcon> </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
          </Link>
          <Link className={classes.noLink} to="/main/marketplace">
          <ListItem button key={'Marketplace'} selected={selectedItem === 1}
          onClick={(e) => handleListItemClick(e, 1, 'Marketplace')}>
            <ListItemIcon><StorefrontIcon></StorefrontIcon> </ListItemIcon>
            <ListItemText primary={'Marketplace'} />
          </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  )
}

export default Navigator;