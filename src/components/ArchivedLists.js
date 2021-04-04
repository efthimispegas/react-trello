import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Button, ListItem, ListItemText } from '@material-ui/core';
import { actions as listsActions } from '../redux/lists';

const ArchivedLists = ({ archived, unarchiveList }) => {

  const onSubmit = (id) => {
    unarchiveList({ id, archived })
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

ArchivedLists.propTypes = {
  archived: PropTypes.array.isRequired,
  unarchiveList: PropTypes.func.isRequired
};

ArchivedLists.defaultProps = {};

const mapStateToProps = state => {
  return {
    archived: state.lists.archived
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unarchiveList: bindActionCreators(listsActions.unarchiveList, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArchivedLists);
