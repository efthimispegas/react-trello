import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Modal, TextField, Button } from '@material-ui/core';
import useStyles from '../utils/modalStyles';
import { actions as boardActions } from '../redux/boards';

const CreateBoard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    // console.log('===============');
    // console.log('[CreateBoard]:',props);
    // console.log('===============');
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    props.addBoard({ title }, props.history);
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <h1>Create new board</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='title'
          label='Add board title'
          name='title'
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type='submit' fullWidth variant='contained' color='primary'>
          Create Board
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <button className='board-card create-board-card' onClick={() => setOpen(true)}>
        Create new board
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {body}
      </Modal>
    </div>
  );
};

CreateBoard.propTypes = {
  addBoard: PropTypes.func.isRequired
};
CreateBoard.defaultProps = {};

const mapStateToProps = state => {
  return {};
};

const mapDispathToProps = dispatch => {
  return {
    addBoard: bindActionCreators(boardActions.addBoard, dispatch)
  };
};

export default connect(mapStateToProps, mapDispathToProps)(withRouter(CreateBoard));
