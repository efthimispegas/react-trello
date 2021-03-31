import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../utils/modalStyles';
import { actions as listsActions } from '../redux/lists';

const CreateList = ({ addList }) => {
  const classes = useStyles();
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    // console.log('===============');
    // console.log('[CreateList]:',props);
    // console.log('===============');
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    // props.addBoard({ title }, props.history);
  };

  if(!adding) {
    return (
      <div className='create-list-button'>
        <Button variant='contained' color='primary' onClick={() => setAdding(true)}>
          Add a list
        </Button>
      </div>
    );
  }
  return (
    <div className='create-list-form'>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant='outlined'
          margin='normal'
          required
          id='title'
          label='Enter list title'
          name='title'
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <Button type='submit' variant='contained' color='primary'>
            Add List
          </Button>
          <Button onClick={() => setAdding(false)}>
            <CloseIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

CreateList.propTypes = {
  addList: PropTypes.func.isRequired
};
CreateList.defaultProps = {};

const mapStateToProps = state => {
  return {};
};

const mapDispathToProps = dispatch => {
  return {
    addList: bindActionCreators(listsActions.addList, dispatch)
  };
};

export default connect(mapStateToProps, mapDispathToProps)(withRouter(CreateList));
