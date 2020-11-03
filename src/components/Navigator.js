import React, {useState, useEffect, useRef} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
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
import { Button } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

function setNavigatorWidth() {
  let quarterWidth = window.innerWidth / 4;
  if(quarterWidth > 240) {return 240;}
  else {
    if(quarterWidth < 150) { return 150;}
    else {return quarterWidth;}
  }
}
const Navigator = ({appTitle, selectedItem, pullURL, hasSearch}) => {
  const inputRef = useRef();
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
    },
    title: {
      flexGrow: 1
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
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
          <Typography edge="start" variant="h6" noWrap className={classes.title}> 
            {appTitle}
          </Typography>
          {hasSearch && 
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                inputRef={inputRef}
              />
            </div>
          }
          
          {pullURL && <Button color="inherit" onClick={() => pullURL(inputRef.current.value)}><CloudDownloadIcon/>&nbsp; Pull data</Button>}
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
          <Link className={classes.noLink} to="/main">
            <ListItem button key={'Home'} selected={selectedItem === 0}>
              <ListItemIcon><HomeIcon></HomeIcon> </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
          </Link>
          
          <Link className={classes.noLink} to="/main/marketplace">
            <ListItem button key={'Marketplace'} selected={selectedItem === 1}>
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