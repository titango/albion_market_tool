import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const DialogMarketplaceSave = (props) => {
  const classes = useStyles();
  const { onClose, listItems, selectedValue, open } = props;

  const [openAddNew, setOpenAddNew] = useState(false);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    setOpenAddNew(true);
    onClose(value);
  };

  return(
    <React.Fragment>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Your market list</DialogTitle>
        <List>
          {listItems.map((items) => (
            <ListItem button onClick={() => handleListItemClick(items.name)} key={items.name}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <DescriptionIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={items.name} />
            </ListItem>
          ))}

          <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItem>
        </List>
      </Dialog>
      <Dialog open={openAddNew}>
          
      </Dialog>
    </React.Fragment>
  )
}

export default DialogMarketplaceSave;