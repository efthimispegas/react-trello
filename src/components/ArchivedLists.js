import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Button, ListItem, ListItemText } from '@material-ui/core';

const ArchivedLists = ({ lists, archived }) => {

  useEffect(() => {
    // console.log('===============');
    // console.log('[Archive] archived:',archived);
    // console.log('===============');
  }, []);

  const onSubmit = (listId) => {
    console.log(listId);
    // dispatch();
  };

  return (
    <div>
      <List>
        {archived.map((list, i) => {
          return (
            <ListItem key={i}>
              <ListItemText primary={list.title} />
              <Button onClick={() => onSubmit(list._id)}>Send to Board</Button>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    lists: state.lists.lists,
    archived: state.lists.archived
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArchivedLists);
