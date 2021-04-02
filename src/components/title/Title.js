import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const Title = ({
  title,
  onChange,
  onSubmit
}) => (
  <form onSubmit={onSubmit}>
    <TextField
      required
      name='title'
      value={title}
      onChange={onChange}
    />
  </form>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

Title.defaultProps = {};

export default Title;
