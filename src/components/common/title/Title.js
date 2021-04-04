import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button, TextField, Typography } from '@material-ui/core';

const Title = ({
  title,
  onChange,
  onSubmit,
}) => {
  const [ mouseOver, setMouseOver ] = useState(false);
  const [ focus, setFocus ] = useState(false);

  const onSubmitChanges = e => {
    setFocus(false);
    onSubmit(e);
  };

  return (
    focus ? (
      <form onSubmit={onSubmitChanges} className={classnames('title')}>
        <TextField
          required
          name='title'
          value={title}
          autoFocus
          onChange={onChange}
          onMouseOver={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
          onBlur={() => setFocus(false)}
          className={classnames('title', `${ (mouseOver && !focus) || focus ? 'focused' : '' }`)}
        />
    </form>
    ) : (
      <div onClick={() => setFocus(true)}>
        <Typography component='h6' variant='h6' className={classnames('title')}>{title}</Typography>
      </div>
    ));
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Title.defaultProps = {};

export default Title;
