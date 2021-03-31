import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// import { renameList } from '../../actions/board';
import { TextField } from '@material-ui/core';

const ListTitle = ({ originalTitle }) => {
  const [title, setTitle] = useState(originalTitle);

  const onSubmit = async (e) => {
    e.preventDefault();
    // dispatch(renameList(listId, { title }));
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <TextField required value={title} onChange={(e) => setTitle(e.target.value)} />
    </form>
  );
};

ListTitle.propTypes = {
  originalTitle: PropTypes.string.isRequired,
};

export default ListTitle;
