import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Marketplace = () => {
  const classes = useStyles();

  return(
    <main className={classes.content}>
      
    </main>
  )
}

export default Marketplace;