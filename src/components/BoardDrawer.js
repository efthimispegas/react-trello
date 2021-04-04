import React, { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArchiveIcon from  '@material-ui/icons/Archive';
import ChevronLeftIcon from  '@material-ui/icons/ChevronLeft';
import { Drawer, List, ListItem, ListItemText, Divider, Button } from '@material-ui/core';
import ArchivedLists from './ArchivedLists';
import ArchivedCards from './ArchivedCards';

import useStyles from '../utils/drawerStyles';

const BoardDrawer = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ viewingArchivedLists, setViewingArchivedLists ]= useState(false);
  const [ viewingArchivedCards, setViewingArchivedCards ]= useState(false);

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant='outlined'
        className={open ? classes.hide : classes.showMenuButton}
      >
        <MoreHorizIcon fontSize='small' /> Show Menu
      </Button>
      <Drawer
        className={open ? classes.drawer : classes.hide}
        variant='persistent'
        anchor='right'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {!viewingArchivedLists && !viewingArchivedCards ? (
          <div>
            <div className={classes.drawerHeader}>
              <h3>Menu</h3>
              <Button onClick={() => setOpen(false)}>
                <CloseIcon />
              </Button>
            </div>
            <Divider />
            <List>
              <ListItem button onClick={() => setViewingArchivedLists(true)}>
                <ListItemIcon>
                  <ArchiveIcon />
                </ListItemIcon>
                <ListItemText primary={'Archived Lists'} />
              </ListItem>
              <ListItem button onClick={() => setViewingArchivedCards(true)}>
                <ListItemIcon>
                  <ArchiveIcon />
                </ListItemIcon>
                <ListItemText primary={'Archived Cards'} />
              </ListItem>
            </List>
          </div>
        ) : (
          !viewingArchivedCards && viewingArchivedLists ? (
            <div>
              <div className={classes.drawerHeader}>
                <Button onClick={() => setViewingArchivedLists(false)}>
                  <ChevronLeftIcon />
                </Button>
                <h3>Archived Lists</h3>
                <Button onClick={() => setOpen(false)}>
                  <CloseIcon />
                </Button>
              </div>
              <Divider />
              <ArchivedLists />
            </div>
        ) : (
          viewingArchivedCards && !viewingArchivedLists && (
            <div>
              <div className={classes.drawerHeader}>
                <Button onClick={() => setViewingArchivedCards(false)}>
                  <ChevronLeftIcon />
                </Button>
                <h3>Archived Cards</h3>
                <Button onClick={() => setOpen(false)}>
                  <CloseIcon />
                </Button>
              </div>
              <Divider />
              <ArchivedCards />
          </div>
          )
        ))}
        <Divider />
      </Drawer>
    </div>
  );
};

export default BoardDrawer;
