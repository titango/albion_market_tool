import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles,useTheme } from '@material-ui/core/styles';
import { Link } from "react-router-dom"

import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { VariableSizeList } from 'react-window';
import { Typography } from '@material-ui/core';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';


import {simplified_list} from "../data/local_database";

const useStylesListBox = makeStyles({
  listbox: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    }
  },
});

//  VIRTUALIZATION
const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 64 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 1.5 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

function setNavigatorWidth() {
  let quarterWidth = window.innerWidth / 4;
  if(quarterWidth > 240) {return 240;}
  else {
    if(quarterWidth < 150) { return 150;}
    else {return quarterWidth;}
  }
}

const options = simplified_list.map((option) => {
  const firstLetter = option.local_name.substr(0,1).toUpperCase();
  return {
    firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    ...option,
  };
});

const Navigator = ({children, appTitle, selectedItem, pullURL, hasSearch}) => {
  
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
    }
  }));
  const classes = useStyles();
  const classesListBox = useStylesListBox();

  useEffect(() => {
    window.addEventListener("resize", function() {
      let resizeWins = setNavigatorWidth();
      setDrawerWidth(resizeWins);
    })

    // Window listen keydown but not sure because need to click from list
    // if(pullURL)
    // {
    //   console.log("addEventListener keydown");
    //   document.addEventListener("keyup", function (event) { 
    //     if (event.defaultPrevented) {
    //       return; // Should do nothing if the default action has been cancelled
    //     }
    //     var key = event.key || event.keyCode;

    //     if (key === "Enter"){
    //       console.log("hit enter;");
    //       pullURL(inputRef.current.value);
    //     }
    //   })
    // }
  }, [])

  const clearSearch = () => {

  }

  return(
    <div className="App">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography edge="start" variant="h6" noWrap> 
            {appTitle}
          </Typography>
          {hasSearch && 
            
            <div className={classes.search}>
              {/* <div className={classes.searchIcon}>
                <SearchIcon />
              </div> */}
              <Autocomplete
                id="autocomplete-search"
                style={{ width: 600 }}
                disableListWrap
                classes={classesListBox}
                ListboxComponent={ListboxComponent}
                renderGroup={renderGroup}
                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.local_name + " (" + option.name + ")"}
                renderInput={(params) => {
                  return(<TextField {...params} label="Search" variant="outlined" inputRef={inputRef}/>)
                }}
                renderOption={(option, { inputValue }) => {
                  const matches = match(option.local_name + " (" + option.name + ")", inputValue);
                  const parts = parse(option.local_name + " (" + option.name + ")", matches);
                  
                  return (
                    <div>
                      {parts.map((part, index) => (
                        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                          {part.text}
                        </span>
                      ))}
                    </div>
                  );
                }}
                onChange={(event, newValue) => {
                  pullURL(newValue)
                }}
              />
              {/* <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                inputRef={inputRef}
              /> */}
            </div>
          }
          
          {/* {clearSearch && <Button color="inherit" onClick={() => clearSearch()}><RotateLeftIcon/>&nbsp; Submit</Button>} */}
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

          <Link className={classes.noLink} to="/main/refining">
            <ListItem button key={'Marketplace'} selected={selectedItem === 2}>
              <ListItemIcon><AccountTreeIcon></AccountTreeIcon> </ListItemIcon>
              <ListItemText primary={'Refining'} />
            </ListItem>
          </Link>
          
          
        </List>
      </Drawer>
    </div>
  )
}

export default Navigator;