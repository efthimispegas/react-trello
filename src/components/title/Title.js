import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TextField } from '@material-ui/core';

const Title = ({
  title,
  onChange,
  onSubmit,
}) => {
  const [ mouseOver, setMouseOver ] = useState(false);
  const [ focus, setFocus ] = useState(false);
  return (
    <form onSubmit={onSubmit} className={classnames('title')}>
      <TextField
        required
        name='title'
        value={title}
        onChange={onChange}
        onMouseOver={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={classnames('title', `${ (mouseOver && !focus) || focus ? 'focused' : '' }`)}
      />
    </form>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Title.defaultProps = {};

export default Title;
