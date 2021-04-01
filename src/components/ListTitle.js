import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField } from '@material-ui/core';
import List from './List';
import { actions as listsActions } from '../redux/lists';

const ListTitle = ({ lists, id, originalTitle, editList }) => {
  const [title, setTitle] = useState(originalTitle);

  useEffect(() => {
  }, [ lists ]);

  const onSubmit = async (e) => {
    e.preventDefault();
    editList({ id, title });
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <TextField
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)} />
    </form>
  );
};

ListTitle.propTypes = {
  originalTitle: PropTypes.string.isRequired,
  lists: PropTypes.object,
  id: PropTypes.string. isRequired,
  editList: PropTypes.func.isRequired
};

ListTitle.defaultProps = {};

const mapStateToProps = state => {
  return {
    lists: state.lists.list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLists: bindActionCreators(listsActions.getLists, dispatch),
    editList: bindActionCreators(listsActions.editList, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTitle);
