import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, TextField } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
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
  divNewList: {
    margin: 'auto',
    marginBottom: '20px'
  }
});

const DialogMarketplaceSave = ({listItems, removeListItem, ...props}) => {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const [openAddNew, setOpenAddNew] = useState(false);
  const [newList, setNewList] = useState("");

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    

    if(value != "./#addAccount") // unique add account
    {
      onClose(value);
    }else{
      setOpenAddNew(true);
    }
  };

  const handleCloseAddDialog = (bool) => {
    if(!bool){
      setOpenAddNew(false);
    }else {
      setOpenAddNew(false);
      onClose(newList);
      
    }
  }

  return(
    <React.Fragment>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Your bookmark list</DialogTitle>
        <List>
          {listItems.map((items) => (
            <ListItem button onClick={() => handleListItemClick(items.name)} key={items.name}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <DescriptionIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={items.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => removeListItem(items)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}

          <ListItem autoFocus button onClick={() => handleListItemClick('./#addAccount')}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add new bookmark" />
          </ListItem>
        </List>
      </Dialog>
      <Dialog open={openAddNew} onClose={handleCloseAddDialog}
      disableBackdropClick={true}>
        <DialogTitle id="new-list-dialog-title">Add new marketplace list
        </DialogTitle>
        <DialogContent>
          <div className={classes.divNewList}>
            <TextField label="New list" variant="outlined" onChange={(v) => setNewList(v.target.value)} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseAddDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleCloseAddDialog(true)} color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      
    </React.Fragment>
  )
}

export default DialogMarketplaceSave;